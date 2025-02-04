import { driverStatut } from "./driverStatut";

export interface Driver {
    chauffeur_id: number;
    nom:String;
    telephone:String;
    numero_permis:String;
    date_embauche:Date;
    statutChaffeurs: driverStatut;}

    