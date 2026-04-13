import { getStatus, getStockLevel, validate } from "./inventoryHelpers.js";

describe("getStatus", () => {
  test("returns Critical when quantity is 2 or below", () => {
    expect(getStatus(2, 10)).toBe("Critical");
    expect(getStatus(0, 10)).toBe("Critical");
  });

  test("returns Warning when quantity is above 2 but at or below reorder point", () => {
    expect(getStatus(5, 10)).toBe("Warning");
  });

  test("returns Healthy when quantity is above reorder point", () => {
    expect(getStatus(15, 10)).toBe("Healthy");
  });
});

describe("getStockLevel", () => {
  test("returns correct percentage", () => {
    expect(getStockLevel(5, 10)).toBe(50);
  });

  test("caps at 100 when quantity exceeds reorder point", () => {
    expect(getStockLevel(20, 10)).toBe(100);
  });

  test("returns 0 when quantity is 0", () => {
    expect(getStockLevel(0, 10)).toBe(0);
  });
});

describe("validate", () => {
  test("returns error when name is empty", () => {
    const result = validate({
      name: "",
      quantity: "5",
      sku: "SK01",
      unit_price: "10",
      unit: "kg",
    });
    expect(result.name).toBe("Item name is required");
  });

  test("returns error when quantity is not a number", () => {
    const result = validate({
      name: "Chair",
      quantity: "abc",
      sku: "SK01",
      unit_price: "10",
      unit: "kg",
    });
    expect(result.quantity).toBe("Valid quantity required");
  });

  test("returns error when sku is empty", () => {
    const result = validate({
      name: "Chair",
      quantity: "5",
      sku: "",
      unit_price: "10",
      unit: "kg",
    });
    expect(result.sku).toBe("SKU is required");
  });

  test("returns no errors when all required fields are valid", () => {
    const result = validate({
      name: "Chair",
      quantity: "5",
      sku: "SK01",
      unit_price: "10",
      unit: "kg",
    });
    expect(Object.keys(result).length).toBe(0);
  });
});
