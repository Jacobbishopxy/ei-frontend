/**
 * Created by Jacob Xie on 3/2/2020.
 */

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const eiBackendUrl = 'http://api.ei.infore.com/ei';

function commonPostParam(data) {
  return {
    method: 'post',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  }
}

function fetchGet(url) {
  return fetch(url).then(res => res.text());
}

function fetchPost(url, jsonData) {
  return fetch(url, commonPostParam(jsonData)).then(res => res.text());
}


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/currentUserAvatar', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/assets', 'logo-simple.png'))
});

app.get('/api/currentUser', (req, res) => {
  res.send({
    name: 'Jacob Xie',
    avatar: 'http://localhost:7999/api/currentUserAvatar',
    userid: '00000001',
    email: 'xieyu@infore.com',
    signature: '',
    title: 'data scientist, full-stack engineer',
    group: 'equity investment',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '海纳百川',
      },
    ],
    notifyCount: 0,
    unreadCount: 0,
    country: 'China',
    geographic: {
      province: {
        label: '广东省',
        key: '330000',
      },
      city: {
        label: '深圳市',
        key: '330100',
      },
    },
    address: '太平金融大厦29楼',
    phone: '123123',
  })
});

/**
 * show-collections
 */
app.get('/api/ei-admin/show-collections', (req, res) =>
  fetchGet(`${eiBackendUrl}/admin/show-collections`)
    .then(json => res.send(json))
    .catch(err => console.log(err))
);


/**
 * does-collection-exist
 */
app.get('/api/ei-admin/does-collection-exist', (req, res) => {
  const {collection} = req.query;

  fetchGet(`${eiBackendUrl}/admin/does-collection-exist?collection=${collection}`)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * show-collection
 */
app.get('/api/ei-admin/show-collection', (req, res) => {
  const {collection} = req.query;

  fetchGet(`${eiBackendUrl}/admin/show-collection?collection=${collection}`)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * create-collection
 */
app.post('/api/ei-admin/create-collection', (req, res) =>
  fetchPost(`${eiBackendUrl}/admin/create-collection`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
);

/**
 * modify-collection
 */
app.post('/api/ei-admin/modify-collection', (req, res) =>
  fetchPost(`${eiBackendUrl}/admin/modify-collection`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err))
);

/**
 * show-index
 */
app.get('/api/ei-admin/show-index', (req, res) => {
  const {collection} = req.query;

  fetchGet(`${eiBackendUrl}/admin/show-index?collection=${collection}`)
    .then(json => res.send(json))
    .catch(err => console.log(err));
})

/**
 * insert-data
 */
app.post('/api/ei-admin/insert-data', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/admin/insert-data?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * query-data
 */
app.post('/api/ei-admin/query-data', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/admin/query-data?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * delete-data
 */
app.post('/api/ei-admin/delete-data', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/admin/delete-data?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});


const port = 7999;
app.listen(port, () => console.log(`App listening on port ${port}`));
