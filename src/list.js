'use strict';
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: process.env.DYNAMODB_TABLE
}

//Function to list items from DB
module.exports.list = async (event, context, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE
    }
    try {
        await dynamoDb.scan(params, (error, result) => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Items),
            };

            callback(null, response);

        }).promise();
    } catch (error) {
        console.log(error);
        return error;
    }
};
