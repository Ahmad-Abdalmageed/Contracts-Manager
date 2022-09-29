const getContractsIDs = require("../../lambdas/endpoints/getContractsIDs");
const eventGen = require("../utils/eventGenerator");
const validators = require("../utils/validators");

describe("getContractsIDs Endpoint Integration Tests", () => {
  test("Takes a body and return a valid APIGateway Response", async () => {
    const event = eventGen({});
    const res = await getContractsIDs.handler(event);
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toBe(true);
    expect(res.statusCode).toBe(204);
  });
});
