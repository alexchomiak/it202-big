import React from 'react'
import {NavLink} from 'react-router-dom'
export default function NavBar() {
  return (
    <div className="nav-bar">
      <NavLink exact={true} className="nav-link" activeClassName="nav-link-is-active" to="/"> Home </NavLink>
	<NavLink exact={true} className="nav-link" activeClassName="nav-link-is-active" to="/build"> Build </NavLink>
			<NavLink exact={true} className="nav-link" activeClassName="nav-link-is-active" to="/about"> About </NavLink>
    </div>
  )
}
