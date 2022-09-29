const getContract = require("../../lambdas/endpoints/getContract");
const eventGen = require("../utils/eventGenerator");
const validators = require("../utils/validators");

describe("getContract Endpoint Integration Tests", () => {
  test("Takes a body and return a valid APIGateway Response", async () => {
    const event = eventGen({
      pathParametersObject: {
        contractID: "sdfsdf3re",
      },
    });

    const res = await getContract.handler(event);
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toBe(true);
  });

  test("Returns a 400 CODE with no Payload", async () => {
    const res = await getContract.handler(eventGen({}));
    expect(res.statusCode).toBe(400);
  });

  test("Returns a 400 CODE with invalid uuid", async () => {
    const event = eventGen({
      pathParametersObject: {
        contractID: "1209uncaslkodj01923",
      },
    });
    const res = await getContract.handler(event);
    expect(res.statusCode).toBe(400);
  });
});
