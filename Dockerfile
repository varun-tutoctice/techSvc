# Check out https://hub.docker.com/_/node to select a new base image
FROM node:14.0.0-slim

WORKDIR /home/node/app

COPY --chown=node . .

#RUN ls -al

RUN npm install -g yargs-parser
RUN npm install cookie --save
RUN npm install oas-resolver --save
RUN npm install -g dot-prop


ENV HOST=0.0.0.0 PORT=3000 version=1.0.0

EXPOSE ${PORT}
CMD [ "node", "." ]

