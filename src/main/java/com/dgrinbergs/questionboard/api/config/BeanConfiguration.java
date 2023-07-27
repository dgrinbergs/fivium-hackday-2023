package com.dgrinbergs.questionboard.api.config;

import java.time.Clock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class BeanConfiguration {

  @Bean
  Clock clock() {
    return Clock.systemUTC();
  }

}
