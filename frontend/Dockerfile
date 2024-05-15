FROM node:20 as build-stage
WORKDIR /app
COPY package.json ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]