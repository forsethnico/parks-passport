#  🏕 National Park Tracker 🏔

## Table of Contents
- [Introduction](#introduction)
- [Links](#links)
- [Learning Goals](#learning-goals)
- [Features](#features)
- [Setup](#setup)
- [Future Additions](#future-additions)
- [Technologies](#technologies)
- [Contributors](#contributors)

## Introduction
National Park Tracker is an app designed to keep track of which national parks a user has visited by adding the date they visited and a stamp to their parks passport. I have a life goal to visit every national park and so far I am at 35 parks visited! This app will help me keep them all straight! Happy travels!

## Links
- [Project spec](https://frontend.turing.edu/projects/module-3/showcase.html)
- [Project Board](https://github.com/users/forsethnico/projects/5)
- [WireFrame](https://www.figma.com/file/lhYQSrR9maGm93H9qOGR26/Untitled?node-id=7%3A6)
- [Deployed Project]()

## Learning Goals 
- Find an API of our choice and create a multi page React app to showcase mastery of React, Router, asynchronous JavaScript, and end to end testing with Cypress.
- Create an app that is fully mobile responsive.
- Have fun and create something I'm passionate about! I love going to national parks. 

## Features
When the national park traveler visits the homepage of the app, the user must enter a search query for either national park or state, or other keyword of interest to them. Search results appear as park cards with photos and name of park. 

![National Parks_Homepage]

A user can click on the park to be taken to an info page. They can then select the date they visited and click "Add to Passport" to stamp their passport. 

![Park Info Page]

The title 'National Park Tracker' is used as a link back to the homepage and the user is able to click on the Passport book to go to the 'Passport' page where they can view their collected stamps with name and date visited.

![Passport Page]

## Setup
1. Fork this repo - on the top right corner of this page, click the **Fork** button. 
2. Clone down the forked repo. To rename your project you can use an optional argument when you run git clone (you replace the [...] with the terminal command arguments): `git clone [remote-address] [what you want to name the repo]`
3. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` to install project dependencies.
4. Run `npm start` in the terminal to see the page running in your browser on `http://localhost:3000/`. `Control + C` is the command to stop running the local server.  Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This command is not specific to Webpack; make note of it for future use. 
7. Enjoy!

## Future Additions
- Add delete stamps option in case user adds a stamp by accident or with an incorrect date.
- Add additional info to the park info page.
- Add additional images/styling for "loading" and other error handling.

## Technologies
This project used TypeScript, React, React Router, CSS. Cypress Testing was also used. Additional technologies learned specifically for this project included media queries for mobile responsivenss and making network requests to fetch information from an API of our choosing. 

## Contributors
This solo project was built by [Nicole Forseth](https://github.com/forsethnico) at Turing School of Software and Design. 
