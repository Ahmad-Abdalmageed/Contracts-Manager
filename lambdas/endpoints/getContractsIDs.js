const Responses = require("../common/API_Responses.js");
const contractsModel = require("../common/DynamoClient.js");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log("EVENT", event);

  const contracts = await contractsModel.getALL(tableName).catch((err) => {
    console.log("Error in DB", err);
    return null;
  });

  if (contracts == null)
    return Responses._400({
      message: `Could not retrieve Contracts From DB`,
    });

  return Responses._200(contracts);
};
