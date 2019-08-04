# Use an official Ubuntu as a parent image
FROM ubuntu:18.04

# Install nvm and node v8
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install wget
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
RUN bash -i -c 'nvm install 8.16.0'
RUN bash -i -c 'nvm use 8.16.0'
RUN bash -i -c 'node -v'

# Install additional software
RUN apt-get -y install git
RUN apt-get -y install nano
#RUN apt-get -y install systemd

# Install nginx
RUN apt-get -y install nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
#RUN systemctl enable nginx

# Install redis
RUN apt-get -y install redis-server
#RUN systemctl enable redis-server.service

RUN mkdir -p /var/www

WORKDIR /var/www

EXPOSE 3000

#ENTRYPOINT service nginx start
CMD service nginx start
