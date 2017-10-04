FROM node:6

WORKDIR /var/www/app

# Copy over source
COPY ./ .

# Clean out node_modules in case this is beng run on a dev box
RUN rm -rf node_modules/*
RUN rm -rf build/*

# Add configurable NPM key
RUN echo '//registry.npmjs.org/:_authToken=ef16319c-fcec-42d2-abac-96e6abb71d6b > //.npmrc'

# Install dependencies for the library
#RUN npm install

EXPOSE 8081
EXPOSE 885
EXPOSE 3001

# Run the server
CMD rm -rf node_modules/* && npm install && cd ./demo && rm -rf node_modules/* && npm start