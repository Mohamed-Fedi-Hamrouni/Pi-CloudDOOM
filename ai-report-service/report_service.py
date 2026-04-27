from fastapi import FastAPI, Query
from pydantic import BaseModel
from sqlalchemy import create_engine, text
from transformers import pipeline, AutoModelForSeq2SeqLM, AutoTokenizer
import json, re, os
import requests  # ✅ N'oublie pas ça
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ══ Chargement du modèle ═══════════════════════════════════════
print("Chargement du modèle IA...")
model_name = "google/flan-t5-base"
model      = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer  = AutoTokenizer.from_pretrained(model_name)
generator  = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=600,
    do_sample=False,
)
print("Modèle prêt.")

# ══ BDD ═══════════════════════════════════════════════════════
DB_URL = os.getenv("DB_URL", "postgresql://postgres:0000@localhost:5432/quizdb")
engine = create_engine(DB_URL)

@app.get("/api/report/{user_id}")
def generate_report(
    user_id: str,
    module_id: int = Query(..., description="ID du module dont on veut le rapport"),
):
    
    # 1. 🌐 LE "JOIN" MICROSERVICE : On demande le nom du module à l'API Java
    module_title = "Module Inconnu"
    try:
        # Port 8083 pour le Training Service
        response = requests.get(f"http://localhost:8083/api/modules/{module_id}", timeout=3)
        if response.status_code == 200:
            module_title = response.json().get("title", "Module Inconnu")
    except Exception as e:
        print("Erreur de connexion au service Training:", e)

    # 2. 📊 LA REQUÊTE SQL NETTOYÉE (PLUS DE training_modules ICI !)
    with engine.connect() as conn:
        rows = conn.execute(text("""
            SELECT
                q.category                                   AS category_name,
                COUNT(qa.id)                                 AS total_attempts,
                ROUND(AVG(qr.percentage)::numeric, 1)        AS avg_score,
                MAX(qr.percentage)                           AS best_score,
                SUM(CASE WHEN qr.passed THEN 1 ELSE 0 END)   AS passed_count,
                MIN(qa.started_at)                           AS first_attempt,
                MAX(qa.submitted_at)                         AS last_attempt
            FROM quiz_attempts qa
            JOIN quizzes q             ON qa.quiz_id     = q.id
            JOIN quiz_results qr       ON qr.attempt_id  = qa.id
            WHERE qa.user_id   = :uid
              AND q.module_id  = :mid
              AND qa.status    = 'CORRECTED'
            GROUP BY q.category
            ORDER BY avg_score DESC
        """), {"uid": user_id, "mid": module_id}).fetchall()

    if not rows:
        return {
            "error": f"Aucun quiz complété pour ce module (module_id={module_id})",
            "module_id": module_id,
            "user_id": user_id,
        }

    # 3. 📝 Formatage stats avec le vrai titre
    stats_lines = []
    for r in rows:
        total = r.total_attempts or 1
        rate  = round((r.passed_count or 0) / total * 100, 1)
        stats_lines.append(
            f"- {module_title}: {r.total_attempts} tentatives, "
            f"score moyen {r.avg_score}%, meilleur {r.best_score}%, "
            f"réussite {rate}%"
        )

    global_avg = sum(float(r.avg_score or 0) for r in rows) / len(rows)
    stats_text = "\n".join(stats_lines)

    # 4. 🤖 Génération IA
    prompt = f"""Evaluate quiz performance and generate a JSON report.

Student quiz statistics for this module:
{stats_text}
Overall average: {round(global_avg, 1)}%

Generate a JSON object with exactly these fields:
- niveau_global: one of Débutant/Intermédiaire/Avancé/Expert
- score_global: integer 0-100
- resume: one sentence summary in French
- modules: list of objects with fields: module, niveau, points_forts (list of 2 strings), axes_amelioration (list of 2 strings), recommandation (one sentence)
- plan_action: list of 3 concrete action items in French

JSON:"""

    raw    = generator(prompt)[0]["generated_text"].strip()
    report = extract_json(raw, rows, round(global_avg, 1), module_title)
    
    # On force le titre au cas où l'IA se trompe
    if report.get("modules") and len(report["modules"]) > 0:
        report["modules"][0]["module"] = module_title

    return report


def extract_json(raw: str, rows, global_avg: float, module_title: str) -> dict:
    clean = re.sub(r"```json|```", "", raw).strip()
    match = re.search(r'\{.*\}', clean, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except json.JSONDecodeError:
            pass
    return build_fallback_report(rows, global_avg, module_title)


def build_fallback_report(rows, global_avg: float, module_title: str) -> dict:
    if global_avg >= 85:   niveau = "Expert"
    elif global_avg >= 70: niveau = "Avancé"
    elif global_avg >= 50: niveau = "Intermédiaire"
    else:                  niveau = "Débutant"

    modules     = []
    weak_modules = []
    for r in rows:
        avg = float(r.avg_score or 0)
        mod_niveau = "Avancé" if avg >= 70 else "Intermédiaire" if avg >= 50 else "Débutant"
        if avg < 60:
            weak_modules.append(module_title)
            
        modules.append({
            "module": module_title,
            "niveau": mod_niveau,
            "points_forts": [
                f"Meilleur score atteint : {r.best_score}%",
                f"{r.total_attempts} tentatives effectuées",
            ],
            "axes_amelioration": [
                "Augmenter la régularité des sessions",
                "Revoir les corrections détaillées",
            ],
            "recommandation":
                f"Refaire 3 quiz sur ce module pour consolider le score moyen de {avg}%.",
        })

    plan = [
        f"Priorité : reprendre ce module en ciblant les questions échouées"
        if weak_modules else "Continuer la progression actuelle",
        "Analyser les corrections des quiz échoués pour identifier les lacunes",
        "Viser 70% de taux de réussite avant de passer au module suivant",
    ]

    return {
        "niveau_global": niveau,
        "score_global":  round(global_avg),
        "resume": (
            f"Score global de {round(global_avg)}% — niveau {niveau}. "
            f"{'Des progrès sont nécessaires.' if global_avg < 70 else 'Bonne maîtrise générale.'}"
        ),
        "modules": modules,
        "plan_action": plan,
    }