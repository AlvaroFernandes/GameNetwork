import React from 'react';
import LoginNav from './LoginNav.js';
import LogoutNav from './LogoutNav';



function NavBar(props) {
  const { loggedIn } = props;
  console.log(props);
  return (
    <div>
      {loggedIn ? <LoginNav logout={props.logout} /> : <LogoutNav />}
    </div>
  );
}
export default NavBar;
