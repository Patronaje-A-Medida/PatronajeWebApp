# Stage 0, based on Node.js, to build and compile Angular
FROM node:latest as node
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build:docker

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/PatronajeWebApp /usr/share/nginx/html
