# VERSION 0.1 (DRAFT README)
# Silver Feather Tavern by Jenny Guteva
The Book Corner is initially designed as an Angular Exam Project for SoftUni's April 2024 examination session. However, with the author's evolving commitments and availability, it holds the potential to blossom into a passion project, having additional features in the future.

The essence of The Book Corner lies in its ability to foster a virtual, blog-like space for small communities - be it a neighborhood or any small group of individuals. It serves as a platform where book enthusiasts can lend and borrow books, fostering a culture of shared reading experiences. This process involves no financial transactions and operates purely on mutual agreements. The primary objective is to cultivate stronger community bonds, facilitate better understanding among members, and indulge in a shared hobby. It's a solution for those who love books but are constrained by space at home for book storage.

App can be also found deployed here: 

## Project Overview
The App is currently in the development phase, with no production options included. It utilizes MongoDB as its database (mongodb://127.0.0.1:27017/).
Frontend operates on http://localhost:5173/ and incorporates : | Backend runs on http://localhost:3000/ and employs:
---------------------------------------------------------------|----------------------------------------------------
React, Vite, JavaScript | Express, Mongoose
MUI, HTML, CSS | BCrypt, Cookie-parser, JSON Web Token, dotenv
(For more details, please refer to ```/client/package.json```) | (For more details, please refer to ```/server/package.json```)

## Installation Guide
### Prerequisites
- Vite (React)
- Node.js
- MongoDB

### Setup Instructions
1. Download or clone the repository.
2. Run `npm run install-all` to install all the necessary dependencies from `package.json` files for the project (root, server & client).
3. The application uses ‘concurrently’. To start both the frontend and backend simultaneously, run `npm run start-all`. Alternatively, run separately `ng serve` in /client for the frontend and `npm start` in /server for the backend.

## Usage
### From an End User Perspective
(*Note* all Character related functionality is delayed for version 2.0)
- As a ***guest user***, you can:
   - Access the home, posts board (Adventurers Guild Board), about, login, and register pages;
   - View the posts (Quests) and comments (Reply Notes) of the post board (Adventurers Guild Board);
   - If you attempt to access a non-existent location, you will be redirected to /not-found;
   - If you try to access a page for which you lack authorization, you will be redirected to the login page;
- As an ***authenticated user***, you can:
   - Access the home, posts board (Adventurers Guild Board), personal section (User's Board), about, and have the option to logout;
   - View the posts (Quests) and comments (Reply Notes) of the post board (Adventurers Guild Board), view the Players Vault (character creation section) and Dungeon Master's Layer (campaign and sessions creation section) of the personal section (User's Board);
   - Add a new post (Quest) from the post board (Adventurers Guild Board) page, choosing if you are posting it for a Campaign or Character (*Note* all Character related functionality is delayed for version 2.0);
   - If you’re the owner of a post (Quest), edit or delete it from its details page;
   - View the comments (Reply Notes) section of a post (Quest) from its details page;
   - Create a new comment (Reply Note), edit or delete your comment (Reply Note) from the comments (Reply Notes) section;
   - View your profile and modify some of its content - your avatar, your first and last name, your email, add “about me” information, see which books you own and which books you have requested;
   - If you attempt to access a non-existent location, you will be redirected to /not-found;
   - If you try to access a page for which you lack authorization, you will receive a notification and be redirected to the home page;
   - If you access a page, that is planned for version 2.0 of the app, you will see a notification page for that.

### REST API Endpoints (WIP)
Base URL is http://localhost:3000/api.
***Note:*** In the table below, “Ownership” indicates that the user is already logged in. Therefore, where “Ownership” is required, “Logged in” is marked with **-** and vice versa (if “Logged in” is required, but “Ownership” is not, the latter is marked with **-**).

Endpoint | HTTP Method | Description | Accessible to Guests (Y/N)? | Accessible when Logged in (Y/N)? | Requires Item Ownership (Y/N)?
---------|:-----------:|-------------|:---------------------------:|:--------------------------------:|:----------------------------:
/catalog | GET | Retrieves all book items | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog | POST | Creates a new book item | :x: | :heavy_check_mark: | **-**
/catalog/latest | GET | Retrieves the latest 5 book items | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/search | GET | Retrieves search results | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/:bookId | GET | Retrieves details of a book item | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/:bookId | PUT | Updates/Edits details of a book item | :x: | **-** | :heavy_check_mark:
/catalog/:bookId | DELETE | Deletes a book item | :x: | **-** | :heavy_check_mark:
/catalog/requestSub/:bookId | PUT | Subscribes to a book item (Request to read it) | :x: | :heavy_check_mark: | **-**
/catalog/cancelSub/:bookId | PUT | Unsubscribes from a book item (Cancel request to read it) | :x: | :heavy_check_mark: | **-**
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/user/register | POST | Creates a new user item | :heavy_check_mark: | :x: | **-**
/user/login | POST | Logs in as an existing user | :heavy_check_mark: | :x: | **-**
/user/logout | POST | Logs out an existing user | :x: | :heavy_check_mark: | **-**
/user/profile/:userId | GET | Retrieves a user profile | :x: | :heavy_check_mark: | **-**
/user/my-profile/:userId | GET | Retrieves your profile | :x: | **-** | :heavy_check_mark:
/user/my-profile/:userId | PUT | Updates/Edits your profile | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/comment | GET | Retrieves all comment items associated with a book item | :x: | :heavy_check_mark: | **-**
/comment/new | POST | Creates a new comment item | :x: | :heavy_check_mark: | **-**
/comment/:commentId | PUT | Updates/Edits the content of a comment item | :x: | **-** | :heavy_check_mark:
/comment/:commentId | DELETE | Deletes a comment item | :x: | **-** | :heavy_check_mark:
/comment/voteYes/:commentId | PUT | Votes for a comment item with "yes" (useful) | :x: | :heavy_check_mark: | **-**
/comment/voteNo/:commentId | PUT | Votes for a comment item with "no" (not useful) | :x: | :heavy_check_mark: | **-**

### Project structure
Here is a ***high-level*** overview of the project's structure as folders:
- client
  - public
    - images
    - styles
  - src
    - api
    - components
      - about
      - campaign
        - session
      - character
      - common
      - header
      - home
      - login
      - logout
      - not-found
      - post
        - comment
      - profile
      - register
    - context
    - hooks
    - utils
    
- server
  - controllers
  - middlewares
  - models
  - router
  - schemas
  - services
  - utils
  
