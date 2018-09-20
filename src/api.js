import axios from 'axios';

const DB_URL = 'https://ben-web-nc-news.herokuapp.com/api';

export const fetchArticles = () => axios.get(`${DB_URL}/articles`)
  .then(({ data: { articles } }) => articles);

export const fetchArticlesByTopic = topicSlug => axios.get(`${DB_URL}/topics/${topicSlug}/articles`)
  .then(({ data: { articles } }) => articles);

