import { TypeContrat } from "./TypeContrat";
export interface Assurance {
    id: number;
    idAssurance: string;
    compagnieAssurance: string;
    dateExpiration: Date;
    dateDebut: Date;
    coutAssurance: number;
    typeContrat: TypeContrat;
  }