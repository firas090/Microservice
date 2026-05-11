FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/service-avis-0.0.1-SNAPSHOT.jar avis.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "avis.jar"]