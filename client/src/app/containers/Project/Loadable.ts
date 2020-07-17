/**
 *
 * Asynchronously loads the component for Project
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Project = lazyLoad(
  () => import('./index'),
  module => module.Project,
);
