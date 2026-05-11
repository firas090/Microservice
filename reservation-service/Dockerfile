FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/service-reservation-0.0.1-SNAPSHOT.jar reservation.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "reservation.jar"]