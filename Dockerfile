FROM node:latest
RUN npm install -g npm
WORKDIR /app
COPY . .
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm install @rollup/rollup-linux-x64 -musl --save-optional
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npx", "vite", "preview", "--host", "--port", "5173"]