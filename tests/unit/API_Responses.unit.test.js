const Responses = require("../../lambdas/common/API_Responses");

test("Responses Return an Object", () => {
  expect(typeof Responses).toBe("object");
});

test("_200 Response", () => {
  const res = Responses._200({ name: "Ahmad" });
  expect(res.statusCode).toBe(200);
  expect(res.body).toBe('{"name":"Ahmad"}');
  expect(res.headers["Content-Type"]).toBe("application/json");
  expect(res.headers["Access-Control-Allow-Methods"]).toBe("*");
  expect(res.headers["Access-Control-Allow-Origin"]).toBe("*");
});
test("_400 Response", () => {
  const res = Responses._400({ name: "Ahmad" });
  expect(res.statusCode).toBe(400);
  expect(res.body).toBe('{"name":"Ahmad"}');
  expect(res.headers["Content-Type"]).toBe("application/json");
  expect(res.headers["Access-Control-Allow-Methods"]).toBe("*");
  expect(res.headers["Access-Control-Allow-Origin"]).toBe("*");
});
test("_404 Response", () => {
  const res = Responses._404({ name: "Ahmad" });
  expect(res.statusCode).toBe(404);
  expect(res.body).toBe('{"name":"Ahmad"}');
  expect(res.headers["Content-Type"]).toBe("application/json");
  expect(res.headers["Access-Control-Allow-Methods"]).toBe("*");
  expect(res.headers["Access-Control-Allow-Origin"]).toBe("*");
});

test("Define Response", () => {
  const res = Responses._DefineResponse(302, { hello: true });
  expect(res.statusCode).toBe(302);
  expect(res.body).toBe(JSON.stringify({ hello: true }));
});
