/**
 * Created by Jacob Xie on 3/2/2020.
 */

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

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


const port = 7999;
app.listen(port, () => console.log(`App listening on port ${port}`));
