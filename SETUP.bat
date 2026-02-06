@echo off
echo Installing dependencies...
npm install

echo.
echo Setup complete!
echo.
echo To start the application:
echo 1. Start Backend Server (in first terminal):
echo    node server.js
echo.
echo 2. Start Frontend (in second terminal):
echo    npm run dev
echo.
echo MongoDB Credentials:
echo Username: medicare_admin
echo Password: StrongPass@123
echo Database: medicareDB
echo.
pause
