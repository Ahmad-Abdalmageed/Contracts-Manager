const dynamo = require("../lambdas/common/DynamoClient");

test("Dynamo is an Object", () => {
  expect(typeof dynamo).toBe("object");
});

test("Dynamo Client has CRUD Functionalities", () => {
  expect(typeof dynamo.createContract).toBe("function");
  expect(typeof dynamo.getByID).toBe("function");
  expect(typeof dynamo.getALL).toBe("function");
});

const data = {
  contractID: "12312",
  userID: "123412",
  contractName: "Important",
  templateID: "123",
};
const tableName = "contracts";

test("Dynamo Client Adds a new Contract", async () => {
  expect.assertions(1);
  try {
    const res = await dynamo.createContract(data, tableName);
    expect(res).toBe(data);
  } catch (e) {
    console.log(e);
  }
});

test("Dynamo Client get a Contract by ID", async () => {
  expect.assertions(1);
  try {
    const res = await dynamo.getByID(data.contractID, tableName);
    expect(res).toBe(data);
  } catch (e) {
    console.log(e);
  }
});
test("Dynamo Client get all Contracts", async () => {
  expect.assertions(1);
  try {
    const res = await dynamo.getALL(tableName);
    expect(res).toBe(data);
  } catch (e) {
    console.log(e);
  }
});
