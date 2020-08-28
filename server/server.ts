/**
 * Created by Jacob Xie on 12/17/2019.
 */

import express, { Request, Response } from 'express'
import path from 'path'

import app from "./app"

if (process.env.NODE_ENV === 'production') {
  const frontendRoot = path.join(__dirname, '../dist')

  app.use('/', express.static(frontendRoot))

  app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(frontendRoot, 'index.html'))
  })
}

const port = 7999
app.listen(port, () => console.log(`App listening on port ${ port }`))
