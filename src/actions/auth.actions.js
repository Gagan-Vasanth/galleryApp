import firebase from 'firebase';
import { authConstants } from './authConstants';
import { getImagesFromDb } from './user.actions';

export const signin = (user) => {
   
    return async (dispatch) => {
        const db = firebase.firestore();
        dispatch({type: `${authConstants.USER_LOGIN}_REQUEST`});

        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            const name = user.email.split("@")[0];
            const currentUser = firebase.auth().currentUser;
            
             currentUser.updateProfile({
                displayName: name
            }).then( () => {
                db.collection('users')
                .doc(response.user.uid)
                .set({
                    name: response.user.displayName,
                    uid: response.user.uid,
                    createdAt: new Date(),
                }).then( () => {
                    const loggedInUser = {
                        name: response.user.displayName,
                        uid: response.user.uid,
                    };
                    localStorage.setItem('user', JSON.stringify(loggedInUser));
                    console.log("User logged in successfully vai signin");
                    dispatch({ type: `${authConstants.USER_LOGIN}_SUCCESS`, payload: loggedInUser});
                    getImagesFromDb();
                }).catch( (err) =>{
                    console.log(err);
                    dispatch({ type: `${authConstants.USER_LOGIN}_FAILURE`, payload: { error: err}});
                } );
            }).catch( err => console.log(err));
        }
        catch(error) {
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
                if(response) {
                    const loggedInUser = {
                        name: response.user.displayName,
                        uid: response.user.uid,
                        email: user.email
                    };
                    localStorage.setItem('user', JSON.stringify(loggedInUser));
                    console.log("User logged in successfully vai login");
                    dispatch({ type: `${authConstants.USER_LOGIN}_SUCCESS`, payload: loggedInUser });
                    console.log(response);
                    getImagesFromDb();
                 }
                } catch(err) {
                    console.log(err.message);
                }
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({type: `${authConstants.USER_LOGOUT}_REQUEST`})
        firebase.auth().signOut().then( () => {
            dispatch({type: `${authConstants.USER_LOGOUT}_SUCCESS`});
        }).catch( err => {
            console.log(err);
            dispatch({type: `${authConstants.USER_LOGOUT}_FAILURE`})
        })
    }
}