# BadgerScalp

To get this project up and running try the following (granted you have not set up ionic already). If that doesn't work, hit @psmurray up on Slack.

First, install <a href="http://nodejs.org/">Node.js</a>

Then run the following in the termainal:

1) sudo npm install -g cordova

2) sudo npm install -g ionic

Then clone this repo to your desktop. 'cd' to the project directory via terminal and then you should be able to run 'ionic serve' in the terminal to run the project in your browser.

---------------------------------------------------

Couple things:

First off, you never have to look at the files outside of www. All of these files are necessary for Ionic to run properly but do not need to be changed in any way. I never created any of these files, it is all automatic once you bootstrap Ionic. 

So, looking in the www folder we have a couple folders (css, img, js, lib, templates) and a file (index.html).

css folder:
The css folder is home to style.css which is the only css file we have in the project. Any styling you would like to add to the project just add to this file (preferebly at the bottom of the file). If you want to add a new css file to the project, add it to this folder and then link it in index.html.

img folder:
The img folder is where we should store any images.

js folder:
The js folder contains the bulk of our AngularJS code. In it you will find two folders (controllers, services) and one file (app.js). At the top of the app.js file all the angular modules used by badgerscalp are listed as dependencies. If you instantiate a new angular module you must add it here (I went ahead and created most of the files so that you may not have to deal with this). In the middle of app.js is a funciton titled run. This is responsible for booting our angular/ionic app. At the end of app.js is a function called config. Here all the routing is specified. Basically, this means that all the templates (views) and their following controllers are associated. I coded all this up so you do not have to mess around with it (unless you want).

Moving on, the controllers folder has a bunch of files that correspond to specific templates (this correspondance is initiated via the routing in app.js but I named all the template files using the same name as their controller so you can see the relation throught the file name). Basically any javascript you add to these controllers will be executed when the template is loaded. This is where the AngularJS $scope variable will become incredibly important, so understand what that is. Essentially, the $scope variable is a javascript object that can be assigned variables and functions via the controller (or the view) therefore allowing the view (or contorller) to access these variables and functions directly. Its the middle man.

Finally, the services folder contains functions called factories. These functions return an object which can have either functions or variables. Services can be used cross controllers and by multiple views as a singleton. For our purposes we are using AngularJS services in order to communicate with the Firebase server in a simple get/set manner. If you find it confusing to work with Firebase you can just ask me to implement a get/set for you. 

lib folder:
The lib folder holds all the libaries we need to run our code (angular, ionic). There is no reason to touch this folder either.

templates folder:
Templates folder contains all the different views that need to be coded up. Because all the routing is set up and the html files are linked to corresponding controllers each template is in a similar format. Each template should have an <ion-view> tag and then an <ion-content> tag. The <ion-view> tag keeps the routing working correctly, the <ion-content> tag helps render ionic elements in the html. If you haven't look up these tags online. If you code any html within the <ion-content> tag it will show up in the app when you run it.

index.html file:
This is the main html file of our app. provides links to all the script and css files. In the body is a <ion-nav-view> tag which basically allows <ion-view> tags to take its place. 

Any thing you don't understand on Ionic or AngularJS you should look up. Feel free to ask me with any questions.
