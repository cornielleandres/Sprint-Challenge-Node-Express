# Review Questions

## What is Node.js?
* `Node.js` is a JavaScript runtime environment. It lets you to execute JS code outside of a browser window, allowing for server-side scripting.

## What is Express?
* `Express` is a web application framework for Node. It is mostly used for building servers and APIs.

## Mention two parts of Express that you learned about this week.
* Express `routers` are really useful for compartmentalizing your request handlers, making it easier to navigate through them.

* Express has different types of `middleware`: not only regular middleware, but error handling middleware as well that can be used to bypass the regular middleware in order to deal with certain errors.

## What is Middleware?
* `Middleware` in Express are basically functions that can take in the request and response objects as well as the next middleware in the cycle. They can execute code and make changes to the request and response before handing them off to the next middleware.

## What is a Resource?
* `Resources` are what Express has access to via URL routes. These can be anything, and allow you to perform such actions as making GET and POST requests to a user database.

## What can the API return to help clients know if a request was successful?
* The API can return `status codes` in order to, at a glance, help clients know if the request was successful or not.

## How can we partition our application into sub-applications?
* It can be done via `routers`. This can help in making resource handling more modular.

## What is express.json() and why do we need it?
* `express.json()` is middleware that comes built-in to Express. We need it in order to parse incoming requests with JSON payloads, which our application is then able to use.
