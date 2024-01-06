# mini-airbnb
A node.js project with Express.js and EJS

## Project Description
A small version of a listing website to rent your place, made with Express.js for the backend and MongoDB for the database. For the frontend, I used Bootstrap 5 and EJS templating language.

##### How to Start
Make a .env file in the root directory just like .env.sample, add your connection string, and Cloudinary API details for image uploading services (necessary for creating listings). The default port is 3000.

## `npm run start`
Run Node with index.js

## `npm run dev`
For starting nodemon



### Directory

```
|   .env  <----- add here like this file
│   .env.sample ----------------------|
│   .gitattributes
│   .gitignore
│   .prettierignore
│   .prettierrc
│   app.js
│   constants.js
│   index.js
│   LICENSE
│   package-lock.json
│   package.json
│   README.md
│   schema.js
│
├───controllers
│       listings.js
│       reviews.js
│       users.js
│
├───db
│       index.js
│
├───init
│       data.js
│       index.js
│
├───middlewares
│       middleware.js
│
├───models
│       listing.js
│       review.js
│       user.js
│
├───public
│   ├───css
│   │       starability.css
│   │       style.css
│   │
│   └───js
│           map.js
│           script.js
│
├───routes
│       listing.js
│       review.js
│       user.js
│
├───utils
│       cloudConfig.js
│       ExpressError.js
│       wrapAsync.js
│
└───views
    │   error.ejs
    │
    ├───includes
    │       flash.ejs
    │       footer.ejs
    │       navbar.ejs
    │
    ├───layouts
    │       boilerplate.ejs
    │
    └───listings
            edit.ejs
            index.ejs
            login.ejs
            new.ejs
            show.ejs
            signup.ejs