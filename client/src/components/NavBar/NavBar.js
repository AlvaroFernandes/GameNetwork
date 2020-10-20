import React from 'react';
import { LoginNav } from './LoginNav';
import { LogoutNav } from './LogoutNav';



function NavBar(props) {
  const { loggedIn } = props;
  return (
    <div>
      {loggedIn ? <LoginNav /> : <LogoutNav />}
    </div>
  );
}
export default NavBar;
