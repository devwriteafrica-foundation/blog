---
id: '9836c73d-70e7-42b7-8a3f-b20d993ae265'
date: { start_date: '2023-09-16' }
thumbnail: '/covers/building-a-full-stack-application-with-remult-using-react-frontend.jpg'
type: [ 'Post' ]
slug: 'building-a-full-stack-application-with-remult-using-react-frontend'
tags: [ 'fullstack' ,'Remult', 'react', 'postgress' ]
author: [ { name: "Ekekenta Clinton", profile_photo: "/authors-avatar/ekekenta-clinton.png" } ]
title: 'Building a Full-Stack Application with Remult using React Frontend'
status: [ 'Public' ]
createdTime: 'Mon Sept 16 2023 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
---

## Introduction
Building a full-stack application can be very hectic for developers because of the operations involved, from setting up the server to building the front end and consuming the backend APIs. Things can be more hectic when you are working with two different tech stacks. However, since the introduction of Node.js and other Javascript frameworks, things have been a little bit simpler for Javascript developers because they can now create full-stack applications using Javascript without having to learn a different language for the backend. Remult has made things much more manageable by enabling developers to create a full-stack application in a single application without needing to set up an application for the project's server side.

In this tutorial, you'll learn how to build a full-stack application using Remult and React Frontend.

## Intro to Remult

Remult is a full-stack Typescript CRUD framework that uses entities to provide your API with a single source of information. 
Both a server ORM and a frontend type-safe API client are included. As a result, developers' time is saved, and a more flexible web application is created by abstracting all redundant or poorly written code. 
The creation of full-stack apps is facilitated by using only TypeScript code, which is easy to read and refactor and fits well into any new or current project.

Remult is now popular due to its secure auto-generated Typescript API model, classes that are consumed by type-safe frontend queries that can also be used as third-party applications, the ability to create CRUD applications that can be consumed directly by the Frontend without additional boilerplates, and use of a type-safe coding style to find and manipulate data in both the backend and frontend code.

## Prerequisites
To get the best out of this tutorial, ensure you have the following tools installed on your computer.
- Node.js version 14 or later.
- PostgreSQL database.

Prior knowledge of Javascript is also required. The code for this tutorial is available [here](https://github.com/Claradev32/Remult-todo-app) on GitHub. Feel free to clone and follow along.

## Getting started
Let's start by cloning the Remult React starter application by running the command below on our terminal.

```sh
git clone https://github.com/remult/react-vite-express-starter.git todo-app
```

Then change the directory into the project folder and install the required packages in the `package.json` file by running the command below.

```sh
cd todo-app
npm install 
```
Once the installation is completed, open the application in your favourite IDE.

Now let's take a closer look at some of the files created in started project:
1. We have the `tsconfig.server.json` and `tsconfig.node.json` files which are the Typescript configurations for the server and front. We have another `tsconfig.json` file, the general Typescript configurations for both the server and Frontend. In this file, there is a `compilerOptions` section that enables the use of decorators in the React app.
2. There is a `vite.config.ts` file where the proxy is configured to divert all calls for http://localhost:5173/api to our dev API server.

## Setting up the Backend
Now let's set up the backend part of our application to connect the application to a PostgreSQL database, create entities, create table relationships and implement user authentication.

### Connecting to Database
Let's start by connecting the application to a PostgreSQL database. But first, initilize your PostgreSQL database locally to ensure it's online with the command:

```sh
docker run --name todo-postgres -e POSTGRES_PASSWORD=postgres_password -d postgres -p 5432
```

Next, install the PostgreSQL package with the command below.

```sh
npm i pg
```
Then, we'll do that in the `server/index.ts` file with the code snippets below.

```js
import { api } from "./api";
import express from "express";
import { remultExpress } from "remult/remult-express";
import { createPostgresConnection } from "remult/postgres";

const app = express();

const connectionString = process.env.DATABASE_URL ||
  "postgresql://postgres:1234@localhost:5432/todo-app?schema=schema$prod"; // Default: process.env.DATABASE_URL
app.use(
  remultExpress({
    dataProvider: () =>
      createPostgresConnection({
        connectionString: process.env.DATABASE_URL, // Default: process.env.DATABASE_URL
        autoCreateTables: true, // Entities will be synced with the database. Default: true
      }),
  })
);
app.use(api);
app.listen(3002, () => console.log("Server started"));
```
In our code snippet, we `remultExpress` middleware which takes in a `dataProvider` object to connect the application to a PostgreSQL database using the `createPostgresConnection`. This function takes in the database credentials as parameters.

### Creating Entities
With the database connection, let's create some entities for our application. We'll make two entities, one for storing the user's records and the other for storing each registered user's todos. So first, create a `shared` folder in the `server` directory. Then in the `shared` folder, create a `user.ts` file and add the code snippets below.

```js
import { Entity, Fields, IdEntity } from 'remult';

@Entity('users', {
    allowApiCrud: true
})
export class User extends IdEntity{

    @Fields.string()
    name = '';

    @Fields.string()
    email = '';

    @Fields.string()
    password = '';
}
```
In the above code snippet, we define our User entity using the `@Entity` decorator and the properties using the `@Field` decorator.

Next, create a `todo.ts` file in the **shared** folder and add the code snippet below. 

```js
import { Allow, Entity, Fields, IdEntity } from 'remult';

@Entity('todos', {
    allowApiCrud: Allow.authenticated
})
export class Todo extends IdEntity {
    @Fields.string()
    userId!: string;

    @Fields.string()
    name = '';

    @Fields.boolean()
    completed = false;
}
```
Here we also defined our `Todo` entity class using the `@Entity` decorator and enabled CRUD operation for only authenticated users using the `Allow.authenticated` method.

### Creating Table Relationship
Now we need to assign each todo to the user that created them. We need to implement table relationships in our User entity to do that. Update the code in the user.ts file with the code snippet below.

```js
import { Entity, Fields,IdEntity } from 'remult';
import { Todo } from './todo';

@Entity('users', {
    allowApiCrud: true
})
export class User extends IdEntity{

    @Fields.string()
    name = '';

    @Fields.string()
    email = '';

    @Fields.string()
    password = '';

    @Fields.object<Todo>((options, remult) => {
        options.serverExpression = async (user) =>
            remult.repo(Todo).find({ where: { userId: user.id } })
    })
    todo!: Todo[]

}
```
Here we added another field to allow each todo created to be referenced in the users' entity by its id.

In the server's `api.ts` file, register the **Todo** and **User** entities with Remult by including it in the `entities` array within the options object passed to the `remultExpress()` middleware. The new line should look like this:

```js
import { remultExpress } from 'remult/remult-express';
import { User } from './shared/user';
import { Todo } from './shared/todo';

export const api = remultExpress({
    entities: [User, Todo]
});
```

### Implements User Authentication
We need to add some level of security to the application to allow only authenticated users access to the application. To do that, we need to implement user authentication. This is a straightforward process with Remult. But first, you must install the express session-cookies package with the below command.

```sh
npm i cookie-session express-session
npm i --save-dev @types/cookie-session @types/express-session
```

Then create an `auth.ts` file in the `server`  folder and add the code snippets below:

```js
import express, { Router, Request, Response } from "express";
import { remultExpress } from "remult/remult-express";
import { remult } from "remult";
import { User } from "./shared/user";
import { Session } from "express-session";
import { Todo } from "./shared/todo";

export interface ISession extends Session {
  name?: string;
  email?: string;
  password: string;
}

const api = remultExpress({});

export const auth = Router();

auth.use(express.json());

auth.post(
  "/api/signUp",
  api.withRemult,
  async (req: Request, res: Response) => {
    const user = await remult
      .repo(User)
      .save({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    res.json(user);
  }
);

auth.post(
  "/api/signIn",
  api.withRemult,
  async (req: Request, res: Response) => {
    const user = await remult
      .repo(User)
      .find({ where: { email: req.body.email } });
    if (user.length > 1) {
      if (user[0].password == req.body.password) {
        (req.session as ISession).id = user[0].id;
        res.json(user);
      }
    } else {
      res.status(404).json("Invalid user or password");
    }
  }
);
auth.post("/api/createTodo",
api.withRemult,
async (req: Request, res: Response) => {
  const todo = await remult
    .repo(Todo)
    .save({ name:req.body.name, userId: req.session.id});
    res.json(todo)
})
auth.get(
  "/api/getTodo",
  api.withRemult,
  async (req: Request, res: Response) => {
    const user = await remult
      .repo(User)
      .find({ where: { id: req.session.id } });
      res.json(user[0]?.todo)
  }
);
auth.post("/api/signOut", (req, res) => {
  req.session.id = "";
  res.json("signed out");
});

auth.get("/api/currentUser", (req, res) => res.json(req.session.id));
```
In the above code snippet, we created our express endpoint to authenticate a user, store their record in a session, signup a user, get each user and sign in a user out of the application by clearing their Session. Now update the code in the `server/index.ts` file with the code below to use the cookies-session and the auth middlewares.

```js
//...

import session from "cookie-session";

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET || "my secret"
}));

//...
```
> Add your SESSION_SECRET variable in your `.env` file for security purposes.

## Setting up the Frontend
At this point, we are done with the backend. Next, let's move on to the frontend part of the application. Let's start by creating the UI of the application and displaying the user's todos with the code snippet below.

```js
import { useEffect, useState } from "react";
import "./App.css";
import { Todo } from "./server/shared/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>();
  const [name, setName] = useState('');

  const create = async (e: any) => {
    e.preventDefault();
    const result = await fetch('/api/createTodo', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    if (result.ok) {
      setName("");
    }
    else alert(await result.json());
  }
  useEffect(() => {
    fetch('/api/getTodo').then(r => r.json())
      .then(async todosData => {
        setTodos(todosData)
      });
  },[todos]);

  return (
    <div className="container">
      <div className="task-tab">
        <h4>Todos</h4>
        <hr />
        <div>
          <form className="form">
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name}/>
            <button type="button" onClick={create}>Add</button>
          </form>
        </div>
        <div className="task-list">
          <ul>
            {
              todos?.map((todo) => {
                return (
                  <li key={todo.id}>
                    <p>{todo.name}</p>
                    <input type="checkbox" name="brand" id="" />
                  </li>
                )
              })}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

```
In the above code snippet, we created two functions to fetch users' todos from the backend API and to create a new todo using the fetch API. Then we created state variables to store the todos and the current user's details. Then update the code in the `App.css` file with the stylesheets below.

```css
body{
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	font-family: 'Jost', sans-serif;

}
.main{
	width: 350px;
	height: 500px;
	background: red;
	overflow: hidden;
	background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
}
#chk{
	display: none;
}
.signup{
	position: relative;
	width:100%;
	height: 100%;
}
label{
	color: #000;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 60px;
	font-weight: bold;
	cursor: pointer;
	transition: .5s ease-in-out;
}
input{
	width: 60%;
	height: 20px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
}
button{
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #573b8a;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
button:hover{
	background: #6d44b8;
}
.login{
	height: 460px;
	background: #eee;
	border-radius: 60% / 10%;
	transform: translateY(-180px);
	transition: .8s ease-in-out;
}
.login label{
	color: #573b8a;
	transform: scale(.6);
}

#chk:checked ~ .login{
	transform: translateY(-500px);
}
#chk:checked ~ .login label{
	transform: scale(1);	
}
#chk:checked ~ .signup label{
	transform: scale(.6);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.container .task-tab {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  padding: 20px;
}
.container .task-tab h4 {
  margin-bottom: 5px;
  font-size: 25px;
}

.container .task-tab .form {
  width: 400px;
  display: flex;
  margin-top: 5px;
}

.container .task-tab .form button {
  padding: 10px;
  border: 1px solid rgb(217, 217, 217);
  border-left: 0px;
}
.container .task-tab .form input {
  width: 100%;
  padding: 10px;
  outline: none;
  border: 1px solid rgb(217, 217, 217);
  border-right: 0px;
}
.container .task-list ul li {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(230, 235, 235);
  margin-top: 10px;
  margin-bottom: 10px;
}
.container .task-list ul li .done {
  text-decoration: line-through;
}

```

If you refresh the application, you should see the output below:
![RemultJS todo application preview](https://i.imgur.com/QgH4eFi.png)

Next, create an `Auth.ts` component in the **src** folder and add the code snippets below to implement the Authentication in the Frontend.

```js
import { use } from "passport";
import { useState, useEffect } from "react";
import UserAuth from "./components/UserAuth";
import { Todo } from "./server/shared/todo";
import { User } from "./server/shared/user";


const Auth: React.FC<{ children: JSX.Element }> = ({ children }) => {

    const [currentUser, setCurrentUser] = useState<User>();
    const [todos, setTodos] = useState<Todo[]>()

    const signOut = async () => {
        await fetch('/api/signOut', {
            method: "POST"
        });
        setCurrentUser(undefined);
    }
    if (!currentUser)
        return (
            <UserAuth setCurrentUser={setCurrentUser} />
        )
    return <>
        <button onClick={signOut}>Sign Out</button>
        {children}
    </>
}
export default Auth;
```
In the above code snippet, we created an **Auth** component. This component will render the **App** component when a user is signed in and display a Signout button. And when the user is signed out or not logged in, it will display the sign-in/sign-out form. 

Now update the code in the `main.ts` file to wrap the **App** component with the Auth component.

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Auth from './Auth'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth>
      <App />
    </Auth>
  </React.StrictMode>
)
```
Lastly, create a component folder in the src directory. Inside the component folder, create **UserAuth** component to render the signup/sign in form with the code snippets below.

```js
import { useState } from "react";

const UserAuth = (props: any) => {
    const { setCurrentUser } = props
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async (e: any) => {
        e.preventDefault();
        const result = await fetch('/api/signUp', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        if (result.ok) {
            setCurrentUser(await result.json());
            setEmail("");
            setPassword("")
        }
        else alert(await result.json());
    }

    const signIn = async (e:any) => {
        e.preventDefault();
        const result = await fetch('/api/signIn', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (result.ok) {
            setCurrentUser(await result.json());
            setEmail("");
            setPassword("")
        }
        else alert(await result.json());
    }
    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="signup">
                <form onSubmit={signUp}>
                    <label htmlFor="chk" aria-hidden="true">Sign up</label>
                    <input type="text" name="txt" placeholder="User name" onChange={(e) => setName(e.target.value)} />
                    <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="pswd" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button>Sign up</button>
                </form>
            </div>

            <div className="login">
                <form onSubmit={signIn}>
                    <label htmlFor="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="pswd" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default UserAuth
```
So if you refresh the application, the UserAuth component will be rendered for a user to signup or sign in as shown below:

![RemultJs auth component preview](https://i.imgur.com/L4OjOTd.png)

## Conslusion
This tutorial explored how to build a Full-Stack Application with Remult using React Frontend. First, we discussed what Remult is all about and why developers should consider using this framework. Then, to illustrate this point, we showed how to build a blog application demonstration table relationship and Authentication.

To learn more about Remults's features, visit the official [documentation](https://remult.dev/).
