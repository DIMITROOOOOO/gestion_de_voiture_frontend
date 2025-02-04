import { status } from "./Statut.enum";
import { Assurance } from "./Assurance";
import { Vignette } from "./Vignette";
import { Modele } from "./Modele";
import { Taxe } from "./Taxe";
import { TypeCarburant } from "./typeCarburant";
export interface Vehicule {
  vehicule_id: number;
  plaque_immatriculation: string;
  kilometrage: number;
  dateMiseEnCirculation: Date;
  typeCarburant: TypeCarburant;
  consommation: number;
  statut: status;
  modele: Modele;
  vignette: Vignette;
  assurance: Assurance;
  taxe: Taxe;
}