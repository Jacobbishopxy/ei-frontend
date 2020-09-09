/**
 * Created by Jacob Xie on 9/9/2020.
 */

import { Request, Response } from "express"
import { fetchGet } from "./common"

export const listFileStructure = (base: string) =>
  (req: Request, res: Response) => {
    const { type, subFolderPath } = req.query
    const p = `${ base }/file/listFileStructure?type=${ type }&subFolderPath=${ subFolderPath }&removeFolderDir=true`
    fetchGet(encodeURI(p))
      .then(json => res.send(json))
      .catch(err => console.log(err))
  }

export const listFileStructurePro = (base: string) =>
  (req: Request, res: Response) => {
    const { type, subFolderPath } = req.query
    const p = `${ base }/file/listProFileStructure?type=${ type }&subFolderPath=${ subFolderPath }&removeFolderDir=true`
    fetchGet(encodeURI(p))
      .then(json => res.send(json))
      .catch(err => console.log(err))
  }

