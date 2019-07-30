# Docker

## 1. Docker

### List Docker CLI commands
```bash
docker
docker container --help
```

### Display Docker version and info
```bash
docker --version
docker version
docker info
```

### List Docker images
```bash
docker image ls
```

### List Docker containers (running, all, all in quiet mode)
```bash
docker container ls
docker container ls --all
docker container ls -aq
```

### Search images by name
```bash
docker search imageName
```

### Build Docker Image from Dockerfile
```bash
docker build --tag=imageName pathToDockerfile
```

### Execute Docker image
```bash
docker run imageName
```