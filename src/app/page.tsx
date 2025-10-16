import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Municipal Services
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                  Your Digital Gateway to Local Government Services
                </p>
                <p className="text-lg mb-8">
                  Access municipal services, submit requests, and manage your
                  civic obligations through our secure online platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={"/sign-in"}>
                  <Button>Sign In to Your Account</Button>
                </Link>
                <Link href={"/areas/gov"}>
                  <Button variant="outline">Continue Without Signing In</Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground max-w-md">
                Note: Some administrative processes require a registered account
                and may not be available to guests.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src="/undraw_city-life_l74x.svg"
                alt="City life illustration"
                width={600}
                height={400}
                className="w-full max-w-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
