FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5000
ENV NODE_ENV=production
ENV TZ=UTC
ENV PORT=5000
RUN npm run build
CMD [ "node", "dist/index.js" ]
