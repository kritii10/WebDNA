import type { Metadata } from "next";

import { ProfileWorkspace } from "@/components/dashboard/profile-workspace";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Review your profile, contributions, saved reports, and favorite websites inside WebDNA."
};

export default function ProfilePage() {
  return <ProfileWorkspace />;
}
