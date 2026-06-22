# R2 answer-copy setup

Use standard `KEY=value` lines in `.env`:

```dotenv
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_s3_access_key_id
R2_SECRET_ACCESS_KEY=your_s3_secret_access_key
R2_BUCKET_NAME=mirnotebook
R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
FIREBASE_PROJECT_ID=mir-notebook
```

The Cloudflare **Token Value** is not used by the S3-compatible client. Use the R2 S3 Access Key ID and Secret Access Key generated for the bucket.

Keep the bucket private. Objects are discovered only below:

```text
bpsc/answer_copy/
```

Files ending in `unchecked.pdf` are classified as real papers. Other PDF files are classified as practice copies.

## R2 CORS

PDF.js fetches a short-lived signed R2 URL in the browser. Add this CORS policy to the R2 bucket, replacing the production origin:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://your-production-domain.example"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["Content-Length", "Content-Range", "Accept-Ranges"],
    "MaxAgeSeconds": 3600
  }
]
```

Restart the Next.js server after changing `.env`.
