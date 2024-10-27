A real-time comments system built using Express, Socket.IO, and MySQL. This application allows users to log in and post comments, which are then broadcast to all connected clients in real-time.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [MySQL](https://www.mysql.com/) (version 5.7 or higher)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/comments-system.git
   cd comments-system

2. **Install dependencies:**

**Goto backend directory :**

    ```bash
    cd backend
    npm install 

**open another terminal and goto frontend directory :**
    ```bash 
    cd frontend
    npm install


## Database Setup   

1. **Create a MySQL database:**

    Open your MySQL client (e.g., phpMyAdmin, MySQL Workbench, or terminal).
    Create a database named comments_system.

2. **Create the comments table:**

    ```sql
    CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

3. **Configure database credentials:**

    In the server code, ensure the database connection settings are correct (located in the index.js file):

    const databaseConnection = mysqlLib.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword', // Change to your MySQL password
    database: 'comments_system',
    });

## Running the Project

1. **Start the server:**

    ```bash
    node server.js

2. **Access the application:**

    Open your web browser and navigate to http://localhost:5000 to interact with the comments system.

3. **Start the nextjs server **
    ```bash
    npm run dev

4. **Access the application:**
     Open your web browser and navigate to http://localhost:3000 to interact with the main website.
