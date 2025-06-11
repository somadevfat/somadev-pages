# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-slim

# Install gosu for user switching
RUN apt-get update && apt-get install -y --no-install-recommends gosu && rm -rf /var/lib/apt/lists/*

# Add build arguments for user and group IDs
ARG UID=1000
ARG GID=1000

# Set the working directory
WORKDIR /workspace

# Copy all files first
COPY . .

# Copy entrypoint script and grant execution rights
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Create a non-root user
RUN groupadd -g $GID -o appgroup && \
    useradd -m -u $UID -g $GID -s /bin/sh appuser

# Run Maven to download dependencies
RUN ./mvnw dependency:go-offline -B

# Expose the application port
EXPOSE 8080

# Set entrypoint to our script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# The command to run the application, will be passed to entrypoint.sh
CMD ["./mvnw", "spring-boot:run"] 