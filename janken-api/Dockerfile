FROM mhart/alpine-node:12

WORKDIR /app
COPY . .

RUN npm install --prod

EXPOSE 3001
CMD ["node", "src/server.js"]