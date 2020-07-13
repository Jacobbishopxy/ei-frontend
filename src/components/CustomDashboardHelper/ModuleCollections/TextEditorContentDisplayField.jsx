/**
 * Created by Jacob Xie on 7/13/2020.
 */

import React from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.bubble.css'


export default ({contentData, contentStyles}) => {
  return (
    <div className={contentStyles}>
      <ReactQuill
        theme="bubble"
        value={contentData}
        readOnly
      />
    </div>
  )
};

