
FROM node

LABEL version="1.3"

RUN mkdir -p /nodepop

WORKDIR /nodepop

COPY package.json .
RUN npm install bcrypt
RUN npm install

COPY . .

EXPOSE 3000

CMD npm start