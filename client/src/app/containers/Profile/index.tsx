/**
 *
 * Profile
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
//import { selectUser } from '../Auth/selectors';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectProfile } from './selectors';
import { selectAuth } from '../Auth/selectors';
import { profileSaga } from './saga';
//import { Button } from 'react-bulma-components';

interface Props {}

export const Profile = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: profileSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const auth: any = useSelector(selectAuth);
  const profile = auth.authResponse.user;
  // const profile = useSelector(selectUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Profile</h1>
            <br />
            <h2 className="subtitle">{`Hello ${profile.firstName}`}</h2>
          </div>
          <ul className="is-lower-roman">
            {/* <li>{`Role : ${profile.admin ? 'Admin' : 'Member'}`}</li>
            <li>{`Job Title : ${profile.jobTitle}`}</li> */}
            <li>{` firstName: ${profile.firstName}`}</li>
            <li>{`lastName : ${profile.lastName}`}</li>
            <li>{`Email : ${profile.email}`}</li>

            {/* <li>{`Location : ${profile.officeLocation}`}</li>
            <li>{`Name : ${profile.displayName}`}</li>
            <li>{`SurName : ${profile.surname}`}</li>
            <li>{`Business Phone : ${profile.businessPhones}`}</li> */}
          </ul>
        </div>
      </section>
    </>
  );
});
