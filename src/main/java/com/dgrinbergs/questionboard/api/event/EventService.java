package com.dgrinbergs.questionboard.api.event;

import java.time.Clock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
public class EventService {

  private static final Logger LOGGER = LoggerFactory.getLogger(EventService.class);

  private final Sinks.Many<ApplicationEvent> eventSink = Sinks.many().replay().all();
  private final Clock clock;

  EventService(Clock clock) {
    this.clock = clock;
  }

  @EventListener(ApplicationEvent.class)
  public void onApplicationEvent(ApplicationEvent event) {
    LOGGER.info("Publishing {}", event);
    eventSink.tryEmitNext(event);
  }

  public Flux<ApplicationEvent> getEventFlux() {
    return eventSink.asFlux()
        .filter(e -> e.isNotExpired(clock));
  }

}
