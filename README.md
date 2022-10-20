# Bookmarks-keeper (backend)

Bookmarks-keeper app backend.

---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [Author Info](#author-info)

---

## Description

This project started as a personal side project, I get the idea from the
Saved Messages telegram's feature, whose interface is actually a chat. I
used to use that chat to save some of my links but I wanted a way to group
them by category. That's why I decided to build my own bookmark keeper
app. For that, I used the MERN stack, but divided the project in API and
[client](https://github.com/PerezEnrique/bookmarks-keeper-client).

Update: I recently migrate this project to typescript! Give it a look

### Backend key features

- It utilizes the [link-preview-js](https://www.npmjs.com/package/link-preview-js) npm library by Oscar Franco,
  to extract url's information.
- Stores data on MongoDB Atlas.s
- It utilizes Passport JS with JWT for authentication and authorization.

### Technologies

- Typescript
- Node.js
- Express.js
- Mongoose
- Passport.js
- JWT

[Back To The Top](#bookmarks-keeper-backend)

---

## How To Use

#### Project Installation

After running `npm install` to install the app dependencies, check the .env.example file to see what env variables you'll need to set up before starting the aplication. This is the link to the [client side](https://github.com/PerezEnrique/bookmarks-keeper-client) I built for this api.

To install app dependencies.

    npm install
    
To build the application
    
    npm build

to start the application

    npm start (This will trigger prestart script, which subsequently calls npm build)

[Back To The Top](#bookmarks-keeper-backend)

---

## Author Info

- [My Portfolio](enrique-perez-portfolio.netlify.app)
- [LinkedIn](https://www.linkedin.com/in/enrique-perez28/)
- [Twitter](https://twitter.com/jesus93enrique)

[Back To The Top](#bookmarks-keeper-backend)
