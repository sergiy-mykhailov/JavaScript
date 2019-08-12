# Use an official Ubuntu as a parent image
FROM ubuntu:18.04

# Install additional software
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install git
RUN apt-get -y install nano
RUN apt-get -y install wget

# Install nvm and node
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
RUN bash -i -c 'nvm install 8.16.0'
RUN bash -i -c 'nvm use 8.16.0'
RUN bash -i -c 'node -v'
