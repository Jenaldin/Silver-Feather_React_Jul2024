# Silver Feather Tavern by Jenny Guteva
The Silver Feather Tavern is initially designed as a React Exam Project for SoftUni's August 2024 examination session. However, with the author's evolving commitments and availability, it holds the potential to blossom into a passion project, having additional features in the future (most of them already planned). 

There are parts of this project (Character creation) that took too long due to their complexity. That in combination of the approaching deadline for the exam, they were left to be included in version 2.0. This project now contains MVP 1.0. 

The idea behind the Silver Feather Tavern is to present users, who love pen&paper roleplaying games, with an app that helps them manage their characters, campaigns, sessions. Also to present them the opportunity to meet new people with whom to play via announcing their willingness to do so in the form of posts and comments to those posts. It is inspired by other well known applications like Roll20, D&D Beyond (web) and Fantasy Grounds (desktop). The future development would include implementation of the Dungeons & Dragons 5th Edition OGL version, but if possible other systems too, to present options for a bigger community.

App can be also found deployed here: (WIP, coming soon...)

## Project Overview
The App is currently in the development phase, with no production options included. It utilizes MongoDB as its database (mongodb://127.0.0.1:27017/).
Frontend operates on http://localhost:5173/ and incorporates : | Backend runs on http://localhost:3000/ and employs:
---------------------------------------------------------------|----------------------------------------------------
React, Vite, JavaScript | Express, Mongoose
Material UI, HTML, CSS | BCrypt, Cookie-parser, JSON Web Token, dotenv
(For more details, please refer to ```/client/package.json```) | (For more details, please refer to ```/server/package.json```)

## Installation Guide
### Prerequisites
- Node.js
- MongoDB

### Setup Instructions
1. Download or clone the repository.
The application uses ‘concurrently’.
<<***Option 1***>>
2. Run `npm run magic` to install all dependencies and start the client and server.
<<***Option 3***>>
Run install and start separately with ‘concurrently’.
2. Run `npm run install-all` to install all the necessary dependencies from `package.json` files for the project (root, server & client). 
3. Run `npm run start-all` to start both the frontend and backend simultaneously.
<<***Option 3***>>
Skip ‘concurrently’ altogether and do separate install and run/start for the /client and /server
2. Run `npm install` in /client for the frontend and then in the /server for the backend. 
3. Run separately `npm run dev` in /client for the frontend and `npm start` in /server for the backend.

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

### REST API Endpoints
Base URL is http://localhost:3000/api.
***Note:*** In the table below, “Ownership” indicates that the user is already logged in. Therefore, where “Ownership” is required, “Logged in” is marked with **-** and vice versa (if “Logged in” is required, but “Ownership” is not, the latter is marked with **-**).

Endpoint | HTTP Method | Description | Accessible to Guests (Y/N)? | Accessible when Logged in (Y/N)? | Requires Item Ownership (Y/N)?
---------|:-----------:|-------------|:---------------------------:|:--------------------------------:|:----------------------------:
/campaign/:userId | GET | Retrieves all campaigns owned by the user | :x: | :heavy_check_mark: | **-**
/campaign/details/:campaignId | GET | Retrieves the details of a campaign | :x: | :heavy_check_mark: | **-**
/campaign/create | POST | Creates a new campaign | :x: | :heavy_check_mark: | **-**
/campaign/edit/:campaignId | PUT | Updates/Edits details of a campaign| :x: | **-** | :heavy_check_mark:
/campaign/delete/:campaignId | DELETE | Deletes a campaign | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/session/:campaignId | GET | Retrieves all sessions associated with a campaign | :x: | :heavy_check_mark: | **-**
/session/details/:sessionId | GET | Retrieves the details of a session (no front end display) | :x: | :heavy_check_mark: | **-**
/session/create | POST | Creates a new session | :x: | :heavy_check_mark: | **-**
/session/edit/:sessionId | PUT | Updates/Edits details of a session| :x: | **-** | :heavy_check_mark:
/session/delete/:sessionId | DELETE | Deletes a session | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/posts/ | GET | Retrieves all posts | :heavy_check_mark: | :heavy_check_mark: | **-**
/posts/details/:postId | GET | Retrieves the details of a post | :heavy_check_mark: | :heavy_check_mark: | **-**
/posts/create | POST | Creates a new post | :x: | :heavy_check_mark: | **-**
/posts/edit/:postId | PUT | Updates/Edits details of a post | :x: | **-** | :heavy_check_mark:
/posts/delete/:postId | DELETE | Deletes a post | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/comment/:postId | GET | Retrieves all comments associated with a post | :heavy_check_mark: | :heavy_check_mark: | **-**
/comment/new | POST | Creates a new comments | :x: | :heavy_check_mark: | **-**
/comment/:commentId | DELETE | Deletes a comments | :x: | **-** | :heavy_check_mark:
\~~~ | ~~~ | ~~~ | ~~~ | ~~~ | ~~~
/user/register | POST | Creates a new user | :heavy_check_mark: | :x: | **-**
/user/login | POST | Logs in as an existing user | :heavy_check_mark: | :x: | **-**
/user/logout | GET | Logs out an existing user | :x: | :heavy_check_mark: | **-**

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
  
