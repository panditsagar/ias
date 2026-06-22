import LegalPage from "../components/LegalPage";
import { legalPages } from "../data/legalPages";

export const metadata = { title: "Terms and Conditions" };

export default function TermsAndConditionsPage() {
  return <LegalPage content={legalPages.termsAndConditions} breadcrumb="Terms and Conditions" />;
}
