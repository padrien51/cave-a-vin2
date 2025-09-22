import { useState } from 'react';
import { addWine } from '../services/wineService.js';

const AddWineModal = ({ isOpen, onClose, onWineAdded }) => {
  // Etats pour chaque champ du formulaire
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [appellation, setAppellation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  // Si la modale n'est pas ouverte, on ne rend rien
  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (!name || !year || !appellation || !image) {
      setError('Veuillez remplir tous les champs obligatoires et sélectionner une image.');
      return;
    }

    // On utilise FormData pour envoyer le fichier et les données texte
    const formData = new FormData();
    formData.append('name', name);
    formData.append('year', year);
    formData.append('appellation', appellation);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await addWine(formData);
      onWineAdded(response.data); // On passe le vin ajouté au composant parent
      handleClose(); // On ferme la modale
    } catch (err) {
      setError('Une erreur est survenue lors de l\'ajout du vin.');
      console.error(err);
    }
  };

  const handleClose = () => {
    // Réinitialiser les champs du formulaire en fermant
    setName('');
    setYear('');
    setAppellation('');
    setDescription('');
    setImage(null);
    setError('');
    onClose(); // Appelle la fonction onClose passée en props
  };

  return (
    // Le fond semi-transparent
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      {/* La modale elle-même */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Ajouter une bouteille</h2>
        <form onSubmit={handleSubmit}>
          {/* Champs de texte */}
          <input type="text" placeholder="Nom du vin" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-700 p-2 rounded mb-4" />
          <input type="number" placeholder="Millésime" value={year} onChange={(e) => setYear(e.target.value)} className="w-full bg-slate-700 p-2 rounded mb-4" />
          <input type="text" placeholder="Appellation" value={appellation} onChange={(e) => setAppellation(e.target.value)} className="w-full bg-slate-700 p-2 rounded mb-4" />
          <textarea placeholder="Description (optionnel)" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-slate-700 p-2 rounded mb-4" />
          
          {/* Champ de fichier */}
          <label className="block mb-2 text-sm font-medium text-slate-300">Étiquette de la bouteille</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-700 file:text-white hover:file:bg-red-800" />
          
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          
          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={handleClose} className="py-2 px-4 rounded bg-slate-600 hover:bg-slate-700">Annuler</button>
            <button type="submit" className="py-2 px-4 rounded bg-red-700 hover:bg-red-800 font-semibold">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWineModal;