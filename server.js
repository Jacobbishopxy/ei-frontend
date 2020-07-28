/**
 * Created by Jacob Xie on 12/17/2019.
 */

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const config = require('./resources/config.json');

const {eiBackendUrl} = config;


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


// ---------------------------------------------------------------------------------------------------------------------

// todo
app.post('/api/login/account', (req, res) => {
  const {password, userName, type} = req.body;

  res.send({
    status: 'ok',
    type,
    currentAuthority: 'admin',
  });
});

app.get('/api/currentUserAvatar', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/assets', 'logo-simple.png'))
});

app.get('/api/currentUser', (req, res) => {
  res.send({
    name: 'Jacob Xie',
    avatar: '/api/currentUserAvatar',
    userid: '00000001',
    email: 'xieyu@infore.com',
    signature: '',
    title: 'data scientist, full-stack engineer',
    group: 'equity investment',
  })
});


// ---------------------------------------------------------------------------------------------------------------------

/**
 * get grid layout
 */
app.get('/api/ei-grid-layout', (req, res) => {
  const {db, collection, template, panel} = req.query;

  fetchGet(`${eiBackendUrl}/dashboard/grid-layout?db=${db}&collection=${collection}&template=${template}&panel=${panel}`)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * update grid layout
 */
app.post('/api/ei-grid-layout', (req, res) => {
  const {db, collection} = req.query;
  fetchPost(`${eiBackendUrl}/dashboard/grid-layout?db=${db}&collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

// new APIs

/**
 * fetch industry-store
 */
app.get('/api/dashboard-store-fetch', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/dashboard/industry-store-fetch?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * fetch industry-stores
 */
app.get('/api/dashboard-stores-fetch', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/dashboard/industry-stores-fetch?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * modify industry-store
 */
app.get('/api/dashboard-store-modify', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/dashboard/industry-store-modify?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * modify industry-stores
 */
app.get('/api/dashboard-stores-modify', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/dashboard/industry-stores-modify?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});


/**
 * remove industry-store
 */
app.get('/api/dashboard-store-remove', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/dashboard/industry-store-remove?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * remove industry-stores
 */
app.get('/api/dashboard-stores-remove', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/dashboard/industry-stores-remove?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * fetch template-layout
 */
app.get('/api/dashboard-layout-fetch', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/dashboard/template-layout-fetch?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * modify template-layout
 */
app.post('/api/dashboard-layout-modify', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/dashboard/template-layout-modify?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * remove template-layout
 */
app.get('/api/dashboard-layout-remove', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/dashboard/template-layout-remove?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

/**
 * modify template-layout-industry-store
 */
app.get('/api/dashboard-layout-store-modify', (req, res) => {
  const {collection} = req.query;

  fetchPost(`${eiBackendUrl}/dashboard/template-layout-industry-store-modify?collection=${collection}`, req.body)
    .then(json => res.send(json))
    .catch(err => console.log(err));
});



// ---------------------------------------------------------------------------------------------------------------------

/**
 * list file structure
 */
app.get('/api/ei-file-structure', (req, res) => {
  const {type, subFolderPath} = req.query;
  const p = `${eiBackendUrl}/file/listFileStructure?type=${type}&subFolderPath=${subFolderPath}&removeFolderDir=true`
  fetchGet(encodeURI(p))
    .then(json => res.send(json))
    .catch(err => console.log(err));
});

app.get('/api/ei-pro-file-structure', (req, res) => {
  const {type, subFolderPath} = req.query;
  const p = `${eiBackendUrl}/file/listProFileStructure?type=${type}&subFolderPath=${subFolderPath}&removeFolderDir=true`
  fetchGet(encodeURI(p))
    .then(json => res.send(json))
    .catch(err => console.log(err));
});


// ---------------------------------------------------------------------------------------------------------------------

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
});

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


// ---------------------------------------------------------------------------------------------------------------------

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const port = 7999;
app.listen(port, () => console.log(`App listening on port ${port}`));
