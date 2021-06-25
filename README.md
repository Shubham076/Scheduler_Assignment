## Getting Started

* Make sure you have `node` and `git` installed in your system. If not you can install the same from their official websites.
* Clone the repo. Open terminal and type  `git clone https://github.com/Shubham076/Scheduler_Assignment.git`
* After cloning go inside the folder using the command `cd Scheduler_Assignmnet`

### Steps for starting the frontend server

* Go to client folder using command `cd client`
* Install the dependencies using `npm install`
* Open the file `client/src/server.js` and change the baseURL to `http://localhost:4000`
* Now start the server for the client using the command `npm start`

### Steps for starting the backend server

* Make sure you have `MySql server` installed in your machine. If not then you can download the same from the official website of MySql or you can use the remote version of any cloud providers.
* Open new terminal (do not close the prevoius terminal) and go to server inside `Scheduler_Assignmnet`
* Install the dependencies using `npm install`
* Create a `.env` file in the path `server/.env`

#### Structure of the .env file

* DB_USER_LOCAL = val
* DB_PASSWORD_LOCAL = val
* DB_HOST_PROD = val
* DB_PORT_PROD = val
* DB_PASSWORD_PROD = val
* DB_USER_PROD = val
* DB_NAME_PROD = val
* After creating the .env file open the package.json file `server/package.json` and change the val for NODE_ENV to `prod `for using the production db(cloud db) or dev for using the local db.
* After completing the above steps type `npm start` in terminal to start the server.


### Now open the browser and visit `localhost:3000` to view the app :)
### View the project [here](class-scheduler.surge.sh)
