FROM node:20.19.4-alpine3.22

RUN addgroup express && adduser -S -G express pepe
USER pepe

WORKDIR /app/
RUN mkdir datos
COPY --chown=pepe:express package*.json .

RUN npm install

COPY --chown=pepe:express . .

EXPOSE 5173

CMD [ "npm","run", "dev" ]