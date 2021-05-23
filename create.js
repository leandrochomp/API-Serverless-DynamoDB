'use strict';

const uuid = require('uuid');
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event, context, callback) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            text: data.text
        }
    };

    dynamoDb.put(params, (error) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
};