# Headless commerce API

<p>Headless commerce API is a Node.js-based solution developed with NestJS, JWT (JSON Web Tokens), and MongoDB. It provides a streamlined and decoupled approach for building e-commerce applications by separating the front-end presentation layer from the back-end commerce functionalities. This API enables seamless integration with various front-end frameworks, allowing developers to create flexible and personalized e-commerce experiences while leveraging the power of MongoDB for efficient data storage and retrieval</p>

## Features
 - User Management:
   - User registration and authentication using JWT
   - User profile management
   - Role-based access control (admin, customer, etc.)
   
 - Product Management:
   - CRUD operations for products (create, read, update, delete)
   - Product categorization and filtering
   - Product search and sorting
   - Product inventory management
   
 - Order Management:
   - Create and process orders
   - Order history and status tracking
   - Generate order invoices and receipts
   - Shipping and billing address management
   
 - Payment Integration: Coming Soon
 
 - Reviews and Ratings:
   - Allow customers to submit product reviews and ratings
   - Average rating calculation for products
   - Review moderation and approval process
   
 - Wishlist: Coming soon
 
 - Analytics and Reporting: Coming soon
 
 - Localization and Internationalization:
 - API Documentation and Testing: 
   - Generate comprehensive API documentation (e.g., using Swagger)
   - Unit testing and integration testing of API endpoints
 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
