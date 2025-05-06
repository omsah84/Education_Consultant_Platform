import mongoose from 'mongoose';
const { Schema } = mongoose;

// Accommodation Type Schema
const listPropertySchema = new Schema(
  {
    usernameId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (the owner of the accommodation)
      required: true,
    },
    type: {
      type: String,
      enum: [
        'House', 'Apartment/Flat', 'Villa', 'Bungalow', 'Studio Apartment', 
        'Basement Suite', 'Tiny House', 'Mobile Home', 'Caravan', 'Farmhouse', 
        'Paying Guest (PG)', 'Hostel', 'Dormitory', 'Co-living Space', 'Shared Apartment', 
        'Lodging', 'Boarding House', 'Sublet', 'Company-Provided Housing', 'Government Quarters', 
        'Military Barracks', 'Monastery', 'Ashram', 'Serviced Apartment', 'Guest House', 
        'Tent', 'Campsite', 'Shelter', 'Relief Housing', 'Boat House', 'Houseboat', 
        'Retirement Home', 'Old Age Home', 'Rehabilitation Center', 'Group Home'
      ],
      required: true,
    },
    description: {
      type: String,
      default: '', // Optional description of the accommodation
    },
    providerType: {
      type: String,
      enum: ['private', 'government', 'company', 'religious', 'self', 'other'],
      required: true, // Type of the accommodation provider
    },
    // Address fields are broken into individual components
    streetAddress: {
      type: String,
      required: true, // Street address is required
    },
    city: {
      type: String,
      required: true, // City is required
    },
    stateProvince: {
      type: String,
      required: true, // State/Province is required
    },
    postalCode: {
      type: String,
      required: true, // Postal code/ZIP code is required
    },
    country: {
      type: String,
      required: true, // Country is required
    },
    image: {
      type: String, 
      required: false, // Optional field for storing the accommodation image URL or file path
      default: '', // Default empty string if no image is provided
    },
    nearby: {
      type: [String], // Array of strings to store nearby places/amenities
      required: false, // Optional field (can be left empty if there are no nearby places)
      default: [], // Default empty array
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the ListProperty model
const ListProperty = mongoose.model('ListProperty', listPropertySchema);

export default ListProperty;
