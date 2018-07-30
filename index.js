import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Howdy world.');
});

app.listen(3000, () => console.log('Listening on 3000.'));
