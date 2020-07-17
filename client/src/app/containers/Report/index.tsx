/**
 *
 * Report
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectReport } from './selectors';
import { reportSaga } from './saga';

interface Props {}

export const Report = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: reportSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const report = useSelector(selectReport);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Report</title>
        <meta name="description" content="Description of Report" />
      </Helmet>
      <div>Reports</div>
    </>
  );
});
