FROM node:alpine
WORKDIR /frontend
COPY package.json /frontend/package.json
RUN yarn
COPY . /frontend
RUN yarn codegen
RUN yarn build
