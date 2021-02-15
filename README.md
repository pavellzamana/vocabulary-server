# Vocabulary-server

Node.JS server for online vocabulary.
Supports authorization and CRUD operations with vocabulary words from database

Client can be found here: https://github.com/pavellzamana/vocabulary-client

Project contains docker-compose file to deploy postgreSQL database. 
All db records created are saved after session closure.
Run `docker-compose up` in terminal to deploy it
UI can be viewed on localhost:8080

run `npm run dev` to launch in development mode