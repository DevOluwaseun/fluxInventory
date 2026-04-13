export const validate = (formData) => {
  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Item name is required";
  }

  if (!formData.quantity || isNaN(formData.quantity)) {
    newErrors.quantity = "Valid quantity required";
  }

  if (!formData.sku.trim()) {
    newErrors.sku = "SKU is required";
  }

  if (!formData.unit_price || isNaN(formData.unit_price)) {
    newErrors.unit_price = "Unit price is required";
  }

  if (!formData.unit.trim()) {
    newErrors.unit = "Unit  is required";
  }

  return newErrors;
};

export const getStatus = (quantity, reorder_point) => {
  if (quantity <= 2) return "Critical";
  if (quantity <= reorder_point) return "Warning";
  return "Healthy";
};

export const getStockLevel = (quantity, reorder_point) => {
  const stockLevel = Math.min((quantity / reorder_point) * 100, 100);

  return stockLevel;
};
