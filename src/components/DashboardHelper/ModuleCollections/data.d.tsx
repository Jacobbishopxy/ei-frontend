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

export interface ConvertRefFR {
  edit: () => void
}

export interface ConvertRefProps {
  content: ContentType
  saveContent: (a: ContentType) => void
  displayStyles?: React.CSSProperties
  forwardedRef: React.Ref<ConvertRefFR>
}

export interface ConvertProps {
  content: ContentType
  saveContent: (a: ContentType) => void
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

