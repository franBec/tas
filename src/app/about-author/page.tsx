import Image from "next/image";

import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRouteNodeByUri } from "@/lib/routes";

export default function AboutAuthorPage() {
  const route = getRouteNodeByUri("/about-author");
  return (
    <PageLayout>
      <PageLayout.Header
        title={route.title}
        subtitle={route.subtitle}
        icon={route.icon}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Franco Exequiel Becvort
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="overflow-hidden w-48 h-48 mb-4 rounded-xl">
                <Image
                  src="/profile-7c91f4959d71daca27a1ef5b25e3dc71.png"
                  alt="Franco Exequiel Becvort"
                  className="w-full h-full object-cover scale-150"
                  width={192}
                  height={192}
                />
              </div>
              <p className="text-center mb-4">Based in Lisbon, Portugal 🇵🇹</p>
              <div className="space-y-2 w-full text-center">
                <p>
                  <a
                    href="mailto:franbecvort@gmail.com"
                    className="hover:underline"
                  >
                    📧 franbecvort@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    href="https://pollito.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    🌐 pollito.dev
                  </a>
                </p>
                <p>
                  <a
                    href="https://linkedin.com/in/franco-becvort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    💼 LinkedIn Profile
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hey there! 👋</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                I'm Franco, a software developer originally from Argentina who
                now calls Lisbon home. I go by "Pollito" online (which means
                "little chicken" in Spanish - hence the emoji! 🐤). I love
                building things that make life easier for people, and I'm
                passionate about clean code and user-friendly experiences.
              </p>

              <p className="mb-4">
                When I'm not coding, you might find me exploring vinyl stores in
                Lisbon, nerding about the latest tech trends, or enjoying some
                sushi in a buffet. I'm always looking for opportunities to learn
                new technologies and solve interesting challenges.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Journey 🚀</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                My path into tech started with a background in Natural Sciences,
                and it has taken me from working on government digital services
                in Argentina to building fintech solutions for major banks. I've
                spent most of my career working with Java and Spring Boot, but I
                also enjoy exploring frontend technologies like Next.js and
                React.
              </p>

              <p className="mb-4">
                I'm currently working as a Spring Boot Developer at Devsu, where
                I help modernize critical banking infrastructure. Before this, I
                worked on Argentina's first QR-based payment system and
                developed various solutions for my home city of San Luis.
              </p>

              <p>
                Throughout my career, I've been passionate about continuous
                learning - that's why I've earned certifications from Google
                Cloud, Microsoft Azure, and other platforms. I believe staying
                curious and adaptable is key in our fast-changing industry.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What I Do 💼</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Backend development using Java, Spring Boot, and
                    microservices
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Cloud solutions with Google Cloud and Microsoft Azure
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Full-stack development with Next.js, React, and modern CSS
                    frameworks
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>DevOps practices and Agile methodologies</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Some Fun Facts 🌟</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    The nickname "Pollito" (chicken) stuck from childhood and I
                    embraced it!
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    I speak multiple languages: Spanish (native), English
                    (fluent), and Portuguese (learning)
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
