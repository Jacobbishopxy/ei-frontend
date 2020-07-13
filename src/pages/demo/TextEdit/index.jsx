import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { Button } from 'antd';

import 'react-quill/dist/quill.snow.css';


const CustomHeart = () => <span>♥</span>;

function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, '♥');
  this.quill.setSelection(cursorPosition + 1);
}

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header"/>
    <select className="ql-font">
      <option value="arial" selected>Arial</option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="lucida">Lucida</option>
    </select>
    <select className="ql-size">
      <option value="24px" selected>24px</option>
      <option value="48px">48px</option>
      <option value="100px">100px</option>
      <option value="200px">200px</option>
      <option value="400px">400px</option>
    </select>
    <button className="ql-align" value=''/>
    <button className="ql-align" value='center'/>
    <button className="ql-align" value='right'/>
    <button className="ql-align" value='justify'/>
    <button className="ql-bold"/>
    <button className="ql-italic"/>
    <button className="ql-underline"/>
    <button className="ql-strike"/>
    <button className="ql-blockquote"/>
    <button className="ql-code-block"/>
    <button className="ql-list" value='ordered'/>
    <button className="ql-list" value='bullet'/>
    <button className="ql-indent" value='-1'/>
    <button className="ql-indent" value='+1'/>
    <select className="ql-color"/>
    <select className="ql-background"/>
    <button className="ql-link"/>
    <button className="ql-image"/>
    <button className="ql-insertHeart">
      <CustomHeart/>
    </button>
  </div>
);

// Add sizes to whitelist and register them
const Size = Quill.import('attributors/style/size');
Size.whitelist = ['24px', '48px', '100px', '200px', '400px'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida'
];
Quill.register(Font, true);

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {insertHeart: insertHeart}
  }
};

const formats = [
  'header',
  'font',
  'size',
  'align',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'background',
];


export default () => {

  const [content, setContent] = useState('');

  return (
    <div className="text-editor">
      <CustomToolbar/>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={content}
        onChange={setContent}
      />
      <Button
        onClick={() => console.log(content)}
      >
        show content
      </Button>
    </div>
  )
};
