import Image from "next/image";

import { getRouteNodeByUri } from "@/lib/routes";
import { AreaCard } from "./area-card";
import { PageLayout } from "./page-layout";

interface AreaWithGridPageProps {
  uri: string;
}

export function createAreaWithGridPage({ uri }: AreaWithGridPageProps) {
  return function AreaWithGridPage() {
    const routeNode = getRouteNodeByUri(uri);

    return (
      <PageLayout>
        <PageLayout.Header
          title={routeNode.title}
          subtitle={routeNode.subtitle}
          icon={routeNode.icon}
        />

        {routeNode.children && (
          <PageLayout.Grid columns={4}>
            {Object.values(routeNode.children).map((it) => (
              <AreaCard
                key={it.uri}
                title={it.title}
                subtitle={it.subtitle}
                uri={it.uri}
                icon={it.icon}
              />
            ))}
          </PageLayout.Grid>
        )}
      </PageLayout>
    );
  };
}

interface AuthPageProps {
  uri: string;
  imageSrc: string;
  altText: string;
  placeholderText: string;
}

export function createAuthPage({
  uri,
  imageSrc,
  altText,
  placeholderText,
}: AuthPageProps) {
  return function AuthPage() {
    const routeNode = getRouteNodeByUri(uri);

    return (
      <PageLayout>
        <PageLayout.TwoColumn>
          <PageLayout.LeftColumn>
            <PageLayout.Header
              title={routeNode.title}
              subtitle={routeNode.subtitle}
              icon={routeNode.icon}
            />
            <div className="mt-8 p-6 bg-muted rounded-lg border">
              <p className="text-center text-muted-foreground">
                {placeholderText}
              </p>
            </div>
          </PageLayout.LeftColumn>

          <PageLayout.RightColumn>
            <div className="w-full max-w-md">
              <Image
                src={imageSrc}
                alt={altText}
                className="w-full h-auto"
                width={500}
                height={400}
              />
            </div>
          </PageLayout.RightColumn>
        </PageLayout.TwoColumn>
      </PageLayout>
    );
  };
}
