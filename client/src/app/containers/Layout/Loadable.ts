/**
 *
 * Asynchronously loads the component for Layout
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Layout = lazyLoad(
  () => import('./index'),
  module => module.Layout,
);
