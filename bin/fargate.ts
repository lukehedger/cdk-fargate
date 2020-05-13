#!/usr/bin/env node
import { App } from "@aws-cdk/core";
import { FargateStack } from "../lib/fargate";

const app = new App();

new FargateStack(app, "FargateStack");
