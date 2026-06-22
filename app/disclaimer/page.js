import LegalPage from "../components/LegalPage";
import { legalPages } from "../data/legalPages";

export const metadata = { title: "Disclaimer" };

export default function DisclaimerPage() {
  return <LegalPage content={legalPages.disclaimer} breadcrumb="Disclaimer" />;
}
