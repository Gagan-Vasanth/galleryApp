import firebase from 'firebase';

export const getImagesFromDb = () => {
    return async (dispatch) => {
        const data = [];
        const db = firebase.firestore();
        const unsubscribe = db.collection('gallery')
                    .onSnapshot( (snapshot) => {
                        snapshot.forEach( doc => {
                            data.push(doc.data());
                        });
                        dispatch({type: 'GALLERY_INFO_SUCCESS', payload: data });
                    });
        return unsubscribe;
    }
    
}

export const updateLikes = (id, user) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        const query = db.collection('gallery').doc(id);
        const response = db.collection('gallery').doc(id).get();
        let data = (await response).data();
        let con1 = false;
        for( let i=0; i < data.l_arr.length; i++) {
            if (data.l_arr[i] === user) {
                con1 = true;
                break;
            }
        }
        if(!con1) {
            query.update({
                l_arr: firebase.firestore.FieldValue.arrayUnion(user),
                likes: data.likes + 1
            }).then( () => console.log('Like Added'))
        }
        
        let con2 = false;
        for( let i=0; i < data.d_arr.length; i++) {
            if (data.d_arr[i] === user) {
                con2 = true;
                break;
            }
        }
        if(con2) {
            query.update({
                d_arr: firebase.firestore.FieldValue.arrayRemove(user),
                dislikes: data.dislikes - 1
            }).then( () => console.log('Dislike removed'))
    
        } 
        const new_data = [];
        db.collection('gallery')
                    .onSnapshot( (snapshot) => {
                        snapshot.forEach( doc => {
                            new_data.push(doc.data());
                        });
                        dispatch({type: 'GALLERY_INFO_SUCCESS', payload: new_data });
                    });
        // dispatch({type: 'GALLERY_INFO_SUCCESS', payload: data });
    }
}

export const updateDisLikes = (id, user) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        const query = db.collection('gallery').doc(id);
        const response = db.collection('gallery').doc(id).get();
        let data = (await response).data();
        let con2 = false;
        for( let i=0; i < data.d_arr.length; i++) {
            if (data.d_arr[i] === user) {
                con2 = true;
                break;
            }
        }
        if(!con2) {
            query.update({
                d_arr: firebase.firestore.FieldValue.arrayUnion(user),
                dislikes: data.dislikes + 1
            }).then( () => console.log('Dislike added'))
    
        } 

        let con1 = false;
        for( let i=0; i < data.l_arr.length; i++) {
            if (data.l_arr[i] === user) {
                con1 = true;
                break;
            }
        }
        if(con1) {
            query.update({
                l_arr: firebase.firestore.FieldValue.arrayRemove(user),
                likes: data.likes - 1
            }).then( () => console.log('Like removed!'))
        }
        const new_data = [];
        db.collection('gallery')
                    .onSnapshot( (snapshot) => {
                        snapshot.forEach( doc => {
                            new_data.push(doc.data());
                        });
                        dispatch({type: 'GALLERY_INFO_SUCCESS', payload: new_data });
                    });
        // dispatch({type: 'GALLERY_INFO_SUCCESS', payload: data });
    }
}