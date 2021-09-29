import { env } from 'process';
import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

// Set Dynamo DB table name
const tableName = `${env.NODE_ENV}-snake-dynamodb-table`;

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({});

export async function saveScore(ipAddress: string, score: number) {

    const exisitngRecord  = await ddbClient.send(new GetItemCommand({
        TableName: tableName,
        Key: { ipAddress: { S: ipAddress } }
    }));

    const exisitngScore = parseInt(exisitngRecord?.Item?.score?.N, 10);

    if(exisitngScore > score) {
        return;
    }

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

export async function getScores() {
    const params = {
        TableName: tableName,
    };

    const results = await ddbClient.send(new ScanCommand(params));

    return results.Items;
}