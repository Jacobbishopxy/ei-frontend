/**
 * Created by Jacob Xie on 3/2/2020.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.get('/api/currentUser', (req, res) => {
  console.log('/api/currentUser');
  res.send({
    name: 'Jacob Xie',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
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
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  })
});


const port = 7999;
app.listen(port, () => console.log(`App listening on port ${port}`));
