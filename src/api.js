import axios from 'axios';

const DB_URL = 'https://ben-web-nc-news.herokuapp.com/api';

const addErrorHandler = (func) => {
  return function (...args) {
    return func(...args)
      .catch(({ response }) => {
        const error = {
          errorCode: (response) ? response.status : 999,
          errorMessage: (response) ? response.data.message : 'No Response / Network Error'
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
    (articleId) => axios
      .get(`${DB_URL}/topics`)
      .then(({ data: { topics } }) => ({ topics }))
  );

export const deleteComment =
  addErrorHandler(
    commentId => axios
      .delete(`${DB_URL}/comments/${commentId}`)
      .then(({ data: { comment } }) => ({ comment }))
  );

export const postArticle =
  addErrorHandler(
    (body, title, topicSlug, userId) => axios
      .post(`${DB_URL}/topics/${topicSlug}/articles`,
        {
          title,
          body,
          created_by: userId
        })
      .then(({ data: { article } }) => ({ article }))
  );

export const postComment =
  addErrorHandler(
    (articleId, body, userId) => axios
      .post(`${DB_URL}/articles/${articleId}/comments`,
        {
          body,
          created_by: userId
        })
      .then(({ data: { comment } }) => ({ comment }))
  );

export const VoteArticle =
  (articleId, direction) => axios
    .patch(`${DB_URL}/articles/${articleId}?vote=${direction}`)
    .then(({ data: { article } }) => ({ article }))
    .catch(console.log);

export const VoteComment =
  (commentId, direction) => axios
    .patch(`${DB_URL}/comments/${commentId}?vote=${direction}`)
    .then(({ data: { comment } }) => ({ comment }))
    .catch(console.log);

