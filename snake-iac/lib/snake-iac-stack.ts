import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as rg from '@aws-cdk/aws-resourcegroups';
import * as gate from '@aws-cdk/aws-apigatewayv2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as integration from '@aws-cdk/aws-apigatewayv2-integrations'
import * as dynamodb from '@aws-cdk/aws-dynamodb';
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
      websiteIndexDocument: "index.html", // startup page
      removalPolicy: cdk.RemovalPolicy.DESTROY // remove on stack destruction
    });

    // deploy web client from local folder into s3
    new s3deploy.BucketDeployment(this, nameIt("website-s3-deployment"), {
      sources: [s3deploy.Source.asset('../snake-client')],
      destinationBucket: snakeClientBucket,
    });

    // Snake API
    const apiLambda = new lambda.Function(this, nameIt("api-lambda"), {
      functionName: nameIt("api-lambda"),
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("./../snake-api/dist"), // deploy api code from local folder
      handler: "lambda.handler",
      memorySize: 512,
      timeout: cdk.Duration.seconds(3),
      environment: { // environment variables for lambda app
        NODE_ENV: envName,
      }
    });

    // API Gateway
    const snakeClientIntegration = new integration.HttpProxyIntegration(
      {
        method: gate.HttpMethod.GET,
        url: snakeClientBucket.bucketWebsiteUrl, // web client integration
      });

    const snakeApiIntegration = new integration.LambdaProxyIntegration(
      {
        handler: apiLambda, // api integration
      });

    const apiGateway = new gate.HttpApi(this, nameIt("Api-GateWay"),
      {
        apiName: nameIt("Api-GateWay"),
        defaultIntegration: snakeClientIntegration, // default route leads to website
      });

    apiGateway.addRoutes({ // api route
      path: "/api/{proxy+}",
      methods: [gate.HttpMethod.ANY],
      integration: snakeApiIntegration
    });

    apiGateway.addRoutes({ // swagger route
      path: "/swagger/{proxy+}",
      methods: [gate.HttpMethod.GET],
      integration: snakeApiIntegration
    });

    // Persistence layer
    const table = new dynamodb.Table(this, nameIt('DynamoDb-Table'), {
      tableName: nameIt('DynamoDb-Table'),
      partitionKey: { name: 'ipAddress', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY // remove on stack destruction
    });

    table.grantReadWriteData(apiLambda); // give api access to data

    // Tags (to improve resources distinction)
    for (const nodeChild of scope.node.children) {
      cdk.Tags.of(nodeChild).add(SnakeStack.Name, SnakeStack.Name);
    }

    // Resource group (akin to azure)
    new rg.CfnGroup(this, nameIt("resource-group"), {
      name: nameIt("resource-group"),
      tags: [{ key: SnakeStack.Name, value: SnakeStack.Name }],
    });
  }
}
