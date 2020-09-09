/**
 * Created by Jacob Xie on 8/28/2020.
 */

import express from 'express'
import { ConnectionOptions } from "typeorm"

import * as homeController from "./controllers/home"
import * as fmController from "./controllers/fileManagement"
import * as feController from "./controllers/fileExploration"
import * as maController from "./controllers/mongoAdmin"
import * as glController from "./controllers/gridLayout"

import config from '../resources/config.json'
import { literatureConnect } from "./orm"
import { connProdLiterature } from "../resources/databaseProd"
import { connDevLiterature } from "../resources/databaseDev"


const { eiBackendUrl } = config


const app = express()

app.set("port", process.env.PORT || 7999)
app.set("env", process.env.NODE_ENV === 'production' ? "prod" : "dev")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// ---------------------------------------------------------------------------------------------------------------------
// home API

app.post('/api/login/account', homeController.loginAccount)
app.get('/api/currentUserAvatar', homeController.getCurrentUserAvatar)
app.get('/api/homeLogo', homeController.getHomeLogo)
app.get('/api/currentUser', homeController.getCurrentUser)


// ---------------------------------------------------------------------------------------------------------------------
// grid layout API

app.get('/api/ei-grid-layout', glController.getGridLayout(eiBackendUrl))
app.post('/api/ei-grid-layout', glController.updateGridLayout(eiBackendUrl))


// ---------------------------------------------------------------------------------------------------------------------
// file management API

app.post("/api/ei-extract-xlsx-file", fmController.extractXlsxFile)


// ---------------------------------------------------------------------------------------------------------------------
// file exploration API

app.get('/api/ei-file-structure', feController.listFileStructure(eiBackendUrl))
app.get('/api/ei-pro-file-structure', feController.listFileStructurePro(eiBackendUrl))


// ---------------------------------------------------------------------------------------------------------------------
// mongo admin API

app.get('/api/ei-admin/show-collections', maController.showCollections(eiBackendUrl))
app.get('/api/ei-admin/does-collection-exist', maController.doesCollectionExist(eiBackendUrl))
app.get('/api/ei-admin/show-collection', maController.showCollection(eiBackendUrl))
app.post('/api/ei-admin/create-collection', maController.createCollection(eiBackendUrl))
app.post('/api/ei-admin/modify-collection', maController.modifyCollection(eiBackendUrl))
app.get('/api/ei-admin/show-index', maController.showIndex(eiBackendUrl))
app.post('/api/ei-admin/insert-data', maController.insertData(eiBackendUrl))
app.post('/api/ei-admin/query-data', maController.queryData(eiBackendUrl))
app.post('/api/ei-admin/delete-data', maController.deleteData(eiBackendUrl))


// ---------------------------------------------------------------------------------------------------------------------

async function connectionsAwaitLiterature() {
  const literatureConnOptions: ConnectionOptions =
    app.get("env") === "prod" ? connProdLiterature : connDevLiterature

  await literatureConnect(app, literatureConnOptions)

  const connInfo = JSON.stringify(literatureConnOptions, null, 2)
  console.log(`Connected to ${ connInfo }`)
}


export { app, connectionsAwaitLiterature }

