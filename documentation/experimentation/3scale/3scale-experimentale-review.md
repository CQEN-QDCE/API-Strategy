# Expérimentation - Plateforme API 3scale

## Objectif

* Démontrer la possibilité d'utiliser la plateforme d'API 3scale av.
* Sécuriser l'accès à un API par une clé d'authentification
* Publication dans un magasin d'API et abonnement 

## Démarche

* [ ] Publication d'un API via la plateforme OpenShift
* [ ] Configurer manuellement la plateforme Fédérale Canadienne
	* [ ] Création instance avec droits administration (Fédéral)
	* [ ] Création d'accès (Utilisateurs)
	* [ ] Création d'un API
	* [ ] Publication d'un API
	* [ ] Souscription à un API (application tier, création jeton d'accès)
* [ ] Configuration de l'utilisation de l'API avec jeton d'accès
* [ ] Tests et consommation de l'API
* [X] Configuration de l'accès via Red Hat SSO
* [ ] Automatisation de la configuration

## Résultats

La plateforme d'API fédérale permet de publier et de gérer des APIs dans un magasin unifié.
Elle permet également de sécuriser simplement l'accès à l'API (jeton).
Le temps a manqué pour expérimenter davantage sur l'automatisation de la configuration dans la plateforme.
Un gabarit (template) est disponible dans le catalogue mais les accès à la plateforme n'ont pas permis de le tester.
L'automatisation avec 3Scale doit se faire via un API et non un client (CLI), du code peut être à prévoir pour automatiser le tout.
Le magasin Fédéral est universel pour tous et la plateforme ne prévoit pas faire de magasin par "tenant".

### Création d'une API
1. Créer un produit
    * Saisir un nom, ex: Weather API
    * Saisir un nom système, ex: weather-api

2. Créer deux Backends. Dans 3scale, un produit doit être composé de 1 ou plusieurs backends. Ex: un produit (API) qui expose les données météos qui proviennent de deux backends, un pour la météo courante et l'autre pour les prévisions.

    * Saisir un nom pour le 1 backend, ex: OpenWeather
    * Saisir un nom système pour le 1 backend, ex: openweather
    * Saisir l'url privée du 1 backend, ex: https://api.openweathermap.org:443

    * Saisir un nom pour le 2 backend, ex: WeatherStack
    * Saisir un nom système pour le 2 backend, ex: weatherstack
    * Saisir l'url privée du 2 backend, ex: http://api.weatherstack.com:80

3. Assigner les deux backends OpenWeather et WeatherStack au produit Weather API

    * Pour le backend OpenWeather, saisir "/openweather" comme route publique

    * Pour le backend WeatherStack, saisir "/weatherstack" comme route publique

4. Paramétrer le produit

    * Saisir l'url publique pour l'environnement de simulation, ex: https://weather-staging.apps.exp.lab.pocquebec.org:443

    * Saisir l'url publique pour l'environnement de production, ex: https://weather.apps.exp.lab.pocquebec.org:443

    * Pour l'authentification, choisir "Clé API" et saisir appid comme clé d'authentification utilisateur

    * Dans localisation des informations d'identifcation, choisir "Comme paramètres de requête (GET) ou paramètres de corps (POST/PUT/DELETE)

5. Ajouter une stratégie de réécriture d'url pour modifier la route publique des backends

    * Ajouter une commande de réécriture et saisir: op - Subtitute the first match of the regex applied, regex - ^/forecast, replace - /weatherstack/forecast et options - i

    * Ajouter une autre commande de réécriture et saisir: op - Subtitute the first match of the regex applied, regex - ^/current, replace - /openweather/data/2.5/weather et options - i

    * Déplacer la stratégie au dessus de "3scale APIcast"

6. Ajouter une stratégie de réécriture d'url pour modifier les clé d'API

7. Ajouter les règles de mappage (??? c'est quoi une règle de mappage)

    * sd

8. Ajouter un plan d'application (??? À compléter)

curl "https://weather-staging.apps.exp.lab.pocquebec.org/current?q=Quebec&appid=51dd4539388810b6173de23980ad05d5"

curl "https://weather-staging.apps.exp.lab.pocquebec.org/forecast?appid=51dd4539388810b6173de23980ad05d5&query=Quebec"

### Configuration de l'accès via Red Hat SSO
3scale s'intègre très facilement avec Red Hat Single Sign On (SSO).