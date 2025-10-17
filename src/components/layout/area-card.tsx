import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

interface AreaCardProps {
  uri: string;
  title?: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function AreaCard({ title, uri, subtitle, icon: Icon }: AreaCardProps) {
  return (
    <Link href={uri}>
      <Card className="hover:shadow-lg hover:bg-accent transition-shadow cursor-pointer h-full">
        <CardContent className="py-4 px-6">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                {Icon ? (
                  <Icon className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <div className="w-12 h-12 bg-primary/20 rounded-full" />
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="font-semibold text-lg mb-1 leading-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
