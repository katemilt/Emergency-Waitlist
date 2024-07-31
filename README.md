# Emergency-Waitlist

## About 
This web application is a hospital triage application service which allows admin users to view their queue of current patients, and add and remove patients from this queue as needed. All patients are given a severity ranking for their injuries (1-10) when they are added to the queue, which determines their priority in the queue. This application also allows patients to login with their full names and a 3-character code, and view their queue positions and estimated wait times. See the admin and patient functionality below (screenshots of all pages can be seen in the docs/design_system directory):
![alt text](docs/design_system/admindb.PNG) ![alt text](docs/design_system/patientdb.PNG)

## How to Open the Application
This application is built with the PERN stack and thus requires you to have Node.js and npm installed on your system. Follow these steps for deployment:
1. Clone the project.
2. Install Node.js and npm on your system if you do not already have them installed.
3. Open the terminal and navigate to the project directory (Emergency-Waitlist).
4. Install all dependencies using the command "npm install".
5. To start the server, you will first have to update the db.js file with your postgres credentials, i.e. change the username and password to your own.
    - You will then need to open up pgAdmin and copy and paste the contents from the "database.sql" file in the database folder into the postgres user database titled postgres (create a database with this name under the postgres user if you do not already have it).
    - You can now start the server using the terminal, navigating to the server folder: Emergency-Waitlist/server and using the command "node index.js".
6. To start the client side of the application open up a separate terminal, navigate to the client folder: Emergency-Waitlist/client and use the command "npm start".
