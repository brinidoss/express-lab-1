import express from 'express';

const cartItemsRoutes = express.Router();

interface cartItem {
    id: number, 
    product: string,
    price: number, 
    quantity: number

}

let cartItems: cartItem[] = [
    {
        id: 1,
        product: "heart container",
        price: 500,
        quantity: 1
    },
    {
        id: 2,
        product: "red potion",
        price: 20,
        quantity: 10
    },
    {
        id: 3,
        product: "arrows",
        price: 10,
        quantity: 100
    },
    {
        id: 4,
        product: "bombs",
        price: 30,
        quantity: 5
    },
    {
        id: 5,
        product: "empty bottle",
        price: 200,
        quantity: 1
    }
]

let nextId = cartItems.length + 1;

//get cart items
cartItemsRoutes.get("/cart-items", (req, res) => {
    // res.status(200);
    // res.json(cartItems);

// let maxPrice: number = Number(req.query.maxPrice);
// let maxPriceItems: cartItem[] = cartItems.filter(item => item.price <= maxPrice);
// res.json(maxPriceItems);

let prefix: string = String((req.query.prefix));
let prefixItems: cartItem[] = cartItems.filter(item => item.product.startsWith(prefix));
res.json(prefixItems);

})


//get cart items by id
cartItemsRoutes.get("/cart-items/:id", (req, res) => {
    let foundItem = cartItems.find((item) => {
        console.log(item.id);
        console.log(req.params.id);
        return item.id === parseInt(req.params.id);
    })
    if (foundItem) {
       res.json(foundItem); 
    } else {
        //send a "not found" status
        res.status(404);
        res.json("ID not found");
        
    }
})

//post add an item
cartItemsRoutes.post('/cart-items', (req, res) => {
    //res.json(req.body);
    //create an object to store for new item
    let newItem: cartItem = {
        id: nextId,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    }
    //increment the next id so we keep track for the next apple
    nextId++;
    //add apple to applesArray
    cartItems.push(newItem);
    //respond with newItem object we added to array
    res.status(201);
    res.json(newItem);
})

//update an item
cartItemsRoutes.put("/cart-items/:id", (req, res) => {
    let foundItemIndex = cartItems.findIndex((item) => {
      
        return item.id === parseInt(req.params.id);
    })
    
    if (foundItemIndex > -1) {
        //we have an item, update it
        //send the updated array
       cartItems[foundItemIndex] = {
           id: cartItems[foundItemIndex].id,
           product: req.body.product,
           price: req.body.price,
           quantity: req.body.quantity
       };
       //send the updated cart item object
       res.json(cartItems[foundItemIndex]);
    } else {
        //send a "no content" status
        res.sendStatus(204);
    }
})

//delete by id
cartItemsRoutes.delete("/cart-items/:id", (req, res) => {
    let foundItemIndex = cartItems.findIndex((item) => {
      
        return item.id === parseInt(req.params.id);
    })
    
    if (foundItemIndex > -1) {
       cartItems.splice(foundItemIndex, 1);
       

       //send the new applesArray
       res.sendStatus(204);
       //res.json(applesArray);
    
    } else {
        //send bad request status
        res.sendStatus(400);
    }
})


export default cartItemsRoutes;