
# Documentation de l'API

Cette API permet d'accéder aux données des stations de vélos et des crimes, avec des options de filtrage sur les crimes.

---

## Table des matières

1. [Endpoints](#endpoints)
   - [GET /api/bikes](#get-apibikes)
   - [GET /api/crimes](#get-apicrimes)
2. [Notice d'utilisation](#notice-dutilisation)

---

## Endpoints

### **GET /api/bikes**

#### Description

Récupère la liste complète des stations de vélos.

#### Réponse

- **200 OK** : Liste des stations de vélos.
- **500 Internal Server Error** : Erreur lors de la récupération des données.

#### Exemple de réponse (200 OK)

```json
[
  {
    "id": 1,
    "name": "Station Central Park",
    "latitude": 40.785091,
    "longitude": -73.968285
  },
  {
    "id": 2,
    "name": "Station Times Square",
    "latitude": 40.758896,
    "longitude": -73.985130
  }
]
```

---

### **GET /api/crimes**

#### Description

Récupère les données des crimes depuis la base de données avec des filtres facultatifs.

#### Paramètres de requête

| Paramètre         | Type     | Obligatoire | Description                                   | Exemple          |
|--------------------|----------|-------------|-----------------------------------------------|------------------|
| `age_group`        | `string` | Non         | Groupe d'âge (YOUNG_ADULT, ADULT, SENIOR).    | `ADULT`          |
| `borough`          | `string` | Non         | Arrondissement (MANHATTAN, BROOKLYN, etc.).   | `MANHATTAN`      |
| `summons_date`     | `string` | Non         | Date de l'infraction (format YYYY-MM-DD).     | `2023-01-15`     |
| `offense_description` | `string` | Non      | Description partielle de l'infraction.        | `Theft`          |

#### Réponse

- **200 OK** : Liste des crimes filtrée par les critères donnés.
- **500 Internal Server Error** : Erreur lors de la récupération des données.

#### Exemple de réponse (200 OK)

```json
[
  {
    "id": 101,
    "age_group": "ADULT",
    "borough": "MANHATTAN",
    "summons_date": "2023-01-15",
    "offense_description": "Theft"
  },
  {
    "id": 102,
    "age_group": "YOUNG_ADULT",
    "borough": "BROOKLYN",
    "summons_date": "2023-01-14",
    "offense_description": "Assault"
  }
]
```

---

## Accéder aux Endpoints

1. **Stations de vélos** : Accédez à l'URL `http://localhost:3000/api/bikes` pour récupérer toutes les stations de vélos.
2. **Crimes** : Accédez à `http://localhost:3000/api/crimes` et utilisez les paramètres de requête pour filtrer les résultats (optionnel).

