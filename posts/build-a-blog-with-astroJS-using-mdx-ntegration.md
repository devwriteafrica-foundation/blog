---
id: '9836c73d-70e7-42b7-8a3f-b20d993ae265'
date: { start_date: '2023-09-01' }
thumbnail: '/covers/build-a-blog-with-astroJS-using-mdx-integration.jpg'
type: [ 'Post' ] 
slug: 'build-a-blog-with-astroJS-using-mdx-ntegration'
tags: [ 'MDX' ,'Astro.js', 'WYSIWYG editors' ]
author: [ { name: "Ekekenta Clinton", profile_photo: "/authors-avatar/ekekenta-clinton.png" } ]
title: 'Build a blog with AstroJS using MDX Integration'
status: [ 'Public' ]
createdTime: 'Mon Sept 1 2023 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
---

## Introduction

In this tutorial, readers will learn about Astro, its features, and why they should consider using Astro. They will also learn how to build an application with AstroJS by working on a blog app with MDX integration. MDX is a Markdown extension that allows the user include JSX along with the Markdown. Markdown is a writing style that is a widely used and acceptable pattern, as it is quickly learned and allows both technical and non-technical parties to create and manage content. Unlike WYSIWYG editors, Markdown will enable users to apply text formatting and insert media elements with simple symbols and writing patterns.

## What is Astro

Astro is a JavaScript framework for creating static multi-page web applications, which minimizes the use of JavaScript, boosts the speed and loading time of static websites, and adds JavaScript when necessary. It was built specifically for content-driven web applications and did not aim to compete with other popular frameworks; instead, it can be used as a tool and integrated to work together with other frameworks. Other such libraries for creating static web applications, that can be integrated with popular frameworks are: [Jekyll](https://jekyllrb.com/), [Gatsby](https://www.gatsbyjs.com/), [MiddleMan](https://middlemanapp.com/) and [Mkdocs](https://www.mkdocs.org/).

## Why use Astro

Below are the reasons why AstroJS is a good choice for your next project:

- Easy learning curve: AstroJS uses HTML, CSS, JavaScript and your knowledge of other existing frameworks. There is no need to learn a new syntax or coding pattern, so it is easy to learn and integrate for use.
- AstroJS creates zero-JavaScript static web applications, rendering them to static HTML at build-time. This makes web pages load faster and more seamlessly. Allowing the user to use client-side JavaScript when required.
- 
## Prerequisites

To work with Astro,  you will need to meet the following criteria:

- Have a working version of Node.js installed on your computer
- Be knowledgeable in HTML, CSS, and JavaScript.
## Project Setup

To get started with AstroJS, you must create an Astro project using the CLI. On your local machine, navigate to a directory of your choice and enter the following command in a CLI:

```bash
npm create astro@latest
```
Follow the prompts to create your Astro application. This tutorial will use the basic template with a simple TypeScript setup. Once your installation is complete, open up your application in your choice code editor. 

To add MDX support to our Astro application, we will install the following dependencies

```bash!
npx astro add mdx
```

To preview the current state of your application, run `npm run dev` in the CLI and open up the localhost URL in your browser. The result you will get is similar to the image below:

![Preview AstroJS starter page](https://i.imgur.com/I062Shb.png)

## Creating App Components

For our application, we will create two primary components, a hero and a card component. To do this, create two files in the `components` folder: `Hero.astro` and `BlogCards.astro`.
In `Hero.astro`, add the following code:
```js
    ---
    export interface Props {
      welcome: string;
      body: string;
    }
    const { welcome, body } = Astro.props;
    ---
    <div class="hero">
      <h2>{welcome}</h2>
      <p>{body}. <strong>Dive in!</strong></p>
    </div>
```
In the code above, we have a basic Astro layout. Astro uses a superset of JavaScript, unlike other popular frameworks such as React, which uses JSX. JavaScript and TypeScript are enclosed in triple dashes (---), marking the start and end of the code blocks. Here, we have defined two props `welcome` and `body` of type String. We will pass the values of these props from our `index` file and display them as desired.

To create the card components for our blog content, add the following code to `BlogCard.astro`:
```js
    ---
    export interface Props {
        title: string;
        summary: string;
    }
    const { title, summary } = Astro.props;
    ---
    <li class="link-card">
        <a href="#">
            <h2>
                {title}
                <span>&rarr;</span>
            </h2>
            <p>{summary}</p>
        </a>
    </li>
    
```
Here, we have the cards, displaying the title and summary of our content as props.

## Creating App Layout

As the name `layout` implies, this component will wrap around other pages. It can be used to prevent repetitive coding of content that is to be available on different pages, such as navigation bars, headers, footers, etc. In the `layouts` folder, edit `Layout.astro` as shown below:
```js
    ---
    export interface Props {
      title: string;
    }
    const { title } = Astro.props;
    ---
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="generator" content={Astro.generator} />
        <title>{title}</title>
      </head>
      <body>
        <div class="navbar">
          <!-- header and navigation -->
          <p class="nav-text">My Astro Blog</p>
          <div class="return">
              <a href="/">Return Home</a>
              <span>&rarr;</span>
          </div>
        </div>
        <slot />
        <footer class="footer">
          <!-- footer -->
          <p>Thank you for visiting</p>
        </footer>
      </body>
```
In the code block above, we have our page's navigation bar and footer. We are also using a `title` prop for our page.

## Creating App MDX Page

In this section, we will create the landing page for our blog application. In `index.astro` add the following code:
```js
    ---
    import Layout from "../layouts/Layout.astro";
    import BlogCard from "../components/BlogCard.astro";
    import Hero from "../components/Hero.astro";
    ---
    <Layout title="Welcome to Astro.">
      <main>
        <div class="hero-cont">
          <Hero
            welcome="Welcome to my Astro blog."
            body="A fast and scalable blog covering numerous topics and thoughts."
          />
        </div>
        <p class="prompt-text">
          <code>Code</code> and <code>Techinal</code> articles. Have a look<br />
          <strong>Look through all our amazing content...</strong>
        </p>
        <ul role="list" class="link-card-grid">
          <!-- Blog cards will be displayed here -->
        </ul>
      </main>
    </Layout>
```
In the code block above, we added the `layout`, `hero` and `blog card` components. We will add some mdx files, and display the cards on the page in the space provided. In the `src` directory, create a folder called `posts`. In this folder, create three files, `example1.mdx`, `example2.mdx`, and `example3.mdx`, respectively. In these files, add the following:
```md
---
title: This is My First Article Post
summary: A summary is a short piece of information, spanning all your write-up aims to pass across, or teach prospective readers
slugUrl: first-article-slug-url
---

import "./postStyles.css";

<div class="title">
  <h1>{frontmatter.title}</h1>
</div>

<div>
# A H1 title

> Some text with a blockquote

## A H2 heading example here

This is a _bold text_. Bullet list below:

- Bullet one
- Bullet two
- Bullet three
  - Sub bullet here - another sub category
</div>

```js
const sayHello()
```

Since we are working with `MDX` we can make use of JSX and Stylesheets in our file alongside Markdown. In the `posts` directory create a new file `postStyles.css` and add the following styles:
```css
.title {
    font-size: 1.6rem;
    font-weight: 700;
    padding: 5rem 0;
    margin-bottom: 3rem;
    text-align: center;
    background: #ddd;
  }

```
To differentiate the posts, we will modify the title and slug of the `example1.mdx`  and `example2.mdx` as shown below:
```md
    ----
    // for example2.mdx
    title: This is my Second Article
    summary: A summary is a short piece of information, spanning all your write-up aims to pass across, or teach prospective readers
    slugUrl: second-article-slug-url
    ---
    
    ---
    // for example3.mdx
    title: This is my Third Article
    summary: A summary is a short piece of information, spanning all your write-up aims to pass across, or teach prospective readers
    slugUrl: third-article-slug-url
    ---
```

Since we are working with `MDX` we can also create and import a custom component. We will create and add a custom component for an information box. In the `posts` directory, create a new file `InfoBox.astro`. In this file, we will create the Information component as follows:
```js
---
export interface Props {
  information: {};
}
const { information } = Astro.props;
---

<div class="info-cont">
  <p class="info-text">{information}</p>
</div>
```

We can add this component in our mdx files as follows:
```mdx
//import for InfoBox container
import InfoBox from "./InfoBox.astro";
```

Then pass the information to the `InfoBox` container as a prop:
```js
<InfoBox information={"This is some important information that you should know"} >
</InfoBox>
```

Next, we will fetch all our posts from our `index.astro` file:
```js
    const post = await Astro.glob("../posts/*mdx")
```
Here, we are fetching all the files from the `posts` directory with a `.mdx` file extension. We can then display the cards, using the `BlogCard` component, in our `index.astro` file as shown below:
```js
    <ul role="list" class="link-card-grid">
      <!-- Blog cards will be displayed here -->
      {post.map((post) => {
        return (
          <BlogCard
            title={post.frontmatter.title}
            summary={post.frontmatter.summary}
          />
        );
      })}
    </ul>
```
In the code above, we are mapping through the data returned to the `post` variable; our markdown files, and we are passing each file’s title and summary as `props` to the `BlogCard` component to display it.

## Adding Routes

For each card in our blog posts, we will add an anchor tag containing the selected post's title. After this, in the next section, we will create the page to display the blog post. In the `BlogCard` component, make the following changes:
```js
    export interface Props {
        title: string;
        summary: string;
        // add a new prop for the URL
        slugUrl: string;
    }
    const { title, summary, slugUrl } = Astro.props;
```
Next, we pass this `prop` to the anchor element `href` property:
```js
    <!-- previous code -->
    <a href={`/${slugUrl}`}>
        <h2>
            {title}
            <span>&rarr;</span>
        </h2>
        <p>{summary}</p>
    </a>
```
With this done, we need to pass the URL `prop` of the selected card to the `BlogCard` component. We will do this in `index.astro`:
```js
    // previous code in map function
    return (
      <BlogCard
      title={post.frontmatter.title}
      summary={post.frontmatter.summary}
      slugUrl={post.frontmatter.slugUrl}
      />
    );
```

## Rendering Blog Contents

Finally, to render our blog content, we will create and style a page that will display the content of the selected post. Create a new file `[slugUrl].astro` in the pages directory. Like Next.js, Astro treats all files in the `pages` folder as a different application page and automatically creates routes. In this file, add the following code:
```js
     ---
    import Layout from "../layouts/Layout.astro";
    console.log("hello");
    export async function getStaticPaths() {
      const posts = await Astro.glob("../posts/*.mdx");
      return posts.map((post) => ({
        params: {
          slugUrl: post.frontmatter.slugUrl,
        },
        props: {
          post,
        },
      }));
    }
    // get article content
    const { Content, frontmatter } = Astro.props.post;
    console.log(Content);
    ---
    <>
      <Layout title={frontmatter.title}>
        <article>
          <div class="content">
            <!-- article content -->
            <Content />
          </div>
        </article>
      </Layout>
    </>
    <style>
      .content {
        max-width: 800px;
        margin: 0 auto;
      }
    </style>
```

Here, we are making use of `getStaticPath` to check the slugUrl and return the appropriate content. 


## Final Results

Congratulations on completing this tutorial. Now, if we run our application with the `npm run dev` command, we will get the following results:
![Preview the AstroJS MDX integrated blog](https://i.imgur.com/6vuD5GK.gif)

NB: All styles used in this tutorial can be found in the following GitHub repo.


## Conclusion

We have come to the end of this tutorial. In this tutorial, we learned about AstroJS and its features. Then, we demonstrated how AstroJS could be used by working on a real-world blog application project. 

