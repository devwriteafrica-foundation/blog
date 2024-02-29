---
id: '9836c73d-70e7-42b7-8a3f-b20d993ae265'
date: { start_date: '2023-09-24' }
thumbnail: '/covers/building-a-rich-text-editor-with-react-and-milkdown.jpg'
type: [ 'Post' ]
slug: 'building-a-rich-text-editor-with-react-and-milkdown'
tags: [ 'Milkdown' ,'rich text editor', 'react' ]
author: [ { name: "Ekekenta Clinton", profile_photo: "/authors-avatar/ekekenta-clinton.png" } ]
title: 'Building a rich text editor with React and Milkdown'
status: [ 'Public' ]
createdTime: 'Mon Sept 24 2023 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
---

In today's digital age, a rich text editor is crucial for any application requiring user-generated content. It allows users to easily format their text, add images, and create tables. 

In this tutorial, we'll explore how to build a rich text editor with React.js and Milkdown. 

In the following sections, I will walk you through creating a React component that allows users to type in Markdown and preview the result in real time. Whether you are a beginner or an experienced React developer, this post will provide valuable insights and a solid foundation for building your rich text editor.


## What is Milkdown?
Milkdown is a JavaScript library that provides a simple way to convert Markdown content into HTML. It is a lightweight and powerful library that can easily integrate into web applications. Milkdown allows developers to parse and render Markdown content, supporting various formatting options such as headings, lists, and links. With its clean and intuitive syntax, Milkdown is an excellent choice for building a rich text editor or any other application that requires the ability to format and display user-generated content.

## Milkdown vs Slate

Milkdown and Slate are both JavaScript libraries that can be used to build rich text editors.
Milkdown is a Markdown parsing and rendering library that provides a simple way to convert Markdown content into HTML. It is lightweight, fast, and easy to use, making it an excellent choice for building basic rich text editors or applications that require the ability to format and display user-generated content in Markdown format.
Slate, on the other hand, is a more full-featured rich text editor library that provides a more robust and flexible solution for building custom rich text editors. Slate offers a powerful and flexible API that allows developers to build complex, rich text editors with custom functionality and behavior. It is designed to be extensible and customizable, making it a good choice for building rich text editors or applications that require advanced formatting and layout options.
Ultimately, the choice between Milkdown and Slate will depend on your specific requirements and the customization and functionality you need in your rich text editor.


## Building the rich text editor with React.js and Milkdown
To follow along with this tutorial, you'll need to install [Node.js 18.13.0](https://nodejs.org/) or newer and NPM

### Create React App
To get started, create a new React.js application using the `creat-react-app` utility, followed by the project name, which will be named **text-editor** by running the command:

```sh
npx create-react-app text-editor
```

Wait while npm, and the utility scaffold a new React.js project for you.


###  Install Dependencies
Once the project scaffold process is completed, install the Mildown React dependencies with the command below:

```sh
npm install @milkdown/react @milkdown/core @milkdown/prose
npm install @milkdown/preset-commonmark @milkdown/theme-nord
```

The above command will install `@milkdown/core`, `preset`, and the `theme`, providing the necessary components that make React compatible with Milkdown.

Once the installation is completed, change directory into the project folder and run the application:

```sh
cd text-editor
npm start
```

### Create Editor Component
Next, let's create the components for this application to build out the text editor. First, Create **components/Wrapper.js** file in the **src** directory, and add the code snippet below:

```js
import '../App.css';

export const Wrapper = ()=>{
   return (
      <div className="wrapper">
         <div className="header">
            <h4>Editor</h4>
         </div>
         <div className="editor-wrapper">
            
         </div>
      </div>
   )
}
```
Now that we've created a wrapper component for our text editor update the `App.css` file to style the component:

```css
.wrapper .header{
  border-bottom: 1px solid #b4b4b4;
}
```

Then, import and render the **Wrapper** component in the `App.js` component.

```js
import { Wrapper } from './components/Wrapper';

function App() {
  return (
    <div>
       <Wrapper/>
    </div>
  );
}

export default App;
```
In the above code snippet, we've replaced the code in the `App.js` to render the **Wrapper** component.

![Milkdown rich-text editor preview](https://i.imgur.com/8gIIChd.png)

At this point, nothing serious is happening to expect that we have created and styled the header part of our text editor.


### Add Milkdown

Now let's add Milkdown to our application to add the rich text experience to your application. Create an `Editor.js` file and add the code snippet below:

```js
import React from 'react';
import { Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { ReactEditor, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';

export const MilkdownEditor = () => {
    const { editor } = useEditor((root) =>
        Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
            })
            .use(nord)
            .use(commonmark),
    );

    return <ReactEditor editor={editor} />;
};
```

The above code exports a functional component **MilkdownEditor** in React. The component uses a hook `useEditor`, which provides an editor object and passes it to a `ReactEditor` component. The useEditor hook initializes the editor with an `Editor.make()` function and configures it with two plugins, `nord` and `commonmark`.

Next, update the **Wrapper** component to render the `MilkdownEditor` component.

```js
...
import { MilkdownEditor } from "./Editor"

export const Wrapper = ()=>{
   return (
      <div className="wrapper">
         ...
         <div className="editor-wrapper">
             <MilkdownEditor/>
         </div>
      </div>
   )
}
```

![Previw of the rendered MilkdownEditor component](https://i.imgur.com/7V2VOTB.png)

Now we've successfully built out a rich-text editor using Milkdown. But all we can do in our text editor is to add plain Markdown formatted texts. Let's add a few plugins to add features like file upload and history, enabling you to undo an action on the editor.
 
### Add Plugins
To add additional plugins to the text editor, you'll need to install the individual plugins you wish to install. Run the command below to install the upload and history plugins:

```sh
npm install @milkdown/plugin-upload @milkdown/plugin-history
```

You can find the list of other plugins you can add to your Milkdown editor [here](https://milkdown.dev/using-plugins).

Now update the code in your Editor.js component to use these plugins:

```js
...
import { history } from "@milkdown/plugin-history";
import { upload } from "@milkdown/plugin-upload";


...
import { history } from "@milkdown/plugin-history";
import { upload } from "@milkdown/plugin-upload";

export const MilkdownEditor = () => {
  const { editor } = useEditor((root) =>
    Editor.make()
      ...
	  
      .use(history)
      .use(upload)
  );

  return <ReactEditor editor={editor} />;
};
```

Add another text to the editor and press **Ctrl-Z** or **CMD-Z** to undue it. Also, Drag and drop a file to test the file upload feature.

![Preview of Milkdown rich-text editor with drag and drop functionality](https://i.imgur.com/Ubr9lAB.png)


## Add Themes to Editor
Milkdown operates headlessly, requiring you to create your editor themes. There are three methods for adding a theme to a Milkdown editor, which can be found [here](https://milkdown.dev/styling). This tutorial will use the **Styling the plain HTML** approach. In this method, we will style individual elements in the editor using their class names. The entire editor is contained within a container with the class `.milkdown`, while the editable portion is wrapped within a container with the class `.editor`. 

> To locate the classes for other elements in the editor, simply add the element to the editor (e.g., a code block using backticks ```) and inspect the element to uncover its class name.


Now add the styles below to the `App.css` file to add themes to the editor.

```css
.milkdown {
  margin: 1rem 0;
  height: 100vh;
}

.milkdown .editor {
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
    Helvetica, Roboto, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  padding-top: 40px;
  padding-bottom: 40px;
  overflow: visible !important;
  position: relative;
}

.milkdown .editor h1 {
  font-weight: 900;
}

.milkdown .editor .code-fence{
  padding: 0;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  margin: 0;
  font-size: 85%;
  background-color: #b4b4b4;
  border-radius: 3px
}

.milkdown .editor .code-fence .code-fence_selector-wrapper .code-fence_selector{
  background-color: rgb(129, 129, 129);
  display: none;
  padding: 0px;
  margin: 0px;
}

.milkdown .editor .code-fence pre code div{
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background-color: #b4b4b4;
  border: 0;

}
.milkdown .editor .code-fence .code-fence_selector-wrapper .icon {
  display: none;
}

```

![Adding theme to Milkdown rich-text editor](https://i.imgur.com/hFGS7cv.png)

We've successfully added a theme to our rich-text editor.


## Test Editor
Next, use the content [here](https://raw.githubusercontent.com/icode247/milkdown-editor/main/public/test.md) and add to the editor to test the final result after adding the theme.

![Final preview of Milkdown rich-text editor](https://i.imgur.com/LXqlHeT.png)


## Conclusion

In this tutorial, we've learned what Milkdown is all about and went further to better understand it by comparing it with Slate.js. Then for demonstration, we developed a rich-text editor using Milkdown and React.js. 

The complete code for this tutorial is available [here](https://github.com/icode247/milkdown-editor/). 

Milkdown is a great tool to leverage in adding rich-text features to your React.js applications. Check out the documentation to learn more and extend the editor's features built in this tutorial.

