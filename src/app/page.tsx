import Image from "next/image";
import Link from "next/link";

import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { getRouteNodeByUri } from "@/lib/routes";

export default function Home() {
  const routeNode = getRouteNodeByUri("/");

  return (
    <PageLayout>
      <PageLayout.TwoColumn>
        <PageLayout.LeftColumn>
          <PageLayout.Header
            title={routeNode.title}
            subtitle={routeNode.subtitle}
            description="Access municipal services, submit requests, and manage your civic obligations through our secure online platform."
            className="mb-8"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={"/sign-in"}>
              <Button>Sign In to Your Account</Button>
            </Link>
            <Link href={"/areas/gov"}>
              <Button variant="outline">Continue Without Signing In</Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground max-w-md">
            Note: Some administrative processes require a registered account and
            may not be available to guests.
          </p>
        </PageLayout.LeftColumn>

        <PageLayout.RightColumn>
          <Image
            src="/undraw_city-life_l74x.svg"
            alt="City life illustration"
            width={600}
            height={400}
            className="w-full max-w-lg"
          />
        </PageLayout.RightColumn>
      </PageLayout.TwoColumn>
    </PageLayout>
  );
}
