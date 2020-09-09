/**
 * Created by Jacob Xie on 9/9/2020.
 */

import fetch from "node-fetch"
import { JSONType } from "./data"


export const commonPostParam = (data: JSONType) => ({
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
})

export const fetchGet = (url: string) =>
  fetch(url).then(res => res.text())


export const fetchPost = (url: string, jsonData: JSONType) =>
  fetch(url, commonPostParam(jsonData)).then(res => res.text())
