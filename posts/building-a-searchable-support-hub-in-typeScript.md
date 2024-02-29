---
id: '9836c73d-70e7-42b7-8a3f-b20d993ae265'
date: { start_date: '2023-10-01' }
thumbnail: '/covers/building-a-searchable-support-hub-in-typeScript.jpg'
type: [ 'Post' ]
slug: 'building-a-searchable-support-hub-in-typeScript'
tags: [ 'Typescript','Opensource', 'yext' ]
author: [ { name: "Ekekenta Clinton", profile_photo: "/authors-avatar/ekekenta-clinton.png" } ]
title: 'Building a Searchable Support Hub in Typescript'
status: [ 'Public' ]
createdTime: 'Mon Oct 01 2023 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
---

Search engines are computer programs designed to carry out searches using keywords or phrases; search engines like Google, Bing, and Yahoo make it easier and faster for people to find things on the web. Without them, finding what you’re looking for on the internet would be extremely difficult and time-consuming. Search engines act as a filter for the ocean of information available online.

Search engines serve a similarly important function in consumer-facing product support hubs, which are centralized places where users can find documentation and frequently asked questions (FAQs) relating to the product. The sheer volume of information in your support hub may make it difficult for users to find exactly what they want. Using a search engine like [Yext](https://www.yext.com/) can help users search through unstructured data such as documents and blog posts and find relevant results.

In this article, you’ll learn how to build a simple searchable support hub using [React]( https://create-react-app.dev/) and [TypeScript](https://www.typescriptlang.org/) and how to incorporate Yext Knowledge Graph, Answers, Experience, and Document Search.

## Why Is a Search Engine Important to a Support Hub?

Search engines are indispensable tools for support hubs:

- They make it easy to find the information the user is looking for. The user doesn’t have to manually search through a heap of information.
- A good search engine can improve user experience and increase customer satisfaction. Search engines like Yext are super fast, [can search through unstructured texts like blogs and documents](https://hitchhikers.yext.com/community/t/document-search/2508), and are intelligent enough to find the information the user is looking for with great accuracy. All these factors make for a smooth experience for the user.
- Having a capable search engine that shows the users exactly what they want reduces support costs; when the user can find what they want on their own, fewer on-call agents are necessary.
- A search engine can also help the development team analyze the search data to identify the frequently searched issues and prioritize them.

## Building Our Project

In this article, you’re going to build a searchable support hub, where users can search for solutions to whatever problem they’re having while using a product.

You can start this tutorial by creating a React app in TypeScript by running the command below:

```bash
npx create-react-app searchable-support --template typescript
```

Navigate to the `searchable-support` directory and run the following command, which will install Answers Headless React to your project:

```bash
npm install @yext/answers-headless-react
```

After Yext has been installed, delete all the files under the `src` folder, except the `react-app-env.d.ts` file.

### Project Structure

The structure of the app you’re creating will be as follows:

```sh
src/
┣ App.tsx
┣ RecentSearch.tsx
┣ SearchBar.tsx
┣ index.css
┣ index.tsx
┗ react-app-env.d.ts

```

### Creating the index.tsx File

This file will serve as the entry point to your application. You can import the custom style `index.css` to style your app and the `App` component:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Now create an `index.css` file and populate it with the following code:

```css
body {
  background-color: whitesmoke;
  overflow: none;
}

*{
 overflow: none;
}


/* Search Bar */

.search-container {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 100px;
}

.search-container .search-bar {
  max-width: 600px;
  width: 80%;
  height: 60px;
  background-color: white;
  padding: 2px;
}

.search-container .search-bar input {
  width: 80%;
  height: 40px;
  margin: 1%;
  outline: none;
  border: none;
  font-size: 20px;
}

.search-container .search-bar  button {
  width: 16%;
  height: 40px;
  background-color: blueviolet;
  color: white;
}

/* END */


/* Result */

.results {
  display: block;
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
  height: 800px;
  overflow-y: auto;
}
```

### Creating the App Component

To create the `App` component, you must first import the `AnswersHeadlessProvider` component. You then pass the following props: `apiKey`, `experienceKey`, and `locale='en'`, which indicates the language you’ll be working with. You will use your `apiKey` and `experienceKey` later on in the tutorial. Your command for creating the App component should look as follows:

```jsx
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import  SearchBar from './SearchBar';
import RecentSearch from './RecentSearch';

const App = ()  => {

  return (
    <AnswersHeadlessProvider
      apiKey='your api key'
      experienceKey='your experience key'
      locale='en'
    >
      <SearchBar/>
      <RecentSearch/> 
    </AnswersHeadlessProvider>
  );
}

export default App;
```

### Creating the SearchBar Component

The first step in creating the `SearchBar` component is importing the `useAnswersActions` hook from Yext. The `handleTyping` callback is called by the `onChange` event of the `input` tag, and this function sets the answers query to the value of the `input` tag. The `onKeyDown` event calls the `handleKeyDown` callback, which calls the `answers.executeUniversalQuery();` method when the **Enter** key is pressed. The `answers.executeUniversalQuery();` method then executes your search query. The command for this search component should look as follows:

```jsx
import { useAnswersActions } from '@yext/answers-headless-react';
import { ChangeEvent, KeyboardEvent, useCallback } from 'react'

const SearchBar = () => {

  const answers = useAnswersActions();

  const handleTyping = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    answers.setQuery(e.target.value);
  }, [answers]);
  
  const handleKeyDown = useCallback((evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' ) {
      answers.executeUniversalQuery();
    }
  }, [answers]);

  return (
    <div className='search-container'>

      <div className='search-bar'>

        <input placeholder='Ask a question' onChange={handleTyping} onKeyDown={handleKeyDown}/>

        <button onClick={() => answers.executeUniversalQuery()}> Search </button>

      </div>

    </div> )   
            
}

export default SearchBar
```

### Creating the RecentSearch Component

The `RecentSearch` component renders the search results; to create it, you first import the `useAnswersState` hook, which is used to access your search state and search results. The code for creating the `RecentSearch` component should look like this:

```jsx
import { useAnswersState } from '@yext/answers-headless-react';
import Result from './Result';

const RecentSearch = () => {

  const answers = useAnswersState(state => state);
  const verticals = answers?.universal?.verticals;

  let results:  Array<Result> = []
  if(verticals) {
    results = verticals[0].results
  } 

  return (
        <div className='results'>
            {
                results?.map((result: any) => {

                    const { rawData } = result

                    const { question, answer, type } = rawData

                    return <Result question={question} answer={answer} />

                })
            }
        </div>
     
    );

}

export default RecentSearch
```

### Creating the Results Component

The `Results` component renders a single result from our search and displays it on the screen. This can be achieved if you input the following:

```jsx
interface IResult {
    question: string;
    answer: string;
}

const Result = (props: IResult) => {

    const { question, answer } = props

    return (
        <article className="result">

            <h3 className="title"> {question} </h3> 

            <div className="body"> {answer}</div>

        </article>
    )

}

export default Result
```

### Creating a Yext Account

To get our API Key and Experience Key you need to [create a Yext sandbox account](https://hitchhikers.yext.com/create-playground-account). After creating an account and verifying your email, navigate to the **Answers** tab. As you can see in the following screenshot, Yext has already created an Experience for you.

![Answers tab](https://imgur.com/Np1kMkP.png)

However, you’ll now add a new Experience by clicking **Add Experience** on the top right corner of the page. 

A modal will appear asking you to fill in the Experience name; you can enter any name and click **Continue**, then click **Continue** again.

![Creating new experience](https://imgur.com/tHQzgoa.png)

Congratulations! You’ve just created your first Answers Experience.

### Adding Entities

You can use Entities to add data to your Knowledge Graph. Navigate to the **Knowledge Graph** tab and click on the **+ Add Data** button.

![Knowledge Graph](https://imgur.com/iwaTw4S.png)

Next, click **FAQs** to add an FAQ entity.

![Add Data](https://imgur.com/kCl3JYU.png)

Fill out the form and add as many entities as you want. 

![Add Entity](https://imgur.com/Uq3KiQd.png)

In this example, four entities have been added to the Knowledge Graph.

### Adding Entities

You can use Entities to add data to your Knowledge Graph. Navigate to the **Knowledge Graph** tab and click on the **+ Add Data** button.

![Knowledge Graph](https://imgur.com/iwaTw4S.png)

Next, click **FAQs** to add an FAQ entity.

![Add Data](https://imgur.com/kCl3JYU.png)

---
The comment is around here
---
Fill out the form and add as many entities as you want. 

![Add Entity](https://imgur.com/Uq3KiQd.png)

In this example, four entities have been added to the Knowledge Graph.

---
Stops here
---

### Enable Document Search

Document Search searches through long, unstructured documents like blogs, bios, support articles, and product manuals, and returns search results based on relevance to the query.
To get started, click on **Verticals** on the sidebar—the page below will appear.

![Document search 1](https://imgur.com/yZuwmdo.png)

Click the **Settings for:** dropdown at the top of the searchable fields and select FAQs. You should see the following.

![Document search on FAQs](https://imgur.com/Kz9m2PN.png)

Click **+Add / Update Fields**. The following modal should appear.

![Adding Answers to searchable field](https://imgur.com/bTMBHRK.png)

Check the **Answer** checkbox and click on the **Update Field** button on the bottom right.
The page should now look like this.

![Enabling Document Search on Answers](https://imgur.com/OUj4pQY.png)

On the **Answer** row, tick the checkbox on the **Document Search** column.

Finally, click **Save** on the bottom right of the page. You’ve now enabled Document Search on the FAQs entities.

You can follow this [link]](https://hitchhikers.yext.com/modules/ans109-core-config-verticals/06-searchable-fields-doc-search/) to learn more about when you might want to turn Document Search on.

### Integrating Yext Search in Your React App

Integrating with React is easy; first, you should retrieve the API Keys of your Experience by clicking on the **Experience Details** on the sidebar and scrolling down to see the Experience Properties.

![API Key](https://imgur.com/uMgGw5Z.png)

Now, in your React app, open the `App.tsx` file and replace the `apiKey` and `experienceKey` props with the values taken from your Experience Properties:

```jsx
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import  SearchBar from './SearchBar';
import RecentSearch from './RecentSearch';

const App = ()  => {

  return (
    <AnswersHeadlessProvider
      apiKey='your api key'
      experienceKey='your experience key'
      locale='en'
    >
      <SearchBar/>
      <RecentSearch/> 
    </AnswersHeadlessProvider>
  );
}

export default App;
```

### Testing the Functionalities of Document Search

Run the command below to start the React app:

```bash
npm start
```

![Search 1](https://imgur.com/fYLum4K.png)

If you search for the phrase “A poem”, Yext will return three results containing that phrase.

![Search 2](https://imgur.com/HUKYWsB.png)

Now let’s try searching for another word to have a better feel of how things work as shown below.

![Search 3](https://imgur.com/gtjoQFk.png)


## Conclusion

This article provided a brief introduction to search engines and their importance in support hubs. The tutorial then explained how to use the [Yext](https://www.yext.com/) search engine in a React app using TypeScript. 

You also learned about Yext Answers, Experiences, and Knowledge Graph and how to enable Document Search. You learned how to get API Key and Experience Key from Yext and also how to use the `useAnswersActions` and `useAnswerState` hooks to send search queries and receive query results respectively in a React TypeScript app.

This functionality demonstrates why Yext is a valuable tool for any app that requires a search engine. The code for this project is available on [GitHub](https://github.com/icode247/searchable-support-hub); feel free to clone and extend the application's features.
