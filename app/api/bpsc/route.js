import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import bpscData from "@/app/data/bpsc.json";
import { ANSWER_COPY_PREFIX, BPSC_NOTES_PREFIX, getR2Client, getR2Config } from "@/lib/r2";

export const dynamic = "force-dynamic";

const resourceDescriptions = new Map(
  [
    ...bpscData.notes,
    ...bpscData.copies.actual,
    ...bpscData.copies.practice,
  ].map((resource) => [resource.objectKey, resource.description]),
);

function displayTitle(fileName, stripUnchecked = false) {
  return fileName
    .replace(/\.pdf$/i, "")
    .replace(stripUnchecked ? /\s+unchecked$/i : /$^/, "")
    .replace(/\bbpsc\b/gi, "BPSC")
    .replace(/\bgs\b/gi, "GS")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();
}

function toResource(object, prefix, kind) {
  const fileName = object.Key.slice(prefix.length);
  return {
    id: Buffer.from(object.Key).toString("base64url"),
    title: displayTitle(fileName, kind === "real"),
    description: resourceDescriptions.get(object.Key) || "",
    fileName,
    kind,
    size: object.Size || 0,
    modifiedAt: object.LastModified?.toISOString() || null,
  };
}

async function listPrefix(client, bucket, prefix) {
  const response = await client.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, MaxKeys: 1000 }));
  return (response.Contents || []).filter((object) => object.Key && object.Key !== prefix && /\.pdf$/i.test(object.Key));
}

export async function GET() {
  try {
    const client = getR2Client();
    const { bucket } = getR2Config();
    const [noteObjects, copyObjects] = await Promise.all([
      listPrefix(client, bucket, BPSC_NOTES_PREFIX),
      listPrefix(client, bucket, ANSWER_COPY_PREFIX),
    ]);

    const notes = noteObjects.map((object) => toResource(object, BPSC_NOTES_PREFIX, "note"));
    const copies = copyObjects.map((object) => {
      const fileName = object.Key.slice(ANSWER_COPY_PREFIX.length);
      return toResource(object, ANSWER_COPY_PREFIX, /unchecked\.pdf$/i.test(fileName) ? "real" : "practice");
    });

    return Response.json({
      notes: notes.sort((a, b) => a.title.localeCompare(b.title)),
      copies: {
        actual: copies.filter((copy) => copy.kind === "real").sort((a, b) => a.title.localeCompare(b.title)),
        practice: copies.filter((copy) => copy.kind === "practice").sort((a, b) => a.title.localeCompare(b.title)),
      },
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("R2 BPSC listing failed", error);
    return Response.json({ error: "BPSC resources are temporarily unavailable." }, { status: 503 });
  }
}
