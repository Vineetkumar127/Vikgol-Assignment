# Vikgol-Assignment\

Create a web application for book inventory management. Imagine you are managing a
bookstore and need to keep track of inventory (i.e.,number of copies) you have on every book.
On the backend, you need to keep track of books (along with their respective ID from Google
Book API) and their inventory count. When a book stock goes to zero, it is considered out of
stock.
Build a web portal, where users can login and can register their stores.

Here are the features of the portal,

List of all stores for the user

List out all the books in inventory inside the store.

Make changes to inventory:

Add a new book.

Update inventory for an existing book.

Remove from the inventory.


Approach: 
 With the help of the command “npm init”, package.json is created it contains metadata about the project like name(project name), version, description, main, and dependencies.
We installed dependencies that help our site be fast and scalable. 
Installing dependencies by command “npm i <package name>” which are    :-express,mongoose,json web token,nodemon 
 We created the main file which is the index.js file, In this file first, we import the express(which is a framework of Node.js), body-parser, route(where we written APIs),
Then we create an app variable where we store express function. Due to this, we make the path of the route through .use() and run the PORT through .listen(). And we connected this project to the database with .connect() to CRUD operation. 
