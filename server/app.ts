/**
 * Created by Jacob Xie on 8/28/2020.
 */

import express, { Request, Response } from 'express'
import path from 'path'
import fetch from 'node-fetch'
import { ConnectionOptions } from "typeorm"

import config from '../resources/config.json'
import { JSONType } from './data'
import { literatureConnect } from "./orm"
import { connProdLiterature } from "../resources/databaseProd"
import { connDevLiterature } from "../resources/databaseDev"


const { eiBackendUrl } = config


function commonPostParam(data: JSONType) {
  return {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }
}

function fetchGet(url: string) {
  return fetch(url).then(res => res.text())
}

function fetchPost(url: string, jsonData: JSONType) {
  return fetch(url, commonPostParam(jsonData)).then(res => res.text())
}


const app = express()

app.set("port", process.env.PORT || 7999)
app.set("env", process.env.NODE_ENV === 'production' ? "prod" : "dev")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// ---------------------------------------------------------------------------------------------------------------------

// todo
app.post('/api/login/account', (req: Request, res: Response) => {
  // const {password, userName, type} = req.body;
  const { type } = req.body

  res.send({
    status: 'ok',
    type,
    currentAuthority: 'admin',
  })
})

app.get('/api/currentUserAvatar', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '/assets', 'avatar.png'))
})

app.get('/api/homeLogo', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '/assets', 'avatar.png'))
})

app.get('/api/currentUser', (req: Request, res: Response) => {
  res.send({
    name: 'Jacob Xie',
    avatar: '/api/currentUserAvatar',
    userid: '00000001',
    email: 'xieyu@infore.com',
    signature: '',
    title: 'data scientist, full-stack engineer',
    group: 'equity investment',
  })
})


// ---------------------------------------------------------------------------------------------------------------------

/**
 * get grid layout
 */
app.get('/api/ei-grid-layout', (req: Request, res: Response) => {
  const { db, collection, template, panel } = req.query

  fetchGet(`${ eiBackendUrl }/dashboard/grid-layout?db=${ db }&collection=${ collection }&template=${ template }&panel=${ panel }`)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * update grid layout
 */
app.post('/api/ei-grid-layout', (req: Request, res: Response) => {
  const { db, collection } = req.query
  fetchPost(`${ eiBackendUrl }/dashboard/grid-layout?db=${ db }&collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

// new APIs

/**
 * fetch industry-store
 */
app.post('/api/dashboard-store-fetch', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/dashboard/industry-store-fetch?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * fetch industry-stores
 */
app.post('/api/dashboard-stores-fetch', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/dashboard/industry-stores-fetch?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * modify industry-store
 */
app.post('/api/dashboard-store-modify', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/dashboard/industry-store-modify?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * modify industry-stores
 */
app.post('/api/dashboard-stores-modify', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/dashboard/industry-stores-modify?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})


/**
 * remove industry-store
 */
app.post('/api/dashboard-store-remove', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/dashboard/industry-store-remove?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * remove industry-stores
 */
app.post('/api/dashboard-stores-remove', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/dashboard/industry-stores-remove?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * fetch template-layout
 */
app.post('/api/dashboard-layout-fetch', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/dashboard/template-layout-fetch?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * modify template-layout
 */
app.post('/api/dashboard-layout-modify', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/dashboard/template-layout-modify?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * remove template-layout
 */
app.post('/api/dashboard-layout-remove', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/dashboard/template-layout-remove?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * modify template-layout-industry-store
 */
app.post('/api/dashboard-layout-store-modify', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/dashboard/template-layout-industry-store-modify?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})


// ---------------------------------------------------------------------------------------------------------------------

/**
 * list file structure
 */
app.get('/api/ei-file-structure', (req: Request, res: Response) => {
  const { type, subFolderPath } = req.query
  const p = `${ eiBackendUrl }/file/listFileStructure?type=${ type }&subFolderPath=${ subFolderPath }&removeFolderDir=true`
  fetchGet(encodeURI(p))
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

app.get('/api/ei-pro-file-structure', (req: Request, res: Response) => {
  const { type, subFolderPath } = req.query
  const p = `${ eiBackendUrl }/file/listProFileStructure?type=${ type }&subFolderPath=${ subFolderPath }&removeFolderDir=true`
  fetchGet(encodeURI(p))
    .then(json => res.send(json))
    .catch(err => console.log(err))
})


// ---------------------------------------------------------------------------------------------------------------------

/**
 * show-collections
 */
app.get('/api/ei-admin/show-collections', (req: Request, res: Response) =>
  fetchGet(`${ eiBackendUrl }/admin/show-collections`)
    .then(json => res.send(json))
    .catch(err => console.log(err))
)


/**
 * does-collection-exist
 */
app.get('/api/ei-admin/does-collection-exist', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchGet(`${ eiBackendUrl }/admin/does-collection-exist?collection=${ collection }`)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * show-collection
 */
app.get('/api/ei-admin/show-collection', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchGet(`${ eiBackendUrl }/admin/show-collection?collection=${ collection }`)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * create-collection
 */
app.post('/api/ei-admin/create-collection', (req: Request, res: Response) =>
  fetchPost(`${ eiBackendUrl }/admin/create-collection`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
)

/**
 * modify-collection
 */
app.post('/api/ei-admin/modify-collection', (req: Request, res: Response) =>
  fetchPost(`${ eiBackendUrl }/admin/modify-collection`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
)

/**
 * show-index
 */
app.get('/api/ei-admin/show-index', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchGet(`${ eiBackendUrl }/admin/show-index?collection=${ collection }`)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * insert-data
 */
app.post('/api/ei-admin/insert-data', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/admin/insert-data?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * query-data
 */
app.post('/api/ei-admin/query-data', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/admin/query-data?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

/**
 * delete-data
 */
app.post('/api/ei-admin/delete-data', (req: Request, res: Response) => {
  const { collection } = req.query

  fetchPost(`${ eiBackendUrl }/admin/delete-data?collection=${ collection }`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
})


// ---------------------------------------------------------------------------------------------------------------------

async function connectionsAwaitLiterature() {
  const literatureConnOptions: ConnectionOptions =
    app.get("env") === "prod" ? connProdLiterature : connDevLiterature

  await literatureConnect(app, literatureConnOptions)

  const connInfo = JSON.stringify(literatureConnOptions, null, 2)
  console.log(`Connected to ${ connInfo }`)
}


export { app, connectionsAwaitLiterature }

