# Étape 1: Utiliser une image Node.js officielle
FROM node:22-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

ENV NODE_ENV=development

# Copier les fichiers de dépendances
COPY package.json ./
#COPY package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Vite a besoin d'exposer ce port
EXPOSE 3000

# Commande pour démarrer le serveur de développement Vite
CMD ["npm", "run", "dev"]