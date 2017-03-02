![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 13: Single Resource Mongo and Express API
===

## To Submit this Assignment
  * Fork this repository &#9989;
  * Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-brian` &#9989;
  * Push to your repository &#9989;
  * Submit a pull request to this repository &#9989;
  * Submit a link to your PR in canvas &#9989;
  * Write a question and observation on canvas &#9989;

## Include
  * `package.json` &#9989;
  * `.eslintrc` &#9989;
  * `gulpfile.js` &#9989;
  * `.gitignore` &#9989;
  * `README.md` &#9989;

## Description
  * Create an HTTP Server using `express` &#9989;
  * Create a resource **model** of your choice that uses `mongoose.Schema` and `mongoose.model` &#9989;
  * Use the `body-parser` express middleware to parse the `req` body on `POST` and `PUT` requests &#9989;
  * Use the npm `debug` module to log the functions and methods that are being used in your application &#9989;
  * Use the express `Router` to create a route for doing **RESTFUL CRUD** operations against your _model_ &#9989;

## Server Endpoints
### `/api/resource-name`
* `POST` request
  * should pass data as stringifed JSON in the body of a post request to create a new resource &#9989;

### `/api/resource-name/:id`
* `GET` request
  * should pass the id of a resource through the url endpoint to get a resource
    * **this should use `req.params`, not querystring parameters** &#9989;
* `PUT` request
  * should pass data as stringifed JSON in the body of a put request to update a pre-existing resource &#9989;
* `DELETE` request
  * should pass the id of a resource though the url endpoint to delete a resource
    * **this should use `req.params`** &#9989;

## Tests
* Create a test that will ensure that your API returns a status code of 404 for routes that have not been registered &#9989;
* Create a series of tests to ensure that your `/api/resource-name` endpoint responds as described for each condition below: &#9989;
  * `GET` - test 200, returns a resource with a valid body &#9989;
 * `GET` - test 404, respond with 'not found' for valid requests made with an id that was not found &#9989;
 * `PUT` - test 200, returns a resource with an updated body &#9989;
 * `PUT` - test 400, responds with 'bad request' if no request body was provided &#9989;
 * `PUT` - test 404, responds with 'not found' for valid requests made with an id that was not found &#9989;
 * `POST` - test 400, responds with 'bad request' if no request body was provided &#9989;
 * `POST` - test 200, returns a resource for requests made with a valid body &#9989;

## Bonus
* **2pts:** a `GET` request to `/api/resource-name` should return an array of stored resources
