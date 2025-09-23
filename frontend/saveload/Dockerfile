FROM node:14
WORKDIR /usr/ftv/saveload_custom
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 1200
CMD ["nodemon", "./bin/www"]
