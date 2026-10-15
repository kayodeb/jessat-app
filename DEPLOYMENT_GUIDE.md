# Guide de Déploiement en Ligne : Jessat (Render + Vercel)

Tout le code à jour est poussé sur GitHub : `https://github.com/kayodeb/jessat-app.git` (branches `main` et `dev`).

---

## 🚀 PARTIE 1 : Déployer le Backend sur Render (NestJS)

1. Rendez-vous sur [dashboard.render.com](https://dashboard.render.com/) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **New +** > **Web Service**.
3. Choisissez **Build and deploy from a Git repository**, puis sélectionnez votre dépôt **`kayodeb/jessat-app`**.
4. Configurez les options comme suit :
   - **Name** : `jessat-api`
   - **Region** : Frankfurt (EU Central) ou Ohio (US East) *(choisissez la plus proche de votre base Neon)*
   - **Branch** : `main`
   - **Root Directory** : `backend`
   - **Runtime** : `Node`
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm run start:prod`
   - **Instance Type** : `Free`

5. Faites défiler vers le bas jusqu'à **Environment Variables** et ajoutez les variables suivantes :

| Clé | Valeur |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `DATABASE_URL` | *(votre URL Neon PostgreSQL existante)* |
| `JWT_SECRET` | `un_secret_tres_long_et_securise_2026` |
| `JWT_EXPIRES_IN` | `7d` |
| `CLOUDINARY_CLOUD_NAME` | `rzhxf6at` |
| `CLOUDINARY_API_KEY` | `414451191916991` |
| `CLOUDINARY_API_SECRET` | `6Vgbya0IWXsh-ivbtJshJogSk3I` |
| `STRIPE_SECRET_KEY` | *(votre clé Stripe)* |
| `STRIPE_WEBHOOK_SECRET` | *(votre webhook secret Stripe)* |
| `FRONTEND_URL` | `http://localhost:3000` *(vous ajouterez l'URL Vercel ici à l'étape suivante)* |

6. Cliquez sur **Deploy Web Service**.
7. Une fois déployé, Render vous fournira une URL publique, par exemple :
   `https://jessat-api.onrender.com`

---

## 🌐 PARTIE 2 : Déployer le Frontend sur Vercel (Next.js)

1. Rendez-vous sur [vercel.com](https://vercel.com/) et connectez-vous avec GitHub.
2. Cliquez sur **Add New...** > **Project**.
3. Importez votre dépôt **`jessat-app`**.
4. Dans les paramètres du projet :
   - **Framework Preset** : Next.js (sélectionné automatiquement)
   - **Root Directory** : `./` (laisser la racine)
   - **Build Command** : `npm run build` (par défaut)
   - **Install Command** : `npm install` (par défaut)
5. Dépliez la section **Environment Variables** et ajoutez :

| Clé | Valeur |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://jessat-api.onrender.com/api` *(remplacez par l'URL Render obtenue à la Partie 1 + `/api`)* |

6. Cliquez sur **Deploy**.
7. En quelques secondes, votre site Next.js sera en ligne avec son URL Vercel (ex: `https://jessat-app.vercel.app`).

---

## 🔄 PARTIE 3 : Lier le Frontend et le Backend (CORS)

Une fois l'URL Vercel obtenue (ex: `https://jessat-app.vercel.app`) :
1. Retournez sur le dashboard **Render** de votre backend.
2. Allez dans **Environment**.
3. Modifiez la variable `FRONTEND_URL` pour y mettre l'URL Vercel :
   `https://jessat-app.vercel.app,http://localhost:3000`
4. Cliquez sur **Save changes** (Render redéploiera automatiquement en quelques secondes).

---

🎉 **Votre application Jessat est maintenant 100% en ligne et opérationnelle !**
