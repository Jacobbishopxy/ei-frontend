/**
 * Created by Jacob Xie on 9/9/2020.
 */

import { Request, Response } from "express"
import path from "path"


export const getHomeLogo = (req: Request, res:Response) => {
  res.sendFile(path.join(__dirname, "../assets", "avatar.png"))
}

export const loginAccount = (req: Request, res:Response) => {
  const { type } = req.body

  res.send({
    status: 'ok',
    type,
    currentAuthority: 'admin',
  })
}

export const getCurrentUserAvatar = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../assets', 'avatar.png'))
}

export const getCurrentUser = (req: Request, res: Response) => {
  res.send({
    name: 'Jacob Xie',
    avatar: '/api/currentUserAvatar',
    userid: '00000001',
    email: 'xieyu@infore.com',
    signature: 'Who drives me forward like fate? The myself striding on my back.',
    title: 'data scientist, full-stack engineer',
    group: 'equity investment',
    access: 'admin'
  })
}
