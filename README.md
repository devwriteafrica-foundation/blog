# Devwrite Africa Article Guidelines

Thank you for your interest in contributing to the [Devwrite Africa Community Blog](https://devwriteafrica.com)! We welcome everyone in the Devwrite Africa community to share their experiences, insights, and expertise with fellow developers worldwide. This is also an opportunity to get mentored by senior technical writers and gain the hand-on experience you need to land your dream technical writing job.

## General Guidelines
To ensure we publish only quality and relevant article and tutorials, we only accept and publish four articles per month and We require contributors to follow these steps: 
1. [Join the Devwrites commmunity](https://devwriteafrica.com/join).
2. Submit a draft PR (minimum of 1,500 words article/tutorial).
3. Get reviews from the community leads.
4. Publish on our blog and social media channels. 
5. Repost on your social media accounts.

### Join the Devwrites commmunity

Join the Devwrites community to learn how to write high-quality, engaging technical articles and tutorials. Becoming a member gives you the chance to have your articles featured on the Devwrites community blog and gain valuable experience through mentorship from seasoned technical writers. Just fill out the membership form to get started.

Also, it's important for all writers to join our Discord channel. In our draft-review channel, you can submit your drafts, receive feedback, and ask any questions related to your articles.

### Submit a draft PR
To submit a draft PR, follow the following steps:

1. Choose a topic is engaging ideas from open-source products, questions or topics on different places like [GitHub](https://github.com/), [Reddit](https://www.reddit.com/), [Discord](https://discord.com/).
2. Research extensively on the topic.
3. Fork the Devwrites blog repository and clone the Devwrites blog repo.
```
git clone https://github.com/devwriteafrica/blog
```
4. Create a new blog in **posts** directory.
5. Write the contents of the blog in markdown format([see samples here](https://github.com/devwriteafrica/blog/tree/main/posts)).
6. Proof read and create a create a PR.

Before writing an article or tutorial, ensure it has not been already published on the Devwrite community blog. PRs that dose not meet this requirements will be rejected.

### PR Guidelines
Here is a guideline to follow for creating a PR for your blog:

1. Create a markdown file in the **posts** directory.
2. Slugify the blog title and use it as the blog filename, e.g., `build-a-blog-with-astroJS-using-mdx-ntegration.md`.
3. The cover image name should match the slug, e.g., `build-a-blog-with-astroJS-using-mdx-ntegration.jpg`.
4. Add the blog metadata and the name you want displayed on the blog in the front matter:
```
---
date: { start_date: '2023-01-22' }
type: [ 'Post' ]
category: [ '📗 Dev' ]
createdTime: 'Mon Jan 23 2023 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
slug: 'build-a-blog-with-astroJS-using-mdx-ntegration'
tags: [ 'MDX' ]
author: [ "Your Name" ]
title: 'Build a blog with AstroJS using MDX Integration'
status: [ 'Public' ]
---
```
Leave the date, type, category, status, and createdTime fields for the review team and fill in the rest.

### Article Creation Guide
To create articles that are both engaging and SEO-optimized, adhere to the following structure:

#### **Title:**

- Create a succinct, keyword-rich title that mirrors the content.
- Capitalize only the first letter of the first word and proper nouns, using sentence case for the rest.
- Assess your title's effectiveness here.

#### **Opening Section:**

Start with an enticing introduction, providing a sneak peek into what the article entails.

**Before You Start:**

List necessary prerequisites for tutorials, guiding readers on what they need beforehand.

#### **Core Content:**

Organize with subheadings and lists for readability. Key aspects include:
- Embedding keywords for SEO.
- Adhering to the Oxford Style Guide, especially for regular contributors.
- Restricting to one h1 tag, used for the title.
- Including GitHub source code links.
- Styling terms consistently, e.g. **open-source**.

#### **Visuals:**

- Enhance with relevant images/videos. Create an article cover using guidelines found in this [Figma template](https://www.figma.com/file/GoSswiJdLKq8VLDA6dt51b/Untitled?type=design&node-id=0%3A1&mode=design&t=Ia9dGsys0RBY8mqD-1 ).
- Include instructive admin panel screenshots.
- Offer a demo for applications, if feasible.

#### **Final Thoughts/ Conclusion:**

- Conclude with a summary, actionable insights, and at least two resource references.
- Prompt readers to join the [Devwrite Discord community](https://discord.gg/2TDfbF3k).

#### **SEO Elements:**

- *Meta-title:* Keep it under 60 characters, incorporating keywords.
- *Meta-description:* Summarize the post in under 155 characters, making it inviting and keyword-rich.
 
 ## Before you submit, make sure you: 
  
 ✅ Follow writing guidelines
  
 ✅ Proofread your article for errors in grammar, spelling, and typography.

 ✅ Run and test your code before pushing it to GitHub.

 ✅ Fork and copy your code sample to the code-samples folder in the [sample-projects repository](https://github.com/devwriteafrica/sample-projects) and create a PR. 
  
PS: We do not approve PRs for articles that don't follow our community guidelines or are flagged as being AI-generated.

## License

The [MIT License](LICENSE).
