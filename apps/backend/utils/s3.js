
// import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });

// export async function uploadToS3({ key, buffer, contentType }) {
//   const command = new PutObjectCommand({
//     Bucket: process.env.AWS_S3_BUCKET,
//     Key: key,
//     Body: buffer,
//     ContentType: contentType
//   });

//   await s3.send(command);
// }

// export async function getSignedDownloadUrl(key) {
//   const command = new GetObjectCommand({
//     Bucket: process.env.AWS_S3_BUCKET,
//     Key: key
//   });

//   return getSignedUrl(s3, command, { expiresIn: 60 * 5 });
// }


export async function uploadToS3({ key }) {
  console.log(`[MOCK S3] Uploaded file with key: ${key}`);
}

export async function getSignedDownloadUrl(key) {
  console.log(`[MOCK S3] Generating signed URL for: ${key}`);
  return `https://mock-s3-url.com/${key}`;
}
