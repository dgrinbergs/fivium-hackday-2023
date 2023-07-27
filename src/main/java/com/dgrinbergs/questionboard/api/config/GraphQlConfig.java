package com.dgrinbergs.questionboard.api.config;

import graphql.scalars.ExtendedScalars;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

@Configuration
class GraphQlConfig {

  @Bean
  RuntimeWiringConfigurer runtimeWiringConfigurer() {
    return wiring -> wiring
        .scalar(ExtendedScalars.UUID)
        .scalar(ExtendedScalars.DateTime);
  }

}
