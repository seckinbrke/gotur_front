import React from "react";
import { Carousel } from "react-responsive-carousel";
import image from '../img/carousel1.png'

export default () => (
  <Carousel width="%50" infiniteLoop={true} autoPlay>
    <div>
      <img src={image} />
      <p className="legend">Legend 1</p>
    </div>
    <div>
      <img src={image} />
      <p className="legend">Legend 2</p>
    </div>

  </Carousel>
);
