# RESTful WikiAPI for wikiDB

## About Project

The Wiki API is a RESTful API that allows users to manipulate information about a Wiki database. The API supports CRUD (Create, Read, Update, Delete) operations for articles and categories.

## Technologies used

-   Node.js
-   Express.js
-   MongoDB (Mongoose)

## Endpoints

-   `GET /articles` - Get a list of all articles
-   `GET /articles/:articleTitle` - Get a single article by title
-   `POST /articles` - Create a new article
-   `PUT /articles/:articleTitle` - Update an existing article by title (both title and content)
-   `PATCH /articles/:articleTitle` - Update an existing article by title (title or content)
-   `DELETE /articles` - Delete all article
-   `DELETE /articles/:articleTitle` - Delete an article by title
