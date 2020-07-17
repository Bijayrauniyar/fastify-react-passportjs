/**
 *
 * Navbar
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import routes from '../../../routes';
import { User } from 'app/containers/Profile/types';
import { Role } from 'utils/role';
//import { Button } from 'react-bulma-components';
interface Props {
  logout: () => void;
  profile: any;
}

export const Navbar = memo((props: Props) => {
  const filterRoutes = routes.filter(route =>
    route.roles?.includes(props.profile ? Role.ADMIN : Role.USER),
  );
  // creates the links that appear in the left menu / Sidebar
  const createLinks = routes =>
    routes.map(prop => (
      <Link
        className="navbar-item"
        to={process.env.REACT_APP_BASE_PATH + prop.path}
      >
        {prop.name}
      </Link>
    ));

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/app">
            WORKHUB
          </Link>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">{createLinks(filterRoutes)}</div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to="/app/profile">
                  <strong>Profile</strong>
                </Link>
                <button onClick={props.logout} className="button is-light">
                  <strong>Logout</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Div></Div>
    </>
  );
});

const Div = styled.div``;
