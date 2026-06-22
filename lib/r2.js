import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

export const ANSWER_COPY_PREFIX = "bpsc/answer_copy/";
export const BPSC_NOTES_PREFIX = "bpsc/notes/";

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing server environment variable: ${name}`);
  return value;
}

export function getR2Config() {
  const accountId = required("R2_ACCOUNT_ID");
  return {
    bucket: required("R2_BUCKET_NAME"),
    endpoint: process.env.R2_ENDPOINT?.trim() || `https://${accountId}.r2.cloudflarestorage.com`,
    accountId,
    accessKeyId: required("R2_ACCESS_KEY_ID"),
    secretAccessKey: required("R2_SECRET_ACCESS_KEY"),
  };
}

export function getR2Client() {
  const config = getR2Config();
  return new S3Client({
    region: "auto",
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}
