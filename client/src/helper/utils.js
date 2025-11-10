export const QUICK_PERCENTAGES = [5, 10, 15, 20, 25, 30, 40, 50];

// Flatten variants for table display
export const getFlattenedVariants = (formData, type) => {
  const flattened = [];
  formData.selected_products.forEach((product) => {
    product.variants.forEach((variant) => {
      let newValue;
      const pricingLogic = formData.price_update_logic || "percentage";
      
      if (type === "device") {
        if (pricingLogic === "percentage") {
          newValue = {
            percentage: {
              android_value:
                variant.updated_price?.percentage?.android_value || "",
              android_type:
                variant.updated_price?.percentage?.android_type || "increase",
              ios_value: variant.updated_price?.percentage?.ios_value || "",
              ios_type: variant.updated_price?.percentage?.ios_type || "increase",
            }
          };
        } else {
          newValue = {
            fixed_price: {
              android_value:
                variant.updated_price?.fixed_price?.android_value || "",
              ios_value: variant.updated_price?.fixed_price?.ios_value || "",
            }
          };
        }
      } else if (type === "weekend") {
        if (pricingLogic === "percentage") {
          newValue = {
            percentage: {
              weekend_value:
                variant.updated_price?.percentage?.weekend_value || "",
              weekend_type:
                variant.updated_price?.percentage?.weekend_type || "increase",
            }
          };
        } else {
          newValue = {
            fixed_price: {
              weekend_value:
                variant.updated_price?.fixed_price?.weekend_value || "",
            }
          };
        }
      } else if (type === "daynight") {
        if (pricingLogic === "percentage") {
          newValue = {
            percentage: {
              day_value:
                variant.updated_price?.percentage?.day_value || "",
              day_type:
                variant.updated_price?.percentage?.day_type || "increase",
              night_value:
                variant.updated_price?.percentage?.night_value || "",
              night_type:
                variant.updated_price?.percentage?.night_type || "increase",
            }
          };
        } else {
          newValue = {
            fixed_price: {
              day_value:
                variant.updated_price?.fixed_price?.day_value || "",
              night_value:
                variant.updated_price?.fixed_price?.night_value || "",
            }
          };
        }
      } else if (type === "inventory") {
        if (pricingLogic === "percentage") {
          newValue = {
            percentage: {
              below_value: variant.updated_price?.percentage?.below_value || "",
              below_type: variant.updated_price?.percentage?.below_type || "increase",
              above_value: variant.updated_price?.percentage?.above_value || "",
              above_type: variant.updated_price?.percentage?.above_type || "increase",
            }
          };
        } else {
          newValue = {
            fixed_price: {
              below_value: variant.updated_price?.fixed_price?.below_value || "",
              above_value: variant.updated_price?.fixed_price?.above_value || "",
            }
          };
        }
      } else if (type === "productBase") {
        if (pricingLogic === "percentage") {
          newValue = {
            percentage: {
              product_value:
                variant.updated_price?.percentage?.product_value || "",
              product_type:
                variant.updated_price?.percentage?.product_type || "increase",
            }
          };
        } else {
          newValue = {
            fixed_price: {
              product_value:
                variant.updated_price?.fixed_price?.product_value || "",
            }
          };
        }
      } else if (type === "customer") {
        if (pricingLogic === "percentage") {
          newValue = {
            percentage: {
              customer_value:
                variant.updated_price?.percentage?.customer_value || "",
              customer_type:
                variant.updated_price?.percentage?.customer_type || "increase",
            }
          };
        } else {
          newValue = {
            fixed_price: {
              value:
                variant.updated_price?.fixed_price?.value || "",
            }
          };
        }
      }
      
      flattened.push({
        id: variant.variant_id,
        productId: product.product_id,
        productTitle: product.product_title,
        variantTitle: variant.variant_title,
        productImage: product.product_image,
        originalPrice: variant.original_price,
        ...newValue
      });
    });
  });
  return flattened;
};

// Clean up variant data to only include the selected pricing logic
export const cleanVariantData = (formData, type) => {
  const cleanedProducts = formData.selected_products.map(product => ({
    ...product,
    variants: product.variants.map(variant => {
      const pricingLogic = formData.price_update_logic || "percentage";
      let cleanedUpdatedPrice = {};
      
      if (pricingLogic === "percentage") {
        // Only include percentage data
        if (type === "device") {
          cleanedUpdatedPrice = {
            percentage: {
              android_value: variant.updated_price?.percentage?.android_value || "",
              android_type: variant.updated_price?.percentage?.android_type || "increase",
              ios_value: variant.updated_price?.percentage?.ios_value || "",
              ios_type: variant.updated_price?.percentage?.ios_type || "increase",
            }
          };
        } else if (type === "weekend") {
          cleanedUpdatedPrice = {
            percentage: {
              weekend_value: variant.updated_price?.percentage?.weekend_value || "",
              weekend_type: variant.updated_price?.percentage?.weekend_type || "increase",
            }
          };
        } else if (type === "daynight") {
          cleanedUpdatedPrice = {
            percentage: {
              day_value: variant.updated_price?.percentage?.day_value || "",
              day_type: variant.updated_price?.percentage?.day_type || "increase",
              night_value: variant.updated_price?.percentage?.night_value || "",
              night_type: variant.updated_price?.percentage?.night_type || "increase",
            }
          };
        } else if (type === "inventory") {
          cleanedUpdatedPrice = {
            percentage: {
              below_value: variant.updated_price?.percentage?.below_value || "",
              below_type: variant.updated_price?.percentage?.below_type || "increase",
            }
          };
        } else if (type === "customer") {
          cleanedUpdatedPrice = {
            percentage: {
              customer_value: variant.updated_price?.percentage?.customer_value || "",
              customer_type: variant.updated_price?.percentage?.customer_type || "increase",
            }
          };
        }
      } else {
        // Only include fixed_price data
        if (type === "device") {
          cleanedUpdatedPrice = {
            fixed_price: {
              android_value: variant.updated_price?.fixed_price?.android_value || "",
              ios_value: variant.updated_price?.fixed_price?.ios_value || "",
            }
          };
        } else if (type === "weekend") {
          cleanedUpdatedPrice = {
            fixed_price: {
              weekend_value: variant.updated_price?.fixed_price?.weekend_value || "",
            }
          };
        } else if (type === "daynight") {
          cleanedUpdatedPrice = {
            fixed_price: {
              day_value: variant.updated_price?.fixed_price?.day_value || "",
              night_value: variant.updated_price?.fixed_price?.night_value || "",
            }
          };
        } else if (type === "inventory") {
          cleanedUpdatedPrice = {
            fixed_price: {
              below_value: variant.updated_price?.fixed_price?.below_value || "",
            }
          };
        } else if (type === "customer") {
          cleanedUpdatedPrice = {
            fixed_price: {
              value: variant.updated_price?.fixed_price?.value || "",
            }
          };
        }
      }
      
      return {
        ...variant,
        updated_price: cleanedUpdatedPrice
      };
    })
  }));
  
  return {
    ...formData,
    selected_products: cleanedProducts
  };
};

export const calculateNewPrice = (originalPrice, percentage, type) => {
  const original = parseFloat(originalPrice);
  const percent = parseFloat(percentage);

  if (isNaN(original) || isNaN(percent) || percent === "")
    return originalPrice;

  const change = (original * percent) / 100;
  const newPrice =
    type === "increase" ? original + change : original - change;

  return Math.max(0, newPrice).toFixed(2);
};
  