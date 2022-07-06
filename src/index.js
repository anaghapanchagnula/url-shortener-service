const express = require('express');
require('./db/mongoose');
const shortenUrlRouter = require('./routers/shortened-url');
const redirectUrlRouter = require('./routers/redirected-url');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(shortenUrlRouter);
app.use(redirectUrlRouter);

// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, '../src/views'));

// app.get('/', (req, res) => {
//   res.render('index');
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
