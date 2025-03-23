FROM node:18-slim

WORKDIR /app
COPY ./packages/api .
RUN npm install
EXPOSE 3001

CMD ["npm", "start"]
