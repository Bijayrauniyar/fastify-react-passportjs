/**
 *
 * Asynchronously loads the component for Client
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Client = lazyLoad(
  () => import('./index'),
  module => module.Client,
);
