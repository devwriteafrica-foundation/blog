---
id: '9836c73d-70e7-42b7-8a3f-b20d993ae265'
date: { start_date: '2024-01-19' }
thumbnail: '/covers/build-a-form-with-zod-and-rhf.jpg'
type: [ 'Post' ] 
slug: 'build-a-form-with-zod-and-rhf'
tags: [ 'React', 'Forms' ]
author: [ { name: "Gift Uhiene", profile_photo: "/authors-avatar/gift-uhiene.jpg" } ]
title: 'Build a Form with Zod and React-Hook-Form'
status: [ 'Public' ]
createdTime: 'Thur Jan 19 2024 12:19:17 GMT+0100 (GMT+01:00)'
fullWidth: false
---

# Introduction

In web development, forms represent a document section used to get user input. Creating functional and user-friendly forms can be a bit of a challenge, especially when data integrity and type safety are essential. [Zod](https://zod.dev/) and [React-Hook-Form](https://react-hook-form.com/) are powerful tools that can advance how you approach form handling.

Zod is a TypeScript-first schema validation library with built-in validation and type safety.

React-Hook-Form is a popular lightweight and high-performance library for form creation and management in React applications. Together, they make a dynamic duo for building advanced TypeScript forms.


# What is Zod?

Zod is a TypeScript-first schema validation library that focuses on runtime type checking for your data. It's designed to ensure that your data adheres to specific type requirements during runtime. By leveraging Zod, you can enhance data integrity and minimize runtime errors, offering robust runtime type safety.

Key features of Zod include:

- **Type-First Approach:** Zod encourages a strong emphasis on type safety and TypeScript compatibility, allowing you to define your data's structure precisely.

- **Runtime Validation:** Unlike traditional TypeScript types that are stripped away during compilation, Zod's runtime validation ensures your data complies with the specified schema even in a running application.
- **Customizable Error Handling:** Zod allows context-specific error messages, making it easier to identify and fix issues within your data.


# Installation

Run the command below to install the necessary dependencies:

```bash
yarn add zod react-hook-form @hookform/resolvers
```


# Create a Form Structure

Let's build a form component with a few input fields.

Form component:

```jsx
import React from "react";
import "./App.css";

function App() {
    
// Form logic goes here
    
  return (
    <div className="App">
      <form>
        <h1>Zod React Form Example</h1>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="Date" />
        <input type="text" placeholder="Website" />
        <input type="text" placeholder="GitHub URL" />
        <input type="number" placeholder="Years of Experience (1 - 10)" />
        <select id="role">
          <option value="">--Select Role--</option>
          <option value="developer">Software Developer</option>
          <option value="designer">UI/UX Designer</option>
          <option value="other">Other</option>
        </select>
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
         <div>
          <label htmlFor="terms"> Accept Terms & Conditions</label>
          <input type="checkbox" id="terms" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
```

In a traditional React form, a state variable will be created for each `<input/>` element to make the form a controlled form component.


# Defining a Form Schema with Zod

Now, let's create a TypeScript-backed form schema using Zod for our form structure.

Import the object `z`, this object has all of Zod's capabilities built-in:


```jsx
import { z } from "zod";
```

Now, we define the schema using `z.object()` to match our form structure:
```jsx
// Creating an object schema
const UserSchema = z
  .object({
    username: z.string().min(2).max(20),
    email: z.string().email(),
    DOB: z.date().min(new Date("1900-01-01")).max(new Date()),
    website: z.string().url(),
    githubUrl: z.string().url().includes("github.com"),
    yearsOfExperience: z.number().min(1).max(10),
    role: z.string(z.enum(["developer", "designer", "other"])).min(1),
    password: z.string().min(8).max(20),
    confirmPassword: z.string(),
    terms: z.boolean(),
  })
```
Within this object schema, several properties are defined, each corresponding to a field in our form. Here are the properties:

- **`username`**: This field expects a string with a minimum length of 2 characters and a maximum length of 20 characters.
- **`email`**: It expects a valid email address string.
- **`DOB`(Date of Birth)**: Should be a valid date between January 1, 1900, and the current date.
- **`website`**: This should be a valid URL.
- **`githubUrl`**: Similar to the website field, but it also checks if the URL includes "github.com".
- **`yearsOfExperience`**: This should be a number between 1 - 10.
- **`role`**: A string that expects one of the values "developer," "designer," or "other," with a minimum length of 1. `z.enum` is a Zod method to declare a field with a fixed set of allowable values. 
- **`password`**: Expect a string with a minimum length of 8 characters and a maximum length of 20 characters.
- **`confirmPassword`**: String to match the password field.
- **`terms`**: A boolean.

## Defining a Form Data Type 
To transform the Zod schema into a TypeScript structure, we can define a type in TypeScript that mirrors the schema's structure. This makes it easier to work with the validated data:

```jsx
type FormData = {
  username: string;
  email: string;
  DOB: Date;
  website: string;
  githubUrl: string;
  yearsOfExperience: number;
  role: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};
```

Now, let's integrate the newly created form data type with `UserSchema` using the `ZodType` from Zod:

```jsx
import { z, ZodType } from "zod"; // Make sure to update the import

// Add the Form Data Type
const UserSchema: ZodType<FormData> = z
  .object({
    username: z.string().min(2).max(20),
    email: z.string().email(),
    // Existing Code
    // ...
  });
```
With this update, the Zod object aligns with TypeScript, making it standardized for form validation.


# Integrating Zod with React-Hook-Form

To seamlessly manage the form and validate it against the Zod schema, we'll use the `useForm` hook from the React-Hook-Form library.

React-Hook-Form offers support for form validation with Zod using the `zodResolver`. You can pass your schema as a configuration to `useForm`. This configuration will automatically validate your input data against the schema, providing either errors or a valid result.

Let's start by adding the necessary imports:

```jsx
import { useForm } from "react-hook-form"; // Import the useForm hook
import { zodResolver } from "@hookform/resolvers/zod"; // Import the zodResolver
```

Next, update your form component as follows:

```jsx
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  const submitData = (data: FormData) => {
    console.log("SUCCESS", data);
  };

  return (
    <div className="App">
        <form onSubmit={handleSubmit(submitData)}>
          <h1>Zod React Form Example</h1>
          <input type="text" placeholder="Username" {...register("username")} />
          <input type="email" placeholder="Email" {...register("email")} />
          <input type="Date" {...register("DOB", { valueAsDate: true })} />
          <input type="text" placeholder="Website" {...register("website")} />
          <input type="text" placeholder="GitHub URL" {...register("githubUrl")} />
          <input type="number" placeholder="Years of Experience (1 - 10)" {...register("yearsOfExperience", { valueAsNumber: true })}/>
          <select id="role" {...register("role")}>
              <option value="">--Select Role--</option>
              <option value="developer">Software Developer</option>
              <option value="designer">UI/UX Designer</option>
              <option value="other">Other</option>
          </select>
          <input type="password" placeholder="Password"  {...register("password")}/>
          <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
          <div>
              <label htmlFor="terms"> Accept Terms & Conditions</label>
              <input type="checkbox" id="terms" {...register("terms")} />
          </div>
          <button type="submit">Submit</button>
        </form>
    </div>
  );
}
```

The component uses the `useForm` hook from React-Hook-Form for form state management and validation:

- `register`: Links form inputs to the form state for tracking values.
- `handleSubmit`: Wraps form submission logic and executes `submitData` when the form is submitted.
- `formState.errors`: Stores validation errors encountered during submission.

The `submitData` function handles form submission, logging successful data to the console. 


# Handling Error Messages

While Zod schema provides default error messages for input fields, you have the flexibility to customize common error messages by including an additional argument when applying validation methods.

To retrieve and display these error messages, you can access the `errors` object from the form's state. 

```jsx
  const {
    register,
    handleSubmit,
    formState: { errors }, // Errors Object
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });
```
This object contains each field in the form. To check if there's an error in a specific field and access its corresponding error message, you can use the following approach:

```jsx
{errors.username && (
  <span className="error-message">{errors.username.message}</span>
)}
```

Update the form component to display the error message for each field:

```jsx
  <form onSubmit={handleSubmit(submitData)}>
    <h1>Zod React Form Example</h1>
    <input type="text" placeholder="Username" {...register("username")} />
    {errors.username && (
      <span className="error-message">{errors.username.message}</span>
    )}
    <input type="email" placeholder="Email" {...register("email")} />
    {errors.email && (
      <span className="error-message">{errors.email.message}</span>
    )}
    <input type="Date" {...register("DOB", { valueAsDate: true })} />
    {errors.DOB && (
      <span className="error-message">{errors.DOB.message}</span>
    )}
    <input type="text" placeholder="Website" {...register("website")} />
    {errors.website && (
      <span className="error-message">{errors.website.message}</span>
    )}
    <input
      type="text"
      placeholder="GitHub URL"
      {...register("githubUrl")}
    />
    {errors.githubUrl && (
      <span className="error-message">{errors.githubUrl.message}</span>
    )}
    <input
      type="number"
      placeholder="Years of Experience (1 - 10)"
      {...register("yearsOfExperience", { valueAsNumber: true })}
    />
    {errors.yearsOfExperience && (
      <span className="error-message">{errors.yearsOfExperience.message}</span>
    )}
    <select id="role" {...register("role")}>
          <option value="">--Select Role--</option>
          <option value="developer">Software Developer</option>
          <option value="designer">UI/UX Designer</option>
          <option value="other">Other</option>
    </select>
    {errors.role && (
       <span className="error-message">{errors.role.message}</span>
        )}
    <input
      type="password"
      placeholder="Password"
      {...register("password")}
    />
    {errors.password && (
      <span className="error-message">{errors.password.message}</span>
    )}
    <input
      type="password"
      placeholder="Confirm Password"
      {...register("confirmPassword")}
    />
    {errors.confirmPassword && (
      <span className="error-message">
        {errors.confirmPassword.message}
      </span>
    )}
    <div>
      <label htmlFor="terms"> Accept Terms & Conditions</label>
      <input type="checkbox" id="terms" {...register("terms")} />
    </div>
    {errors.terms && (
       <span className="error-message">{errors.terms.message}</span>
    )}
    <button type="submit">Submit</button>
  </form>
```

## Customizing Error Messages

Currently, our default Zod error messages aren't user-friendly, as illustrated in the image below:

![Non-User-friendly Errors](https://i.imgur.com/uvWMDFx.png)

To create custom error messages for each input field using Zod, you can define the error messages alongside your schema validation methods, such as `.min()` and `.max()` methods. 

Additionally, you can use the [`.refine`](https://zod.dev/?id=refine) method to add custom validation rules.

Update the `UserSchema` to include customized error messages:

```jsx
const UserSchema: ZodType<FormData> = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username is too short" })
      .max(20, { message: "Username is too long" }),
    email: z.string().email({ message: "Invalid email format" }),
    DOB: z
      .date()
      .min(new Date("1900-01-01"), { message: "Too old" })
      .max(new Date(), { message: "Too young!" }),
    website: z.string().url({ message: "Invalid website URL" }),
    githubUrl: z
      .string()
      .url({ message: "Invalid GitHub URL" })
      .includes("github.com", { message: "Must be a GitHub URL" }),
    yearsOfExperience: z
      .number({
        required_error: "required field",
        invalid_type_error: "Years of Experience is required",
      })
      .min(1)
      .max(10),
    role: z
      .string(z.enum(["developer", "designer", "other"]))
      .min(1, { message: "Select a role" }),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  })
  .refine((data) => data.terms === true, {
    message: "Please accept terms & conditions",
    path: ["terms"],
  });
```

Each validation method (e.g., `.min()`, `.max()`, `.email()`) is provided with an additional object that specifies the custom error message for that specific validation rule.

### .refine()

This is a Zod method that allows you to add additional custom validation to a schema. 

The first `refine` method checks if the `password` and `confirmPassword` fields match. If not, an error with the message "Passwords do not match" is generated. While the second ensures that the `terms` field is set to `true`. If not, an error with the message "Please accept terms & conditions" is generated.

Customized error messages  displayed below:

![User-friendly Errors](https://i.imgur.com/SJnOE1z.png)

The source code for the project can be found [here](https://github.com/Giftea/zod-rhf-form).

# Conclusion

In summary, we've shown how to create advanced TypeScript forms by combining Zod and React-Hook-Form.

Key takeaways: 
1. Zod ensures data integrity with TypeScript-first validation. 
2. React-Hook-Form streamlines React app form management. 
3. Together, they form a powerful solution. 



# Resources
- [Zod Documentation](https://zod.dev/)
- [Zod Error Handling](https://zod.dev/ERROR_HANDLING?id=error-handling-in-zod)
- [React-Hook-Form Documentation](https://react-hook-form.com/get-started)
