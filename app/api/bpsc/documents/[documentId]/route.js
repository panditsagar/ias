import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
    const user = await verifyFirebaseRequest(request);
    const { documentId } = await params;
    const key = decodeDocumentId(documentId);
    const client = getR2Client();
    const { bucket } = getR2Config();
    const signedUrl = await getSignedUrl(client, new GetObjectCommand({
      Bucket: bucket,
      Key: key,
      ResponseContentType: "application/pdf",
      ResponseContentDisposition: "inline",
    }), { expiresIn: 60 });

    return Response.json({ signedUrl, expiresIn: 60, watermark: `${user.email || "authenticated-user"} • ${user.sub.slice(0, 8)}` }, {
      headers: { "Cache-Control": "private, no-store, max-age=0" },
    });
  } catch (error) {
    const unauthorized = error.message?.toLowerCase().includes("auth") || error.code === "ERR_JWT_EXPIRED";
    return Response.json({ error: unauthorized ? "Authentication required" : "Document unavailable" }, { status: unauthorized ? 401 : 404 });
  }
}
