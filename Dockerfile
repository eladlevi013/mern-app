FROM node:latest
WORKDIR /server

# Install app dependencies
COPY package.json /server
RUN npm install

# Bundle app source
COPY . /server

EXPOSE 3000
CMD [ "npm", "start" ]