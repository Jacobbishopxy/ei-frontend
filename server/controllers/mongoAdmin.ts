/**
 * Created by Jacob Xie on 9/9/2020.
 */

import { Request, Response } from "express"
import { fetchGet, fetchPost } from "./common"


/**
 * show-collections
 */
export const showCollections = (base: string) =>
  (req: Request, res: Response) =>
    fetchGet(`${ base }/admin/show-collections`)
      .then(json => res.send(json))
      .catch(err => console.log(err))

/**
 * does-collection-exist
 */
export const doesCollectionExist = (base: string) =>
  (req: Request, res: Response) => {
    const { collection } = req.query

    fetchGet(`${ base }/admin/does-collection-exist?collection=${ collection }`)
      .then(json => res.send(json))
      .catch(err => console.log(err))
  }

/**
 * show-collection
 */
export const showCollection = (base: string) =>
  (req: Request, res: Response) => {
    const { collection } = req.query

    fetchGet(`${ base }/admin/show-collection?collection=${ collection }`)
      .then(json => res.send(json))
      .catch(err => console.log(err))
  }

/**
 * create-collection
 */
export const createCollection = (base: string) =>
  (req: Request, res: Response) =>
    fetchPost(`${ base }/admin/create-collection`, req.body)
      .then(json => res.send(json))
      .catch(err => console.log(err))

/**
 * modify-collection
 */
export const modifyCollection = (base: string) =>
  (req: Request, res: Response) =>
    fetchPost(`${ base }/admin/modify-collection`, req.body)
      .then(json => res.send(json))
      .catch(err => console.log(err))

/**
 * show-index
 */
export const showIndex = (base: string) =>
  (req: Request, res: Response) => {
    const { collection } = req.query

    fetchGet(`${ base }/admin/show-index?collection=${ collection }`)
      .then(json => res.send(json))
      .catch(err => console.log(err))
  }

/**
 * insert-data
 */
export const insertData = (base: string) =>
  (req: Request, res: Response) => {
    const { collection } = req.query

    fetchPost(`${ base }/admin/insert-data?collection=${ collection }`, req.body)
      .then(json => res.send(json))
      .catch(err => console.log(err))
  }

/**
 * query-data
 */
export const queryData = (base: string) =>
  (req: Request, res: Response) => {
    const { collection } = req.query

    fetchPost(`${ base }/admin/query-data?collection=${ collection }`, req.body)
      .then(json => res.send(json))
      .catch(err => console.log(err))
  }

/**
 * delete-data
 */
export const deleteData = (base: string) =>
  (req: Request, res: Response) => {
    const { collection } = req.query

    fetchPost(`${ base }/admin/delete-data?collection=${ collection }`, req.body)
      .then(json => res.send(json))
      .catch(err => console.log(err))
  }

