/**
 *
 * Client
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectClient } from './selectors';
import { clientSaga } from './saga';

interface Props {}

export const Client = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: clientSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const client = useSelector(selectClient);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Client</title>
        <meta name="description" content="Description of Client" />
      </Helmet>
      <div>Client</div>
    </>
  );
});
