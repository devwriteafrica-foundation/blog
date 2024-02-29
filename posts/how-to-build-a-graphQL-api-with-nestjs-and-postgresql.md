---
id: '9836c73d-70e7-42b7-8a3f-b20d993ae265'
date: { start_date: '2023-11-08' }
thumbnail: '/covers/how-to-build-a-graphQL-api-with-nestjs-and-postgresql.jpg'
type: [ 'Post' ]
slug: 'how-to-build-a-graphQL-api-with-nestjs-and-postgresql'
tags: [ 'GraphQL' ,'Node.js','Opensource', 'API', 'Nest.js', 'PostgresSQL' ]
author: [ { name: "Ekekenta Clinton", profile_photo: "/authors-avatar/ekekenta-clinton.png" } ]
title: 'How to build a GraphQL API with NestJS and PostgreSQL'
status: [ 'Public' ]
createdTime: 'Mon Nov 08 2023 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
---


## Introduction
This tutorial will guide you through how to create a GraphQL API in Nestjs and PostgreSQL. You'll create a NestJS application, connect to a PostgreSQL database, and create a GraphQL API.

## What is GraphQL?
GraphQL is an open-source data query language designed for querying and modifying data in APIs. GraphQL allows you to respond to API queries using your current data and the GraphQL query language. With GraphQL, you can provide customers with the freedom to ask for only the information they require and nothing more; easily evolve your API over time, and enable strong developer tools. GraphQL also gives clients a clear and understandable description of the data in your API.

## Prerequisites
Before getting started with this tutorial, ensure you have the following tools installed.
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## Setting Up a New Application
Once you've met the above requirements, move forward by installing the Nestjs CLI and initiating a new project with the following commands:
```sh
npm i -g @nestjs/cli
nest new 
```
The above commands will initiate the installation of the Nestjs CLI and the create a new Nestjs project.

## Adding GraphQL
After the NestJS project has been created, move on to the next step—adding GraphQL to the application. To get started, install the project dependencies with the command below: 

```sh
npm i --save @nestjs/graphql graphql-tools graphql apollo-server-express pg @nestjs/typeorm typeorm 
```
In the above command, you’ve installed the Apolo GraphQL server, which Nestjs uses to connect Nestjs to GraphQL. You've also pg PostgreSQL module: it will enable you to connect your application to a PostgreSQL database and perform operations on it.

Next, import the `GraphQLModule` into the `AppModule` located in the `src/app.module.ts` file. 

```javascript
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, UserService],
})
export class AppModule { }
```
In the above code snippet, we used `GraphQLModule` which is a wrapper over Apollo Server to configure using the `forRoot method, which is of type `ApolloDriverConfig`. The forRoot method accepts two required options, the `driver` and `autoSchemaFile` which takes the `ApolloDriver` and the schema file.

## Setting Up a PostgreSQL Database
With the Apolo server setup, let's connect the application to your PostgreSQL database. We'll do that using an Object Relational Mapper (ORM). Nestjs supports a couple of them. It is recommended by the Nestjs team to use PostgreSQL with TypeORM. To get started, we'll import the `TypeOrmModule` into the `AppModule`.

```javascript
//...
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    //...
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '<USER>',
      password: '<PASSWORD>',
      database: '<DATABASE NAME>',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, UserService],
})
export class AppModule { }
```
In the above code snippet, we connected to your PostgreSQL using the `forRoot` method and passed the database credentials.

> Create a PostgreSQL user and database and replace the database user with `<USER>`, database name with the `<DATABASE NAME>` and password `<PASSWORD>`. 

## Creating Entity
Now that you've connected to your PostgreSQL, let's define the entity schema for the application. To do that, create a `model` folder in the src directory. In the model folder, create a `user.entity.ts` file and define a `userEntity` with the code snippet below.

```javascript
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
```
In the provided code snippet, we imported in the necessary decorators for entity creation. The used the decortors o define the properties of the entity. We have the `id` field to generate random id’s for each record in the database using the `@PrimaryGeneratedColumn()` decorator, the **name**, **email**, and **password** field using the `@Column` decorator, the **createdAt** and **updatedAt** fields to save the date a record was created and updated using the `@CreateDateColumn()` and `@UpdateDateColumn()`.

> Your entity file name should have a `.entity.ts` or `.entity.js` extension. Because the `TypeOrmModule` will look for files with those extensions and load convert to a database table.

Then add the userEntity to the AppModule using the `TypeOrmModule` **forFeature**  

```javascript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserEntity } from './models/user/user.entity';
import { UserResolver } from './models/user/user.resolver';
import { UserService } from './user/user.service';

@Module({
  imports: [
    //...
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, UserService],
})
export class AppModule { }

```
## Creating User Service
With the schema defined, proceed with the next step to create a service to Perform CRUD operations on the `userEntity` schema. First, run the command below to create a user service.

```
nest generate service user
```
The above command will create a `user/user.service.ts` file in the `src` directory where you'll create your user service with code snippets below.

```javascript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async create(name: string, email: string, password: string): Promise<UserEntity> {
        return await this.userRepository.save({ name, email, password });
    }

    async update(id: number, name: string, email: string): Promise<UserEntity> {
        await this.userRepository.update(id, { name, email });
        return await this.userRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        await this.userRepository.delete(id);
        return user;
    }
}
```

## Creating Resolvers, Mutations, and Query
A GraphQL operation (a query, mutation, or subscription) can be converted into data using resolvers, which offer instructions. Either a promise for that data or the type of data we specified in our schema is returned by them. Now let's proceed to create our resolver function. To get started, create a `user.type.ts` file in the **model** folder and define the types for `userEntity` with the code snippet below.

```javascript
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class UserType {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
```
In the above code snippet, we decorated the `UserType` class with the `@ObjectType()` decorator which tells Nestjs that the class is an object class. Then we used the `@Field()` decorator to provide metadata about each field’s GraphQL type and optionality.

Next, create a `user.resolver.ts` file in the **models** folder and add the code snippets below.

```javascript
import { UserService } from 'src/user/user.service';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserEntity } from "./user.entity";
import { UserType } from "./user.types";

@Resolver(of => UserEntity)
export class UserResolver {
    constructor(
        @Inject(UserService) private readonly blogService: UserService,
    ) { }

    @Mutation(returns => UserType)
    async createUser(
        @Args('name') name: string,
        @Args('email') email: string,
        @Args('password') password: string,
    ) {
        const user = await this.blogService.create(name, email,password);
        return user
    }

    @Query(returns => [UserType])
    async getUsers() {
        return await this.blogService.findAll();
    }

    @Query(returns => UserType)
    async getUser(@Args('id') id: number) {
        return await this.blogService.findOne(id);
    }

    @Mutation(returns => UserType)
    async updateUser(
        @Args('id') id: number,
        @Args('name') name: string,
        @Args('email') email: string,
    ) {
        return await this.blogService.update(id, name, email);
    }
    @Mutation(returns => UserType)
    async deleteUser(@Args('id') id: number) {
        return await this.blogService.delete(id);
    }
    
}
```
In the above code snippet, we create our resolver function using the `@Resolver()` decorator and consumed our user services. The `@Resolver()` decorator accepts an optional argument that is used to specify the parent of a field resolver function. For each method that is a query handler, we decorated them with the `@Query` decorator and the `@Mutation` decorator for all the methods that create or modify the record in our database. The `@Args()` decorator is used to extracting arguments from a request for use in the query handler.

## Testing the API
Now let's test the GrapQL APIs. To do that, run the server with the command below.

```sh
npm start
```

Then open the GraphQL playground on your browser by navigating to the URL [`localhost:3000/graphql` ](http://localhost:3000/graphql). 
Then create a new user as shown on the screenshot below.

![NestJS GraphQl playground preview](https://i.imgur.com/QNmt0w5.png)

Next, fetch all the users as shown in the screenshot below.
![Fetch data from NestJS GraphQL playground](https://i.imgur.com/uonqNUk.png)


## Conclusion
Through this tutorial, you’ve learned how to create a GraphQL API with NestJS and PostgreSQL. You’ve learned how to connect to a PostgreSQL database using TypeORM and Apolo server. You have also created an entity and created a GraphQL API. Now that you have gotten the knowledge you seek, how would use GraphQL in your next Nestjs project? Feel free to learn more about [GraphQL](https://graphql.org/) and [TypeORM](https://typeorm.io/).