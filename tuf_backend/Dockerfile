# Use a specific Node.js version as per your requirement
ARG NODE_VERSION=20.5.1
FROM node:${NODE_VERSION}-alpine

# Set the working directory
WORKDIR /usr/src/app


# Install TypeScript globally
RUN yarn global add typescript

# Copy package.json and yarn.lock separately to leverage caching
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install --production --frozen-lockfile

RUN yarn add --dev @types/uuid @types/express @types/cookie-parser @types/nodemailer

# Copy the rest of the source files into the image.
COPY . .

# Create a non-root user and group named 'nodejs' with appropriate permissions
RUN addgroup -g 1001 nodejs \
    && adduser -u 1001 -D -h /usr/src/app -G nodejs nodejs \
    && chown -R nodejs:nodejs /usr/src/app

# Switch to the non-root user 'nodejs'
USER nodejs

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]
