import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * C端前台站点共享布局
 * 包含导航栏和页脚
 */
export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
              <span className="text-xl font-bold">Brand</span>
            </Link>

            {/* 导航链接 */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                首页
              </Link>
              <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
                产品
              </Link>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                关于我们
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                联系我们
              </Link>
            </nav>
          </div>

          {/* 用户操作区 */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">登录</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">注册</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="border-t py-12 text-sm">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">关于我们</h3>
            <ul className="grid gap-2">
              <li><Link href="/about" className="opacity-70 hover:opacity-100">公司介绍</Link></li>
              <li><Link href="/team" className="opacity-70 hover:opacity-100">团队成员</Link></li>
              <li><Link href="/careers" className="opacity-70 hover:opacity-100">加入我们</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">产品服务</h3>
            <ul className="grid gap-2">
              <li><Link href="/products" className="opacity-70 hover:opacity-100">产品列表</Link></li>
              <li><Link href="/solutions" className="opacity-70 hover:opacity-100">解决方案</Link></li>
              <li><Link href="/pricing" className="opacity-70 hover:opacity-100">价格方案</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">帮助支持</h3>
            <ul className="grid gap-2">
              <li><Link href="/docs" className="opacity-70 hover:opacity-100">文档中心</Link></li>
              <li><Link href="/faq" className="opacity-70 hover:opacity-100">常见问题</Link></li>
              <li><Link href="/contact" className="opacity-70 hover:opacity-100">联系我们</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">联系方式</h3>
            <ul className="grid gap-2">
              <li className="opacity-70">地址：北京市朝阳区</li>
              <li className="opacity-70">电话：010-12345678</li>
              <li className="opacity-70">邮箱：contact@example.com</li>
            </ul>
          </div>
        </div>
        <div className="container mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-center text-sm opacity-70">&copy; {new Date().getFullYear()} Company. 保留所有权利。</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm opacity-70 hover:opacity-100">隐私政策</Link>
            <Link href="/terms" className="text-sm opacity-70 hover:opacity-100">服务条款</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
