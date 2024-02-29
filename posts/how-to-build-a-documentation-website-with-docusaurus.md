---
id: '9836c73d-70e7-42b7-8a3f-b20d993ae265'
date: { start_date: '2023-11-01' }
thumbnail: '/covers/how-to-build-a-documentation-website-with-docusaurus.jpg'
type: [ 'Post' ]
slug: 'how-to-build-a-documentation-website-with-docusaurus'
tags: [ 'Docusaurus' ,'API Documentation','React' ]
author: [ { name: "Ekekenta Clinton", profile_photo: "/authors-avatar/ekekenta-clinton.png" } ]
title: 'How to Build a Documentation Website with Docusaurus'
status: [ 'Public' ]
createdTime: 'Mon Nov 01 2023 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
---

## Introduction

Whenever tools or software are created, they require detailed guides explaining what they are and how best they can be used. This guide helps users make the best use of the created tool or software. Without a well-detailed guide, users will struggle to understand and use the tool, which in turn hampers productivity using it. Documentation has been created in this regard, to provide users with a clear understanding of what a tool or software in context is, its comparison with similar items, and a guide showing how it can be used. In this tutorial, we will build a documentation website using Docusaurus.

## What is Docusaurus

Docusaurus is an open-source tool built with React, for developing documentation and blog applications. Docusaurus handles all complexities such as architecture and design details, allowing the developer to focus more on the application content. Since it's built with React, it can easily be customized to fit the user’s desire. Docusaurus leverages the use of Markdowns (MDX) files to create documentation, making it easier for developers to use.

## Why use Docusaurus?

Using Docusaurus to build documentation or blog applications is the optimum choice due to its following features:

- Docusaurus is built with the React.js framework and can easily be extended or customized as required.
- Easy to set up and build documentation or blogs with it. Docusaurus has extensive documentation and a developer community to easily handle whatever issues you may encounter.
- Docusaurus loads pages at lightning speed and has SEO support for each of your created pages, to easily target and direct potential readers to the desired information on your documentation/blog.
- Documentation/blog are written using the Markdown (MDX) syntax, making it easy for beginner/non-developers to create or contribute to it.
- Docusaurus offers a search field to easily query all items in the application and return relevant information. 


## Prerequisites

To work with Docusaurus, you will need to meet the following criteria:

- Existing knowledge of the React.js framework
- Be comfortable creating and working with markdown files
- Have an existing version of Node.js, higher than version 16.14 installed on your local machine
## Scaffold New website

To create a Docusaurus application and scaffold the basic structure of our application, we will create a Docusaurus instance using the command line. On your local machine, open a directory of your choice, and open a CLI. In the CLI, enter the following commands:
```bash
    npx create-docusaurus@latest my-documentation classic
```
The above command creates a Docusaurus application called “my-documentation”, with the `classic` template. The `classic` template allows us to quickly set up our application, as it contains dependencies and features we will be using; these include docs, blog and custom pages, site navigation and a sidebar, CSS styles, and a dark mode feature.

## Creating Doc Pages

Once the installation is complete, open up the project folder in your preferred code editor. Due to the `classic` installation, we have the following folders: `docusaurus`, `blog`, `docs`, `node modules`, `src` and `static`. New pages to be added to the application are to be placed in the `src/pages` directory. The root page of the application is the `index.js` file. To create our root page, replace the code in `index.js` with the following:
```jsx
    import React from "react";
    import Layout from "@theme/Layout";
    import Link from "@docusaurus/Link";
    export default function MyReactPage() {
      return (
        <Layout>
          <h1 className="welcome-text">Welcome to My Documentation Site</h1>
          <div className="btn-link">
            <Link to="/docs/example">Head to Docs</Link>
          </div>
        </Layout>
      );
    }
```
Here we have a simple welcome text and a button which will direct users to the `docs` route and display our documentation. To run the application, enter the `npm start` command in the CLI. When our application starts up on the local server, we will get the following result in the browser:

![Docusaurus deocumentation website preview](https://i.imgur.com/zqO62u6.png)



In the image above, you will notice that in addition to our page defined in the `index.js` file, we also have site navigation and a footer. This is due to the `classic` installation, and these site sections can be modified by editing the `docusaurus.config.js` file. We will explain more about this, and modify our application’s routes in the next section.

## Configure Routing

In the `docusaurus.config.js` configuration file, we have the following:

- Light and dark mode themes 
- The site’s meta-data, containing its title, favicon, tagline, and URL
- A sidebar path for our application
- Site navigation and footer 

This config specifies items that are contained in each of the above-mentioned sections. For the application routes, we will modify the `navbar` section of this file as follows:
```javascript
    //...
    navbar: {
            title: 'My Doc',
            logo: {
              alt: 'My Site Logo',
              src: 'img/logo.svg',
            },
            items: [
              {
                type: 'doc',
                docId: 'example',
                position: 'left',
                label: 'Documentation',
              },
            ],
          },
```
In the code block above, we added the title for the navigation bar, a single route with the label `Documentation`. The position property specifies what part of our navigation bar we want the item on. For the `doc` route, in the `docId` property, we have the value “example”. This specifies that when our users navigate the documentation route, the initial doc to be shown will be a file named example. In the next section of this article, we will create and add this file.

## Creating Docs

To create docs for our documentation application, we simply need to add the files to the `docs` folder. Markdown files added here are treated as individual pages. If you wish to have a collection of content with sub-categories, you simply need to create a folder containing your Markdown files (or sub-folders for more sub-categories).  In the `docs` folder, delete the files provided by the `classic`  template. Create a new file `example.md`, and then add the following Markdown to it:
```sh
    # Working with Markdowns
    
    > I really like using Markdown.
    I think I'll use it to format all of my documents from now on.
    I just love **bold text**.
    Italicized text is the *I like dogs*.
    
    ### Some List Items
    
    - List item one.
    - A second list items.
    
    *Here is a code block*
    Code below:
    ```
    <Layout>
          <h1 className='welcome-text' >Welcome to My Documentation Site</h1>
          <h4 className='btn-link' >Head to Docs</h4>
    </Layout>
    ```
```
Create a second page `learning.md` with the following Markdown:
```sh
    # Learning Some Markdown 
    ## h2 Heading
    ### h3 Heading
    #### h4 Heading
    ##### h5 Heading
    ###### h6 Heading
    
    ## Horizontal Rules
    ___
    ---
    ***
    
    ## Typographic replacements
    Enable typographer option to see result.
    (c) (C) (r) (R) (tm) (TM) (p) (P) +-
    test.. test... test..... test?..... test!....
    !!!!!! ???? ,,  -- ---
    "Smartypants, double quotes" and 'single quotes'
    
    ## Emphasis
    **This is bold text**
    __This is bold text__
    *This is italic text*
    _This is italic text_
    ~~Strikethrough~~
    
    ## Blockquotes
    
    > Blockquotes can also be nested...
    >> ...by using additional greater-than signs right next to each other...
    > > > ...or with spaces between arrows.
    
    ## Lists
    Unordered
    + Create a list by starting a line with `+`, `-`, or `*`
    + Sub-lists are made by indenting 2 spaces:
      - Marker character change forces new list start:
        * Ac tristique libero volutpat at
        + Facilisis in pretium nisl aliquet
        - Nulla volutpat aliquam velit
    + Very easy!
    Ordered
    1. Lorem ipsum dolor sit amet
    2. Consectetur adipiscing elit
    3. Integer molestie lorem at massa
    
    1. You can use sequential numbers...
```
If we run the application now and head to the `Documentation` route, we will have the following results:

![Adding routing to Docusaurus documentation website](https://i.imgur.com/dNoiqDv.gif)



Here we have the `example` file as our default page displayed. We also have a sidebar component that displays all the content in the `docs` directory. Docusaurus provides us with pagination, a sidebar, and a table-of-content. 


## Configure Docs Sidebars

The sidebar component referenced in the `docusaurus.config.js` config is the `sidebar.js` file in the root directory of our project. If we open the `sidebar.js` file we have the following:
```javascript
    @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} 
    const sidebars = {
      tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
```
The code block above by default uses the `docs` directory to generate a list of items and sub-categories for the sidebar. To create a sidebar manually, this can be done as follows:
```javascript
      tutorialSidebar: [
        'example',
        'learning',
        //adding sub categories
        // {
        //   type: 'category',
        //   label: 'A category',
        //   items: ['item1', 'item2'...],
        // },
      ],
```
Here, we specified the `example` and `learning` files for our sidebar. Subcategories can be created as illustrated above, using the `items` array for each element of the category. Now, in our sidebar, we have the same result:

![Adding items to Docusaurus documentation website](https://i.imgur.com/kvFLlI0.png)




## Styling Pages

To style the landing page of our application, add the following code to `custom.css`. `custom.css` is the global custom CSS specified in our `docusaurus.config.js` configuration file.
```css
     /* landing section */
    .welcome-text{
      text-align: center;
      margin: 50px 0 25px 0;
    }
    .btn-link{
      color: #2e8555;
      font-weight: 600;
      font-size: 1.2rem;
      text-align: center;
    }
```
## Adding Static Files

The `static` folder of our application is used to store non-code files to be used in the documentation. These files include images, fonts, favicons, etc. To add a file, simply copy it to the directory. Suppose we add an image `sidebar.png` in the `static` directory, we can access this image in our documentation. Add the following to `example.md`:
```jsx
    //... previous Markdown
    ### Here is an Image Example
    ![server started](/sidebar.png)
```
I have added an image named `sidebar.png` to my `static` directory. With this, the image shows up on the documentation page:

![Adding sidebar to Docusaurus documentation website](https://i.imgur.com/tOZyjwK.png)





## Final Results

Running through our application from the beginning, we have the following results:

![Completed Docusaurus documentation websites](https://i.imgur.com/uMbEWib.gif)


## Conclusion

Congratulations on completing this tutorial! Here, we looked at Docusaurus, its benefits, and how we can easily create a documentation site using it.

