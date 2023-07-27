package com.dgrinbergs.questionboard.api.question;

import com.dgrinbergs.questionboard.api.generated.types.Question;
import java.time.Clock;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class QuestionService {

  private final ApplicationEventPublisher eventPublisher;
  private final Clock clock;

  QuestionService(ApplicationEventPublisher eventPublisher, Clock clock) {
    this.eventPublisher = eventPublisher;
    this.clock = clock;
  }

  public Mono<Question> createQuestion(String question, int ttl) {
    var id = UUID.randomUUID();
    var postedTimestamp = OffsetDateTime.now(clock);

    eventPublisher.publishEvent(new QuestionPostedEvent(
        id, postedTimestamp, ttl, question
    ));

    return Mono.just(Question.newBuilder()
        .id(id)
        .postedTimestamp(postedTimestamp)
        .question(question)
        .ttl(ttl)
        .build());
  }

}
