import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';

import { env } from 'process';

const envName = env.NODE_ENV || 'local';
const nameIt = (name: string) => `${envName}-snake-${name}`.toLowerCase();

export class SnakeStack extends cdk.Stack {

  public static readonly Name = nameIt("Snake-Stack");

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Snake Web Client
    const snakeClientBucket = new s3.Bucket(this, nameIt("website-s3"), {
      bucketName: nameIt("website-s3"),
      versioned: false,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      removalPolicy: cdk.RemovalPolicy.DESTROY // remove on stack destruction
    });

    new s3deploy.BucketDeployment(this, nameIt("website-s3-deployment"), {
      sources: [s3deploy.Source.asset('../snake-client')],
      destinationBucket: snakeClientBucket,
    });

    // Tags
    for (const nodeChild of scope.node.children) {
      cdk.Tags.of(nodeChild).add(SnakeStack.Name, SnakeStack.Name);
    }
  }
}
