# 🗄️ Hetic Urban Data Analytics 🗄️

---

## 📝️ Table of contents 📝#

- [How to run the project](#how-to-run-the-project)
- [Data models️](#data-models)
- [Documentation de l'API](#documentation-de-lapi)
- [👤️ Authors 👤](#-authors-)

---

## How to run the project

1. Clone the repository

```bash
git clone git@github.com:MisterAzix/hetic-urban-data-analytics.git
```

2. Run `pnpm install` to install the dependencies

```bash
pnpm install
```

3. Duplicate the `.env.template` file and rename it to `.env`. Fill in the environment variables with the correct values.

```dotenv
DATABASE_URL="postgresql://postgres:password@localhost:5432/hetic?schema=public"
```

4. Launch docker-compose to start the database

```bash
cd .docker/ && docker compose up -d && cd ../
```

5. Run the migrations

```bash
pnpx prisma migrate dev
```

6. Run the project

```bash
pnpm dev
```

---

## Data models

### Crime

| Field               | Type             |
| ------------------- | ---------------- |
| id                  | String           |
| latitude            | String           |
| longitude           | String           |
| age_group           | AGE_GROUP        |
| sex                 | String?          |
| race                | String?          |
| summons_date        | DateTime         |
| offense_description | String           |
| borough             | NEW_YORK_BOROUGH |

### BikeStation

| Field          | Type     |
| -------------- | -------- |
| id             | String   |
| name           | String   |
| latitude       | Decimal  |
| longitude      | Decimal  |
| timestamp      | DateTime |
| free_bikes     | Int      |
| total_capacity | Int      |
| empty_slots    | Int      |

---

## Documentation de l'API

L'API permet d'accéder aux données des stations de vélos et des crimes, avec des options de filtrage sur les crimes.

## Routes list
   - [GET /api/bikes](#get-apibikes)
   - [GET /api/crimes](#get-apicrimes)

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

### **GET /api/crimes**

#### Description

Récupère les données des crimes depuis la base de données avec des filtres facultatifs.

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

### Accéder aux Endpoints

1. **Stations de vélos** : Accédez à l'URL `http://localhost:3000/api/bikes` pour récupérer toutes les stations de vélos.
2. **Crimes** : Accédez à `http://localhost:3000/api/crimes` et utilisez les paramètres de requête pour filtrer les résultats (optionnel).

---

## 👤️ Authors 👤

- Maxence BREUILLES ([@MisterAzix](https://github.com/MisterAzix))<br />
- Lucas BOUCHER ([@lucasboucher](https://github.com/lucasboucher))<br />
- Julian LABALLE ([@Triips-TheCoder](https://github.com/Triips-TheCoder))<br />
- Charles LAMBRET ([@CharlesLambret](https://github.com/CharlesLambret))<br />
- Lounis OURRAD ([@LostLemonCurd](https://github.com/LostLemonCurd))
