# OS-Project-Docker

## Project Information

This project was developed as part of the Operating Systems (OS) class and was a collaborative effort of the following students:

- 65050033 Krittidet Prajong
- 65050281 Nutnicha Kaewrassamee
- 65050345 Thaksin Chiaokon
- 65050366 Tanapat Deesamoot
- 65050534 Pawichaya Krathumthong

### Tech stacks :

***


**Frontend**
* html, css and js

**Backend**
* NodeJS and express

**Database**
* MongoDB


![SW-Architecture](frontend/src/pic/OS-Architecture.png)
***

## Building the Docker Image

To build the Docker image for this project, open your terminal and navigate to the root directory of the project. Then, run the following command:

```shell
docker build -t my-node-js .

```

## Start the service

To build the Docker image for this project, open your terminal and navigate to the root directory of the project. Then, run the following command:

```shell
docker compose up

```

## Using

1. **Run the Backend Docker Container**: 
   After running the backend Docker container, it will be accessible at `localhost:3000` by default.

2. **Frontend Directory**: 
   To interact with the API, navigate to the "Frontend" directory.

3. **Testing the API**:
   Inside the "Frontend" directory, you will find admin and user pages for testing the API.

