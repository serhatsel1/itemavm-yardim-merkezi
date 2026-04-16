import data from "@/data/helpCenter.json";
import type { HelpCenterData } from "@/lib/types";
import { HelpCenter } from "@/components/help-center/HelpCenter";

export default function YardimMerkeziPage() {
  return <HelpCenter data={data as HelpCenterData} />;
}
