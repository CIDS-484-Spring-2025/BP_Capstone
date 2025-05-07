# Artist Setlist Aggregator

## Project Overview:

The idea of the **Artist Setlist Aggregator** is to serve as a web application that allows users to search for their favorite musicians and view their **average setlist and other insightful statistics** generated from a given range of recent concerts by working with data from the Setlist.fm API.


This project will venture into the world of full-stack development by integrating a **React frontend**, a **Spring Boot backend**, and a **PostgreSQL database**. It will involve use of multiple programming languages including Java, JavaScript, HTML, CSS and SQL. There will also be a Backend API integration using HTTP methods and JSON parsing to retrieve and process data. Implementation of efficient data flow will be achieved by building a structured data pipeline to process and store statistics.

## Technologies Used:
### Front End-
* React.js Framework
* HTML
* CSS
* Javascript

### Back End-
* Java with Spring Boot
* PostgreSQL Database
* pgAdmin
* Setlist.fm API
* Maven
* Postman
* Node.js
* npm



## Goals:
* Create a user-friendly interface for searching artists.
* Display setlist statistics in more visually appealing manner
* Fetch and process setlist data from the Setlist.fm API into insightful statistics.
* Display setlist statistics (rare songs, variations, guest performers,frequent encores etc).
* Allow users to save searches in a PostgreSQL database.
## Current Progress:
* Set up technology stack on multiple devices for efficient development
* Deployed and tested React frontend and Spring Boot backend
* Verified front-end to back-end connectivity with Postman
* Created a basic user interface for searching artists.
* API-to-database functionality implemented using DTO classes to convert JSON response into structures matching PostgreSQL database.
* Implemented functions for fetching and processing data from Setlist.FM API into an artist's rarest songs and most frequent encores.
* Database set up with table structures defined, implemented.
* Back-end logic mostly complete with database models, controller classes, repositories. Mostly need to expand Service class functionality to include logic for more stats to display on front end.
* Addressed issue of empty setlists being returned and saved to database.
* Added option to let users choose to search stats from artist's last 20 concerts or last 100. (Unfortunately all time stats aren't feasible due to API rate limits)
## Future Timeline:
### -Final Goals
* Improve UI, add features to allow users to sign up for account to save their stats from searches
* Implement more functions to process data from API into additional statistics.
* With back end logic mostly solidified, focus is on front-end user experience and features.

## Videos:
### Milestone 1- https://mediaspace.wisconsin.edu/media/t/1_ytsigy5d
### Milestone 3- https://mediaspace.wisconsin.edu/media/t/1_d3hk4en2
