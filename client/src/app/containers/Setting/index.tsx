/**
 *
 * Setting
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectSetting } from './selectors';
import { settingSaga } from './saga';

interface Props {}

export const Setting = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: settingSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setting = useSelector(selectSetting);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Setting</title>
        <meta name="description" content="Description of Setting" />
      </Helmet>
      <div>Settings</div>
    </>
  );
});
