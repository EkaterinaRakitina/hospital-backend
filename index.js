const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const apiRoutes = require('./src/modules/routes/routes');

const uri =
  'mongodb+srv://EkaterinaRakitina:restart987@cluster0.v7hrh.mongodb.net/Hospital?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/', apiRoutes);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
