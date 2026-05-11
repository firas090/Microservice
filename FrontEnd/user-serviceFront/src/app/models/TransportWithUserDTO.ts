// transport-with-user-dto.ts
export interface TransportWithUserDTO {
    id: string;
    voyageId: string;
    type: string;
    compagnie: string;
    capacite: number;
    numero: string;
    villeDepart: string;
    villeArrivee: string;
    dateDepart: string;
    dateArrivee: string;
    prix: number;
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
    };
  }
  