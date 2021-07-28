import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/auth.actions';
import './Header.css';

const Header = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <div className="header_container">
            <h1 className="header_logo">Gallery App</h1>
            <span className="header_user">{auth.name}</span>
           <button className="header_btn" onClick={logoutHandler}>Logout</button> 
        </div>
    )
}

export default Header;
