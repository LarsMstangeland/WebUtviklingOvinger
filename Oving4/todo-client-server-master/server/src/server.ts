/**
 * Web server entry point used in `npm start`.
 */

import app from './app';
import express from 'express';
import path from 'path';
import http from 'http';
import reload from 'reload';
import fs from 'fs';

// Serve client files
app.use(express.static(path.join(__dirname, '/../../client/public')));


const server = http.createServer(app);
reload(app).then((reloader) => {
  // Refresh React application in browser when files in ../../client/public change
  fs.watch(path.join(__dirname, '/../../client/public'), () => reloader.reload());

  const port = 3000;
  server.listen(port, () => {
    console.info(`Server running on port ${port}`);
  });
});
