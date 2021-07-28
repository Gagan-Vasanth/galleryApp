import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
    
    const auth = useSelector(state => state.auth);

    return(
        <Route {...rest} component={(props) => {
            const user = auth.authenticated ? true: false;

            if(user){
                return <Component {...props} />
            }else{
                return <Redirect to='/signin' />
            }

        }} />
    )
}

export default PrivateRoute;
