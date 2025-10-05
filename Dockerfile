# Gunakan base image Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy file package.json dan package-lock.json untuk caching
COPY package*.json ./

# Install dependencies (production)
RUN npm ci --only=production

# Copy semua source code ke container
COPY . .

# Buat folder penyimpanan (jika aplikasi butuh write file)
RUN mkdir -p temp uploads output && chmod -R 777 temp uploads output

# Set environment variable port Railway
ENV PORT=3000
EXPOSE 3000

# Jalankan server
CMD ["node", "server.js"]