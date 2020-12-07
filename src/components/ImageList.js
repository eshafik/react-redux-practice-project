import React from 'react';

import styles from './ImageList.module.css';

import ImageCard from "./ImageCard";


// const ImageList = (props) => {
//     const images = props.images.map( (image) => {
//        return <img key={image.id} src={image.urls.regular}/>
//     });
//     return <div>{images}</div>
// }

const ImageList = (props) => {
    const images = props.images.map( (image) => {
        return <ImageCard key={image.id} image={image}/>;
    });
    return <div className={styles.imageList}>{images}</div>
}

export default ImageList;
