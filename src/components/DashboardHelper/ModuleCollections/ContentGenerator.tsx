/**
 * Created by Jacob Xie on 8/4/2020.
 */


import React, { forwardRef, useImperativeHandle, useState } from 'react';

import * as dashboardModel from '@/utilities/dashboardModel';
import { ContentGeneratorProps, ConvertRefProps } from './data.d';

import styles from './Common.less';


export const ContentGenerator = (cgProps: ContentGeneratorProps) => {

  const ConvertRef: React.FC<ConvertRefProps> = (crProps: ConvertRefProps) => {
    const [editable, setEditable] = useState<boolean>(false);
    const [content, setContent] = useState<dashboardModel.Content>(crProps.content);

    const saveContent = (a: dashboardModel.Content) => {
      setContent(a);
      crProps.saveContent(a);
    };

    useImperativeHandle(crProps.forwardedRef, () => ({
      edit: () => setEditable(!editable)
    }));

    return <>
      {
        content.data === '' || editable ?
          <cgProps.InputField
            content={content}
            saveContent={saveContent}
            styling={styles.cardContentAlter}
          /> :
          <cgProps.DisplayField
            content={content}
            styling={crProps.displayStyles}
          />
      }
    </>
  };

  return forwardRef((props: ConvertRefProps, ref: React.Ref<any>) =>
    <ConvertRef
      content={props.content}
      saveContent={props.saveContent}
      forwardedRef={ref}
      displayStyles={props.displayStyles}
    />
  );
}
