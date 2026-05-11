# MicroService
# 📢 Microservice - Gestion des Avis (`AvisService`)

## 👩‍💻 Développé par : Eya Ben Slimen  
Ce microservice fait partie du projet **EasyTrip**, une plateforme de gestion de voyages. Il est responsable de la **gestion des avis des utilisateurs** sur les voyages.

---

## 🚀 Fonctionnalités principales

- ➕ Ajouter un avis avec vérification de l'existence de l'utilisateur via `user-service`
- 📄 Consulter les avis (par ID, tous, filtrés)
- 🛠️ Mettre à jour / Supprimer un avis
- 🔍 Recherche avancée par mot-clé, voyage ID et statut d’approbation
- ✅ Modération des avis (approbation ou refus)
- ⭐ Classement des avis par **pertinence pondérée** (note, date, approbation)
- 👍👎 Réactions sur les avis (like/dislike) par utilisateur

- ## 🧱 Architecture

- **Base de données** : Mysql
- **Communication inter-service** : Feign Client (vérifie l'existence de l'utilisateur via `user-service`)
- **API REST** construite avec **Spring Boot**
- **Gestion des erreurs** Feign intégrée (404 si l'utilisateur n'existe pas)
- **CORS** activé pour autoriser l'accès depuis le front-end

---

## 🔗 Endpoints REST

| Méthode | URL | Description |
|--------|-----|-------------|
| POST | `/api/avis/addAvis` | Créer un avis *(valide l'existence de l'utilisateur)* |
| GET | `/api/avis/getavis/{id}` | Détails d’un avis avec infos utilisateur |
| GET | `/api/avis` | Tous les avis |
| PUT | `/api/avis/{id}` | Modifier un avis |
| DELETE | `/api/avis/delete/{id}` | Supprimer un avis |
| GET | `/api/avis/recherche` | Recherche avancée par mot-clé, voyageId, approuvé |
| GET | `/api/avis/pertinents` | Liste triée par score de pertinence |
| PUT | `/api/avis/{id}/moderer?approuve=true` | Approuver ou refuser un avis |
| POST | `/api/avis/{avisId}/user/{userId}?liked=true` | Ajouter une réaction |
| GET | `/api/avis/{avisId}` | Obtenir les réactions pour un avis |
