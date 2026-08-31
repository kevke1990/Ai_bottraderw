FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY server.js ./
COPY public ./public
COPY docs ./docs
EXPOSE 3000
ENV NODE_ENV=production PORT=3000
CMD ["node","server.js"]