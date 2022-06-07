import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos, fetchAccessToken } from '../store/store.js';
import Layout from './Layout.js';
import Feed from './feed.js';
import Article from './article.js';
import NotFound from './notFound.js';

export default function App() {
  const feedState = useSelector(state => state.feed);
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { pagesNumber } = feedState;
  const status = feedState.status || authState.status || null;
  const error = feedState.error || authState.error || null;

  useEffect(() => {
    dispatch(fetchAccessToken());
  }, [authState.token]);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [pagesNumber]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Feed status={status} error={error} articles={feedState.feed} />} />
        <Route path="photos/:articleId" element={<Article isSinglePage={true} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
