package com.microservice.resourceservice.messaging.producer;

import com.microservice.resourceservice.messaging.event.ResourceEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResourceEventProducer {

    private final KafkaTemplate<String, ResourceEvent> kafkaTemplate;

    public void publishResourceCreated(ResourceEvent event) {
        log.info("Publishing resource.created event for {}", event.getResourceId());
        kafkaTemplate.send("resource.created", event.getResourceId().toString(), event);
    }

    public void publishResourceDeleted(ResourceEvent event) {
        log.info("Publishing resource.deleted event for {}", event.getResourceId());
        kafkaTemplate.send("resource.deleted", event.getResourceId().toString(), event);
    }
}
