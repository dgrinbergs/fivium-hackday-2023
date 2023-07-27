package com.dgrinbergs.questionboard.api.question;

import com.dgrinbergs.questionboard.api.event.ApplicationEvent;
import java.time.temporal.Temporal;
import java.util.UUID;

public record QuestionPostedEvent(
    UUID id,
    Temporal postedTimestamp,
    Integer ttl,
    String question
) implements ApplicationEvent {

}
