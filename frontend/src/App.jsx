import { useState, useEffect } from 'react';
import WineCard from './components/WineCard.jsx';
import AddWineModal from './components/AddWineModal.jsx';
import { getWines, deleteWine } from './services/wineService.js';

function App() {
  const [wines, setWines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await getWines();
        setWines(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des vins:", error);
      }
    };
    fetchWines();
  }, []);

  const handleWineAdded = (newWine) => {
    setWines([...wines, newWine]);
  };

  const handleDeleteWine = async (idToDelete) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette bouteille ?')) {
      try {
        await deleteWine(idToDelete);
        setWines(wines.filter(wine => wine.id !== idToDelete));
      } catch (error) {
        console.error("Erreur lors de la suppression du vin:", error);
      }
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <header className="p-4 shadow-md bg-slate-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ma Cave à Vin</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
          + Ajouter une bouteille
        </button>
      </header>
      <main className="p-4">
        {wines.length > 0 ? (
          // On s'assure que les classes `grid` sont bien là
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wines.map((wine) => (
              <WineCard key={wine.id} wine={wine} onDelete={handleDeleteWine} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400 mt-8">Votre cave est vide. Ajoutez votre première bouteille !</p>
        )}
      </main>

      <AddWineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onWineAdded={handleWineAdded}
      />
    </div>
  );
}

export default App;