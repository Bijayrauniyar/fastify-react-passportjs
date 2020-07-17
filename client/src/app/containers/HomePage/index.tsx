import React from 'react';
import { Helmet } from 'react-helmet-async';
//import { useDispatch } from 'react-redux';
//import { Link } from 'react-router-dom';
//import { actions } from '../Auth/slice';
export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <div>Home page</div>
    </>
  );
}
