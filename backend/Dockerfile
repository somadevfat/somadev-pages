# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-slim

# Add build arguments for user and group IDs
ARG UID=1000
ARG GID=1000

# Set the working directory
WORKDIR /workspace

# Copy all files first
COPY . .

# Now, create user and set all permissions at once
RUN groupadd -g $GID -o appgroup && \
    useradd -m -u $UID -g $GID -s /bin/sh appuser && \
    chown -R appuser:appgroup /workspace

# Switch to non-root user
USER appuser

# Run Maven to download dependencies
RUN ./mvnw dependency:go-offline -B

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["./mvnw", "spring-boot:run"] 