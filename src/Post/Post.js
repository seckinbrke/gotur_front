import React from 'react';

import './Post.css';

const post = (props) => (
    <article className="Post">
        <div className="Title" >
            <h3>{props.title}</h3>
        </div>
        <div className="Info">
            <img className="Images" src={props.link} alt="" />
            <div className="Author">{props.price}₺</div>
        </div>
    </article>
);

export default post;