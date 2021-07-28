import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signin } from '../../actions/auth.actions';
import { getImagesFromDb } from '../../actions/user.actions';
import './Signin.css';

const Login = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const gallery = useSelector(state => state.gallery);

    const signinHandler = (e) => {
        e.preventDefault();
        const mname = name.split(" ").join("").toLowerCase();
        const user = {
            email: `${mname}@gallery.com`,
            password: mname
        }
        dispatch(signin(user));
    }
    if(auth.authenticated) {
        dispatch(getImagesFromDb());
        if(gallery.gallery_info.length > 0) {
            console.log(gallery.gallery_info);
            return <Redirect to="/gallery" />
        }
    }

    return (
        <div className="signin_container">
            <form onSubmit={signinHandler}>
                <h1 className="signin_logo">Gallery App</h1>
                <h2 className="signin_signin">Sign in</h2>
                <input 
                    type="text" 
                    value={name} 
                    onChange={ (e) => setName(e.target.value) } 
                    placeholder="Enter your username" 
                    className="signin_input"/>
                <button 
                    type="submit"
                    className={name ? "signin_btn_enabled": "signin_btn_disabled"} disabled={!name}>
                        Move In
                        </button>
            </form>
        </div>
    )
}

export default Login;
