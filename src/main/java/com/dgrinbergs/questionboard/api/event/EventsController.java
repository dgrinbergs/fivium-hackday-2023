package com.dgrinbergs.questionboard.api.event;

import java.time.Duration;
import java.util.UUID;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("events")
@CrossOrigin("*")
public class EventsController {

  private final Flux<ApplicationEvent> events;

  EventsController(EventService eventService) {
    this.events = eventService.getEventFlux();
  }

  @GetMapping
  public Flux<ServerSentEvent<ApplicationEvent>> eventStream() {
    return events
        .delayElements(Duration.ofMillis(20))
        .map(event -> ServerSentEvent.<ApplicationEvent>builder()
            .id(UUID.randomUUID().toString())
            .data(event)
            .build());
  }

}
