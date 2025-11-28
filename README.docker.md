# Docker Setup for Storybook

## Building the Docker Image

Build the Storybook Docker image:

```bash
docker build -f Dockerfile.storybook -t patient-records-storybook .
```

## Running the Container

### Using Docker directly

Run the container:

```bash
docker run -d -p 6006:80 --name patient-records-storybook patient-records-storybook
```

Access Storybook at: http://localhost:6006

### Using Docker Compose

Run with Docker Compose:

```bash
docker-compose -f docker-compose.storybook.yml up -d
```

Stop the container:

```bash
docker-compose -f docker-compose.storybook.yml down
```

## Managing the Container

Stop the container:
```bash
docker stop patient-records-storybook
```

Start the container:
```bash
docker start patient-records-storybook
```

Remove the container:
```bash
docker rm patient-records-storybook
```

## Rebuilding

If you make changes to your Storybook stories, rebuild the image:

```bash
docker build -f Dockerfile.storybook -t patient-records-storybook . --no-cache
```
