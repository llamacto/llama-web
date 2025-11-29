import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * LlamaFront AI Scaffold Homepage
 * Showcasing the features and capabilities of the AI-powered frontend scaffold
 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="container flex flex-col items-center py-20 text-center md:py-32">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            <span className="text-xs font-medium">🚀 Latest Version 2.0</span>
          </Badge>
          
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LlamaFront
            </span>{" "}
            AI Scaffold
          </h1>
          
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl lg:text-2xl">
            The most powerful AI-powered frontend scaffold. Built for the AI era with vibe coding, 
            Next.js 16, TypeScript, Tailwind CSS, and cutting-edge frontend technologies.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started Free
              </Button>
            </Link>
            <Link href="https://github.com/llamacto/llamafront-ai-scaffold" target="_blank">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Frontend-First</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>AI-Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <span>TypeScript</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Built for AI-First Development
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              LlamaCode AI Scaffold leverages cutting-edge technologies optimized for AI-assisted development
              to ensure your application is intelligent, scalable, and maintainable.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {techStackData.map((tech, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{tech.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything You Need for AI-Powered Development
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              From authentication to AI integration, LlamaCode provides all the essential features 
              and components you need to build intelligent, production-ready applications.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <Card key={index} className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 md:py-24">
        <div className="container flex flex-col items-center text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Ready to Build Something Amazing?
          </h2>
          <p className="mt-4 max-w-2xl text-blue-100 md:text-lg">
            Join thousands of AI developers who trust LlamaCode AI Scaffold 
            to build their next breakthrough application.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base">
                Start Building Now
              </Button>
            </Link>
            <Link href="/console">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white text-white hover:bg-white hover:text-blue-600">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Technology stack data
const techStackData = [
  {
    name: "Next.js 15",
    description: "React framework with App Router",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0z"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    description: "Type-safe JavaScript",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    ),
  },
  {
    name: "Radix UI",
    description: "Unstyled, accessible components",
    icon: (
      <svg viewBox="0 0 25 25" className="h-8 w-8" fill="currentColor">
        <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"/>
        <path d="M12 0H4V8H12V0Z"/>
        <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"/>
      </svg>
    ),
  },
];

// Feature data with enhanced descriptions
const featuresData = [
  {
    title: "Authentication System",
    description: "Complete authentication flow with login, registration, password reset, and protected routes. Built with security best practices and modern standards.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
  {
    title: "Admin Dashboard",
    description: "Comprehensive admin interface with analytics, user management, and system settings. Beautiful charts and data visualization included.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        <line x1="3" x2="21" y1="9" y2="9"></line>
        <line x1="9" x2="9" y1="21" y2="9"></line>
      </svg>
    ),
  },
  {
    title: "Database Integration",
    description: "Pre-configured database setup with Prisma ORM, migrations, and type-safe queries. Supports PostgreSQL, MySQL, and SQLite.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"></path>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"></path>
      </svg>
    ),
  },
  {
    title: "API Routes",
    description: "RESTful API endpoints with proper error handling, validation, and documentation. Built with Next.js API routes and modern patterns.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M4.5 16.5c-1.5 1.5-1.5 3.5 0 5s3.5 1.5 5 0l3.5-3.5c1.5-1.5 1.5-3.5 0-5s-3.5-1.5-5 0l-1.5 1.5"></path>
        <path d="M19.5 7.5c1.5-1.5 1.5-3.5 0-5s-3.5-1.5-5 0L11 6c-1.5 1.5-1.5 3.5 0 5s3.5 1.5 5 0l1.5-1.5"></path>
      </svg>
    ),
  },
  {
    title: "State Management",
    description: "Modern state management with Zustand and React Query. Optimized for performance with automatic caching and synchronization.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
      </svg>
    ),
  },
  {
    title: "Theme System",
    description: "Beautiful dark and light themes with automatic system detection. Customizable design tokens and consistent styling across all components.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    ),
  },
];

// Statistics data
const statsData = [
  { value: "99.9%", label: "Uptime" },
  { value: "50ms", label: "Response Time" },
  { value: "100+", label: "Components" },
  { value: "24/7", label: "Support" },
];
