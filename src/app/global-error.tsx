"use client";

import Image from "next/image";
import { AlertTriangle } from "lucide-react";

import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NextJsError extends Error {
  digest?: string;
}

const GlobalError = ({ error }: { error: NextJsError }) => {
  return (
    <html>
      <body>
        <PageLayout>
          <PageLayout.Header
            title="Municipal Services"
            subtitle="Your Digital Gateway to Local Government Services"
          />
          <PageLayout.TwoColumn>
            <PageLayout.LeftColumn>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle />
                    Something went wrong
                  </CardTitle>
                  <CardDescription>
                    We are sorry, but something unexpected happened.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-destructive">
                    {error.digest ? `Error Reference: ${error.digest}` : null}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button variant="secondary" asChild>
                    <a href="/">Go to Home</a>
                  </Button>
                </CardFooter>
              </Card>
            </PageLayout.LeftColumn>
            <PageLayout.RightColumn>
              <Image
                src="/undraw_connection-lost_am29.svg"
                alt="Connection lost illustration"
                width={600}
                height={400}
                className="w-full max-w-lg"
              />
            </PageLayout.RightColumn>
          </PageLayout.TwoColumn>
        </PageLayout>
      </body>
    </html>
  );
};
export default GlobalError;
