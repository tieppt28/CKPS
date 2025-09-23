### STAGE 1: Build ###
FROM node:22-alpine AS build
WORKDIR /usr/ftv/client
COPY package*.json ./
RUN npm cache clean --force
RUN npm i
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx
COPY nginx-site-conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/ftv/client/dist/angular /usr/share/nginx/html
