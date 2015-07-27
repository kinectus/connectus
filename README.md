# Connectus

## About
Connectus is a peer to peer energy sales platform integrated with registered smart meters to monitor and control energy use. Coming this week, [econnectus.co](http://www.econnectus.co/) will run an app demo and contain further information.

## Tech Stack
- Front End
  - React with Flux -- Utilizes unidirectional data flow for a scalable app
  - Bootstrap and Less -- Rapid styling and development
- Back End
  - MySql with Bookshelf.js -- Allows a complex relationship structure for user and meter information and their corresponding reservations
  - Socket.io -- Implements real-time data transfer between Modlet and the front end

## App Structure Notes
  - Flux utilizes [unidirectional data flow](https://facebook.github.io/flux/docs/overview.html) using Actions, Dispatchers, Stores and Views for efficient DOM manipulation
  - There are two servers, the server and the powerServer. The server interfaces with the database and the powerServer maintains communication with hardware.
  - Database structure and relationships: ![Schema and relationships](./client/assets/img/database.png)

## Development
- __Web App__
  - Fork the repo.
  - Clone from your fork
  - npm install
  - bower install
  - gulp
- __Database__
  - [Install mysql](https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html) (or brew install mysql) and start the mysql service with ``mysql.server start``
- __Hardware__
  - Connectus uses the [Modlet TE1010](http://shop.thinkecoinc.com/products/home-starter-kit#.VbZw6xNVikp) smart meter from ThinkEco, Inc. as a prototype for monitoring and controling energy use
  - To interface with the Modlet, use mcolyer's [hacklet program](https://github.com/mcolyer/hacklet) and follow instructions for integration
  - Turn on the Modlet and type "hacklet commission" into the terminal

## Team
Product Owners: Sean Connor, Valerie Liang  
Scrum Masters: Jammie Mountz, Dianna Faulk