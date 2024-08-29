FROM node:18 AS build

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:18-alpine3.19 AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/package-lock.json ./package-lock.json

RUN npm install --ignore-scripts

COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /usr/src/app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/infra ./infra
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/tmp ./tmp

EXPOSE 3000

CMD ["npm", "start"]