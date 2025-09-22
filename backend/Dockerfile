# Étape 1: Utiliser une image Node.js officielle
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json ./
COPY package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY . .

# AJOUTER CETTE LIGNE : Génère le client Prisma pendant la construction de l'image
RUN npx prisma generate

# Exposer le port sur lequel l'API tournera
EXPOSE 4000

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "dev"]