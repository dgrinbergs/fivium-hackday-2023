package com.dgrinbergs.questionboard.api.event;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
class EventService {

  private final Sinks.Many<ApplicationEvent> eventSink = Sinks.many().multicast().onBackpressureBuffer();

  @EventListener(ApplicationEvent.class)
  public void onApplicationEvent(ApplicationEvent event) {
    eventSink.tryEmitNext(event);
  }

  public Flux<ApplicationEvent> getEventFlux() {
    return eventSink.asFlux();
  }

}
