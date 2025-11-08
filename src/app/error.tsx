"use client";

import { startTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: NextJsError;
  reset: () => void;
}) => {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <PageLayout>
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
            <CardFooter>
              <Button onClick={reload}>Try Again</Button>
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
  );
};
export default ErrorBoundary;
