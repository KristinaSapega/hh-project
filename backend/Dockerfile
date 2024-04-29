FROM maven:3.9.6 AS build
#build backend app
WORKDIR /crab
COPY ansible ansible
COPY src src
COPY pom.xml .
RUN mvn clean package -Dmaven.test.skip

FROM eclipse-temurin:21-jre-alpine
WORKDIR /crab
#install ansible
RUN apk add --no-cache openssh
RUN apk add --no-cache python3
RUN apk add --no-cache ansible
COPY --from=build /crab/ansible ansible
RUN ansible-galaxy collection install -r ansible/requirements.yml --force
RUN chown root ansible/kostyl-key
RUN chmod 600 ansible/kostyl-key

#run backend app
COPY --from=build /crab/target/crab-*.jar crab.jar
EXPOSE 8080
CMD java -jar crab.jar
