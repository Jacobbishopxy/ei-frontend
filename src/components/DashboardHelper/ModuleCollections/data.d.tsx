/**
 * Created by Jacob Xie on 8/4/2020.
 */

import React from 'react';

import * as dashboardModel from '@/utilities/dashboardModel';


export interface ContentGeneratorProps {
  InputField: React.FC<ModuleInputField>
  DisplayField: React.FC<ModuleDisplayField>
}

export interface ConvertRefProps {
  content: dashboardModel.Content
  saveContent: (a: dashboardModel.Content) => void
  forwardedRef: React.Ref<any>
  displayStyles?: React.CSSProperties
}


export interface ModuleInputField {
  content: dashboardModel.Content
  saveContent: (a: dashboardModel.Content) => void
  styling?: React.CSSProperties
}

export interface ModuleDisplayField {
  content: dashboardModel.Content
  styling?: React.CSSProperties
}

