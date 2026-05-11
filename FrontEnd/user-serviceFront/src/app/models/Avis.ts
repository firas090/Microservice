export interface Avis {
    id: number;
    utilisateurId?: number;
    voyageId: number;
    note: number;
    commentaire: string;
    dateAvis?: Date;
    approuve?: boolean;
  }
  