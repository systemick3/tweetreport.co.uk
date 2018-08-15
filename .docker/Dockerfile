FROM php:7.1.8-apache

MAINTAINER Mike Garthwaite

COPY . /srv/app
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

RUN apt-get update -y && apt-get install -y sendmail vim
