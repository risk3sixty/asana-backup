/// <reference types="node" />
import { Readable } from 'stream';
import AWS from 'aws-sdk';
export declare const s3: AWS.S3;
export declare function uploadObject(name: string, data: Buffer | Readable | string): Promise<{
    response: import("aws-sdk/lib/request").PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>;
    name: string;
}>;
export declare function getFileName(fileName: string): string;
