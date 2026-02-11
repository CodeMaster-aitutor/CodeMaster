FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

ENV JAVA_HOME=/opt/java/openjdk
ENV PATH="/opt/java/openjdk/bin:${PATH}"

RUN ln -s /opt/java/openjdk /opt/jdk-17.0.12 \
    && useradd -m -u 10001 runner

USER runner

CMD ["bash"]
