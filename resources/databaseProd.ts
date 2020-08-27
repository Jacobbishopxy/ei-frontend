import {ConnectionOptions} from "typeorm"

export default {
  "name": "default",
  "type": "postgres",
  "host": "192.168.50.130",
  "port": 5433,
  "username": "dev_admin",
  "password": "admin123",
  "database": "dev3",
  "synchronize": true,
  "logging": false,
  "entities": [
    `./server/literature/entities/*.ts`
  ]
} as ConnectionOptions
