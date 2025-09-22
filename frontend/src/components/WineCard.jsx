import placeholderImage from '../assets/default-label.jpg'; // Assurez-vous que le chemin est bon ('../assets/default-label.jpg')

const BACKEND_URL = 'http://localhost:4001';

const WineCard = ({ wine }) => {
  const imageUrl = wine.imageUrl 
    ? `${BACKEND_URL}/${wine.imageUrl}` 
    : placeholderImage;

  // Mise en page horizontale avec une image de 50x50px
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-4 flex items-center gap-4">
      <img 
        src={imageUrl} 
        alt={`Étiquette de ${wine.name}`} 
        className="w-[50px] h-[50px] object-cover rounded-md flex-shrink-0" 
      />
      <div>
        <h3 className="text-lg font-semibold truncate">{wine.name}</h3>
        <p className="text-slate-400 text-sm">{wine.year} - {wine.appellation}</p>
      </div>
    </div>
  );
};

export default WineCard;