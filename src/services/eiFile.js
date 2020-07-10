/**
 * Created by Jacob Xie on 7/9/2020.
 */

import request from '@/utils/request';

export const getFolderStructure = async (type, subFolderPath) =>
  request(`/api/ei-file-structure?type=${type}&subFolderPath=${subFolderPath}`)
