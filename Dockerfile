FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 8080

CMD [ "/bin/sh", "entrypoint.sh" ]




