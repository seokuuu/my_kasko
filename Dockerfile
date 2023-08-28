FROM node:18-alpine as builder

WORKDIR /root
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
EXPOSE 80
COPY --from=builder /root/build /usr/share/nginx/html