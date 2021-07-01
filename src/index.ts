import express from 'express';
import cors from 'cors';
import cartItemsRoutes from './cart-items';

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

app.use("/", cartItemsRoutes);

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})

