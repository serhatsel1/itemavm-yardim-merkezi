import data from "@/data/helpCenter.json";
import type { HelpCenterData } from "@/lib/types";
import { ErrorBoundary } from "@/components/help-center/ErrorBoundary";
import { HelpCenter } from "@/components/help-center/HelpCenter";

export default function YardimMerkeziPage() {
  return (
    <ErrorBoundary>
      <HelpCenter data={data as HelpCenterData} />
    </ErrorBoundary>
  );
}
