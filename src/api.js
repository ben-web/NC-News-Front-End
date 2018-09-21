import axios from 'axios';

const DB_URL = 'https://ben-web-nc-news.herokuapp.com/api';

const addErrorHandler = (func) => {
  return function (...args) {
    return func(...args)
      .catch(({ response }) => {
        const error = {
          errorCode: response.status,
          errorMessage: response.data.message
        };
        return { error };
      })
  }
}

export const fetchArticle =
  addErrorHandler(
    articleId => axios
      .get(`${DB_URL}/articles/${articleId}`)
      .then(({ data: { article } }) => ({ article }))
  );

export const fetchArticles =
  addErrorHandler(
    () => axios
      .get(`${DB_URL}/articles`)
      .then(({ data: { articles } }) => ({ articles }))
  );

export const fetchArticlesByTopic =
  addErrorHandler(
    topicSlug => axios
      .get(`${DB_URL}/topics/${topicSlug}/articles`)
      .then(({ data: { articles } }) => ({ articles }))
  );

export const fetchCommentsByArticleId =
  addErrorHandler(
    articleId => axios
      .get(`${DB_URL}/articles/${articleId}/comments`)
      .then(({ data: { comments } }) => ({ comments }))
  );

export const fetchTopics =
  addErrorHandler(
    () => axios.get(`${DB_URL}/topics`)
      .then(({ data: { topics } }) => ({ topics }))
  );

