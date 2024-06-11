To run the project, you'll need to set up both the frontend and the backend.

Backend:

Step 1: Run the Backend Server

1. Navigate to the backend folder:
` cd task-management-app/backend`

2. Install dependencies:
` npm install`

3. Create a .env file in the backend folder and add your environment variables:
` MONGO_URI=your_mongodb_connection_string `
` JWT_SECRET=your_jwt_secret`

4. Start the server:
` npm run server`
This should start your Express server on the specified port (default is 5000).

Step 2: Test in Postman

1. Open Postman and create a new collection for your API.

2. User Authentication:

 -Sign Up:

    URL: POST http://localhost:5000/api/auth/signup
    Body (JSON)
    ```
    {
        "username": "testuser",
        "password": "testpassword"
    }
    ````

-Log In:

    URL: POST http://localhost:5000/api/auth/login
    Body (JSON)
    ```
    {
        "username": "testuser",
        "password": "testpassword"
    }
    ```
-Response:
    -You should receive a JSON response with a JWT token, which you'll use for authenticated requests.

3. Task Management:

 - Create Task:

    - URL: POST http://localhost:5000/api/tasks
    - Headers:
        - Authorization: Bearer <your_jwt_token>
    - Body (JSON):
    ```
    {
        "title": "Test Task",
        "description": "This is a test task",
        "deadline": "2023-12-31",
        "priority": "high",
        "tags": ["test", "example"]
    }
    ```
  - Get All Tasks:

    - URL: GET http://localhost:5000/api/tasks
    - Headers:
        - Authorization: Bearer <your_jwt_token>

 - Update Task:

    - URL: PUT http://localhost:5000/api/tasks/{taskId}
    - Headers:
        - Authorization: Bearer <your_jwt_token>
    - Body (JSON)
    ```
    {
        "title": "Updated Task",
        "description": "This task has been updated",
        "deadline": "2023-12-31",
        "priority": "medium",
        "status": "completed",
        "tags": ["updated", "task"]
    }
    ```
- Delete Task:

    - URL: DELETE http://localhost:5000/api/tasks/{taskId}
    - Headers:
        - Authorization: Bearer <your_jwt_token>

- Search Tasks:

    - URL: GET http://localhost:5000/api/tasks/search?query=test
    - Headers:
        - Authorization: Bearer <your_jwt_token>

Frontend:
1. Install dependencies: 
    - Navigate to your frontend directory where package.json is located and run:
    ` npm install`

2. Run the development server: 
    - After installing dependencies, you can start the development server by running:
    ` npm start`

3. Open http://localhost:3000 in your browser to view the app.
