import { env } from 'process';
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// Set the AWS Region.
const awsRegion = env.AWS_DEFAULT_REGION || "eu-central-1";

// Set Dynamo DB table name
const tableName = `${env.NODE_ENV}-snake-dynamodb-table`;

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ region: awsRegion });

export async function saveScore(ipAddress: string, score: number) {
    const params = {
        TableName: tableName,
        Item: {
            ipAddress: { S: ipAddress },
            score: { N: `${score}` },
            timestamp: { N: `${Date.now()}` }
        },
    };

    const data = await ddbClient.send(new PutItemCommand(params));
    return data;
}