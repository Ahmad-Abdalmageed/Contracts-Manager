const Responses = require("../common/API_Responses");
const contractsModel = require("../common/DynamoClient");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return Responses._400({ message: "ID Not Found" });
  }

  const id = event.pathParameters.id;

  const contract = await contractsModel.getByID(id, tableName).catch((err) => {
    console.log("Error in DB", err);
    return null;
  });

  if (!contract)
    return Responses._400({
      message: `Could not retrieve Contract with ${id}`,
    });

  return Responses._200(contract);
};
