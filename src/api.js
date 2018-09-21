import axios from 'axios';

const DB_URL = 'https://ben-web-nc-news.herokuapp.com/api';

export const fetchArticle = articleId => axios.get(`${DB_URL}/articles/${articleId}`)
  .then(({ data: { article } }) => article);

export const fetchArticles = () => axios.get(`${DB_URL}/articles`)
  .then(({ data: { articles } }) => articles);

export const fetchArticlesByTopic = topicSlug => axios.get(`${DB_URL}/topics/${topicSlug}/articles`)
  .then(({ data: { articles } }) => articles);

export const fetchCommentsByArticleId = articleId => axios
  .get(`${DB_URL}/articles/${articleId}/comments`)
  .then(({ data: { comments } }) => comments);

export const fetchTopics = () => axios.get(`${DB_URL}/topics`)
  .then(({ data: { topics } }) => topics);

