import LegalPage from "../components/LegalPage";
import { legalPages } from "../data/legalPages";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return <LegalPage content={legalPages.privacyPolicy} breadcrumb="Privacy Policy" />;
}
