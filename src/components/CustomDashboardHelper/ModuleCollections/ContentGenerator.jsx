/**
 * Created by Jacob Xie on 7/10/2020.
 */

import React, { forwardRef, useImperativeHandle, useState } from 'react';

import styles from './Common.less';


const checkContentData = d => {
  if (d !== '') return d;
  return '';
};

const checkContentCfg = c => {
  if (c !== undefined) return c;
  return undefined;
}

/**
 * A generator of constructing content module
 */
export const ContentGenerator = ({inputModal, viewDisplay}) => {
  return forwardRef(({initContent, saveContent, contentStyles}, ref) => {
    const [editable, setEditable] = useState(false);
    const [contentData, setContentData] = useState(checkContentData(initContent.contentData));
    const [contentConfig, setContentConfig] = useState(checkContentCfg(initContent.contentConfig));

    const onSet = (ct, cc) => {
      setContentData(ct);
      setContentConfig(cc);
      saveContent({contentData: ct, contentConfig: cc});
    };

    useImperativeHandle(ref, () => ({
      edit: () => setEditable(!editable)
    }));

    return (
      <>
        {
          contentData === '' || editable ?
            <div className={styles.cardContentAlter}>
              {inputModal({onSet, contentData, contentConfig})}
            </div> :
            <div className={contentStyles}>
              {viewDisplay({contentData, contentConfig})}
            </div>
        }
      </>
    )
  });
}


export default ContentGenerator;

