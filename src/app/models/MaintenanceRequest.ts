import { Statut } from "./statut";
import { Nature } from "./Nature";
export interface MaintenanceRequest {
  vehiculeId: number;
  datePlanifiee: Date;
  description: string;
  statut: Statut;
  depense: number;
  nature: Nature; // Add this line
  type: string; // Add this line
}