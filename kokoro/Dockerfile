FROM hwdsl2/kokoro-server:latest

# Preinstall the spaCy English model that your logs show is being fetched at startup
RUN /opt/venv/bin/python -m pip install --no-cache-dir \
    https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.8.0/en_core_web_sm-3.8.0-py3-none-any.whl

# Increase the startup watchdog from 300s to 1200s
RUN sed -i 's/while \[ "$i" -lt 300 \]; do/while [ "$i" -lt 1200 ]; do/' /opt/src/run.sh

# Pre-download Kokoro-82M weights at build time (~320 MB).
# run.sh sets HF_HOME=/var/lib/kokoro and checks for
# /var/lib/kokoro/hub/models--hexgrad--Kokoro-82M at startup —
# populating it here means cold starts never hit HuggingFace.
RUN HF_HOME=/var/lib/kokoro \
    /opt/venv/bin/python -c "import huggingface_hub; huggingface_hub.snapshot_download(repo_id='hexgrad/Kokoro-82M')"
