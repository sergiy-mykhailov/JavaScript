# Docker-compose file

[Official docs](https://docs.docker.com/compose/compose-file)

## services

### build
```yaml
build:
  context: ./dir
```
* **context**: path to a directory containing a Dockerfile, or a url to a git repository.


### volumes
```yaml
volumes:
  - type: bind
    source: ./reactweb
    target: /var/www
```
* **type**: the mount type `volume`, `bind`, `tmpfs` or `npipe`
* **source**: a path on the host, or the name of a volume
* **target**: the path in the container where the volume is mounted

### ports
```yaml
ports:
  - "HOST:CONTAINER"
```