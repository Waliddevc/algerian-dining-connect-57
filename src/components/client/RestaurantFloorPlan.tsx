
import { useState, useEffect } from "react";

type Table = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  seats: number;
  status: "available" | "occupied" | "reserved";
  zone: "intérieur" | "terrasse";
  shape: "rectangle" | "circle";
};

type RestaurantFloorPlanProps = {
  selectedTableId: number | null;
  onTableSelect: (tableId: number) => void;
  zone: string;
  date?: Date;
  time: string;
};

const RestaurantFloorPlan = ({ 
  selectedTableId, 
  onTableSelect,
  zone,
  date,
  time
}: RestaurantFloorPlanProps) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [filteredTables, setFilteredTables] = useState<Table[]>([]);
  
  // Initialize tables with mock data
  useEffect(() => {
    const mockTables: Table[] = [
      // Tables intérieures
      { id: 1, x: 50, y: 50, width: 60, height: 60, seats: 4, status: "available", zone: "intérieur", shape: "rectangle" },
      { id: 2, x: 150, y: 50, width: 60, height: 60, seats: 4, status: "occupied", zone: "intérieur", shape: "rectangle" },
      { id: 3, x: 250, y: 50, width: 60, height: 60, seats: 4, status: "reserved", zone: "intérieur", shape: "rectangle" },
      { id: 4, x: 50, y: 150, width: 60, height: 60, seats: 4, status: "available", zone: "intérieur", shape: "rectangle" },
      { id: 5, x: 150, y: 150, width: 60, height: 60, seats: 4, status: "available", zone: "intérieur", shape: "rectangle" },
      { id: 6, x: 250, y: 150, width: 60, height: 60, seats: 4, status: "reserved", zone: "intérieur", shape: "rectangle" },
      { id: 7, x: 400, y: 50, width: 60, height: 60, seats: 2, status: "available", zone: "intérieur", shape: "circle" },
      { id: 8, x: 400, y: 150, width: 60, height: 60, seats: 2, status: "available", zone: "intérieur", shape: "circle" },
      
      // Tables terrasse
      { id: 9, x: 50, y: 300, width: 60, height: 60, seats: 4, status: "available", zone: "terrasse", shape: "rectangle" },
      { id: 10, x: 150, y: 300, width: 60, height: 60, seats: 4, status: "occupied", zone: "terrasse", shape: "rectangle" },
      { id: 11, x: 250, y: 300, width: 60, height: 60, seats: 2, status: "available", zone: "terrasse", shape: "circle" },
      { id: 12, x: 350, y: 300, width: 60, height: 60, seats: 2, status: "available", zone: "terrasse", shape: "circle" },
    ];
    
    // Simulation: Update table status based on date and time
    // In a real app, this would come from a backend API
    if (date && time) {
      const dateStr = date.toISOString().split('T')[0];
      const key = `${dateStr}-${time}`;
      
      // Mock reservations data - in real app would come from backend
      const reservations: Record<string, number[]> = {
        "2023-06-01-12:00": [1, 5, 9],
        "2023-06-01-19:00": [3, 6, 11],
        "2023-06-02-13:00": [2, 7, 10],
      };
      
      const reservedTableIds = reservations[key] || [];
      
      setTables(mockTables.map(table => {
        if (reservedTableIds.includes(table.id)) {
          return { ...table, status: "reserved" };
        }
        return table;
      }));
    } else {
      setTables(mockTables);
    }
  }, [date, time]);
  
  // Filter tables based on selected zone
  useEffect(() => {
    setFilteredTables(tables.filter(table => table.zone === zone));
  }, [tables, zone]);
  
  const getTableColor = (table: Table) => {
    if (selectedTableId === table.id) {
      return "bg-blue-100 border-blue-300 hover:bg-blue-200";
    }
    
    switch (table.status) {
      case "available":
        return "bg-green-100 border-green-300 hover:bg-green-200 cursor-pointer";
      case "occupied":
        return "bg-red-100 border-red-300";
      case "reserved":
        return "bg-yellow-100 border-yellow-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };
  
  const handleTableClick = (table: Table) => {
    if (table.status === "available") {
      onTableSelect(table.id);
    }
  };
  
  return (
    <div className="relative w-full h-[500px] overflow-auto">
      {/* Sections labels */}
      {zone === "intérieur" && (
        <div className="absolute left-4 top-4 bg-white px-2 py-1 text-sm font-medium border rounded">
          Salle principale
        </div>
      )}
      
      {zone === "terrasse" && (
        <div className="absolute left-4 top-270 bg-white px-2 py-1 text-sm font-medium border rounded">
          Terrasse
        </div>
      )}
      
      {/* Tables */}
      {filteredTables.map(table => (
        <div
          key={table.id}
          className={`absolute border ${getTableColor(table)} ${table.shape === "circle" ? "rounded-full" : "rounded-md"} flex items-center justify-center transition-colors`}
          style={{
            left: `${table.x}px`,
            top: `${table.y}px`,
            width: `${table.width}px`,
            height: `${table.height}px`,
            cursor: table.status === "available" ? "pointer" : "default",
          }}
          onClick={() => handleTableClick(table)}
        >
          <div className="text-center">
            <div className="font-medium">{table.id}</div>
            <div className="text-xs">{table.seats} pers.</div>
          </div>
        </div>
      ))}
      
      {/* Walls and decorations for interior */}
      {zone === "intérieur" && (
        <>
          <div className="absolute left-20 top-260 w-300 h-1 bg-gray-400"></div>
          <div className="absolute left-320 top-20 w-1 h-240 bg-gray-400"></div>
          <div className="absolute left-20 top-20 w-1 h-240 bg-gray-400"></div>
          <div className="absolute left-20 top-20 w-300 h-1 bg-gray-400"></div>
          {/* Kitchen area */}
          <div className="absolute left-350 top-230 p-2 bg-gray-200 rounded text-xs border border-gray-400">
            Cuisine
          </div>
        </>
      )}
      
      {/* Features for terrace */}
      {zone === "terrasse" && (
        <>
          <div className="absolute left-20 top-270 w-400 h-1 bg-gray-400"></div>
          <div className="absolute left-420 top-270 w-1 h-100 bg-gray-400"></div>
          <div className="absolute left-20 top-370 w-400 h-1 bg-gray-400"></div>
          <div className="absolute left-20 top-270 w-1 h-100 bg-gray-400"></div>
          {/* Plants */}
          <div className="absolute left-300 top-340 w-10 h-10 rounded-full bg-green-300"></div>
          <div className="absolute left-400 top-340 w-10 h-10 rounded-full bg-green-300"></div>
        </>
      )}
      
      {/* Legend */}
      <div className="absolute right-4 bottom-4 bg-white p-2 rounded shadow-sm border text-xs space-y-1">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300"></div>
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300"></div>
          <span>Occupée</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-300"></div>
          <span>Réservée</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300"></div>
          <span>Sélectionnée</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantFloorPlan;
