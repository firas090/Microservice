// transport.model.ts
export interface Transport {
    id?: string;
    voyageId: string;
    type: string;
    compagnie: string;
    capacite: number;
    numero: string;
    villeDepart: string;
    villeArrivee: string;
    dateDepart: string; // Utilise des types Date si tu préfères
    dateArrivee: string;
    prix: number;
    userId: number;
  }
  