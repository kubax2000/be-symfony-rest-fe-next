FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Run the app
CMD [ "npm", "run", "dev" ]
