export interface User {
    id?: number;              // optionnel, généré automatiquement
    firstname?: string;       // utilisé pour le sign up
    lastname?: string;        // utilisé pour le sign up
    email: string;            // obligatoire pour sign in / sign up
    password: string;         // obligatoire pour sign in / sign up
    role?: string;            // optionnel, défini peut-être par défaut dans le backend
  }
  