# 🗄️ Hetic Urban Data Analytics 🗄️

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

## 👤️ Authors 👤

- Maxence BREUILLES ([@MisterAzix](https://github.com/MisterAzix))<br />
- Lucas BOUCHER ([@lucasboucher](https://github.com/lucasboucher))<br />
- Julian LABALLE ([@Triips-TheCoder](https://github.com/Triips-TheCoder))<br />
- Charles LAMBRET ([@CharlesLambret](https://github.com/CharlesLambret))<br />
- Lounis OURRAD ([@LostLemonCurd](https://github.com/LostLemonCurd))
