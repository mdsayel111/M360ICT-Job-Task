-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  birthdate DATE NOT NULL
);

-- Create books table with foreign key reference to authors
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  published_date DATE NOT NULL,
  author_id INTEGER NOT NULL,
  CONSTRAINT fk_author
    FOREIGN KEY(author_id)
    REFERENCES authors(id)
    ON DELETE CASCADE
);
