# Use a Node.js base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy all the source code
COPY . .

# Expose the port
EXPOSE 3000

# Command to run your Express app
CMD ["npm", "start"]
