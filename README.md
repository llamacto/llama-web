# 🚀 LlamaFront AI Scaffold

A modern, AI-powered frontend application scaffold designed for the AI era. Built specifically for vibe coding and AI-assisted development, LlamaFront provides everything you need to build intelligent, scalable, and performant frontend applications with maximum developer productivity.

## ✨ Frontend-First AI Features

- 🎨 **Component-Driven**: Extensive UI component library with Radix UI and custom designs
- 🚀 **Performance Optimized**: Next.js 16 App Router with automatic code splitting
- 🌙 **Theme System**: Beautiful dark/light themes with CSS variables
- 📱 **Mobile-First**: Responsive design for all screen sizes
- 🔍 **TypeScript**: Full type safety and excellent DX
- ⚡ **Hot Reload**: Instant development feedback
- 🎯 **SEO Friendly**: Built-in meta tags and structured data
- 🤖 **AI-Ready**: Clean patterns for AI code generation
- 🔐 **Auth Integration**: Client-side authentication patterns
- 📊 **State Management**: Zustand for predictable state handling
- 🎭 **Form Handling**: React Hook Form with Zod validation
- 🛠️ **Developer Tools**: Pre-configured linting and formatting

## 🤖 AI Developer Experience

- **AI-Friendly Code Structure**: Clean, predictable patterns that AI tools understand
- **Smart Component Design**: Components designed for AI generation and modification
- **Type Safety**: Comprehensive TypeScript types for better AI code completion
- **Documentation**: Rich JSDoc comments for AI context understanding
- **Hot Reload**: Instant feedback for AI-assisted iterative development
- **Error Handling**: Clear error messages for AI debugging assistance

## 🆕 最新更新 (v2.1.0)

- ✅ **Next.js 16.1.1** - 最新稳定版
- ✅ **React 19.2.3** - 最新特性支持
- ✅ **Tailwind CSS 4.1.18** - 最新版本
- ✅ **性能优化** - 生产环境配置优化
- ✅ **架构文档** - 完整的优化指南

👉 查看 [优化总结报告](docs/OPTIMIZATION_SUMMARY.md) 了解详情

## 🛠️ Frontend-Optimized Tech Stack

- **Framework**: Next.js 16 with App Router (SSR/SSG/ISR)
- **Language**: TypeScript (strict mode, AI-friendly)
- **Styling**: Tailwind CSS (utility-first, design tokens)
- **UI Components**: Radix UI (accessible primitives)
- **State Management**: Zustand (simple, predictable)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React (consistent icon system)
- **Theme**: next-themes (system-aware theming)
- **Data Fetching**: TanStack Query (caching, sync)
- **Animations**: Framer Motion (smooth transitions)
- **Package Manager**: pnpm (fast, reliable)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/llamacto/llamafront-ai-scaffold.git
   cd llamafront-ai-scaffold
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

   **Note**: This is a frontend scaffold. The `.env.example` only contains frontend-specific variables like API URLs and feature flags. Backend configurations should be handled in separate backend services.

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Frontend vs Backend Configuration

This scaffold includes two environment configuration files:

- **`.env.example`** - Frontend-only variables (Next.js public variables)
- **`.env.example.backend`** - Example backend configuration (for reference)

The frontend scaffold focuses on client-side configuration, while backend services should handle their own environment variables separately.

## 📁 Project Structure

```text
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (site)/            # Public pages
│   └── console/           # Admin dashboard
├── components/            # Reusable components
│   └── ui/               # UI component library
├── config/               # Configuration files
├── constants/            # Application constants
├── hooks/                # Custom React hooks
├── http/                 # HTTP layer (request, interceptors, types)
├── providers/            # React context providers
├── services/             # API service layer
├── store/                # Zustand stores
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🎯 Why LlamaFront for Frontend Development?

### 🎨 **Component Excellence**

- **Design System**: Consistent, reusable component library
- **Accessibility**: WCAG compliant components out of the box
- **Theming**: CSS variables for seamless theme switching
- **Responsive**: Mobile-first, breakpoint-driven design

### ⚡ **Performance First**

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Analysis**: Built-in webpack bundle analyzer
- **Core Web Vitals**: Optimized for Lighthouse scores

### 🤖 **AI-Enhanced DX**

- **Clean Patterns**: Predictable component structure for AI tools
- **Type Safety**: Comprehensive TypeScript definitions
- **Smart Imports**: Auto-import for components and utilities
- **Error Boundaries**: Graceful error handling and debugging

### 🚀 **Modern Standards**

- **ESM**: Pure ES modules, no CommonJS
- **CSS Modules**: Scoped styling with Tailwind
- **SEO Ready**: Meta tags, structured data, sitemaps
- **PWA Support**: Service worker and offline capabilities

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Vercel](https://vercel.com/) - Platform for frontend frameworks

## 📞 Support

- 📧 Issues: [GitHub Issues](https://github.com/llamacto/llamafront-ai-scaffold/issues)
- 📚 Documentation: Check the `docs/` directory for detailed guides
- 🐛 Bug Reports: Please open an issue with detailed information

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

Made with ❤️ by Llamacto Team for the AI Development Community
