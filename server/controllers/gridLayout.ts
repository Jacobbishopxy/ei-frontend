/**
 * Created by Jacob Xie on 9/9/2020.
 */

import { Request, Response } from "express"
import { fetchGet, fetchPost } from "./common"

/**
 * get grid layout
 */
export const getGridLayout = (base: string) =>
  (req: Request, res: Response) => {
    const { db, collection, template, panel } = req.query

    fetchGet(`${ base }/dashboard/grid-layout?db=${ db }&collection=${ collection }&template=${ template }&panel=${ panel }`)
      .then(json => res.send(json))
      .catch(err => console.log(err))
  }

/**
 * update grid layout
 */
export const updateGridLayout = (base: string) =>
  (req: Request, res: Response) => {
    const { db, collection } = req.query
    fetchPost(`${ base }/dashboard/grid-layout?db=${ db }&collection=${ collection }`, req.body)
      .then(json => res.send(json))
      .catch(err => console.log(err))
  }

