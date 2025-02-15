FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN yarn install
# COPY . /usr/src/app
COPY ./node_modules/testeranto/dist/prebuild/TaskManBackEnd.mjs /usr/src/app/TaskManBackEnd.mjs

# RUN ts-node-esm ./node_modules/testeranto/dist/prebuild/TaskManBackEnd.mjs

EXPOSE 3000
EXPOSE 27017
# CMD ['yarn', 'testeranto-testrun', '&', 'yarn', 'testeranto-taskman']
CMD ["node", "./TaskManBackEnd.mjs"]