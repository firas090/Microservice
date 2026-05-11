FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/service-user-0.0.1-SNAPSHOT.jar user.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "user.jar"]