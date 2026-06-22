import LegalPage from "../components/LegalPage";
import { legalPages } from "../data/legalPages";

export const metadata = { title: "Refund and Cancellation Policy" };

export default function RefundAndCancellationPolicyPage() {
  return <LegalPage content={legalPages.refundAndCancellation} breadcrumb="Refund and Cancellation Policy" />;
}
