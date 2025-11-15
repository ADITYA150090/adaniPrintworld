import express from 'express';

const app = express();




app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});





app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});