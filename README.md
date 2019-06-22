# Game of drones, "rock paper scissors" or "Janken"

Game of drones is the equivalent of rock paper scissors. In Japan this game is called "Janken" and it is taken to a whole new level in terms of usage and importance in daily life. If there is ever a clash of opinions between two people in Japan, more often than not this potentially embarassing situation will be decided with janken. Who gets to eat the last Rolo, you or me? What DVD should we rent, Terminator 2 or She's All That? Who should take the rap for our company's bankruptcy? etc. 

## Run the application

Be sure to install **docker-ce** and **docker-compose**, simply run the following command in the root of the project.

```
docker-compose up
```

This will spin up a virtual network and the necessary containers to run the application.

## Development environment setup advice

Is advisable to use NVM to manage your version of node.
In order to install NVM and the latest node version run the following command

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 12
node -v
```

use 