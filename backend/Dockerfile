# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-slim

# Set the working directory in the container
WORKDIR /workspace

# Copy the Maven wrapper and the project description file
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies
# This is a separate step to leverage Docker's layer caching
# RUN ./mvnw dependency:go-offline

# Copy the rest of the application's code
COPY src ./src

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the app when the container launches
CMD ["./mvnw", "spring-boot:run"] 