import assert from 'assert'
import path from 'path'
import { Readable } from 'stream'
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'

const DEFAULT_BUCKET = process.env.AWS_S3_BUCKET

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export async function uploadObject(
  name: string,
  data: Buffer | Readable | string
) {
  const uniqueFilename = name // getFileName(name)

  assert(DEFAULT_BUCKET, 'bucket should be set on default params')
  const params: AWS.S3.PutObjectRequest = {
    Bucket: DEFAULT_BUCKET,
    Key: uniqueFilename,
    Body: data,
  }

  const response = await s3.putObject(params).promise()
  return { response, name: uniqueFilename }
}

export function getFileName(
  fileName: string
  // extraText: number | string = Date.now()
): string {
  const filepathSplit = fileName.split('/')
  const encodedFilename = encodeURIComponent(
    filepathSplit[filepathSplit.length - 1]
  )
  // const finalName = `${encodedFilename
  //   .split('.')
  //   .slice(0, -1)
  //   .join('.')}_${extraText}${path.extname(encodedFilename)}`
  return `${filepathSplit
    .slice(0, filepathSplit.length - 1)
    .join('/')}/${uuidv4()}${path.extname(encodedFilename)}`
}
