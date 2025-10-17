import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      className={cn("min-h-screen bg-background text-foreground", className)}
    >
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">{children}</div>
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

PageLayout.Header = function PageHeader({
  title,
  subtitle,
  description,
  icon: Icon,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-12", className)}>
      {title && (
        <div className="flex items-center gap-4">
          {Icon && <Icon className="w-12 h-12" />}
          <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        </div>
      )}
      {subtitle && (
        <p className="text-xl md:text-2xl text-muted-foreground mt-2 mb-4">
          {subtitle}
        </p>
      )}
      {description && <p className="text-lg">{description}</p>}
    </div>
  );
};

interface TwoColumnProps {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
}

PageLayout.TwoColumn = function TwoColumn({
  children,
  reverse = false,
  className,
}: TwoColumnProps) {
  return (
    <div
      className={cn(
        "grid md:grid-cols-2 gap-12 items-center",
        reverse && "md:grid-flow-dense",
        className
      )}
    >
      {children}
    </div>
  );
};

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
}

PageLayout.LeftColumn = function LeftColumn({
  children,
  className,
}: ColumnProps) {
  return <div className={cn("space-y-6", className)}>{children}</div>;
};

PageLayout.RightColumn = function RightColumn({
  children,
  className,
}: ColumnProps) {
  return (
    <div className={cn("flex justify-center md:justify-end", className)}>
      {children}
    </div>
  );
};

interface GridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

PageLayout.Grid = function Grid({
  children,
  columns = 4,
  className,
}: GridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {children}
    </div>
  );
};
