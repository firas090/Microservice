export interface Agence {
    idAgence?: string;
    nomAg: string;
    adresse: string;
    email: string;
    telephone: string;
    siteWeb: string;
    description: string;
    active: boolean;
    responsableId: number;
  }