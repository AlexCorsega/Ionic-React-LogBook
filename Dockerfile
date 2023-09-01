FROM node:20-alpine


COPY package.json /app/
COPY . /app/

WORKDIR /app    

RUN npm install --legacy-peer-deps

CMD [ "ionic","serve" ]


