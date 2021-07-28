import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateDisLikes, updateLikes } from '../../actions/user.actions';
import './Card.css';

const Card = (props) => {
    const details = props.props;
    const [likes, setLikes] = useState( () => {
        return details.likes
    });
    const [dislikes, setDisLikes] = useState( () => {
        return details.dislikes
    });
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    
    const likeHandler = () => {
        const liked = details.l_arr.includes(auth.name);
        const disliked = details.d_arr.includes(auth.name);
        if(!liked && disliked) {
            dispatch(updateLikes(details.id, auth.name));
            setLikes(likes+1);
            if(dislikes > 0) {
                setDisLikes(dislikes - 1);
            }
        } else if(!liked && !disliked) {
            dispatch(updateLikes(details.id, auth.name));
            setLikes(likes+1);
        }
        
    }

    const disLikeHandler = () => {
        const disliked = details.d_arr.includes(auth.name);
        const liked = details.l_arr.includes(auth.name);

        if(!disliked && liked) {
            dispatch(updateDisLikes(details.id, auth.name));
            setDisLikes(dislikes + 1);
            if(likes > 0) {
                setLikes(likes - 1);
            }
        } else if(!liked && !disliked){
            dispatch(updateDisLikes(details.id, auth.name));
            setDisLikes(dislikes + 1);
        }
        
    }

    return (
        <div className="container">
            <img src={details.imageUrl} alt="" className="container_img"/>
            <h3 className="container_author">Author: {details.author}</h3>
            <button className="like_btn" onClick={likeHandler}>
                Like
            </button>

            <button className="dislike_btn" onClick={disLikeHandler}>
                Dislike
            </button>
            <div>
                <p className="like">{likes}</p>
                <p className="dislike">{dislikes}</p> 
            </div>
        </div>
    )
}

export default Card;
