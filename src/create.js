'use strict';

const AWS = require("aws-sdk");
const crypto = require("crypto");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

//Function to create an Item to DB
module.exports.create = async (event, context, callback) => {
    try {
        const data = JSON.parse(event.body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                id: generateUUID(),
                name: data.text
            }
        };

        await dynamoDb.put(params, (error) => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(params.Item),
            };

            callback(null, response);

        }).promise();
    } catch (error) {
        console.log(error);
        return error;
    }
};