# base image
FROM node:12.2.0-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm config set '@bit:registry' https://node.bit.dev

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY . /app
RUN npm run build


#production environment
# FROM nginx:1.16.0-alpine
# RUN chmod -R 0777 /usr/share/nginx/html
# COPY --from=build /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM php:7.0-apache
RUN apt-get update && \
    apt-get install -y libfreetype6-dev libjpeg62-turbo-dev && \
    docker-php-ext-install mysqli && \
    docker-php-ext-install mbstring && \
    docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/  &&  \
    docker-php-ext-install gd
RUN a2enmod rewrite
RUN a2enmod headers

# Fix permissions for apache
RUN chown -R www-data:www-data /var/www/html/

COPY ./ /var/www/html
COPY --from=build /app/build /var/www/html

EXPOSE 80
RUN service apache2 restart
