#Base Image
FROM node:10
COPY . /src
COPY  package.json  /

## Create app directory
WORKDIR /src

## Install app dependencies
RUN npm install

## tell the port number the container should expose
EXPOSE 5000

## run the application
CMD ["npm", "run", "dev"]