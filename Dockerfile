# Use Node.js base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Compile TypeScript -> Generates JavaScript files in `dist/`
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the compiled JS file
CMD ["node", "dist/index.js"]

