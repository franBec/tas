"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchX } from "lucide-react";

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

const NotFound = () => {
  return (
    <PageLayout>
      <PageLayout.TwoColumn>
        <PageLayout.LeftColumn>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SearchX />
                Page Not Found
              </CardTitle>
              <CardDescription>
                We are sorry, but the page you are looking for does not exist.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                The link you followed may be broken, or the page may have been
                removed.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/">Go to Homepage</Link>
              </Button>
            </CardFooter>
          </Card>
        </PageLayout.LeftColumn>
        <PageLayout.RightColumn>
          <Image
            src="/undraw_void_wez2.svg"
            alt="Page not found illustration"
            width={600}
            height={400}
            className="w-full max-w-lg"
          />
        </PageLayout.RightColumn>
      </PageLayout.TwoColumn>
    </PageLayout>
  );
};

export default NotFound;
