/**
 * Created by Jacob Xie on 12/17/2019.
 */

import path from "path"
import express, { Request, Response } from "express"

import { app, connectionsAwaitLiterature } from "./app"


async function start() {
  await connectionsAwaitLiterature()

  if (process.env.NODE_ENV === 'production') {
    const frontendRoot = path.join(__dirname, '../dist')

    app.use('/', express.static(frontendRoot))

    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(frontendRoot, 'index.html'))
    })
  }

  const port = app.get("port")
  app.listen(port, () => console.log(`App listening on port ${ port }`))
}


const server = start()

export default server

