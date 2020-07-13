# Installer 3scale sur OpenShift

Lisez ceci en: [English](install-3scale-on-OpenShift.md)

Cette procédure explique comment installer 3scale sur un cluster OpenShift 4.x via l'opérateur (Red Hat Integration - 3scale) supporté par Red Hat.

## Prérequis
* Vous avez accès à l'URL de la console Web OpenShift.

* Vous avez des identifiants pour vous connecter.

* Vous avez configuré l'authentification au registre d'image dans OpenShift [Liens externes][1].

## Procédure
1. Accédez à la console Web OpenShift.

2. Créez un nouveau projet nommé "3scale".

3. Dans le "OperatorHub", chercher l'opérateur nommé "Red Hat Integration - 3scale" et sélectionnez-le.

4. Cliquer sur "Install".

5. Sélectionnez l'option de menu "Installed Operators".

6. Vérifier que le statut de l'opérateur est "Succeeded".
 
7. Sélectionnez l'opérateur.

8. Dans l'onglet "Details", "Provided APIs", "API Manager", cliquez sur "Create Instance".

9. Entrez le YAML suivant: 

    apiVersion: apps.3scale.net/v1alpha1  
    kind: APIManager  
    metadata:  
    name: cqen-apimanager  
    spec:  
        wildcardDomain: apps.exp.lab.pocquebec.org  
        resourceRequirementsEnabled: false  

## Liens externes
[1]:[Configuring registry authentication in OpenShift](https://access.redhat.com/documentation/en-us/red_hat_3scale_api_management/2.6/html/installing_3scale/onpremises-installation#configuring-registry-authentication-in-openshift)

