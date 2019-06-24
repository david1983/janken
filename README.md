# Game of drones, rock paper scissors or Janken

Game of drones is the equivalent of rock paper scissors. 

In Japan this game is called "Janken" and it is taken to a whole new level in terms of usage and importance in daily life. 

If there is ever a clash of opinions between two people in Japan, more often than not this potentially embarassing situation will be decided with janken. Who gets to eat the last Rolo, you or me? What DVD should we rent, Terminator 2 or She's All That? Who should take the rap for our company's bankruptcy? etc. 

Some informational videos about how to win at rock paper scissors, a mathematical explanation of the game and how the game can happen in nature, presented by Dr. Hannah Fry, Associate Professor in the Mathematics of Cities at the Centre for Advanced Spatial Analysis at UCL.

https://www.youtube.com/watch?v=rudzYPHuewc

https://www.youtube.com/watch?v=ygHwBxWyI6E

https://www.youtube.com/watch?v=Z8lv2vy5vco


## Run the application

Be sure to install **docker-ce** and **docker-compose**, simply run the following command in the root of the project.


```
# Build the application images
docker-compose build 

# spin up the services
docker-compose up

#tear down the services
docker-compose down
```

This will spin up a virtual network and the necessary containers to run the application.


# IMPORTANT BUILD INFO

You need to build the spa before running the docker-compose build


## Development environment setup advice

Is advisable to use NVM to manage your version of node.
In order to install NVM and the latest node version run the following command

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 12

# clone the project
git clone git@github.com:david1983/janken.git

# cd to the project root
cd janken

# install back-end deps 
cd janken-api && npm install

# run tests, from the janken-api directory
npm test

# run linting, from the janken-api directory
npm run lint

# start the REST api (port 3001)
npm start

# install front-end deps
cd janken-spa && npm install

# run tests, from the janken-spa directory
npm test

# run linting, from the janken-spa directory
npm run lint

# start the spa (port 3000)
npm start

# build the application
npm run build

```
