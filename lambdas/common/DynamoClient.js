const AWS = require("aws-sdk");

let options = {};
if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

if (process.env.JEST_WORKER_ID) {
  options = {
    region: "local-dev",
    endpoint: "http://localhost:8000",
    sslEnabled: false,
  };
}
const dynamoClient = new AWS.DynamoDB.DocumentClient(options);

const contractsModel = {
  async getALL(TableName) {
    const data = await dynamoClient.scan({ TableName }).promise();

    if (!data || !data.Items) throw Error("There were no Contracts added");

    return data.Items;
  },

  async getByID(id, TableName) {
    const params = {
      TableName,
      Key: {
        contractID: id,
      },
    };
    const data = await dynamoClient.get(params).promise();
    if (!data || !data.Item)
      throw Error("No Contract with given ID or Some Error occurred on Query");
    return data.Item;
  },

  async createContract(data, TableName) {
    // Validate Data Entry
    if (!data.contractID) throw Error("No ID Provided");
    if (!data.userID || !data.contractName || !data.templateID)
      throw Error("Missing Data Fields");

    const params = {
      TableName,
      Item: data,
    };

    const res = await dynamoClient.put(params).promise();

    if (!res)
      throw Error(
        `There was an Error inserting new Contract with ID ${data.id}`
      );

    return data;
  },
};

module.exports = contractsModel;
