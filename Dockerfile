FROM node:latest
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
ENV ENV=production
ENV PORT=5000
RUN npm run build
EXPOSE 5000
CMD npm run start:prod
