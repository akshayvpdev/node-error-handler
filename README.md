# Express.js Error Handling Example

This project demonstrates an effective error handling mechanism in an Express.js application. It includes a custom error class, a global error handler, and specific handlers for different error types.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Custom Error Class](#custom-error-class)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akshayvpdev/node-error-handler.git
   cd node-error-handler
   npm install

 ## Usage
  Here’s a simple example of how to implement the error handling middleware in your Express application:

  ## Custom Error Class

The `CustomError` class extends the built-in JavaScript `Error` class to create a standardized error handling mechanism for the application. This class is used to generate meaningful error messages and status codes for different types of errors.

### Implementation

Here is the implementation of the `CustomError` class:

```javascript
 class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.isOperationError = true;
        Error.captureStackTrace(this, this.constructor); 
     }
 }

 module.exports = CustomError;
```
## 🚀 About Me
I'm a full stack developer...


# Hi, I'm Akshay! 👋



