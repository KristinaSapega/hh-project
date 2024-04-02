FROM maven:3.9.6 AS build
WORKDIR /crab
COPY ansible ansible
COPY src src
COPY pom.xml .
RUN mvn clean package -Dmaven.test.skip

FROM openjdk:17
WORKDIR /crab
COPY --from=build /crab/target/crab-*.jar crab.jar
COPY --from=build /crab/ansible ansible
EXPOSE 8080
CMD java -jar crab.jar
