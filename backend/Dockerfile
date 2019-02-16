FROM node:8-alpine

WORKDIR /app
COPY package.json /app
RUN yarn install

EXPOSE 5000

COPY ./ /app
CMD ["node", "/app/index.js"]
