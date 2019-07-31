# Use an official Ubuntu as a parent image
FROM ubuntu:19.04

# Install nvm and node v8
RUN apt-get -y update
RUN apt-get -y install wget
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
RUN bash -i -c 'nvm install 8.16.0'
RUN bash -i -c 'nvm use 8.16.0'
RUN bash -i -c 'node -v'
