
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Info } from "lucide-react";
import { fr } from "date-fns/locale";
import RestaurantFloorPlan from "./RestaurantFloorPlan";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TableReservationComponent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("2");
  const [zone, setZone] = useState<string>("intérieur");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  
  const availableTimes = [
    "12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner une date et une heure",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTableId) {
      toast({
        title: "Table non sélectionnée",
        description: "Veuillez sélectionner une table sur le plan",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Réservation confirmée",
      description: `Votre table #${selectedTableId} pour ${guests} personne(s) a été réservée le ${format(date, "dd MMMM yyyy", { locale: fr })} à ${time}.`,
    });
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Réserver une table</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Heure</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time">
                <SelectValue placeholder="Sélectionner une heure" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="guests">Nombre de personnes</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger id="guests">
                <SelectValue placeholder="Combien de personnes?" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "personne" : "personnes"}
                  </SelectItem>
                ))}
                <SelectItem value="large">Plus de 8 personnes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label>Zone</Label>
            <RadioGroup value={zone} onValueChange={setZone} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intérieur" id="intérieur" />
                <Label htmlFor="intérieur">Intérieur</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="terrasse" id="terrasse" />
                <Label htmlFor="terrasse">Terrasse</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-medium">Plan du restaurant</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cliquez sur une table disponible pour la sélectionner</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300"></div>
                    <span className="text-xs">Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300"></div>
                    <span className="text-xs">Occupée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-300"></div>
                    <span className="text-xs">Réservée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300"></div>
                    <span className="text-xs">Sélectionnée</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="border rounded-md p-4 bg-slate-50">
            <RestaurantFloorPlan 
              selectedTableId={selectedTableId} 
              onTableSelect={setSelectedTableId}
              zone={zone}
              date={date}
              time={time}
            />
          </div>
          
          {selectedTableId && (
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
              <p className="text-blue-700 font-medium">Table #{selectedTableId} sélectionnée</p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="specialRequests">Demandes spéciales (optionnel)</Label>
          <Input
            id="specialRequests"
            placeholder="Ex: table près de la fenêtre, anniversaire, etc."
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Confirmer la réservation</Button>
        </div>
      </form>
    </Card>
  );
};

export default TableReservationComponent;
