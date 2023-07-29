package com.dgrinbergs.questionboard.api.question;

import com.dgrinbergs.questionboard.api.event.ApplicationEvent;
import java.time.Clock;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.UUID;

public record QuestionPostedEvent(
    String type,
    UUID id,
    Temporal postedTimestamp,
    Integer ttl,
    String question
) implements ApplicationEvent {

  private static final String EVENT_TYPE = "QUESTION_POSTED";

  public static QuestionPostedEvent create(UUID id, Temporal postedTimestamp, int ttl, String question) {
    return new QuestionPostedEvent(
        EVENT_TYPE,
        id, postedTimestamp, ttl, question
    );
  }

  @Override
  public boolean isNotExpired(Clock clock) {
    var expiry = postedTimestamp.plus(ttl, ChronoUnit.SECONDS);
    var now = clock.instant();

    return Instant.from(expiry).isAfter(now);
  }
}
