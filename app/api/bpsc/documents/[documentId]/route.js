import { GetObjectCommand } from "@aws-sdk/client-s3";
import { ANSWER_COPY_PREFIX, BPSC_NOTES_PREFIX, getR2Client, getR2Config } from "@/lib/r2";
import { verifyFirebaseRequest } from "@/lib/verifyFirebaseToken";

export const dynamic = "force-dynamic";

function decodeDocumentId(documentId) {
  const key = Buffer.from(documentId, "base64url").toString("utf8");
  const allowedPrefix = key.startsWith(ANSWER_COPY_PREFIX) || key.startsWith(BPSC_NOTES_PREFIX);
  if (!allowedPrefix || !/\.pdf$/i.test(key) || key.includes("..") || key.includes("\0")) throw new Error("Invalid document key");
  return key;
}

export async function GET(request, { params }) {
  try {
    await verifyFirebaseRequest(request);
    const { documentId } = await params;
    const key = decodeDocumentId(documentId);
    const client = getR2Client();
    const { bucket } = getR2Config();
    const range = request.headers.get("range") || undefined;
    const object = await client.send(new GetObjectCommand({
      Bucket: bucket,
      Key: key,
      Range: range,
    }));
    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
      "Cache-Control": "private, no-store, max-age=0",
      "Accept-Ranges": "bytes",
      "X-Content-Type-Options": "nosniff",
    });
    if (object.ContentLength != null) headers.set("Content-Length", String(object.ContentLength));
    if (object.ContentRange) headers.set("Content-Range", object.ContentRange);
    if (object.ETag) headers.set("ETag", object.ETag);

    return new Response(object.Body.transformToWebStream(), {
      status: object.ContentRange ? 206 : 200,
      headers,
    });
  } catch (error) {
    const unauthorized = error.message?.toLowerCase().includes("auth") || error.code === "ERR_JWT_EXPIRED";
    return Response.json({ error: unauthorized ? "Authentication required" : "Document unavailable" }, { status: unauthorized ? 401 : 404 });
  }
}
