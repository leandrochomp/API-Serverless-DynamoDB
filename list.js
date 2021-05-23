'use strict';

const AWS = require("aws-sdk");

const dynamoDB = new AWS.dynamoDB.DocumentClient();
const params = {
    TableName: process.env.DYNAMODB_TABLE
}

module.exports.list = async (event, context, callback) => {
    dynamoDB.scan(params, (error, result) => {
        const response = {
            statusCode:200,
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};