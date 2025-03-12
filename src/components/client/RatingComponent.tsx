
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface RatingComponentProps {
  orderId: number;
}

const RatingComponent = ({ orderId }: RatingComponentProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleMouseEnter = (star: number) => {
    setHoveredRating(star);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (star: number) => {
    setRating(star);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Évaluation requise",
        description: "Veuillez sélectionner une note avant de soumettre",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Merci pour votre évaluation!",
      description: `Votre note de ${rating} étoiles a été enregistrée.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="text-2xl focus:outline-none"
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
          >
            <span
              className={`${
                star <= (hoveredRating || rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 ? `${rating} étoiles` : "Sélectionnez une note"}
        </span>
      </div>

      <Textarea
        placeholder="Commentaires (optionnel)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="resize-none"
      />

      <Button onClick={handleSubmit}>Soumettre l'évaluation</Button>
    </div>
  );
};

export default RatingComponent;
