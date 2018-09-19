import axios from 'axios';

const DB_URL = 'https://ben-web-nc-news.herokuapp.com/api';

export const fetchArticles = () => axios.get(`${DB_URL}/articles`)
  .then(({ data: { articles } }) => articles);

export const fetchArticlesByTopic = topic => axios.get(`${DB_URL}/api/topics/${topic}/articles`)
  .then(({ data: { articles } }) => articles);;

