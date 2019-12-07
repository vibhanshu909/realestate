FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 6000
CMD npm run start:prod
