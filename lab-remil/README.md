# Shoe REST API
This API has full CRUD routes and uses MongoDB for data persistance

### Resources
- **Shoe** - each shoe has a unique ID, model name, and brand name
  - *endpoint*: `/api/shoe`
    - GET request: returns array of all shoes in database
    - POST request: adds shoe to database
      - Must provide a *model* and *brand* property in the request body
  - *endpoint*: `/api/shoe/id`
    - GET request: returns shoe with the provided id
    - PUT request: updates shoe with the provided id
      - Provide *model* and *brand* property in the request body
    - DELETE request: removes shoe with the provided id
