# Dockerfile

[Official docs](https://docs.docker.com/engine/reference/builder/)

A Dockerfile must start with a `FROM` instruction.

## FROM
```dockerfile
FROM baseImageName
FROM baseImageName AS alias
FROM baseImageName:tag AS alias
FROM baseImageName@digest AS alias
```
* **baseImageName** - Base Image from which you are building.

## RUN
RUN - executes any command.
```dockerfile
RUN command
RUN ["executable", "param1", "param2"]
RUN bash -i -c 'bashCommand'
```

## CMD
CMD - provide defaults for an executing container.
There can only be one CMD instruction in a Dockerfile.
```dockerfile
CMD ["executable","param1","param2"]
CMD ["param1","param2"]
CMD command param1 param2
```

## LABEL
LABEL - adds metadata to an image.
```dockerfile
LABEL key1=value1 key2=value2 key3=value3
LABEL "com.example.vendor"="ABC Incorporated"
LABEL version="1.0"
```

## EXPOSE
Make port 80 available to the world outside this container
```dockerfile
EXPOSE port
EXPOSE port/protocol
EXPOSE 80/tcp
EXPOSE 80/udp
```

## ENV
```dockerfile
ENV key value
ENV key1=value1 key2=value2
```

## ADD
ADD - copies new files, directories or remote file URLs from `src` and adds them to the filesystem of the image at the path `dest`
```dockerfile
ADD src dest/
ADD src1 src2 dest/
ADD ["src1", "src2", "dest/"]
ADD --chown=user:group src dest/
```

## COPY
COPY - copies new files, directories from `src` and adds them to the filesystem of the container at the path `dest`
```dockerfile
COPY src dest/
COPY src1 src2 dest/
COPY ["src1", "src2", "dest/"]
COPY --chown=user:group src dest/
```

## ENTRYPOINT
An ENTRYPOINT allows you to configure a container that will run as an executable.
```dockerfile
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2
```

## VOLUME
VOLUME  - mount point of external volumes (from native host or other containers).
```dockerfile
VOLUME ["/data"]
```

## USER
Use the user when running the image and for any commands
```dockerfile
USER user
USER UID
USER user:group
USER UID:GID
```

## WORKDIR
Sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` and `ADD` instructions
```dockerfile
WORKDIR /path/to/workdir
ENV DIRPATH /path
WORKDIR $DIRPATH/workdir
```

## Variables

Get value of variable:
`$variable_name` or `${variable_name}`

Set value of variables:
```dockerfile
ENV foo bar    # ${foo} = bar
ENV foo=bar
```
