import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    usernameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (the owner of the accommodation)
      required: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ListProperty",
      required: true,
    },

    description: {
      type: String,
    },

    pricePerMonth: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Booked", "In Progress"],
      default: "Available",
    },

    type: {
      type: String,
      enum: ["Room", "Flat", "Studio", "Dorm", "PG", "Apartment"],
      required: true,
    },

    occupancyType: {
      type: String,
      enum: ["Private", "Sharing", "Flat"],
      required: true,
    },

    availableFeatures: {
      type: [String],
      enum: [
        "WiFi",            // Internet
        "Air Conditioning", // Cooling system
        "Heater",           // Heating system
        "Washing Machine",  // Laundry machine
        "Refrigerator",     // Fridge
        "TV",               // Television
        "Private Bathroom", // Bathroom attached to the room
        "Parking",          // Parking space
        "Electricity",      // Power supply
        "Water Supply",     // Running water
        "CCTV",             // Security cameras
        "Security",         // Security services
        "Housekeeping",     // Cleaning services
        "Power Backup",     // Backup electricity supply
        "Geyser",           // Water heater
      ],
      default: [],
    },

    notAvailableFeatures: {
      type: [String],
      enum: [
        "WiFi",            // Internet
        "Air Conditioning", // Cooling system
        "Heater",           // Heating system
        "Washing Machine",  // Laundry machine
        "Refrigerator",     // Fridge
        "TV",               // Television
        "Private Bathroom", // Bathroom attached to the room
        "Parking",          // Parking space
        "Electricity",      // Power supply
        "Water Supply",     // Running water
        "CCTV",             // Security cameras
        "Security",         // Security services
        "Housekeeping",     // Cleaning services
        "Power Backup",     // Backup electricity supply
        "Geyser",           // Water heater
      ],
      default: [],
    },

    likedByUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    images: [
      {
        type: String, // URL to Cloudinary or other CDN
      },
    ],
  },
  { timestamps: true }
);

const ListRoom = mongoose.models.Room || mongoose.model("ListRoom", roomSchema);
export default ListRoom;
