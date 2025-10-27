const { json } = require('express');
const serveStatic = require('express').static;
const authRoutes = require('./routes/auth.route.js');
const messageRoutes = require('./routes/message.route.js');
const { config } = require('dotenv');
const dbConnect = require('./lib/db.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { app, server } = require('./lib/socket.js');

config();

app.use(json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(serveStatic(path.join(__dirname, "../frontend/dist")));

  // ✅ FIXED: use regex route instead of "*"
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
  dbConnect();
});
