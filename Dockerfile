# build stage
FROM node:lts-alpine

ENV VITE_SERVER_URL=http://0.0.0.0:8000/api/v1

WORKDIR /app

COPY ./  ./

RUN npm install -g pnpm

RUN pnpm install

EXPOSE 3000

# production stage
CMD ["pnpm", "run", "dev"]