const Responses = require("../common/API_Responses");
const contractsModel = require("../common/DynamoClient");

const tableName = process.env.tableName;

function validateID(id) {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(id);
}

exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return Responses._400({ message: "Should pass an ID" });
  }

  const id = event.pathParameters.id;
  if (!validateID(id)) return Responses._400({ message: "Incorrect ID Form" });

  const contract = await contractsModel.getByID(id, tableName).catch((err) => {
    console.log("Error in DB", err);
    return null;
  });

  if (!contract)
    return Responses._204({
      message: `Contract with ID: ${id} does not exist`,
    });

  return Responses._200(contract);
};
