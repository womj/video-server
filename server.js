const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
// Serve static files from the "videos" directory
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Endpoint to get the list of video files
app.get('/videos', function (req, res) {
    const videoDir = path.join(__dirname, 'videos');
    fs.readdir(videoDir, function (err, files) {
        if (err) {
            console.error('Error reading video directory:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const fileNames = files.map(file => path.basename(file));
            res.json(fileNames);
        }
    });
});

app.listen(3000, '0.0.0.0', function () {
    console.log('Video server listening on port 3000!');
});
