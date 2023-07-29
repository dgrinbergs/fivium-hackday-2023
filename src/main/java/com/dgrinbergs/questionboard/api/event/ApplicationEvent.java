package com.dgrinbergs.questionboard.api.event;

import java.time.Clock;

public interface ApplicationEvent {

  String type();

  boolean isNotExpired(Clock clock);

}
