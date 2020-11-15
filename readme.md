# Accounting App
A highly customizable accounting application for large engineering construction company.

# Development: Getting Started

# Requirement
You will need 
* Nodejs
* MongoDB
* Docker
# Prepare Workspace
## Installation
* Clone Project
```bash
$ git clone https://github.com/codephilics/accounting-app.git
$ cd accounting-app
```
```bash
$ npm install
```

First create .env file for example-env.txt: 
```bash
$ cp example-env.txt .env
```
Set .env values  
```bash 
DB_CONNECTION=mongodb://mongo:27017/accountapp
PORT=3000
TOKEN_SECRET=bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4
```
Start App
```bash
$ npm start
```

