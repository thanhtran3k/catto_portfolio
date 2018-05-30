# catto_portfolio
catto_portfolio is a basic portfolio, CRUD(Create, read, update, delete) website. I used NodeJS, Express for the back-end, Handlebars view engine and Foundation library for the front-end and MySQL as database.

# Quick start
1. Download my project to your pc.
2. Download XAMPP from this link https://www.apachefriends.org/index.html. I recommend the latest version of XAMPP.
3. Open XAMPP then start Apache and MySQL services. Wait a minute for them to start. Check the console lines to know if they are running.
4. Open your browser (Better use Chrome or browsers using Chromium core). Go to http://localhost/phpmyadmin.
5. You have to set a password to your root user. To do that you just find the "User accounts" tab and find the row where the user name is "root" and host name is "localhost". The first time you see it the password will be "No". Click on "Edit privileges" => Change password => Enter your password and click "Go". You gonna be booted out the system. Open the folder where you installed XAMPP. Go to phpMyAdmin folder, find the "config.inc.php" and simply put your password in the "$cfg['Servers'][$i]['password'] = 'yourpassword';" line.
. Open gitbash and install packages. Just type "npm install".

