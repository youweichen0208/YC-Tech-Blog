---
cover: /assets/images/secondhand-project.jpg
icon: pen-to-square
date: 2024-05-16
category:
  - frontend
tag:
  - React
  - NextJS
  - TypeScript
---

# NextJs

## What is NextJS?

Next.JS is a popular open-source React framework for building server-side rendered (SSR) and static web applications.

## Advantages of Next.js

1. Server-side rendering (SSR):
   Next.js allows us to render our React components on the server, which can improve the initial load time of our application and provide better SEO (Search Engine Optimization) performance.
2. Static Site Generation (SSG):
   Next.js supports generating static HTML files at build time, which can be served dorectly by a CDN, resulting in faster load times and better scalability.

## Server-Side Rendering vs traditional client-side rendering

### Traditional client-side rendering:

1. the server sends a minimal HTML skeleton to the client (div with an id for the React or Angular app to amount)
2. the client then downloads the JavaScript bundle
3. once the JavaScript is loaded, the framework takes over and renders the full page content, updating the DOM

### Server-side rendering

1. the server generates the initial HTML content and sends it to the client.
2. the client can start rendering the page immediately, while the JavaScript files are still downloading in the background.
3. Once the JavaScript is loaded, the framework can then hydrate the page, taking over the rendering and make the page interactive.

## CSS Styling

### Global Styles

If we look inside the `/app/ui` folder, we'll see a file called `global.css`. We can use this file to add CSS rules to all the routes in the application.

### Tailwind

Tailwind is a CSS framework that speeds up the development process by allowing us to quickly write utility classes directly in our TSX markup.

## Creating layout and pages

### Nested Routing

Next.js uses file-system routing where folders are used to create nested routes. Each folder represents a route segment that maps to a URL segment

![nested routing](/assets/images/nextjs-img1.png)

`page.tsx` is a special Next.js file that exports a React component, and it's required for the route to be accessible. In our application, we already have a page file: `/app/page.tsx` - this is the home page associated with the route `/`.

To create a nested route, we can nest folders inside each other and add `page.tsx` files inside them.
![nested index page](/assets/images/nextjs-img2.png)

## Setting Up Database

### Vercel

Vercel is a cloud platform for static sites and serverless functions. It's primarily used for hosting and deploying Next.js applications, but it can also be used with other frameworks and static site generators like React, Vue.js, Angular.

1. **Hosting**: Vercel provides a cloud based hosting platform for our web applications, making it easy to deploy and manage our projects.

2. **Serverless Functions**: Vercel supports serverless functions, which allow us to run backend code on the server without the need to manage a full server infrastructure.

3. **Automatic Deployments**: Vercel integrates with Git repositories and automatically deploys our application whenever we push changes to our codebase.

4. **Global CDN**: Vercel's infrastructure is powered by a global Content Delivery Network(CDN), which ensures fast and reliable delivery of our web application.

### Database seeding:

Database seeding is the process of populating a database with an initial set of data. This data can be used for testing purposes, or to provide a set of known data that an application can rely on when it first runs.

## Choosing how to fetch data

### API layer

APIs are intermediary layer between our application code and database. There are a few cases where we might use an API:

- If we are using 3rd party services that provide an API
- If we are fetching data from the client, we want to have an API layer that runs on the server to avoid exposing our database secrets to the client

### Using Server Components to fetch data

By default, Next.js applications use **React Server Components**. Fetching data with Server Componnts is a relatively new approach and there are a few benefits of using them:

- Server Components support promises, providing a simpler solution for asynchronous tasks like data fetching. We can use `async/await` syntax without reaching out for `useEffect`, `useState` or data fetching libraries..
- Server Components execute on the server, so we can keep expensive data and logic on the server and only send the result to the client.
- As mentioned before, since Server Components execute on the server, we can query the database directly without an additional API layer.

### Using SQL

Go to `/app/lib/data.ts`, we'll see that we are importing the `sql` function from `@vercel/postgres`. This function allows us to query our database:

```ts
import { sql } from "@vervel/postgres";
```

We can call `sql` inside any Server Component. But to allow us to navigate the components more easily, we've kept all the data queries in the `data.ts` file, and we can import them into the components.

### What are request waterfalls?

A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.

For example, we need to wait for `fetchRevenue()` to execute before `fetchLatestInvoices()` can start running, and so on.

```ts
const revenue = await fetchRevenue();
const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
const {
  numberOfInvoices,
  numberOfCustomers,
  totalPaidInvoices,
  totalPendingInvoices,
} = await fetchCardData(); // wait for fetchLatestInvoices() to finish
```

This pattern is not necessarily bad. There may be cases where we want waterfalls because we want a condition to be satisfied before we make the next request. However, this behavior can also be unintentional and impact performance.

### Parallel data fetching

A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.

In JavaScript, we can use the `Promise.all()` or `Promise.allSettled()` functions to initiate all promises at the same time.

```ts
export async function fetchCardData() {
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);
    // ...
  }
}
```

By using this pattern, we can:

- Start executing all data fetches at the same time, which can lead to performance gains.
- Use a native JavaScript that can be applied to any library or framework.

## Static Rendering:

With static rendering, data fetching and rendering happens on the server at build time (when we deploy) or during revalidation. The result can then be distributed and cached in a CDN.

Whenever a user visits our application, the cached result is served. There are a couple of benefits of static rendering:

1. **Faster Websites**: Prerendered content can be cached and globally distributed. This ensures that users around the world can access our website's content more quickly and reliably.
2. **Reduced Server Load**: Because the content is cached, our server does not have to dynamically generate content for each user request.
3. **SEO**: Prerendered content is easier for search engine crawlers to index, as the content is already available when the page loads. This can lead to improved search engine rankings.

Static rendering is useful for UI with **no data** or **data that is shared across users**, such as a static blog post or a product page. It might not be a good fit for a dashboard that has personalized data that is regularly updated.

## Dynamic Rendering:

With dynamic rendering, content is rendered on the server for each user at **request time**(when the user visits the page). There are a couple of benefits of dynamic rendering:

- **Real-Time Data**: Dynamic rendering allows our application to display real-time or frequently updated data. This is idea for applications where data changes often.
- **User-Specific Content**: It's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction.
- **Request Time Information**: Dynamic rendering allows us to access information that can be known at request time, such as cookies or the URL search parameters.

### Making the dashboard dynamic

By default, `@vercel/postgres` doesn't set its own caching semantics. This allows the framework to set its own static and dynamic behavior.

We can use a Next.js API called `unstable_noStore` inside our Server Components or data fetching functions to opt out of static rendering. Let's add this.

In our `data.ts`, import `unstable_noStore` from `next/cache`, and call it the top of our data fetching functions:

```ts
// ...
import { unstable_noStore as noStore } from "next/cache";

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  // ...
}

export async function fetchLatestInvoices() {
  noStore();
  // ...
}

export async function fetchCardData() {
  noStore();
  // ...
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  noStore();
  // ...
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  // ...
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  // ...
}

export async function fetchInvoiceById(query: string) {
  noStore();
  // ...
}
```

## Streaming

Streaming is a data transfer technique that allows us to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.

By streaming, we can prevent slow data requests from blocking our whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

There are two ways we implement streaming in Next.js:

1. At the page level, with the `loading.tsx` file.
   - `loading.tsx` is a special Next.js file built on top of Suspense, it allows us to create fallback UI to show as a replacement while page content loads.
   - Since `<SideNav>` is static, it's shown immediately. The user can interact with `<SideNav>` while the dynamic content is loading.
   - The user doesn't have to wait for the page to finish loading before navigating away (this is called interriptable navigation).
2. For specific components, with `<Suspense>`.

### Streaming a component

So far, we are streaming a whole page. But,instead, we can be more granular and stream specific components using React Suspense.

Suspense allows us to defer rendering parts of our application until some condition is met(e.g. data is loaded). We can wrap our dynamic components in Suspense. Then, pass it a fallback component to show while the dynamic component loads.

## Adding Search and Pagination

### Adding the search functionality

These are the Next.js client hooks that we'll use to implement the search functionality:

1. `useSearchParams` - Allows us to access the params of the current URL. For example, the search params for this URL `/dashboard/invoices?page=1&query=pending` would look like this: `{page: '1', query: 'pending'}`.
2. `usePathname` - Let us read the current URL's pathname. For example, for the route `/dashboard/invoices`, `usePathname` would return `/dashboard/invoices`.
3. `useRouter` - Enables navigation between routes within client components programmatically.

Here's the quick overview of the implementation steps:

1. Capture the user's input
2. Update the URL with the search params
3. Keep the URL in sync with the input field
4. Update the table to reflect the search query

### Debouncing

**Debouncing** is a programming practice that limits the rate at which a function can fire. In our case, we only want to query the database when the user has stopped typing.

Here's how debouncing works:

1. **Trigger Event**: When an event that should be debounced(like a keystroke in the search box)occurs, a timer starts.
2. **Wait**: If a new event occurs before the timer expires, the timer is reset.
3. **Execution**: If a timer reaches the end of its countdown, the debounced function is executed.

## Mutating Data

### What are Server Actions?

React Server Actions allow us to run asynchronous code directly on the server. They eliminate the need to create API endpoints to mutate our data. Instead, we write asynchronous functions that execute on the server and can be invoked from our Client or Server Components.

### `use server` directive

The `use server` directive is part of the Next/js Server Components feature, which allows us to define components that will be rendered on the server side.

### Create a Server Action

```ts
import { customerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';

export default function Form({
  customers,
}: {
  customers: customerField[];
}) {
  return (
    <form action={createInvoice}>
      // ...
  )
}
```

In HTML, we'd pass a URL to the `action` attribute. This URL would be the destination where our form data should be submitted (usually an API endpoint).

However, in React, the `action` attribute is considered a special prop - meaning React builds on top of it to allow actions to be invoked.

Behind the scenes, Server Actions create a `POST` API endpoint. This is why we don't need to create API endpoints menually when using Server Actions.

### Extract the data from `formData`

Back in our `action.ts` file, we'll need to extract the values of `formData`, there are a couple of methods we can use. For this example, let's use the `.get(name)` method.

```ts
"use server";

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };
  // Test it out:
  console.log(rawFormData);
}
```

`createInvoice` here is a Server Action. We can think of it as Server Actions Post API in backend.

### Validating and prepare the data

Before sending the form data to our database, we want to ensure it's in the correct format and with the correct types. For example:

```ts
export type Invoice = {
  id: string; // Will be created on the database
  customer_id: string;
  amount: number; // Stored in cents
  status: "pending" | "paid";
  date: string;
};
```

### Type validation and coercion:

It's important to validate that the data from our form aligns with the expected types in our database.

To handle type validation, we can use Zod, a Typescript-first validation library that can simplify task for us.

### Next.JS client-side router cache

- Next.js uses a client-side router cache to improve the performance of navigation between pages
- When a user navigates to a new page, Next.js stores the rendered page in the client-side cache
- On subsequent visits to the same page, Next.js can retrieve the cached version, which can significantly improve the laod time, as the page doesn't need to be re-rendered from the server.

### Revalidate and redirect

- `revalidatePath` is a feature in Next.js that allows us to manually invalidate the cache for a specific page or set of pages.
- When we call `revalidatePath`, we are telling Next.js to invalidate the cache for the specified path(s) and fetch the latest data from the server.

```ts
"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

// ...

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
```

## Accessibility

Accessibility means building web pages and applications that are usable by as many people as possible, including those who use assistive technologies like screen readers.

### Using the ESLint accessibility plugin in Next.js

- Add `next lint` as a script in our package.json file
- Run `npm run lint` in our terminal

## Adding Authentication

### Authentication vs. Authorization

- **Authentication** is about making sure the user is who they say they are. You're proving your identity with something you have like a suername and password.
- **Authorization** is the next step. Once a user's identity is confirmed, authorization decides what parts of the application they are allowed to use.

So, authentication checks who you are, and authorization determines what you can do or access in the application.

### NextAuth.js

NextAuth.js is an open-source library for Next.js that makes it easy to add authentication to our Next.js applications. It supports various authentication strategies, including OAuth, and JWT, among others.

1. **Setting up NextAuth.js**
   Install NextAuth.js by running the following command in our terminal:

```terminal
npm install next-auth@beta
```

Next, generate a secret key for our application. This key is used to encrypt cookies, ensuring the security of user sessions. We can do this by running the following command in our terminal:

```terminal
openssl rand -base64 32
```

Then, in our `.env` file, add our generated key to the `AUTH_SECRET` variable:

```.env
AUTH_SECRET=your-secret-key
```

2. Adding the pages option
   Create an `auth.config.ts` file at the root of our project that exports an `authConfig` object. This object will contain the configuration options for NextAuth.js. For now, it will only contain the `pages` option:

```ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
};
```
