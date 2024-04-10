const express = require('express');
const cors = require('cors');
const { sequelize } = require('./model');
const router = require('./routes');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
    });
});