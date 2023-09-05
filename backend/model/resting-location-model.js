import mongoose from "mongoose";

const Schema = mongoose.Schema;

const locationSchema = new Schema({

  locationName: {
    type: String,
    required: true
  },

  locationPlaced: {
    type: String,
    required: true
  },

  locationFeatures: {
    type: [String],
    required: true
  }

});

const RestingLocations = mongoose.model("RestingLocations", locationSchema);

export default RestingLocations;