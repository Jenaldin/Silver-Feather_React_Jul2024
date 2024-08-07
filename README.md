# VERSION 0.1 (DRAFT README)
# Silver Feather Tavern by Jenny Guteva
The Silver Feather Tavern is initially designed as a React Exam Project for SoftUni's August 2024 examination session. However, with the author's evolving commitments and availability, it holds the potential to blossom into a passion project, having additional features in the future (most of them already planned). 

There are parts of this project (Character creation) that took too long due to their complexity. That in combination of the approaching deadline for the exam, they were left to be included in version 2.0. This project now contains MVP 1.0. 

The idea behind the Silver Feather Tavern is to present users, who love pen&paper roleplaying games, with an app that helps them manage their characters, campaigns, sessions. Also to present them the opportunity to meet new people with whom to play via announcing their willingness to do so in the form of posts and comments to those posts. It is inspired by other well known applications like Roll20, D&D Beyond (web) and Fantasy Grounds (desktop). The future development would include implementation of the Dungeons & Dragons 5th Edition OGL version, but if possible other systems too, to present options for a bigger community.

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
- Node.js
- MongoDB

### Setup Instructions (WIP)
1. Download or clone the repository.
2. Run `npm run install-all` to install all the necessary dependencies from `package.json` files for the project (root, server & client).
3. The application uses ‘concurrently’. To start both the frontend and backend simultaneously, run `npm run start-all`. Alternatively, run separately `ng serve` in /client for the frontend and `npm start` in /server for the backend.

## Usage
### From an End User Perspective
(***IMPORTANT NOTE*** all Character related functionality described below is delayed until version 2.0 of the app)
- As a ***guest user***, you can:
   - Access the home, posts board (Adventurers Guild Board), about, login, and register pages;
   - View the posts (Quests) of the post board (Adventurers Guild Board);
   - View the comments (Replies) section of a post (Quest) from its details page;
   - If you attempt to access a non-existent location, you will be redirected to /not-found;
   - If you try to access a page for which you lack authorization, you will be redirected to the login page;
- As an ***authenticated user***, you can:
   - Access the home, posts board (Adventurers Guild Board), personal section (User's Board), about, and have the option to logout;
   - View the posts (Quests) of the post board (Adventurers Guild Board);
   - Add a new post (Quest) from the post board (Adventurers Guild Board) page, choosing if you are posting it for a Campaign or Character and linking the post (Quest) to a specific Campaign or Character, if they are marked as Public (visible to others);
   - View characters and campaigns announced in a post (Quest);
   - If you’re the owner of a post (Quest), edit or delete it from its details page;
   - View the comments (Replies) section of a post (Quest) from its details page;
   - Create a new comment (Reply Note) or delete your comment (Reply Note) from the comments (Replies) section;
   - View the personal section (User's Board) and from there the character catalog (Players Vault) and campaign catalog (Dungeon Master's Layer);
   - Create a new character in the character catalog (Players Vault). Edit or delete it from its details page;
   - Create a new campaign in the campaign catalog (Dungeon Master's Layer). Edit or delete it from its details page;
   - View the sessions list related to a campaign from its details page;
   - Create a new sessions in the details page of a campaign.
   - View the sessions details, expanding the sessions list entry for a certain session. Edit or delete it from there;
   - If you attempt to access a non-existent location, you will be redirected to /not-found;
   - If you try to access a page for which you lack authorization, you will be redirected to the home page;
   - If you access a page, that is planned for version 2.0 of the app, you will see a notification page for that.

### REST API Endpoints (WIP)
Base URL is http://localhost:3000/api.
***Note:*** In the table below, “Ownership” indicates that the user is already logged in. Therefore, where “Ownership” is required, “Logged in” is marked with **-** and vice versa (if “Logged in” is required, but “Ownership” is not, the latter is marked with **-**).

Endpoint | HTTP Method | Description | Accessible to Guests (Y/N)? | Accessible when Logged in (Y/N)? | Requires Item Ownership (Y/N)?
---------|:-----------:|-------------|:---------------------------:|:--------------------------------:|:----------------------------:
/catalog | GET | Retrieves all book items | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog | POST | Creates a new book item | :x: | :heavy_check_mark: | **-**
/catalog/latest | GET | Retrieves the latest 5 book items | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/:bookId | GET | Retrieves details of a book item | :heavy_check_mark: | :heavy_check_mark: | **-**
/catalog/:bookId | PUT | Updates/Edits details of a book item | :x: | **-** | :heavy_check_mark:
/catalog/:bookId | DELETE | Deletes a book item | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/user/register | POST | Creates a new user item | :heavy_check_mark: | :x: | **-**
/user/login | POST | Logs in as an existing user | :heavy_check_mark: | :x: | **-**
/user/logout | POST | Logs out an existing user | :x: | :heavy_check_mark: | **-**
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/comment | GET | Retrieves all comment items associated with a book item | :x: | :heavy_check_mark: | **-**
/comment/new | POST | Creates a new comment item | :x: | :heavy_check_mark: | **-**
/comment/:commentId | DELETE | Deletes a comment item | :x: | **-** | :heavy_check_mark:

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
  
