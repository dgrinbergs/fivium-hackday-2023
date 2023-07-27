package com.dgrinbergs.questionboard.api.question;

import com.dgrinbergs.questionboard.api.generated.types.Question;
import com.dgrinbergs.questionboard.api.generated.types.QuestionInput;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

@Controller
public class QuestionController {

  private final QuestionService questionService;

  QuestionController(QuestionService questionService) {
    this.questionService = questionService;
  }

  @MutationMapping
  public Mono<Question> createQuestion(@Argument QuestionInput input) {
    return questionService.createQuestion(input.getQuestion(), input.getTtl());
  }

}
