# Dev Fit Gym Logistical Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a gym tracker app which allows clients to create accounts, log in with existing accounts, see trainer information, view and join classes, and shop the Dev Fit store. It also allows trainers to add or remove their own classes. Managers on this app are able to view a list of trainers employed by the gym, pull up an individual trainer's information, terminate a trainer's employment by removing that trainer from the database, or hire a new trainer by adding his/her information into the database. A manager can also view all classes available at the gym for the week, view class rosters, and add/remove members from class rosters.

## Deployed App

[Dev Fit App](https://dev-fit-gym-app.herokuapp.com/)

## Table of Contents

- [Screenshots](#Screenshots)
- [Technologies](#Technologies)
- [Usage](#Usage)
- [Installation](#Installation)
- [Feedback](#Feedback)
- [Future Development](#Future_Development)

## Screenshots

![HomePage](./client/src/images/screenshots/homePage.png)

![RegistrationPage](./client/src/images/screenshots/registrationPage.png)

![MemberPage](./client/src/images/screenshots/memberPage.png)

![TrainerPage](./client/src/images/screenshots/trainerPage.png)

![ManagerPage](./client/src/images/screenshots/managerPage.png)

![AddToRoster](./client/src/images/screenshots/addToRoster.png)

![TrainerInfo](./client/src/images/screenshots/trainerInfo.png)

![StorePage](./client/src/images/screenshots/storePage.png)

[(Back to Top)](#Description)

## Technologies

- React
- node.js
- Auth0
- express
- AtlasDB
- MongoDb
- Mongoose
- nodemon
- date-fns
- Heroku
- react-bootstrap
- PayPal

## Usage

1. Members
   - Register for account from home page.
   - Log in with registered account from home page.
   - Join or drop classes.
   - View classes they've registered for.
   - View Gym's trainers.
   - Shop at the Member Store.
2. Trainers
   - Log in from home page.
   - Add Classes/classtimes for the week to be taught by that trainer.
   - Delete Classes from the week that were added by that trainer.
3. Managers
   - Log in from home page.
   - View list of trainers.
   - View each trainer's demographics information.
   - Terminate a trainer / remove him/her from the database.
   - Hire a new trainer by entering his/her information into the database.
   - View all classes being offered by the gym for the week.
   - View class rosters.
   - Add members to roster or delete members from roster for each class (in case client needs help with this process for some reason).
   - View Store Order History.

## Installation

- Deployed on Heroku

## Feedback

Contact us with any feedback or questions through GitHub or by email.

- [Dustin](https://github.com/DustinErwin)
- [Ethan](https://github.com/Ewager1)
- [Jesal](https://github.com/JesalDM)
- [Sarah](https://github.com/smanter82/)

## Future_Development

- Track sales data (Ex: How many people have been signed up, how many people have been called, how many calls have resulted in tours/memberships, etc.)
- Track membership costs, gym’s income, employee costs (salaries, etc.)
- Contact form
- Upgrade, Downgrade, Cancel Membership
- Trial Membership coupon codes
- Manager can change class times, add / delete class
- Trainer can change class times

[(Back to Top)](#Description)
