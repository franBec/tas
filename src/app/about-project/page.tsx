import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutProjectPage() {
  return (
    <PageLayout>
      <PageLayout.Header
        title="About This Project"
        subtitle="Building better software for municipal services"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Philosophy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This project embodies a philosophy of simplicity and clarity in
              software development. Rather than defaulting to complex
              architectures, we follow the principle that good code has two
              requirements:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>It solves the problem</li>
              <li>It doesn't suck to read</li>
            </ul>
            <p>
              We believe that the most sophisticated design choice you can make
              is to choose simplicity. Our approach focuses on building things
              that last by making them easy to understand, easy to change, and
              easy to deploy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What We're Building</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This project is inspired by{" "}
              <a
                href="https://sigem.sanluislaciudad.gob.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                SIGEM (Sistema de Gestión Municipal)
              </a>
              , a comprehensive municipal management platform originally
              developed for the city of San Luis, Argentina. The original system
              included:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Citizen portal for permits, payments, and public services</li>
              <li>Administrative backend for city employees</li>
              <li>Financial modules for billing and payment processing</li>
              <li>Document management for permits and records</li>
              <li>Reporting dashboards for city management</li>
            </ul>
            <p>
              Our goal isn't to recreate SIGEM exactly, but to rebuild similar
              functionality with modern tooling while avoiding the complexity of
              the original implementation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tech Stack & Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 text-lg">High-Level Game Plan</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Monolith-first approach with one repo and deploy target
                  </li>
                  <li>Vertical slices instead of layered architecture</li>
                  <li>Single relational database as source of truth</li>
                  <li>Frontend & backend sharing TypeScript</li>
                  <li>Optimizing for the realistic 80% use case</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-lg">Technology Choices</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>React for the UI framework (popular and familiar)</li>
                  <li>Next.js for the full-stack solution</li>
                  <li>TypeScript for type safety</li>
                  <li>shadcn/ui for accessible components</li>
                  <li>Simple architecture over complex systems</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Alongside Blog Series</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This project is being developed as a proof of concept alongside
              the{" "}
              <a
                href="https://pollito.dev/en/categories/large-software-projects/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                "Large Software Projects" blog series
              </a>
              . The series shares insights from years of experience building
              software and explores better approaches to tackle complexity in
              large systems.
            </p>
            <p>
              This is not a finished product but a demonstration of concepts and
              tools that could be applied to similar projects. The goal is to
              explore how modern tools and simple architectures can deliver the
              same or better functionality than traditional complex
              implementations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Build This Way?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Building a large software project doesn't require a large team.
              Inspired by successful projects like:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Telegram</p>
                <p className="text-sm text-muted-foreground">
                  ~30 employees, hundreds of millions of users
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Stardew Valley</p>
                <p className="text-sm text-muted-foreground">
                  1 person, 20+ million copies sold
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Lichess</p>
                <p className="text-sm text-muted-foreground">
                  Mostly 1 person, #1 chess platform
                </p>
              </div>
            </div>
            <p>
              Small, focused teams can build incredible things when they're not
              spending half their time in coordination meetings. Sometimes the
              answer to complex problems is a simpler solution—this proof of
              concept explores that approach.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>The Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This project explores the idea that large software doesn't have to
              mean complicated software. By choosing simplicity, focusing on
              real-world problems, and using proven technologies, we can
              potentially build maintainable, scalable systems that are a joy to
              work with instead of a constant source of frustration.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
