/**
 * Created by Jacob Xie on 8/4/2020.
 */

import React from 'react';

import * as dashboardModel from '@/utilities/dashboardModel';


type ContentType = dashboardModel.Content

export interface ContentGeneratorProps {
  InputField: React.FC<ModuleInputField>
  DisplayField: React.FC<ModuleDisplayField>
}

export interface ConvertRefProps {
  content: ContentType | null
  saveContent: (a: ContentType) => void
  forwardedRef: React.Ref<any>
  displayStyles?: React.CSSProperties
}


export interface ModuleInputField {
  content: ContentType
  saveContent: (a: ContentType) => void
  styling?: React.CSSProperties
}

export interface ModuleDisplayField {
  content: ContentType
  styling?: React.CSSProperties
}

