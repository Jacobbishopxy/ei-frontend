/**
 * Created by Jacob Xie on 8/5/2020.
 */

import * as dashboardModel from '@/utilities/dashboardModel';

export interface ModulePanelProps {
  globalConfig: Record<string, any> | null
  category: dashboardModel.CategoryType
  onRemove: (value: string) => void
  content: dashboardModel.Content | null
  saveContent: (value: dashboardModel.Content) => void
  headVisible: boolean
}
