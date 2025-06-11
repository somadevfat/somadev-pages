# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-slim

# Add arguments for user and group IDs
ARG UID=1000
ARG GID=1000

# Create a non-root user 'appuser' and its home directory
RUN groupadd -g $GID -o appgroup && \
    useradd -m -u $UID -g $GID -s /bin/sh appuser

# Set the working directory in the container
WORKDIR /workspace

# Copy the Maven wrapper and project description, and set ownership
# The user needs to own these files to run them
COPY --chown=appuser:appgroup .mvn/ .mvn
COPY --chown=appuser:appgroup mvnw pom.xml ./

# Switch to the new user
USER appuser

# Download dependencies
# This is a separate step to leverage Docker's layer caching
# RUN ./mvnw dependency:go-offline

# Copy the rest of the application's code and set ownership
COPY --chown=appuser:appgroup src ./src

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the app when the container launches
CMD ["./mvnw", "spring-boot:run"] 