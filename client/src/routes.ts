import { User } from './app/containers/User/Loadable';
import { Client } from './app/containers/Client/Loadable';
import { Report } from './app/containers/Report/Loadable';
import { Profile } from './app/containers/Profile/Loadable';
import { Project } from './app/containers/Project/Loadable';
import { HomePage } from './app/containers/HomePage/Loadable';
import { Role } from './utils/role';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    roles: [Role.USER, Role.ADMIN],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    roles: [Role.USER, Role.ADMIN],
  },
  {
    path: '/reports',
    name: 'Report',
    component: Report,
    roles: [Role.USER, Role.ADMIN],
  },
  {
    path: '/projects',
    name: 'Project',
    component: Project,
    roles: [Role.ADMIN],
  },
  {
    path: '/clients',
    name: 'Client',
    component: Client,
    roles: [Role.ADMIN],
  },
  {
    path: '/users',
    name: 'User',
    component: User,
    roles: [Role.ADMIN],
  },
];
export default routes;
