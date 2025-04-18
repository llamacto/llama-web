import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Site homepage - Customer facing frontend
 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-background to-muted">
        <div className="container flex flex-col items-center py-16 text-center md:py-24">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Modern Solutions for Your Business
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Empower your company with our cutting-edge platform. Streamline workflows,
            enhance productivity, and drive growth with our comprehensive tools.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Features</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Our platform offers a comprehensive suite of tools designed to help your business thrive in today&apos;s digital landscape.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-medium">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to get started?</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Join thousands of businesses that are already using our platform to boost productivity and drive growth.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg">Sign up for free</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Feature data with SVG icons
const featuresData = [
  {
    title: "Dashboard Analytics",
    description: "Gain insights into your business performance with detailed analytics and customizable dashboards.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        <line x1="3" x2="21" y1="9" y2="9"></line>
        <line x1="9" x2="9" y1="21" y2="9"></line>
      </svg>
    ),
  },
  {
    title: "Task Management",
    description: "Stay organized with our intuitive task management system. Assign, track, and complete tasks efficiently.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
      </svg>
    ),
  },
  {
    title: "Collaboration Tools",
    description: "Work together seamlessly with your team using our robust collaboration features and communication tools.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    title: "Data Security",
    description: "Rest easy knowing your data is protected with enterprise-grade security and compliance measures.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
  {
    title: "Automated Workflows",
    description: "Save time and reduce errors with customizable automated workflows and business process automation.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 12H8.75C7.51 12 6.5 13.01 6.5 14.25v0c0 1.24 1.01 2.25 2.25 2.25H9l3 3v-9z"></path>
        <path d="M12 12h3.25c1.24 0 2.25-1.01 2.25-2.25v0c0-1.24-1.01-2.25-2.25-2.25H15l-3-3v9z"></path>
      </svg>
    ),
  },
  {
    title: "Mobile Access",
    description: "Access your workspace from anywhere with our responsive design and dedicated mobile applications.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
        <line x1="12" x2="12.01" y1="18" y2="18"></line>
      </svg>
    ),
  },
];
