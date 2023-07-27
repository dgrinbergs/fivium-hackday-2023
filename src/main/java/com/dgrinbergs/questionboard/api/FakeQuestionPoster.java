package com.dgrinbergs.questionboard.api;

import com.dgrinbergs.questionboard.api.generated.types.Question;
import com.dgrinbergs.questionboard.api.question.QuestionPostedEvent;
import com.github.javafaker.Faker;
import java.time.Clock;
import java.time.OffsetDateTime;
import java.util.Locale;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class FakeQuestionPoster {

  private static final Clock CLOCK = Clock.systemUTC();
  private static final Faker FAKER = Faker.instance(Locale.ENGLISH);

  private final ApplicationEventPublisher eventPublisher;

  FakeQuestionPoster(ApplicationEventPublisher eventPublisher) {
    this.eventPublisher = eventPublisher;
//    Flux.interval(Duration.ofSeconds(5)).doOnNext(i -> generateRandomEvent()).subscribe();
  }

  public void generateRandomEvent() {
    var question = Question.newBuilder()
        .id(UUID.randomUUID())
        .question("did you know %s?".formatted(FAKER.chuckNorris().fact().toLowerCase().replace(".", "")))
        .postedTimestamp(OffsetDateTime.now(CLOCK))
        .ttl(ThreadLocalRandom.current().nextInt(60, 300))
        .build();

    eventPublisher.publishEvent(new QuestionPostedEvent(
        question.getId(),
        question.getPostedTimestamp(),
        question.getTtl(),
        question.getQuestion()
    ));
  }

}
