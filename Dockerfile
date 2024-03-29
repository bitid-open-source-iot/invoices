FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
# RUN mv config.template.json config.json
EXPOSE 24000 9229
RUN chown -R node /usr/src/app
USER node
CMD ["node", "--inspect=9229", "index.js"]
