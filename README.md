# React Todo List With NodeJS RESTful API & MongoDB

* To Start, first create a db in mongo and set the connection string in server/mongoose.js
* Start the server then the client, by default the client (React App) runs on port 3000
* A Postman Collection is Included to Test the api
* Run The Seed script in the server to seed the db
* The React app by default assumes user with id 123 is logged in
* The AUTHENABLED variable in the config file determines whether auth middle ware is enabled or not
* Remember to send the connect.sid cookie if AUTHENABLED is true!
