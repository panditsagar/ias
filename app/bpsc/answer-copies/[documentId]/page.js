import ProtectedAnswerCopyViewer from "./ProtectedAnswerCopyViewer";

export const dynamic = "force-dynamic";

export default async function AnswerCopyPage({ params }) {
  const { documentId } = await params;
  const key = Buffer.from(documentId, "base64url").toString("utf8");
  const title = key.split("/").pop()?.replace(/\.pdf$/i, "").replace(/\s+unchecked$/i, "") || "BPSC Answer Copy";
  return <ProtectedAnswerCopyViewer documentId={documentId} title={title} />;
}
