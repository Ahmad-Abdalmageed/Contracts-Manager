const Responses = require("../common/API_Responses");
const contractsModel = require("../common/DynamoClient");
const { v4: uuidv4 } = require("uuid");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  const id = uuidv4();
  const contract = { contractID: id, ...JSON.parse(event.body) };

  const newContract = await contractsModel
    .createContract(contract, tableName)
    .catch((err) => {
      console.log("Error in DB", err);
      return null;
    });

  if (!newContract)
    return Responses._400({ message: "Failed to Create a New Contract" });

  return Responses._200({ newContract });
};
