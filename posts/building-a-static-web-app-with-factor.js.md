---
id: '9836c73d-70e7-42b7-8a3f-b20d993ae265'
date: { start_date: '2023-10-16' }
thumbnail: '/covers/building-a-static-web-app-with-factor.jpg'
type: [ 'Post' ]
slug: 'building-a-static-web-app-with-factor.js'
tags: [ 'JavaScript' ,'FactorJS', 'TypeScript', 'NodeJS' ]
author: [ { name: "Ekekenta Clinton", profile_photo: "/authors-avatar/ekekenta-clinton.png" } ]
title: 'Building a Static Web App with FactorJS'
status: [ 'Public' ]
createdTime: 'Mon Oct 16 2023 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
---

## **Introduction**

Scaling web applications with JavaScript can be challenging, as it wasn't originally intended for building full-stack applications. To address this, various frameworks have been developed over time to make development easier. FactorJS is a JavaScript library specifically designed to complement existing JavaScript frameworks. It not only brings flexibility to the development process but also ensures adherence to the best practices and structures recommended by these frameworks.


## **What is FactorJS?**

FactorJS is an open-source, minimal JavaScript platform to develop scalable web applications. Its modern architecture allows developers to maximize performance and optimization and build applications flexibly with less control and restrictions while still following best practices for developing modern applications.

FactorJS fell under the Static Site Generator category and was developed using TypeScript, Vite and ESBuild, Node and Express, TailwindCSS (can be optionally integrated into Factor applications) and Vue3. Note that although FactorJS was developed with Vue, it can still be integrated into any framework library, such as React.


## **Why use FactorJS?**

Below are the features of FactorJS that make it a perfect choice for building your next application:



* It simplifies the application development process and makes for cleaner code practices as it follows best practices and structures.
* Due to its structure, FactorJS is extremely portable and can be integrated with different microservices, allowing data to be easily shared across the application.
* FactorJS applications are easily scalable. As with other JamStack frameworks, FactorJS allows the developer to build an application and add API endpoints later on when site interactivity is required for data.
* FactorJS has large support for various plugins, which can boost the app development process.
* FactorJS keeps things simple by working with JavaScript and TypeScript-related technologies.
* With FactorJS an application can be connected to different server endpoints. The developer also has the option to integrate FactorJS with any framework of choice.

## **Prerequisites**


To be able to work with FactorJS, you need to meet the following requirements:



* Familiarity working with a CLI, [NodeJS](https://nodejs.org/) and its package manager (NPM), and NodeJS terminologies (node modules and package.json).
* Have NodeJS v14 or newer installed.
* Basic knowledge of VueJS and [TypeScript](https://www.typescriptlang.org/)/[JavaScript](https://www.javascript.com/).

## **Creating a new Application**


### **Installing Dependencies**

To get an instance of FactorJS set up on your system, follow the following steps:



* Navigate to a directory of your choice on your local machine and open up the CLI. In this environment, enter the command `npm init`. This will walk you through various prompts, prodding you for information to create a `package.json` file.
* Next, install FactorJS and its dependencies with the following command: \
npm install @factor/cli

### **Source Setup**

Once the installation is completed, we will define the entry points that make up the FactorJS application:



* The application entry point will be `index.ts`. In the working directory, create a folder `src`, and in it, create a file `index.ts`. In the “main” script of the `package.json`, add the following:


```js
   {
      //...
      "main": "src/index.ts"
    }

```



* Next, we will create a file `App.vue` in the `src` directory. This file will serve as the application’s entry point for its user interface. In this file, we will add all other necessary components when building our application.
* Finally, create a new file `index.html` in the `src` directory. This is the main HTML file that provides a context for our application to be rendered.
* Optionally, if you wish to run your application on an endpoint server, you can include a `server.ts` file.

Note that all entry files must be created in the same directory.


## **Configuring the Application**

To easily scaffold our application with Factor, it is necessary to set up configuration files for the following:



* A FactorJS config as `factor.config.ts` (this is required when building a FactorJS application).
* [Vite](https://vitejs.dev/) as `vite.config.ts`, for faster paced development process (optional but recommended).
* [TailwindCSS](https://tailwindcss.com/) as `tailwind.config.ts`, to quickly build the front-end interface (optional but recommended).

To set up these configuration files, in the root directory of your project, create two files `factor.config.js` and `tailwind.config.js`.

In `factor.config.js`, we will add an export for a default object containing Factor build/server-related settings. Also, we can add basic variables for the FactorJS application in this config file. We will specify a name, email, and URL variable for variables. The name contains the name of the application; the email variable can be used with SMTP service for sending emails from the application, and the URL for production.


```js
   export default {
        variables: {
          FACTOR_APP_NAME: "FactorjsApp", // Name of application
          FACTOR_APP_EMAIL: "johndoe@mail.com", // Email to be used with SMTP service
          FACTOR_APP_URL: "your production URL", //Production URL
        },
      }
```


Variables added to this config file will be treated as environmental variables and can be accessed from any file in your application. For `tailwind.config.ts` we have the following:


```js
   module.exports = {
      mode: "jit",
      content: ["./src/**/*.{vue,js,ts,jsx,tsx,html}"],
      plugins: [require("@tailwindcss/forms")],
      theme: {
        extend: {},
      },
    };
```


**Defining the Applications Entry Point**

The entry point of our application is `index.ts`. This file will export a function `setup` that returns our application `config`, `plugins`, and `routes`.


```js
   import { UserConfigApp } from "@factor/api";
    import { routes } from "./routes";
    export const setup = (): UserConfigApp => {
      return {
        routes,
        plugins: [],
      };
    };
```


Finally, add the following to `App.vue`:


```js
   <template>
      <div class="content-layout max-w-7xl m-auto">
        <router-view /> 
      </div>
    </template>
    <script setup>
    import { useMeta } from "@factor/api";
    useMeta({
      title: "FactorJS",
      meta: [
        {
          name: `my Factor application`,
          content: `A simple todo list app`,
        },
      ],
    });
    </script>
    <style lang="less">
    @import "./style.less";
    </style>
```



## **Creating App Components**

We will build our application with the VueJS framework and use TailwindCSS to improve its interface visuals. In the `src` directory, create new folder components and add the following files `HomePage.vue` and `TaskPage.vue` to it. We will create a task list application with Vue. In `HomePage.vue` we will create a task display interface:


```jsx
   <template>
        <div class="px-4 py-20 text-center">
            <!-- top router link to taskpage.vue -->


          <div class="my-6 text-2xl ">Task List Application</div>
          <div class=" mt-10 flex justify-center items-center">
            <!-- tasks display -->
          </div>
            <!-- bottom router link to taskpage.vue -->
        </div>
      </template>
      <script setup>
      import ElButton from "@factor/ui/ElButton.vue";
      </script>
```


And in `TaskPage.vue`, we have:


```jsx
   <template>
        <div class="px-4 py-20 text-center">
          <div class="my-6">
            <!-- route to home -->
            <h1 class=" mt-4 font-bold text-2xl " >
                <!-- selected task here -->
            </h1>
          </div>
        </div>
      </template>
      <script setup>
      import ElButton from "@factor/ui/ElButton.vue";
      import { emitEvent, useMeta } from "@factor/api";
      </script>
```



## **Handling State**

To handle our application state in the `HomePage` component, we will define a set of tasks and a completion status:


```js
   //.. previous code above
    <script setup>
      import ElButton from "@factor/ui/ElButton.vue";
      import {ref} from "vue"
      //state management 
      const todoItems = ref([
            {id: 1, title: 'Learn React', completed: true},
            {id: 2, title: 'Learn Firebase', completed: false},
            {id: 3, title: 'Learn React Router', completed: false},
            {id: 4, title: 'Learn React Hooks', completed: false},
        ])
      </script>
```


Here, we have added an array of four task items, each with a completion status. We will iterate through this array and render a list of items:


```html
   <div class=" mt-10 flex justify-center items-center">
      <!-- tasks display -->
     <ul>
      <div v-for="item in todoItems" class=" flex flex-row items-center w-[600px] justify-between mb-6 px-5 py-6 border border-gray-400 " >
          <p class=" text-xl font-medium " >{{item.title}}</p>
          <p class=" text-base font-normal px-6 py-3 bg-blue-600 rounded-md text-white " >{{item.completed? "Task Completed": "Task Unfufilled"}}</p>
      </div>
     </ul>
    </div>
```


We returned each item's title and task completion value in the array. If `item.completed` is true, a value “Task Completed” will be displayed, and “Task Unfulfilled” will be displayed in the event `item.completed` is false.


## **Defining App Routes**

To create the application routes, create a file `routes.ts` in the `src` directory and add the following code:


```js
import { AppRoute } from "@factor/api";

export const routes = [
  new AppRoute({
    key: "home",
    path: "/",
    component: () => import("./components/HomePage.vue"),
  }),
  new AppRoute({
    key: "taskpage",
    path: "/taskpage",
    component: () => import("./components/TaskPage.vue"),
  }),
];
```


In this tutorial, we will demonstrate page routing in two ways: using the `router-link` component and using a button component `Elbutton`, from a factor UI dependency. In the `HomePage` component, add the following:


```jsx
    <!-- top router link to taskpage.vue -->
      <router-link to="/" class="font-bold text-2xl inline-block">
        <div>Reload Page</div>
      </router-link>
    // other code
    <!-- bottom router link to taskpage.vue -->
      <div class="my-6">
        <ElButton to="/taskpage" btn="secondary">Task View Page</ElButton>
      </div>
```


The first route will redirect to the `"``/``"` route, which houses the `HomePage` component. Therefore it will reload the page. While the `ElButton` component directs the user to the `"``/taskpage``"` route, where the `TaskPage` component is. In the `TaskPage` component, we will also add a route to return to the home page:


```jsx
    <template>
        <div class="px-4 py-20 text-center">
          <div class="my-6">
            <!-- route to home -->
            <ElButton to="/" btn="primary">Return to Task List</ElButton>
                <!-- selected task here -->
               <h1 class=" text-4xl text-blue-500 font-medium mt-24 " >My current Task is:</h1>
               <p class=" text-xl " >Study React</p>
          </div>
        </div>
      </template>
      <script setup>
      import ElButton from "@factor/ui/ElButton.vue";
      import { emitEvent, useMeta } from "@factor/api";
      </script>
```


Here we show a button to return to the `homepage` component and a task. To run the application in the CLI, enter the following command `npx factor dev`.


## **Final Results**

Running the application will produce the following result:

![FactorJS static web application preview](/unnamed.gif "image_tooltip")

## **Conclusion**

In this tutorial, we discussed FactorJS, its features and benefits, and demonstrated how it could be used with the VueJS framework to build a web application. Now that you learned how to build a static web application with FactorJS, how would you use it in your next project? You can learn more and add more features to the sample app from the [documentation](https://www.factorjs.org/docs).