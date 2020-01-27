# ShoppingCart

## How to run backend api service (NodeJS/Express)

`cd apiService` and `npm install` to install all dependencies for backend api, then `npm run start` to bring up the server on port 8080.

you can try out the following requests using Postman:
- PUT `http://localhost:8080/api/shopping-cart` (to start a new shopping cart)
- POST `http://localhost:8080/api/item/${id}` optional request body: `{quantity: [number]}` (to add an item to the shopping cart)
- GET `http://localhost:8080/api/total` (to get shopping cart total)

Additionally, you can also try out:
- GET http://localhost:8080/api/shopping-cart (to view current shopping cart)
- DELETE http://localhost:8080/api/shopping-cart (to clear current shopping cart)
- GET http://localhost:8080/api/items (to view available items)

Since the requirement says no external database or other type of storage engine, I made use of session to keep track of the shopping cart info.

To run api tests: `npm run test` under apiService folder

## How to run frontend (Angular)
`cd shopping-cart` and do `npm install` to install all dependencies for the Angular frontend.

Make sure the above api service is up and running, then `npm run start` to bring up the Angular app.

Finally, open up the browser and go to http://localhost:4200

I've also implemented the bonus feature, so you can feel free to refresh the page while adding items to cart. The cart should persist. Enjoy!
