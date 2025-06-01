# 🚀 Llamacto Web Scaffold

A modern, production-ready web application scaffold built with the latest technologies. Llamacto provides everything you need to build scalable, maintainable, and performant web applications.

## ✨ Features

- 🎯 **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- 🔐 **Authentication**: Complete auth system with login, registration, and protected routes
- 📊 **Admin Dashboard**: Beautiful admin interface with analytics and data visualization
- 🎨 **UI Components**: Extensive component library with Radix UI and custom designs
- 🌙 **Theme System**: Dark/light mode with automatic system detection
- 📱 **Responsive Design**: Mobile-first approach with responsive layouts
- 🔍 **TypeScript**: Full type safety and excellent developer experience
- 🎭 **State Management**: Modern state management with Zustand
- 🚦 **Validation**: Form validation with Zod schemas
- 📈 **Performance**: Optimized for speed with Next.js App Router
- 🧪 **Testing Ready**: Pre-configured for testing frameworks
- 📦 **Production Ready**: Deployment-ready configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Theme**: next-themes
- **Data Fetching**: TanStack Query
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/llamacto-web.git
   cd llamacto-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (site)/            # Public pages
│   └── console/           # Admin dashboard
├── components/            # Reusable components
│   └── ui/               # UI component library
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── providers/            # React context providers
├── store/                # Zustand stores
└── utils/                # Helper utilities
```

## 🎨 UI Components

Llamacto includes a comprehensive UI component library built with:

- **Radix UI**: Unstyled, accessible components
- **Tailwind CSS**: Utility-first styling
- **Custom Components**: Button, Card, Input, Modal, etc.
- **Form Components**: Input, Select, Checkbox, Radio, etc.
- **Data Display**: Table, Badge, Avatar, etc.
- **Navigation**: Navbar, Sidebar, Breadcrumb, etc.

## 🔐 Authentication

Pre-built authentication system includes:

- **Login/Register**: Email and password authentication
- **Protected Routes**: Route-level protection
- **User Management**: User profiles and settings
- **Password Reset**: Secure password recovery
- **Session Management**: JWT-based sessions

## 📊 Admin Dashboard

Full-featured admin interface with:

- **Analytics Dashboard**: Charts and metrics
- **User Management**: CRUD operations for users
- **Settings Panel**: Application configuration
- **Data Tables**: Sortable, filterable tables
- **Responsive Design**: Mobile-friendly admin interface

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Docker

```bash
# Build the Docker image
docker build -t llamacto-web .

# Run the container
docker run -p 3000:3000 llamacto-web
```

### Other Platforms

Llamacto can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- Heroku
- AWS
- Google Cloud
- Azure

## 🧪 Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
pnpm type-check   # Run TypeScript checks
pnpm format       # Format code with Prettier
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Vercel](https://vercel.com/) - Platform for frontend frameworks

## 📞 Support

- 📧 Email: support@llamacto.com
- 💬 Discord: [Join our community](https://discord.gg/llamacto)
- 📚 Documentation: [docs.llamacto.com](https://docs.llamacto.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/llamacto-web/issues)

---

Made with ❤️ by the Llamacto Team
