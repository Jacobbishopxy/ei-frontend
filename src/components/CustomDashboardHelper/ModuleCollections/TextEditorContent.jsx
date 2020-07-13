/**
 * Created by Jacob Xie on 4/27/2020.
 */

import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { Button } from 'antd';
import ContentGenerator from '@/components/CustomDashboardHelper/ModuleCollections/ContentGenerator';
import TextEditorContentDisplayField from './TextEditorContentDisplayField';

import 'react-quill/dist/quill.snow.css'

const CustomHeart = () => <span>♥</span>;

function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, '♥');
  this.quill.setSelection(cursorPosition + 1);
}

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
      <option value="16px">16px</option>
      <option value="24px" selected>24px</option>
      <option value="48px">48px</option>
      <option value="100px">100px</option>
      <option value="150px">150px</option>
      <option value="200px">200px</option>
      <option value="250px">250px</option>
      <option value="300px">300px</option>
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

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['16px', '24px', '48px', '100px', '150px', '200px', '250px', '300px', '400px'];
Quill.register(Size, true);


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

const InputField = ({onSet, contentData}) => {

  const [contentD, setContentD] = useState(contentData);

  return (
    <div>
      <CustomToolbar/>
      <ReactQuill
        className="text-editor"
        theme="snow"
        modules={modules}
        formats={formats}
        value={contentD}
        onChange={setContentD}
      />
      <Button
        onClick={() => onSet(contentD)}
        size='small'
        type='primary'
      >
        保存
      </Button>
    </div>
  )
};

export const TextEditorContent = ContentGenerator(InputField, TextEditorContentDisplayField);

export default TextEditorContent;
