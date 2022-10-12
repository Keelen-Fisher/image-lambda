'use strict';

// ------------------------------------------------------------------------------Code used to Test:------------------------------------------------------------------------------------------------------------
const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {
    // Proof of life:
    
    console.log('You can do it and it is possible, check out my top three images for motivation: -----------------', event);
    
    // proof of life grabbing the images:
    let bucketName = event.Records[0].s3.bucket.name;
    let key = event.Records[0].s3.object.key;
    let images = await S3.getObject({Bucket: bucketName, Key: key}).promise();
    
    let imagesUpdate = await S3.putObject({
        Bucket: bucketName, 
        Key: key
    }).promise();
    
    // TODO implement
    
    let stringifiedImages = images.Body.toString();
    let parsedImages = JSON.parse(stringifiedImages);
    console.log('parsedImages----------', parsedImages);
    
    let stringifiedUpdateImages = imagesUpdate.Body.toString();
    let parsedUpdate = JSON.parse(stringifiedUpdateImages);
    console.log('New Update------------: ', parsedUpdate)
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(parsedUpdate),
    };
    return response;
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
