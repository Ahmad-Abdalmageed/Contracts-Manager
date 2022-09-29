const createContract = require("../../lambdas/endpoints/createContract");
const eventGen = require("../utils/eventGenerator");
const validators = require("../utils/validators");

describe("createContract Endpoint Integration Tests", () => {
  test("Takes a body and return a valid APIGateway Response", async () => {
    const event = eventGen({
      body: {
        userID: "1230-12asad",
        contractName: "Ahmad Abdalmageed",
        templateID: "123z9823901123",
      },
    });
    const res = await createContract.handler(event);
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toBe(true);
  });

  test("Returns a 400 CODE with no Payload", async () => {
    const res = await createContract.handler(eventGen({}));
    expect(res.statusCode).toBe(400);
  });

  test("Returns a 400 CODE with missing fields", async () => {
    const event = eventGen({
      body: {
        userID: "1230-12asad",
      },
    });
    const res = await createContract.handler(event);
    expect(validators.isApiGatewayResponse(res)).toBe(true);
  });
});
