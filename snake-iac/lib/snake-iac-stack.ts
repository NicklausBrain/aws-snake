import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as rg from '@aws-cdk/aws-resourcegroups';
import * as gate from '@aws-cdk/aws-apigatewayv2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as integration from '@aws-cdk/aws-apigatewayv2-integrations'
import { env } from 'process';

const envName = env.NODE_ENV || 'temp';
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

    // Snake API
    const apiLambda = new lambda.Function(this, nameIt("api-lambda"), {
      functionName: nameIt("api-lambda"),
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("./../snake-api/dist"),
      handler: "main.handler",
      memorySize: 512,
      timeout: cdk.Duration.seconds(3),
    });

    // API Gateway
    const snakeClientIntegration = new integration.HttpProxyIntegration(
      {
        method: gate.HttpMethod.GET,
        url: snakeClientBucket.bucketWebsiteUrl,
      });

    const httpApi = new gate.HttpApi(this, nameIt("Api-GateWay"),
      {
        apiName: nameIt("Api-GateWay"),
        defaultIntegration: snakeClientIntegration, // default route leads to website
      });

    // Tags
    for (const nodeChild of scope.node.children) {
      cdk.Tags.of(nodeChild).add(SnakeStack.Name, SnakeStack.Name);
    }

    // Resource group
    new rg.CfnGroup(this, nameIt("resource-group"), {
      name: nameIt("resource-group"),
      tags: [{ key: SnakeStack.Name, value: SnakeStack.Name }],
    });
  }
}
