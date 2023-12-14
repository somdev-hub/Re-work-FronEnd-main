#Stopping existing node servers
echo "Stopping any existing node servers"
sudo pm2 stop app
sudo pm2 stop npm