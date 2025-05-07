import ListRoom from '../models/list.room.model.js';
import ListProperty from "../models/list.property.model.js";

export const searchRoomListings = async (req, res) => {
  try {
    const {
      streetAddress,
      city,
      state,
      postalCode,
      country,
      pricePerMonth,
      type,
      occupancyType,
      roomStatus,
      availableFeatures,
      notAvailableFeatures,
      nearby,
      roomDescription,
      propertyDescription,
    } = req.query;

    const matchStage = {};

    if (pricePerMonth) {
      matchStage.pricePerMonth = { $lte: parseFloat(pricePerMonth) };
    }

    if (type) {
      matchStage.type = { $regex: new RegExp(type, 'i') };
    }

    if (occupancyType) {
      matchStage.occupancyType = { $regex: new RegExp(occupancyType, 'i') };
    }

    if (roomStatus) {
      matchStage.status = { $regex: new RegExp(roomStatus, 'i') };
    }

    if (roomDescription) {
      matchStage.description = { $regex: new RegExp(roomDescription, 'i') };
    }

    if (availableFeatures) {
      matchStage.availableFeatures = {
        $in: availableFeatures.split(',').map(f => f.trim()),
      };
    }

    if (notAvailableFeatures) {
      matchStage.notAvailableFeatures = {
        $in: notAvailableFeatures.split(',').map(f => f.trim()),
      };
    }

    const addressMatchStage = {};
    if (streetAddress) addressMatchStage['listing.streetAddress'] = { $regex: new RegExp(streetAddress, 'i') };
    if (city) addressMatchStage['listing.city'] = { $regex: new RegExp(city, 'i') };
    if (state) addressMatchStage['listing.stateProvince'] = { $regex: new RegExp(state, 'i') };
    if (postalCode) addressMatchStage['listing.postalCode'] = { $regex: new RegExp(postalCode, 'i') };
    if (country) addressMatchStage['listing.country'] = { $regex: new RegExp(country, 'i') };

    const propertyDescriptionMatchStage = {};
    if (propertyDescription) {
      propertyDescriptionMatchStage['listing.description'] = {
        $regex: new RegExp(propertyDescription, 'i'),
      };
    }

    const nearbyMatchStage = {};
    if (nearby) {
      nearbyMatchStage['listing.nearby'] = {
        $in: nearby.split(',').map(item => item.trim()),
      };
    }

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'listproperties',
          localField: 'listingId',
          foreignField: '_id',
          as: 'listing',
        },
      },
      { $unwind: '$listing' },
      {
        $match: {
          ...addressMatchStage,
          ...propertyDescriptionMatchStage,
          ...nearbyMatchStage,
        },
      },
      {
        $project: {
          roomId: '$_id',
          roomDescription: '$description',
          roomPricePerMonth: '$pricePerMonth',
          roomType: '$type',
          roomOccupancyType: '$occupancyType',
          roomAvailableFeatures: '$availableFeatures',
          roomNotAvailableFeatures: '$notAvailableFeatures',
          roomImages: '$images',
          roomCreatedAt: '$createdAt',
          roomStatus: '$status',
          listingId: '$listing._id',
          propertyType: '$listing.type',
          propertyDescription: '$listing.description',
          providerType: '$listing.providerType',
          address: {
            street: '$listing.streetAddress',
            city: '$listing.city',
            state: '$listing.stateProvince',
            postalCode: '$listing.postalCode',
            country: '$listing.country',
          },
          nearby: '$listing.nearby',
          listingCreatedAt: '$listing.createdAt',
        },
      },
    ];

    const results = await ListRoom.aggregate(pipeline);

    if (!results.length) {
      return res.status(404).json({ success: false, message: 'No room listings found' });
    }

    res.status(200).json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
