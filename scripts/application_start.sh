#give permissions for every directory in Community hiring
sudo chmod -R 777 /home/ec2-user/COMMUNITY_HIRING

#Navigate to working directory
cd /home/ec2-user/COMMUNITY_HIRING

#add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm i

#create directory server in community hiring
cd /home/ec2-user/COMMUNITY_HIRING/Server
npm i --force
npm uninstall bcrypt --force
npm install bcrypt --force

#install npm pm2
sudo npm install pm2 -y
sudo pm2 start app.js

#Create community_hiring directory
cd /home/ec2-user/COMMUNITY_HIRING
sudo pm2 start npm --start

