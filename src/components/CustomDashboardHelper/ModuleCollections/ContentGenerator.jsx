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
 *
 * InputField:
 *    onSet
 *    contentData
 *    contentConfig
 *    contentStyles
 *
 * DisplayField:
 *    contentData
 *    contentConfig
 *    contentStyles
 *
 */
export const ContentGenerator = (InputField, DisplayField) => {

  const ConvertRef = ({initContent, saveContent, contentStyles, forwardedRef}) => {
    const [editable, setEditable] = useState(false);
    const [contentData, setContentData] = useState(checkContentData(initContent.contentData));
    const [contentConfig, setContentConfig] = useState(checkContentCfg(initContent.contentConfig));

    const onSet = (ct, cc) => {
      setContentData(ct);
      setContentConfig(cc);
      saveContent({contentData: ct, contentConfig: cc});
    };

    useImperativeHandle(forwardedRef, () => ({
      edit: () => setEditable(!editable)
    }));

    return <>
      {
        contentData === '' || editable ?
          <InputField
            onSet={onSet}
            contentData={contentData}
            contentConfig={contentConfig}
            contentStyles={styles.cardContentAlter}
          /> :
          <DisplayField
            contentData={contentData}
            contentConfig={contentConfig}
            contentStyles={contentStyles}
          />
      }
    </>
  };

  return forwardRef(({initContent, saveContent, contentStyles}, ref) =>
    <ConvertRef
      initContent={initContent}
      saveContent={saveContent}
      contentStyles={contentStyles}
      forwardedRef={ref}
    />
  );
}


export default ContentGenerator;

