![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 13: Single Resource Mongo and Express API
===


## Description
  * Created an HTTP Server using `express`
  * Created a resource **model** that uses `mongoose.Schema` and `mongoose.model`
  * Used the `body-parser` express middleware to parse the `req` body on `POST` and `PUT` requests
  * Used the npm `debug` module to log the functions and methods that are being used in the application
  * Used the express `Router` to create a route for doing **RESTFUL CRUD** operations against the _model_ journal.js file.


## How to use:
    * $ npm i
      -to instal dependencies

    
## Server Endpoints
### `/api/resource-name`
* `POST` request


### `/api/resource-name/:id`
* `GET` request
* `PUT` request
* `DELETE` request


## Tests
* Created a test that will ensure that this API returns a status code of 404 for routes that have not been registered
* Created a series of tests to ensure that your `/api/resource-name` endpoint responds as described for each condition below:
  * `GET` - test 200, returns a resource with a valid body
 * `GET` - test 404, respond with 'not found' for valid requests made with an id that was not found
 * `PUT` - test 200, returns a resource with an updated body
 * `PUT` - test 400, responds with 'bad request' if no request body was provided
 * `PUT` - test 404, responds with 'not found' for valid requests made with an id that was not found
 * `POST` - test 400, responds with 'bad request' if no request body was provided
 * `POST` - test 200, returns a resource for requests made with a valid body
