# PizzaProject by Surya Elroh
Project de fin du module de web full stack. 
Ce projet permet d'acceder à un site web VegaPizza qui offre la possibilité de créer ses pizza.

# Installation du projet : 
    npm init : permet de créer le fichier package.json
    
    sudo apt-get update
    sudo apt-get install mongodb-org
    mongo : vérifie l'installation de mongo
    
    npm i --save express
    node -v : check version
    nvm ls : voir les differentes version installer et celle utiliser par defaut
    nvm alias default 6 :change la version par defaut à 6

# Créé les outils pour mongo
Créer un fichier nommé mongod, puis copier le lien ci-dessous à l'intérieur :
    mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"
    mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@" --repair

Taper dans la console pour le mettre en executable : 
    sudo chmod +x mongod
    sudo chmod +x mongodRepair
Ensuite créer un dossier data

Pour lancer la connexion à mongod : ./mongod
Ensuite dans un nouveau terminal lancer mongo : mongo
Puis rentrer les commandes voulues pour gérer la BDD

# Installation de mongoose
npm i -D mongoose

# Installation les modules pour les tests unitaires
npm i -D mocha
npm i -D chai
lancer les test : npm test

# Installation de Body-Parser afin de faire le CRUD
npm install body-parser --save
sudo apt update : met à jour avant de pouvoir installer

# Installation de Cors pour le cross-origin
npm install cors --save

# Installation de JSDoc pour la génération de la documentation
sudo npm install -g jsdoc
pour générer la doc d'un fichier : jsdoc nomFicher.js
pour générer la doc complète : jsdoc *
doc : http://usejsdoc.org/about-getting-started.html


# Pour installer adminMongo (interface graphique pour mongo)
git clone + adresse git adminMongo
cd adminMongo
npm i

node app.js : lance le module lorsque l'on est encore dans le dossier adminMongo