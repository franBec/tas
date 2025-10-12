import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  Check,
  Clock,
  Eye,
  Shield,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <Icon className="text-primary" size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface ServiceOfferCheckProps {
  text: string;
}

const ServiceOfferCheck = ({ text }: ServiceOfferCheckProps) => {
  return (
    <li className="flex items-center">
      <div className="bg-primary rounded-full p-1 mr-3 flex-shrink-0">
        <Check className="text-primary-foreground" size={16} />
      </div>
      <span>{text}</span>
    </li>
  );
};

export default function Home() {
  const features: FeatureCardProps[] = [
    {
      icon: Smartphone,
      title: "Convenience",
      description: "24/7 access to municipal services from anywhere",
    },
    {
      icon: Clock,
      title: "Efficiency",
      description: "Streamline administrative processes and reduce wait times",
    },
    {
      icon: Eye,
      title: "Transparency",
      description:
        "Easily track the progress of requests and access information",
    },
    {
      icon: Accessibility,
      title: "Accessibility",
      description: "A user-friendly interface designed for all citizens",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Secure handling of personal information and government data",
    },
  ];

  const serviceOffers = [
    "Citizen registration and account management",
    "Online permit applications and renewals",
    "Utility billing and payments",
    "Public records access and requests",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Municipal Services
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Your Digital Gateway to Local Government Services
          </p>
          <p className="text-lg mb-12">
            Access municipal services, submit requests, and manage your civic
            obligations through our secure online platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={"/sign-in"}>
              <Button>Sign In to Your Account</Button>
            </Link>
            <Link href={"/areas/gov"}>
              <Button variant="outline">Continue Without Signing In</Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6 max-w-md">
            Note: Some administrative processes require a registered account and
            may not be available to guests.
          </p>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center">
            <Image
              src="/undraw_city-life_l74x.svg"
              alt="City life illustration"
              width={1200}
              height={600}
              className="w-full max-w-4xl"
            />
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Our Digital Services?
          </h2>
          <p className="text-lg text-muted-foreground">
            Improving access to government services for all residents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      <div className="py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About Our Digital Services
            </h2>
            <div className="space-y-6">
              <p className="text-lg">
                Our digital platform provides a modern, user-friendly solution
                designed to streamline interactions between citizens and local
                government services.
              </p>
              <p className="text-lg">
                We aim to empower residents to manage their municipal
                obligations and requests entirely online, eliminating the need
                for physical visits and significantly reducing administrative
                overhead.
              </p>
              <p className="text-lg">
                Our long-term vision is to provide a robust, customizable
                platform that serves the needs of our community and other
                municipalities.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-card border border-border rounded-lg p-8 w-full max-w-md">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Service Offerings
              </h3>
              <ul className="space-y-3">
                {serviceOffers.map((offer, index) => (
                  <ServiceOfferCheck key={index} text={offer} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
