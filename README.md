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
To deploy this project locally, you will need Node.js, an IGDB API Key and a web-enabled Firebase project with Firestore, Firebase Auth and Firebase Storage. You will need the variables from the generated config. IGDB keys are free, expire every 2 months and can be renewed free of charge. Please use the exact naming conventions as used in the project for any variables.

* Local Hosting: 
	* Change/specify your Firebase project name in ./firebaserc
	* Link your IGDB API details to an .env file in the root dir (used in /src/hooks/useFetchExternal.js)
	* Add your firebase variables to an .env file in the root dir (used in /src/config/firebase-config.js)
* Web Hosting: 
	* Change/specify your Firebase project name in ./firebaserc
	* Add both the IGDB (/src/hooks/useFetchExternal.js) and Firebase Config (used in /src/config/firebase-config.js) variables to your hosting provider's environment 

* Firebase:
	* Enable Firestore, authentication and storage
	* Enable local and google email providers in authentication
	* Add your hosting url as an authorized domain in authentication
	* Set storage and firestore rules to:
	```
	rules_version = '2';
	service cloud.firestore {
	match /databases/{database}/documents {
		match /{document=**} {
			allow read, write: if request.auth != null;
		}
	}
	}
	```

Once the above is set up, you can run the following:
* Locally:
```
npm install // Installs node modules
npm run build // Creates the app build
npm start // Starts the local dev server
```
* Web:
```
npm install // Installs node modules
npm run build // Creates the app build
firebase init hosting // If using firebase
firebase deploy // If using firebase
```

### Architecture
#### Guest:
!['alt guest'](/GuestArchitecture.png)
#### User:
!['alt user'](/User%20Architecture.png)
