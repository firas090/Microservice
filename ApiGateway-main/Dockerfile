FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/service-gateway-0.0.1-SNAPSHOT.jar gateway.jar
EXPOSE 7000
ENTRYPOINT ["java", "-jar", "gateway.jar"]