# Bookstore managing system
This is a simple project for managing a bookstore.
The API allow users to perform CRUD (Create, Read, Update, Delete) operations on books and authors.

## ER Diagram

![App Screenshot](https://i.ibb.co.com/JWtttRJz/Screenshot-2025-04-29-232028.png)


## Setup .env

Create a .env file on your root directory and paste it:
```bash
PORT="Port number"
DB_USERNAME="Your database username"
DB_PASSWORD="Your database password"
DB_HOST="Your database host" (locally it is "localhost")
DB_PORT="Your database port"
DB_DATABASE="Your database name"
JWT_SECRET="Your secret key"
```

## Running command

To run project locally, run the following command

```bash
  npm install
```

```bash
  npx knex migrate:latest --knexfile=./src/DB/knexfile.ts
```

```bash
  npm run dev
```

To build project locally, run the following command

```bash
  npm run build
```

To build build version, run the following command

```bash
  npm run start
```





## Features

- user can create author.
- user can create book.
- user can login.
- user CRUD on author.
- user CRUD on book.

## API
- /authors?filter=name&page=number&limit=number (GET)

- /authors (POST)
  - Data:
   ```
    {
        "name": "Jane Austen",
        "bio": "English novelist known for her six major novels.",
        "birthdate": "1775-12-30"
    }
- /authors/:id (GET)

- /authors/:id (PUT)
    - Data
    ```
    {
        "Field": "Value"
    }   
- /authors/:id (DELETE)

- /books?author=id&filter=title&page=number&limit=number (GET) 

- /books/:id (GET) 

- /books (POST) 
  - Data
  ```
    {
        "title": "Pride and Prejudice",
        "description": "A romantic novel that explores manners, upbringing, morality, education, and marriage in early 19th-century England.",
        "published_date": "1813-01-22",
        "author_id": 1
    }
  ```
- /books/:id (DELETE)    

- /login (POST)
  - Data
  ```
    {
        "name": "Jane Austen"
    }
  ```



