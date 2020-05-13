import { Vpc } from "@aws-cdk/aws-ec2";
import { Cluster, ContainerImage } from "@aws-cdk/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "@aws-cdk/aws-ecs-patterns";
import { Construct, Stack, StackProps } from "@aws-cdk/core";

export class FargateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "FargateVPC", {
      maxAzs: 3,
    });

    const cluster = new Cluster(this, "FargateCluster", {
      vpc: vpc,
    });

    new ApplicationLoadBalancedFargateService(this, "FargateService", {
      cluster: cluster,
      cpu: 256,
      desiredCount: 1,
      taskImageOptions: {
        image: ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      },
      memoryLimitMiB: 512,
      publicLoadBalancer: true,
    });
  }
}
