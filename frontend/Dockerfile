# build the application
FROM node:8-alpine as build-stage

WORKDIR /app
COPY package.json /app
RUN yarn install

COPY ./ /app
RUN yarn build

# Serve the app via nginx
FROM nginx:1.15

COPY --from=build-stage /app/build /usr/share/nginx/html
