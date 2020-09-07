# ui-logic-reuse

The idea is to build the UI logic reuseable through the class of JS. They(ng/react/vue) just provide DOM operations.

## Notice

git clone and run it by yourself. In Vue2 and ng10, the UI logic is one instance. But in React16, i can't use one instance to complete UI. So, if you hava a better idea, tell me on issues. Thank you very much. This test demo is a poor development experience, lack of tips.

## Results

In vue2 and ng10, using this logic is very fast and easy. Because they almost have the same template and both have two-way binding. Unlike react, you need to update the state manually.

## Explain

|folder name|do what||
|-------|--|--|
|check-list|base UI file|Using Babel to convert JS files from ES6 to ES5 and publish them to NPM.(Mock real development environment) |
|ng10|npm i check-list and use it in Angular@10|Demo in app.compoent.ts, set 'allowJs' true in tsconfig.app.json|
|react16|npm i check-list and use it in React@16|Demo in App.js. Can't use one class instance!|
|vue2|npm i check-list and use it in VUE@2|Demo in App.vue|

![avatar](https://user-images.githubusercontent.com/11879742/92328596-6cd5d300-f094-11ea-8b58-8df14dd718c3.png)
