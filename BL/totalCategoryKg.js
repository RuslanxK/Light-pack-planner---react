import items from '../models/item'
import categories from '../models/categories'



const calculateCategoryTotalWeight = async (bagId) => {
    try {
      const categoriesInBag = await categories.find({bagId});
  
      const categoriesTotalWeight = [];
  
      for (const category of categoriesInBag) {
        const itemsInCategory = await items.find({ categoryId: category._id.toString()});
  
        let totalWeight = 0;
  
        itemsInCategory.forEach((item) => {
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
  
        const totalWeightInKilograms = totalWeight / 1000;
  
        categoriesTotalWeight.push({ categoryId: category._id, totalWeight: totalWeightInKilograms });
      }
  
      return { categoriesTotalWeight };
      
    } catch (error) {
      console.error("Error calculating total weight for each category:", error);
      throw { status: 500, message: "Internal Server Error" };
    }
  };
  

  module.exports = { calculateCategoryTotalWeight }