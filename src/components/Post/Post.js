import React from 'react';
import './Post.css';

const Post = (props) => (
    <article onClick={() => props.onClick()} className="Post" style={{ flex: 1 }}>
        <div className="PlusIconDiv">
        <i className="fas fa-plus"></i>
        </div>
        <div style={{ flex: 0.3 }}>
            <h3 className="Title">{props.title}</h3>
        </div>
        <div className="Info" style={{ flex: 0.6 }}>
            <img className="Images" src={props.link} alt="" />
        </div>
        <div style={{ flex: 0.1 }}>
            <h3 className="Price">{props.price} ₺</h3>
        </div>
    </article>
);

export default Post;
