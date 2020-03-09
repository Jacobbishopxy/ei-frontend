import React from 'react';
import { Carousel } from 'antd';

import inforeCover1 from '../assets/infore-cover1.jpg';
import inforeCover2 from '../assets/infore-cover2.jpg';
import inforeCover3 from '../assets/infore-cover3.jpg';

import styles from './Welcome.less'

const carouselStyle = `
.ant-carousel .slick-slide {
  text-align: center;
  height: 100%;
  line-height: 145px;
  overflow: hidden;
}

.ant-carousel .slick-slide img {
  color: #fff;
}
`;

export default () => (
  <>
    <style jsx={carouselStyle.toString()}/>

    <Carousel autoplay effect="fade" speed={5000} className={styles.container}>
      <div>
        <img src={inforeCover1} alt='infore-cover1' className={styles.cover}/>
      </div>
      <div>
        <img src={inforeCover2} alt='infore-cover2' className={styles.cover}/>
      </div>
      <div>
        <img src={inforeCover3} alt='infore-cover3' className={styles.cover}/>
      </div>
    </Carousel>
  </>
);
