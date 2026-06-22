import ProtectedAnswerCopyViewer from "../../answer-copies/[documentId]/ProtectedAnswerCopyViewer";

export const dynamic = "force-dynamic";

export default async function BPSCDocumentPage({ params }) {
  const { documentId } = await params;
  const key = Buffer.from(documentId, "base64url").toString("utf8");
  const title = key.split("/").pop()?.replace(/\.pdf$/i, "").replace(/\s+unchecked$/i, "") || "BPSC PDF";
  return <ProtectedAnswerCopyViewer documentId={documentId} title={title} />;
}
