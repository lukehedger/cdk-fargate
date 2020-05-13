import "@aws-cdk/assert/jest";
import { App } from "@aws-cdk/core";
import { FargateStack } from "../fargate";

let stack: FargateStack;

beforeAll(() => {
  const app = new App();

  stack = new FargateStack(app, "FargateStack");
});

test("Stack has no resources", () => {
  expect(stack).toMatchTemplate({
    Resources: {},
  });
});
