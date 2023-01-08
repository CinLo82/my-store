
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

const whiteList = ['http://localhost:5500', 'https://myapp.com', "listen_addresses='*'"];
const options = {
  origin: (origin, callback) => {
    if ( whiteList.includes(origin) || ! origin ) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}

app.use(cors( options ));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola , soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' + port);
});

