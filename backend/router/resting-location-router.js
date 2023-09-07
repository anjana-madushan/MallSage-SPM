import { addLocation, getOneLocation, getLocations, deleteLocation, updateLocation, addNoReserved, decreaseNoReserved } from "../controller/resting-location-controller.js";
import { checkToken, checkAdmin } from '../middlewares/user.js';
import express from 'express';

const location_router = express.Router();

location_router.post("/addRestingLocation", addLocation);
location_router.get("/", getLocations);
location_router.get("/:locationId", getOneLocation);
location_router.patch("/:id", updateLocation);
location_router.patch("/addReserved/:id", addNoReserved);
location_router.patch("/decreaseReserved/:id", decreaseNoReserved);
location_router.delete("/:id", checkToken, checkAdmin, deleteLocation);

export default location_router;