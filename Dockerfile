# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json .
RUN npm install
RUN npm rebuild node-sass
RUN npm audit fix


COPY . .

EXPOSE 3000
# start app
CMD ["npm", "start"]