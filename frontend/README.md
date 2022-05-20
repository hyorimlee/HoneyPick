# Frontend

## 🚗페이지 상세설명



## 🍒File structure

```reStructuredText
frontend
|   .buckconfig
|   .env
|   .eslintrc.js
|   .gitignore
|   .prettierrc.js
|   .ruby-version
|   .watchmanconfig
|   app.json
|   App.tsx
|   babel.config.js
|   Gemfile
|   Gemfile.lock
|   index.js
|   metro.config.js
|   output.txt
|   package-lock.json
|   package.json
|   README.md
|   tsconfig.json
|   
├───.bundle
|       config
|       
├───android
|   |   build.gradle
|   |   gradle.properties
|   |   gradlew
|   |   gradlew.bat
|   |   settings.gradle
|   |   
|   ├───app
|   |   |   build.gradle
|   |   |   build_defs.bzl
|   |   |   debug.keystore
|   |   |   proguard-rules.pro
|   |   |   _BUCK
|   |   |   
|   |   └───src
|   |       ├───debug
|   |       └───main
|   |           |   AndroidManifest.xml
|   |           |   
|   |           ├───java
|   |           |   └───com
|   |           |       └───frontend
|   |           |           |   MainActivity.java
|   |           |           |   MainApplication.java
|   |           |           |   
|   |           |           └───newarchitecture
|   |           |               |   MainApplicationReactNativeHost.java
|   |           |               |   
|   |           |               └───components
|   |           |               |       MainComponentsRegistry.java
|   |           |               |       
|   |           |               └───modules
|   |           |                       MainApplicationTurboModuleManagerDelegate.java
|   |           |                       
|   |           ├───jni
|   |           |       Android.mk
|   |           |       MainApplicationModuleProvider.cpp
|   |           |       MainApplicationModuleProvider.h
|   |           |       MainApplicationTurboModuleManagerDelegate.cpp
|   |           |       MainApplicationTurboModuleManagerDelegate.h
|   |           |       MainComponentsRegistry.cpp
|   |           |       MainComponentsRegistry.h
|   |           |       OnLoad.cpp
|   |           |       
|   |           └───res
|   |               ├───drawable  
|   |               ├───layout 
|   |               ├───mipmap-hdpi
|   |               ├───mipmap-mdpi
|   |               ├───mipmap-xhdpi
|   |               ├───mipmap-xxhdpi
|   |               ├───mipmap-xxxhdpi
|   |               └───values
|   |                       
|   └───gradle
|       └───wrapper
|               gradle-wrapper.jar
|               gradle-wrapper.properties
|               
├───ios
|   |   Podfile
|   |   Podfile.lock
|   |   
|   ├───frontend
|   |   |   AppDelegate.h
|   |   |   AppDelegate.mm
|   |   |   Info.plist
|   |   |   LaunchScreen.storyboard
|   |   |   main.m
|   |   |   
|   |   └───Images.xcassets
|   |       |   Contents.json
|   |       |   
|   |       ├───AppIcon.appiconset
|   |       |       Contents.json
|   |       |       
|   |       └───splash.imageset
|   |               Contents.json
|   |               honeybee-1.png
|   |               honeybee-2.png
|   |               honeybee.png
|   |               
|   ├───frontend.xcodeproj       
|   ├───frontend.xcworkspace      
|   └───frontendTests
|           
├───patches
|       @types+react-native+0.67.4.patch
|       react-native-actions-sheet+0.6.1.patch
|       
├───src
|   ├───assets
|   |   └───images
|   |           
|   ├───components
|   |   ├───button
|   |   |   └───base
|   |   ├───flatList
|   |   |   └───horizontalList   
|   |   ├───modalView
|   |   ├───saveItemBtn
|   |   └───textInput
|   |       └───base
|   |               
|   ├───containers
|   |   ├───chooseCollection
|   |   └───submitForm
|   |       ├───collectionForm
|   |       ├───phoneForm
|   |       └───voteForm
|   |               
|   ├───modules
|   |       convert.ts
|   |       stickers.ts
|   |       valid.ts
|   |       
|   ├───pages
|   |   ├───index.ts
|   |   |   
|   |   ├───collection
|   |   |   └───components
|   |   |       ├───collectionInfo
|   |   |       ├───collectionItems
|   |   |       └───itemComponent
|   |   |               
|   |   ├───follow
|   |   |   └───components
|   |   |       └───followList
|   |   |               
|   |   ├───home
|   |   |   ├───event
|   |   |   |   ├───default  
|   |   |   |   └───eventItem
|   |   |   |           
|   |   |   ├───profile
|   |   |   |   ├───components
|   |   |   |   |   ├───profileInfo
|   |   |   |   |   └───profileLists
|   |   |   |   ├───default
|   |   |   |   └───editProfile
|   |   |   ├───recommend
|   |   |   └───search
|   |   |       └───components
|   |   |           └───searchResult
|   |   |                   
|   |   ├───item
|   |   |   └───components
|   |   |       ├───itemInfo
|   |   |       ├───recommendInfo
|   |   |       |   ├───gaugeBar
|   |   |       |   └───recommendBar
|   |   |       └───recommendSettings
|   |   |           ├───selectButton
|   |   |           └───stickerBtn
|   |   |                   
|   |   ├───signIn
|   |   |   └───components
|   |   |       └───signInForm
|   |   |               index.tsx
|   |   |               
|   |   ├───signUp
|   |   |   └───components
|   |   |       └───signUpForm
|   |   |               
|   |   └───vote
|   |       ├───components
|   |       |   ├───resultItems
|   |       |   ├───voteInfo
|   |       |   └───voteItems
|   |       ├───default
|   |       └───voteResult
|   |               
|   └───store
|       |   index.ts
|       |   reducer.ts
|       |   types.ts
|       └───slices
|           ├───collection
|           ├───event
|           ├───item 
|           ├───profile  
|           ├───recommend
|           ├───search 
|           ├───ui 
|           ├───user  
|           └───vote
|                   
├───types
|       navigation.ts
|       
└───__tests__
        App-test.tsx  
```

