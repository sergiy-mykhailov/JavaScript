# Docker commands

[docs](https://docs.docker.com/engine/reference/commandline/docker/)

## 1. Docker

#### List Docker CLI commands
```bash
docker
docker container --help
```

#### Display Docker version and info
```bash
docker --version
docker version
docker info
```

## 2. Docker Images

#### List Docker images
```bash
docker image ls
docker image ls -a  # List all images on this machine
```
#### Remove image
```bash
docker image rm IMAGE_ID  # Remove specified image from this machine
docker image rm $(docker image ls -a -q)   # Remove all images from this machine
```

## 3. Docker Containers

#### List Docker containers
```bash
docker ps                  # running
docker container ls        # running
docker container ls --all  # all
docker container ls -aq    # all in quiet mode
```

#### Stop container
```bash
docker container stop CONTAINER_ID  # Gracefully stop container
docker container kill CONTAINER_ID  # Force shutdown container
```

#### Remove container
```bash
docker container rm CONTAINER_ID                  # Remove specified container
docker container rm $(docker container ls -a -q) # Remove all containers
```

## 4. Build

#### Build Docker Image from Dockerfile
```bash
docker build -t IMAGE_NAME PATH_TO_DOCKERFILE         # current path: '.'
docker build --tag=IMAGE_NAME:TAG_NAME PATH_TO_DOCKERFILE  # current path: '.'
```

## 5. Run

#### Execute Docker image
```bash
docker run IMAGE_NAME
docker run IMAGE_NAME --rm           # clean up the container when the container exits
docker run -it IMAGE_NAME            # run with interactive terminal
docker run -dit IMAGE_NAME           # run with interactive terminal in background
docker run -p 4000:80 IMAGE_NAME     # Run image mapping port 4000 to 80
docker run -d -p 4000:80 IMAGE_NAME  # Same thing, but in detached mode
```

## 6. Docker-Hub

#### Search images by name
```bash
docker search IMAGE_NAME
```

#### Working with remote registry
```bash
docker login                                  # Log in this CLI session using your Docker credentials
docker tag IMAGE_NAME username/repository:tag  # Tag imageName for upload to registry
docker push username/repository:tag           # Upload tagged image to registry
docker run username/repository:tag            # Run image from a registry
```

## 7. Volumes

#### List volumes
```bash
docker volume ls
```
#### Inspect a volume
```bash
docker volume inspect my-vol
```
#### Create a volume
```bash
docker volume create my-vol
```
#### Remove a volume
```bash
docker volume rm my-vol  # remove my-vol
docker volume prune      # remove all
```
