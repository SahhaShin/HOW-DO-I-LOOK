# Docker 이미지의 베이스 이미지를 선택합니다
FROM openjdk:11-jre
# FROM amazoncorretto:11
#FROM azul/zulu-openjdk:11

# 포트번호
EXPOSE 8080

# 작업 디렉토리를 생성하고, 이후 명령어들이 해당 디렉토리 내에서 실행되도록 합니다
WORKDIR /app

# 먼저 application.properties 파일을 복사합니다
COPY src/main/resources/application.properties /app/application.properties

# 그리고 서버의 JAR 파일을 컨테이너에 복사합니다
COPY build/libs/HowDoILook-0.0.1-SNAPSHOT.jar /app/HowDoILook-0.0.1-SNAPSHOT.jar

# Docker 컨테이너 실행 시 실행할 명령어를 지정합니다
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=prod","/app/HowDoILook-0.0.1-SNAPSHOT.jar"]