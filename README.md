# How to run

Make sure you created a Firebase project as described [here](https://github.com/rhalm/we-backend)

Set up credentials for the frontend app:

- Go to Project Settings to create a new web app
- Replace the `firebaseConfig` variable with yours in `src/environment/firebase.config.ts`
- Go to Auth and enable Email/Password identification

### Local-dev setup

Run `npm install` to install dependencies then run `npm start` to start the application on http://localhost:4200

### Production setup

See [here](https://github.com/rhalm/we-backend)
