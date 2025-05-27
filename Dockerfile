FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for faster cache
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Generate Prisma client (required if using Prisma)
RUN npx prisma generate

# Start the server
CMD ["npm", "start"]
