import { TypeBoiteVitesse } from "./TypeBoiteVitesse";
import { TypeVehicle } from "./TypeVehicle";
export interface Modele {
    id: number;
    marque: string;
    modele: string;
    typeVehicle: TypeVehicle;
    typeBoiteVitesse: TypeBoiteVitesse;
  }