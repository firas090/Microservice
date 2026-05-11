FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/service-agence-0.0.1-SNAPSHOT.jar agence.jar
EXPOSE 8089
ENTRYPOINT ["java", "-jar", "agence.jar"]