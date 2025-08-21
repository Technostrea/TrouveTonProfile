export interface Profile {
  id: string;
  created: string;
  updated: string;
  profession: string;
  utilisateur: string;
  estVerifier: boolean;
  secteur: string;
  reseaux: JSON;
  bio: string;
  cv: string;
  projets: string[];
  apropos: string;
}
