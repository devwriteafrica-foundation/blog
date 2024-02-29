---
id: '9836c73d-70e7-42b7-8a3f-b20d993ae265'
date: { start_date: '2023-01-22' }
thumbnail: '/covers/how-to-implement-pagination-with-webiny-headless-cms-in-svelte.jpg'
type: [ 'Post' ]
slug: 'how-to-implement-pagination-with-webiny-headless-cms-in-svelte'
tags: [ 'Webiny' ,'Node.js','Opensource', 'Headless CMS' ]
author: [ { name: "Ekekenta Clinton", profile_photo: "/authors-avatar/ekekenta-clinton.png" } ]
title: 'How to implement Pagination with Webiny Headless CMS in Svelte'
status: [ 'Draft' ]
createdTime: 'Mon Jan 23 2023 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
---

## Introduction
When the amount of data displayed in a web application grows, the UI becomes distorted. Imagine having to scroll through a long list of items displayed on a table or a card; you can imagine how stressful that would be. Pagination solves this problem by dividing a large amount of content or product cards into pages, allowing users to browse the data on a website page by page. Also, considering the high demand for web applications, there is a need to increase the flexibility and scalability of web applications. In this article, we will learn how to implement pagination with Webiny Headless CMS in Svelte.

## What is Headless CMS?
A Headless CMS is a content management system in which content is stored at the tail end and made available via APIs to be displayed on the front end of any device, allowing for greater flexibility in the information display. It enables you to manage content in a single location while still being able to deploy it across any frontend you choose, as well as integrate content into any system, software, or website simply by calling the APIs exposed by the headless CMS.


## Prerequisites
To follow along with this tutorial, you need to have the following:

- Basic knowledge of Svelte
- An [AWS account](https://www.webiny.com/docs/infrastructure/aws/configure-aws-credentials) with credentials set up on your system.
- Have Node.js version 16 and yarn installed.

## Setting Up Webiny CMS
With the above requirements met, let's create a Webiny project with the following CLI command:
```sh
npx create-webiny-project blog-app
```
Once the installation is complete, we will deploy the Webiny project with the following command:

```sh
yarn webiny deploy
```
Once the deployment is completed, you'll be presented with the URL to access your Admin Area and finish the installation.

## Creating an Admin user

Here, fill out the form and create a new admin user account. Next, sign in with the created account credentials on the next page. Follow the steps to finish the setup. Install |18N, enter the application name in the page builder and click on the ”install” button:


## Create Content Model
To create a content model, click on the New content model button under headless CMS and create a new model called `blogs` as shown in the screenshot below.

![](https://i.imgur.com/E6kCJOz.png)


## Add Model Fields
For the model fields of our application, we will add four fields: a **text** field, one **rich text**, a **file**, and a **Boolean** field. After creating the fields, click on the **Save** button on the top left to add these changes.

![](https://i.imgur.com/h1hgisZ.png)

Next, click on the arrow at the top left to return to the content models screen, and click on view content on the created model:

![](https://i.imgur.com/aNElpDa.png)

Now go ahead and add some blog entries to the model.

## Setup Access Management

To use our Headless CMS in our Svelte application, we need to set up the access management on the settings tab. Click on **Settings**->**API Keys** -> **New API KEY**, enter the name of the key, and add a description. To allow your application to send a request to the API, check on the **Headless CMS** tab and grant the application full access.

![](https://i.imgur.com/dJao9Q7.png)

Now copy and save the token to a safe place. You'll need it later.


## Paginating a Svelte blog using next/previous
Let's proceed to use the data in the model and create the next/previous pagination in Svelte. To get started, run the commands below to scaffold and run a Svelte application.

```shell
npm create vite@latest frontend -- --template svelte
cd frontend
npm install
npm run dev
```

The above command will prompt you to select a framework and variant. Choose "svelte** for both. Then wait for the installation to be completed.

## Setup GraphQL Client
Once the installation is completed, let's set up a GraphQL client to connect the application to our Webiny CMS. To do that, we need to install apollo client and peer graphql by running the command blow.

```shell
$ npm install svelte-apollo @apollo/client graphql --save
```

Then add the code snippet below to the `App.svelte` file to connect to the Webiny CMS with ApolloClient.

```javascript
<script>
	import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
	import { setClient } from "svelte-apollo";
	import { query } from "svelte-apollo";

	const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "<YOUR HEADLESS READ API>",
	headers: {
	  Authorization: `Bearer <YOUR TOKEN>`,
	},
	});
	setClient(client);
</script>
```
In the above code snippet, we instantiate `ApolloClient` by passing in our headless read API and a new instance of `InMemoryCache` which is needed for caching solution. We are wrapping all of this in a function that will return the client. Then we use the setClient method to make it available to all the child components.
## Create Apolo Query
To get the data in our model, we need to create an Apolo query to request the data we need. Add the code snippet below to the `App.svelte` component.

```js
  const GET_BLOGS = gql`
    query getBlogs {
      listBlogs {
        data {
          title
          coverImage
		  content
        }
      }
    }
  `;

  const blogs = query(GET_BLOGS);
  (async () => {
    const result = await blogs.result();
    items = result.data.listBlogs.data;
  })();

  let items = [];
```
In the above code, we've requested data from our Webiny CMS model and queried the request. We created an immediately invoked async function to get the result from our query, we are doing this because the result returns a promise which we await in the function. Then we created an `items` variable to store the data from the result.

## Create Components
Let's create some components that we'll reuse throughout the application. To do that, create a `components` folder in the `src` directory. Then we'll start by creating a `Header.svelte` component for the navbar of the application. Add the code below to the `Header.svelte` file.

```javascript
<header>
  <ul class="header_content">
    <li><a href="/">Home</a></li>
    <li><a href="/">About</a></li>
    <li><a href="/" class="active">Blog</a></li>
    <li><a href="/">Contact</a></li>
  </ul>
</header>

<style>
  header{
    background: rgb(38, 93, 151);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-bottom: 30px;
  }
  .header_content{
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  @media(min-width: 768px){
    .header_content{
      gap: 50px;
    }
  }
  a.active{
    color: #fff
  }
</style>
```
In the above code, we've created the navbar of our application and added some style. These styles in this component are scoped to only this component.

Then create a `CardLayout.svelte` file component for the base layout of the application and add the code snippet below.

```javascript
<div class="grid">
  <slot></slot>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
    justify-items: center;
    align-items: center;
  }
  @media(min-width: 768px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
```
In this component, we have the `<slot>` element which will allow us to inject other components into the layout.


Next, create `CardItem.svelte` component and add the code snippets below to display the blog data from our Webiny CMS.

```javascript
<script>
  export let item;
</script>

<div class="card">
  <img src={item.coverImage} alt="" class="img-fluid">
  <h3 class="__title">{item.title}</h3>
  <p class="__text">
    quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum.
  </p>
  <a href="/">Read more</a> 
</div>
  
<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #b2bac2;
    background-color: #132f4c;
    color: #fff;
    border-radius: 15px;
    padding: 1rem;
    position: relative;
  }
  img{
    height: 160px;
    width: 100%;
    object-fit: cover;
  }
  .__title{
    font-size: 1rem;
    font-weight: medium;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .__text{
    font-size: 0.9rem;
    font-weight: normal;
  }
  a{
    background: #8EA0F3;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
  }
</style>
```
This component will accept items as props which will give us access to each blog object in our model.

Then, create an Overlay.svelte component and add the code snippet below to apply a loading animation during the wait while we request data from the Webiny CMS using GraphQL.

```javascript
<script>
  import { fade } from 'svelte/transition';
</script>

<div class="overlay" transition:fade="{{delay: 0, duration: 300}}">
  <p>Loading...</p>
</div>

<style>
  .overlay{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .overlay p{
    font-size: 20px;
  }
  @media(min-width: 992px){
    .overlay p{
      font-size: 40px;
    }
  }
</style>
```
## Paginate Contents
Now let's display the contents from our API to the users and have them paginated. To get started, we need to import the components into the `App.svelte` component and create the application UI with the code snippet below.

```javascript
<script>
   //...
  import Header from "./components/Header.svelte";
  import CardLayout from "./components/CardLayout.svelte";
  import CardItem from "./components/CardItem.svelte";
</script>
```
Then we'll install the svelte-paginate package and a Svelte plugin for paginating your data in no time.

```shell
npm install -S svelte-paginate
```

Then add the code snippet below `App.svelte` components' script tag.

```javascript
<script>
   //...
 import { paginate, PaginationNav, LightPaginationNav } from "svelte-paginate";

 let currentPage = 1;
 let pageSize = 3;

 $: paginatedItems = paginate({ items, pageSize, currentPage });
</script>
```

In the code above, we're paginating the data in the items list we created. So instead of displaying the list directly, we first pass it into the paginate function to return a subset of the list that we should display based on the current page and the page size. To quickly see the effect of this, we set the `pageSize` to **3** (We'll show three data per page). To update the displayed paginated items whenever the currentPage changes, we defined `paginatedItems` as computed data.

Next show the UI with the code snippet below.

```jsx
<!-- ... -->
<main>
  <Header />
  {#if $blogs.loading}
    <Overlay />
  {/if}
  <div class="container">
    <CardLayout>
      {#await paginatedItems}
        <Overlay />
      {:then items}
        {#each items as item}
          <CardItem {item} />
        {/each}
      {/await}
    </CardLayout>

    <!-- Pagination -->
    <div class="pagination">
      <!-- Shows prev/next text -->
      <div class="pagination_nav">
        <PaginationNav
          totalItems={items.length}
          {pageSize}
          {currentPage}
          limit={1}
          showStepOptions={true}
          on:setPage={(e) => (currentPage = e.detail.page)}
        >
          <span slot="prev"> Prev </span>
          <span slot="ellipsis">|</span>
          <span slot="next"> Next </span>
        </PaginationNav>
      </div>
    </div>
  </div>
</main>
```
In the above code, we used the `<PaginationNav>` to paginate the content using a next/prev button. The `<PaginationNav>` components take in the following props:

- totalItems: the total number of the original list (unpaginated list).
- pageSize: the number of items displayed per page.
- currentPage: the currently selected page.
- limit: the maximum number of the displayed links.


Now add the styles below to the App.svelte component to style the paginations.

```css
<style>
  .pagination :global(.pagination-nav) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .pagination_nav :global(.option.number) {
    display: none;
  }
  .pagination :global(.option) {
    color: rgb(51, 51, 51);
    padding: 10px 7px;
    cursor: pointer;
  }

  @media (min-width: 992px) {
    .pagination :global(.option) {
      padding: 10px 15px !important;
    }
  }

  .pagination :global(.option.active) {
    color: #fff;
    background: rgb(38, 93, 151);
  }

  .pagination :global(.option.disabled) {
    color: #999;
    cursor: not-allowed;
  }
</style>
```

If you refresh your browser, you should see the out on the screenshot below.

![](https://i.imgur.com/JAZtQpJ.png)

Now you can click the next button to view the data on the next page.

![](https://i.imgur.com/uA0SSQY.png)


## Paginating with numbered pages
We have paginated our Svelte application with numbered pages, let's paginate it with numbered pages by adding the code snippet below.

```jsx
<main>
<!-- ... -->
	
 <div class="pagination">
 <!-- Shows numbered pages-->
  <LightPaginationNav
	totalItems={items.length}
	{pageSize}
	{currentPage}
	limit={1}
	showStepOptions={true}
	on:setPage={(e) => (currentPage = e.detail.page)}
  />
	  
  <!-- ... -->
 </div>
</main>
```

Now if you refresh the browser again, this time you will see both the next/previous pagination and the numbered pages pagination as shown in the screenshot below.

![](https://i.imgur.com/kXvfkth.png)


## Conclusion
I'm glad you made it to this point. In this tutorial, we learned about how to implement Pagination with Webiny Headless CMS in Svelte by building a blog application. The code for this tutorial is available on [Github](https://github.com/icode247/webiny-svelte).
