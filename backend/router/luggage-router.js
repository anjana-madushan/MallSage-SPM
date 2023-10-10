import { addLuggage, getOneLuggage,getLuggages,deleteLuggage,getLuggagesByShopId, updateLuggage,getLuggagesByShopAndDate, getallLuggages,validateShopToken, getLuggageByCustomerEmail, gettotalLuggages } from '../controller/luggage-controller.js';
import { checkToken, checkAdmin } from '../middlewares/user.js';
import express from 'express';

const luggage_router = express.Router();

luggage_router.get("/getallLuggagescustomer/:email", gettotalLuggages);
luggage_router.get("/getLuggagebyUseremail/:email", getallLuggages);
luggage_router.post("/addLuggage", addLuggage);
luggage_router.get("/", getLuggages);
luggage_router.get("/:luggageId", getOneLuggage);
luggage_router.patch("/updateLuggage/:id", updateLuggage);
luggage_router.patch("/validateShopToken/:shopToken", validateShopToken);
luggage_router.get("/getluggagesbyshop/:shop/:date", async (req, res) => {
    try {
      const { userid, date } = req.params;
      const luggages = await getLuggagesByShopAndDate(userid, date);
      console.log(luggages)
      res.status(200).json({ luggages });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  luggage_router.get("/getluggagesbyshopID/:shop", async (req, res) => {
    try {
      const { shop } = req.params;
      const luggages = await getLuggagesByShopId(shop);
      console.log(luggages)
      res.status(200).json({ luggages });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// luggage_router.get("/getLuggagebyUseremail/:email", getLuggageByCustomerEmail);
luggage_router.delete("/deleteLuggage/:id", deleteLuggage);

export default luggage_router;