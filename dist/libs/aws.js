"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = exports.uploadObject = exports.s3 = void 0;
const assert_1 = __importDefault(require("assert"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const DEFAULT_BUCKET = process.env.AWS_S3_BUCKET;
exports.s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
async function uploadObject(name, data) {
    const uniqueFilename = name; // getFileName(name)
    assert_1.default(DEFAULT_BUCKET, 'bucket should be set on default params');
    const params = {
        Bucket: DEFAULT_BUCKET,
        Key: uniqueFilename,
        Body: data,
    };
    const response = await exports.s3.putObject(params).promise();
    return { response, name: uniqueFilename };
}
exports.uploadObject = uploadObject;
function getFileName(fileName
// extraText: number | string = Date.now()
) {
    const filepathSplit = fileName.split('/');
    const encodedFilename = encodeURIComponent(filepathSplit[filepathSplit.length - 1]);
    // const finalName = `${encodedFilename
    //   .split('.')
    //   .slice(0, -1)
    //   .join('.')}_${extraText}${path.extname(encodedFilename)}`
    return `${filepathSplit
        .slice(0, filepathSplit.length - 1)
        .join('/')}/${uuid_1.v4()}${path_1.default.extname(encodedFilename)}`;
}
exports.getFileName = getFileName;
