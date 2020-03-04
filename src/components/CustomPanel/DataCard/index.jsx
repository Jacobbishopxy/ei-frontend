/**
 * Created by Jacob Xie on 3/2/2020.
 */

import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import styles from './index.less'


// const embedModal = props => {
//   const [embedLink, setEmbedLink] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//
//   useEffect()
// }



const DataCard = props => {
  const {onRemoveItem, embedLink} = props;

  return (
    <div className={styles.cardMain}>
      <div className={styles.cardHead}>
        <Button
          shape='circle'
          size='small'
          onClick={onRemoveItem}
        >
          🗑️
        </Button>
      </div>
      <embed
        className={styles.cardContent}
        src={embedLink}
      />
    </div>
  );
};

export default DataCard;
