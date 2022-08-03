### Project Description
Gameblob is a simple website where users can register/login, search games via IGDB's API, add games to their libraries, upload screenshots and edit their profiles.

The home page is different depending on whether the user is authenticated or not and some sections of the website (e.g. library/profile) are not visible to guests.

Users can upload screenshots to their library games, which get displayed in a carousel and can still access IGDB's game information from their profile page. Each user's profile page features sections for changing personal information, email, password and deleting the account altogether.

### Project Purpose
This is my project for Softuni's ReactJS 2022 course. The main project requirements are:
* Create a live, functional website using React, any back-end
* Implement user authentication
* Have dynamic pages, based on authentication (guest/user)
* Have different data collections
* Have at least one catalog and details section
* Demonstrate familiarity with React
* Use client-side rendering exclusively (SPA)

###  Technologies used:
* Front-end - Javascript, SCSS
* Back-end - Firebase Firestore, Firebase Authentication, Firebase Storage
* Data APIs - IGDB (Apocalypse queries/SQL), Firebase (Firestore queries/NoSQL)
* Libraries - 
	* React-dom
	* React-router
	* React-paginate
	* React-hook-form
	* React-firebase-hooks
	* React-spinners
	* React-router-hash-link
	* Swiper

### Setup:
To deploy this project locally, you will need an IGDB API Key and a web-enabled Firebase project with Firestore, Firebase Auth and Firebase Storage enabled. IGDB keys expire every 2 months and need to be renewed free of charge.
* Locally: Label your variables according to the firebase-config.js name-conventions and place them in an .env file. 
* Live: You will need to add the firebase-config.js variables to your hosting provider. 

Once the above is set up, you can run the following:
* Locally:
```
npm install // Installs node modules
npm run build // Creates the app build
npm start // Starts the local dev server
```
* Live:
```
npm install // Installs node modules
npm run build // Creates the app build
firebase init hosting // If using firebase
firebase deploy // If using firebase
```

### Architecture
#### Guest:
![alt guest](https://raw.githubusercontent.com/EmilAvramov/react-defense-project/master/GuestArchitecture.png)
#### User:
![alt user](https://raw.githubusercontent.com/EmilAvramov/react-defense-project/master/User%20Architecture.png)
