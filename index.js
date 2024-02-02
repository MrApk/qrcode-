const express = require('express');
const qrCode = require('qrcode');

const app = express();
const port = 3000;

app.use(express.static(__dirname + ''));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/generate', async (req, res) => {
    const { data } = req.body;

    try {
        const qrCodeImage = await qrCode.toDataURL(data);
        res.json({ qrCodeImage });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
