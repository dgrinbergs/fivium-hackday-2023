package com.dgrinbergs.questionboard.api.event;

import java.time.Clock;

public interface ApplicationEvent {

  boolean isNotExpired(Clock clock);

}
