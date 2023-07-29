package com.dgrinbergs.questionboard.api.question;

import com.dgrinbergs.questionboard.api.event.ApplicationEvent;
import java.time.Clock;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.UUID;

public record QuestionPostedEvent(
    UUID id,
    Temporal postedTimestamp,
    Integer ttl,
    String question
) implements ApplicationEvent {

  @Override
  public boolean isNotExpired(Clock clock) {
    var expiry = postedTimestamp.plus(ttl, ChronoUnit.SECONDS);
    var now = clock.instant();

    return Instant.from(expiry).isAfter(now);
  }
}
