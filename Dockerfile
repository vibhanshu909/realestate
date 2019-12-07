FROM node:latest
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY . /app
RUN npm run build
EXPOSE 4000
CMD npm run start:prod
