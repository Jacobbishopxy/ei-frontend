/**
 * Created by Jacob Xie on 7/9/2020.
 */

import request from "umi-request";

export const getFolderStructure = async (type, subFolderPath) =>
  request(`/api/ei-file-structure?type=${type}&subFolderPath=${subFolderPath}`)

export const getProFileStructure = async (type, subFolderPath) =>
  request(`/api/ei-pro-file-structure?type=${type}&subFolderPath=${subFolderPath}`)
