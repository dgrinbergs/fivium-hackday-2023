import com.netflix.graphql.dgs.codegen.gradle.GenerateJavaTask

plugins {
  id("java")
  id("org.springframework.boot") version "3.1.2"
  id("io.spring.dependency-management") version "1.1.0"
  id("com.netflix.dgs.codegen") version "5.12.4"
}

repositories {
  mavenCentral()
}

dependencies {
  developmentOnly("org.springframework.boot:spring-boot-devtools")
  implementation("org.springframework.boot:spring-boot-starter-webflux")
  implementation("org.springframework.boot:spring-boot-starter-graphql")
  implementation("com.netflix.graphql.dgs:graphql-dgs-extended-scalars")
}

tasks.withType<GenerateJavaTask> {
  typeMapping = mutableMapOf(
    "ID" to "java.util.UUID",
    "Duration" to "java.time.Duration"
  )
  packageName = "com.dgrinbergs.questionboard.api.generated"
  generateClientv2 = true
  generateCustomAnnotations = true
}
