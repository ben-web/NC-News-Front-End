# Ben Web's NC News

## Front End React App

NC News is a news aggregation client demo built in React.js by myself during week nine of the Northcoders' Full Stack Developer Course.

This project aims to demonstrates some of the skills I've learnt in three weeks of front end study, mostly dedicated to React subjects including:

* React DOM
* React Lifecycle
* React Routing
* Optimistic Rendering
* Error Handling

This front end application interacts with the back end RESTful API I created during week six of the course. Details of the API may be found on Github: [github.com/ben-web/BE2-northcoders-news](https://github.com/ben-web/BE2-northcoders-news).

## Using NC News

A working example of this NC News demo is published at [ben-web-nc-news-fe.herokuapp.com](https://ben-web-nc-news-fe.herokuapp.com/).

Heroku free hosting can be a little slow to start so please allow for this when starting the application.

### Functionality

For demonstration purposes, you will be signed into the application as user *Jess Jelly.* Should you wish to view any page as an annonymous user, select the *Sign Out* navigation item.

#### Home and Topic Routes

On loading, the demo requests a list of topics and articles from the API. Topics are passed to the Navigation component in order to generate the menu.

The home and topic pages use the same Articles component to display a summary of all articles, or articles by topic, based on the supplied route.

* Articles may be sorted by
  * date
  * vote count
  * comment count
* Authorised users may vote articles up or down

#### Individual Article Routes

The article component requests and displays an article based on the supplied route. It displays:

* the full article
* associated meta data:
  * author
  * publication date
  * image
  * topic
  * vote and comment counts
* comments associated with the article

Authorised users may: 

* vote the article up or down
* vote comments up or down
* publish comments on the article
* delete their own comments

#### New Article Page

This component allows an authorised user to publish a new article. 

After submitting, the user is redirected to the published article.

#### Errors

==Bad route erros will results in the relevant 400/404 page==

## Installing a Local Copy

These instructions will help you to get a copy of NC News up and running on your local machine for development and testing purposes.

### Prerequisites

Before installing this project, ensure you have this software installed:

* [Node.js](https://nodejs.org/en/download/)
* A code editor such as [VS Code](https://code.visualstudio.com/download) or [Atom](https://flight-manual.atom.io/getting-started/sections/installing-atom/)

### Installing

Duplicate or fork this repository from ~~[github.com/ben-web/FE2-NC-News](https://github.com/ben-web/FE2-NC-News)~~.

In your CLI, run the commands:

```bash
git clone <GIT_REPO_URL>
```

Inside this new directory, install the required NPM packages:

```bash
npm install
```

### Run the application

To start the application, run this command in the CLI:

```bash
npm run start
```

If successful, your browser should open at [http://localhost:3000](http://localhost:3000).

## Built With

* [Node.js](https://nodejs.org/) - JavaScript runtime built on [Chrome's V8 JavaScript engine](https://developers.google.com/v8/)
* [React.js](https://reactjs.org/) - Facebook's JavaScript library for building user interfaces
* [Axios](https://www.npmjs.com/package/axios) - A promised based HTTP client (alternative to Fetch)
* [Reactstrap](https://reactstrap.github.io/) - A Bootstrap 4 wrapper for React

## Author

* **Ben Web** - *Northcoders Student* - [northcoders.com](https://northcoders.com)

## Acknowledgments

* Northcoders
* Google
* Stack Overflow
