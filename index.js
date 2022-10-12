'use strict';

// ------------------------------------------------------------------------------Code used to Test:------------------------------------------------------------------------------------------------------------
// Credit Help from  Luis Rosales
const AWS = require('aws-sdk');
const S3 = new AWS.S3();
exports.handler = async (event) => {
    let nameWork = event.Records[0].s3.bucket.name;
    let key = event.Records[0].s3.object.key;
    let size = event.Records[0].s3.object.size;
    try {
    let images = await S3.getObject({Bucket: nameWork, Key: key}).promise();
    let stringifiedImages = images.Body.toString();
    let imagesParsedToChange = JSON.parse(stringifiedImages);
    imagesParsedToChange.push({
        name: key,
        size: size,
        type: "jpg"
    });
     const params = {
        Bucket: nameWork,
        Key: "images.json"
    };
    let imgData = JSON.stringify(imagesParsedToChange);
    await S3.putObject({... params, Body: imgData}).promise();
    console.log('parsed images ----------', imagesParsedToChange);
    } catch (e) {
        console.log(e);
        let uploadImage = {
            Bucket: nameWork,
            Key: "images.json",
            Body: JSON.stringify([{name: key, size: size, type: ".jpg"}]),
        };
        await S3.putObject(uploadImage).promise();
    }
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Testing Testing'),
    };
    return response;
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
