import bag from '../models/bag'
import item from '../models/item'


const calculateTotalWeight = async (bagId, userId) => {
    try {
      const itemsInBag = await item.find({creator: userId, bagId});
  
      let totalWeight = 0;
  
      itemsInBag.forEach((item) => {
        let weightInGrams = item.weight;
  
        switch (item.wgtOpt) {
          case "kg":
            weightInGrams *= 1000;
            break;
          case "lb":
            weightInGrams *= 453.592;
            break;
          case "oz":
            weightInGrams *= 28.3495;
            break;
          default:
            break;
        }
  
        totalWeight += weightInGrams * item.qty;
      });
  
      const Bag = await bag.findById(bagId);
  
      if (!Bag || Bag.creator.toString() !== userId.toString()) {
        throw { status: 404, message: "Bag not found" };
      }
  
      return { totalWeight: totalWeight / 1000 };
    } catch (error) {
      console.error("Error calculating total weight of items based on wgtOpt:", error);
      throw { status: 500, message: "Internal Server Error" };
    }
  };


  module.exports = { calculateTotalWeight }