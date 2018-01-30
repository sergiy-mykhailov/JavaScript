Ext.JS
___

# Project initialization

## 1. Download SDK and CMD

1. Download [Sencha Cmd 6.5.1](http://www.sencha.com/products/sencha-cmd/)
2. Download [Ext JS 6.5 SDK](http://www.sencha.com/products/extjs/evaluate/)

## 2. Install SDK and CMD
1. Extract Ext JS SDK in a fixed location in your "home" directory: 
```
/home/me/sencha-sdks/ext-6.5.2
```
2. Extract Sencha CMD in a fixed location in your "home" directory: 
```
/home/me/sencha-cmd
```
3. Install Sencha CMD : 
```
cd /home/me/sencha-cmd
chmod +x SenchaCmd-6.5.3.6-linux-amd64.sh
sudo ./SenchaCmd-6.5.3.6-linux-amd64.sh
```
4. Configure Sencha Cmd with this location:
```
sencha config --prop sencha.sdk.path=/home/me/sencha-sdks --save
```

## 3. Initializing the Application

1. Open project folder
```
cd /home/me/projects/myApp
```
2. Run "sencha app init" to create the application on disk:
```
sencha app init --ext@6.5.2 --classic MyApp
```
or generate application:
```
sencha -sdk /home/me/sencha-sdks/ext-6.5.2 generate app MyApp projectFolder -classic
```

## 4. Launching the Application
Build the application for development(with hot reloading):
```
sencha app watch
```
Build the application for prodaction:
```
sencha app build
```
