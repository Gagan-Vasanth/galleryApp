import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../reusables/Card/Card.jsx';
import Header from '../../reusables/Header/Header';
import './Gallery.css';

const Gallery = () => {
    const gallery = useSelector(state => state.gallery);
        

    return (
        <div >
            <Header />
            <div className="grid-container">
                { gallery.gallery_info.length === 3 ? gallery.gallery_info.map( each => <Card props={each} />) : null}
            </div>
        </div>
    )
}

export default Gallery;
