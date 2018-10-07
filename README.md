# Ben Web's NC News

## Front End React App

NC News is a news aggregation client demo I built in React.js during week nine of the Northcoders' Full Stack Developer Course.

This project aims to demonstrate some of the skills I've learnt in three weeks of front end study, mostly dedicated to React subjects including:

* React DOM
* React Lifecycle
* React Routing
* Optimistic Rendering
* Error Handling

This front end application interacts with the back end RESTful API I created during week six of the course. Details of the API may be found on Github: [github.com/ben-web/NC-News-Back-End](https://github.com/ben-web/NC-News-Back-End).

## Using NC News

A working example of this NC News demo is published at [ben-web-nc-news.herokuapp.com](https://ben-web-nc-news.herokuapp.com).

Heroku free hosting can be a little slow to start so please allow for this when starting the application.

### Functionality

For demonstration purposes, you will be signed into the application as user *Jess Jelly.* Should you wish to view any page as an anonymous user, select the *Sign Out* navigation item.

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

Bad route errors will results in the relevant 400/404 page.

Avatar images are hosted externally and some URLs are out of date. The Avatar component included an onError event handle that will replace missing images with a default avatar.

## Installing a Local Copy

These instructions will help you to get a copy of NC News up and running on your local machine for testing purposes.

### Installing

Please ensure you have [Node.js](https://nodejs.org/en/download/) installed.

Duplicate or fork this repository from [github.com/ben-web/NC-News-Front-End](https://github.com/ben-web/NC-News-Front-End).

Inside this new directory, install the required NPM packages:

```bash
npm install
```

### Run the application

To start the application, run this command in the CLI:

```bash
npm run start
```

If successful, your browser should open [http://localhost:3000](http://localhost:3000).

## Built With

* [Node.js](https://nodejs.org/) - JavaScript runtime built on [Chrome's V8 JavaScript engine](https://developers.google.com/v8/)
* [React.js](https://reactjs.org/) - Facebook's JavaScript library for building user interfaces
* [Axios](https://www.npmjs.com/package/axios) - A promised based HTTP client (alternative to Fetch)
* [Reactstrap](https://reactstrap.github.io/) - A Bootstrap 4 wrapper for React

## Author

* **Ben Web** - *Northcoders Student* - [northcoders.com](https://northcoders.com)
