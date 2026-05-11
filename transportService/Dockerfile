FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/service-transport-0.0.1-SNAPSHOT.jar transport.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "transport.jar"]