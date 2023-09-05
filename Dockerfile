# Use an official PostgreSQL runtime as a parent image
FROM postgres:latest

# Set the working directory in the container to /docker-entrypoint-initdb.d
# This is the directory that Postgres uses for initializing the database.
WORKDIR /docker-entrypoint-initdb.d

# Copy the current directory contents into the container at /docker-entrypoint-initdb.d
ADD . /docker-entrypoint-initdb.d

# Make port 5432 available to the world outside this container
EXPOSE 5432

# Run postgres when the container launches
CMD ["postgres"]