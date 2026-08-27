export default function RatingBar({ label, rating, hideLabel, noMargin }: { label: string; rating: number; hideLabel?: boolean; noMargin?: boolean }) {
  const getRatingLabel = (r: number) => {
    switch(r) {
      case 5: return "Very High";
      case 4: return "High";
      case 3: return "Moderate";
      case 2: return "Low";
      case 1: return "Very Low";
      default: return "Unknown";
    }
  };

  const getColor = (r: number) => {
    switch(r) {
      case 5: return "bg-red-500";
      case 4: return "bg-orange-400";
      case 3: return "bg-yellow-400";
      case 2: return "bg-green-400";
      case 1: return "bg-green-500";
      default: return "bg-neutral-200";
    }
  };

  return (
    <div className={noMargin ? "" : "mb-4"}>
      <div className="flex justify-between items-end mb-1">
        {!hideLabel ? (
          <span className="font-medium text-neutral-900">{label}</span>
        ) : <span />}
        <span className="text-sm font-semibold text-neutral-600">{rating}/5 <span className="font-normal text-neutral-500 ml-1">({getRatingLabel(rating)})</span></span>
      </div>
      <div className="flex gap-1 h-3">
        {[1, 2, 3, 4, 5].map((level) => (
          <div 
            key={level} 
            className={`flex-1 rounded-sm ${level <= rating ? getColor(rating) : 'bg-neutral-100'}`}
          />
        ))}
      </div>
    </div>
  );
}
