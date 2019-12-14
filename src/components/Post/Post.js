import React from 'react';
import './Post.css';
import plusIcon from '../../img/plusIcon.png';
{/* <div onClick={() => props.onClickPlus()}  className="PlusIconDiv">
<img style={{ width: 30, height: 30 }} className='PlusIcon' src={plusIcon} alt =""/>
</div> */}
const Post = (props) => (
    <div onClick={() => props.onClick()} className="Post" style={{ flex: 1 }}>
       
        <div style={{ flex: 0.3 }}>
            <h3 className="Title">{props.title}</h3>
        </div>
        <div className="Info" style={{ flex: 0.6 }}>
            <img className="Images" src={props.link} alt="" />
        </div>
        <div style={{ flex: 0.1 }}>
            <h3 className="Price">{props.price} ₺</h3>
        </div>
    </div>
);

export default Post;
