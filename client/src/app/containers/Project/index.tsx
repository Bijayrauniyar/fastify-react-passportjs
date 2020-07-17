/**
 *
 * Project
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectProject } from './selectors';
import { projectSaga } from './saga';

interface Props {}

export const Project = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: projectSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const project = useSelector(selectProject);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Project</title>
        <meta name="description" content="Description of Project" />
      </Helmet>
      <div>Projects</div>
    </>
  );
});
