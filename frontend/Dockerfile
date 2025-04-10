# Stage 1: Build the React app
FROM node:18 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the React build using NGINX
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
