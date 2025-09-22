const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// --- ROUTES API ---

app.get('/api/wines', async (req, res) => {
  try {
    const wines = await prisma.wine.findMany();
    res.json(wines);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des vins." });
  }
});

app.post('/api/wines', upload.single('image'), async (req, res) => {
  try {
    const { name, year, appellation, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "L'image de l'étiquette est requise." });
    }
    const newWine = await prisma.wine.create({
      data: {
        name,
        year: parseInt(year, 10),
        appellation,
        description: description || null,
        imageUrl: req.file.path
      },
    });
    res.status(201).json(newWine);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout du vin." });
  }
});

// ROUTE DE SUPPRESSION
app.delete('/api/wines/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const wineToDelete = await prisma.wine.findUnique({
      where: { id: parseInt(id) },
    });

    if (!wineToDelete) {
      return res.status(404).json({ error: 'Vin non trouvé.' });
    }

    if (wineToDelete.imageUrl) {
      try {
        await fs.unlink(wineToDelete.imageUrl);
      } catch (fileError) {
        console.error("Erreur lors de la suppression du fichier image:", fileError);
      }
    }

    await prisma.wine.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Vin supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du vin." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});