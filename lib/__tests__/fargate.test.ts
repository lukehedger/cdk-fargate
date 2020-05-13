import "@aws-cdk/assert/jest";
import { App } from "@aws-cdk/core";
import { FargateStack } from "../fargate";

let stack: FargateStack;

beforeAll(() => {
  const app = new App();

  stack = new FargateStack(app, "FargateStack");
});

test("Stack has VPC resource", () => {
  expect(stack).toHaveResource("AWS::EC2::VPC", {
    EnableDnsHostnames: true,
    EnableDnsSupport: true,
  });
});

test("Stack has ECS Cluster resource", () => {
  expect(stack).toHaveResource("AWS::ECS::Cluster");
});

test("Stack has Fargate Service ELB resource", () => {
  expect(stack).toHaveResource("AWS::ElasticLoadBalancingV2::LoadBalancer", {
    Scheme: "internet-facing",
    Type: "application",
  });
});

test("Stack has Fargate Service Task Definition resource", () => {
  expect(stack).toHaveResourceLike("AWS::ECS::TaskDefinition", {
    ContainerDefinitions: [
      {
        Image: "amazon/amazon-ecs-sample",
        LogConfiguration: {
          LogDriver: "awslogs",
          Options: {
            "awslogs-stream-prefix": "FargateService",
          },
        },
        Name: "web",
        PortMappings: [
          {
            ContainerPort: 80,
            Protocol: "tcp",
          },
        ],
      },
    ],
    Cpu: "256",
    Memory: "512",
    NetworkMode: "awsvpc",
    RequiresCompatibilities: ["FARGATE"],
  });
});
