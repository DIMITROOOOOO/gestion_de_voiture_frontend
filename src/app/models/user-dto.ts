import { Role } from "./enum";

export interface UserDto {
    id: number;
    nom: string;
    email: string;
    motdepasse: string;
    role: Role; 
}
