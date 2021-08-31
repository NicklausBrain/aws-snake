import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

import { env } from 'process';

const snake = 'snake';
const envName = env.NODE_ENV || 'local';
const nameIt = (name: string) => `${envName}-${snake}-${name}`.toLowerCase();

export class SnakeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Snake Web Client
      const snakeClient = new s3.Bucket(this, nameIt("website-s3"), {
        bucketName: nameIt("website-s3"),
        versioned: false,
        publicReadAccess: true,
        websiteIndexDocument: "index.html",
        removalPolicy: cdk.RemovalPolicy.DESTROY // remove on stack destruction
      });
  }
}
