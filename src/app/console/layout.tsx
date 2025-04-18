'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon, BarChart3, Settings, Home, Users, ShoppingCart, Package, ListFilter, Trash2, Bell, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/console",
    icon: Home,
  },
  {
    title: "Analytics",
    href: "/console/analytics",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/console/users",
    icon: Users,
  },
  {
    title: "Orders",
    href: "/console/orders",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    href: "/console/products",
    icon: Package,
  },
];

const secondaryNavItems: NavItem[] = [
  {
    title: "Settings",
    href: "/console/settings",
    icon: Settings,
  },
  {
    title: "Filters",
    href: "/console/filters",
    icon: ListFilter,
  },
  {
    title: "Trash",
    href: "/console/trash",
    icon: Trash2,
  },
];

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link
          href="/console"
          className="flex items-center gap-2 font-semibold"
        >
          <Package className="h-6 w-6" />
          <span>Enterprise Console</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-dashed"
              >
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                No new notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full overflow-hidden"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/login" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1 md:grid md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-background md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                {mainNavItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                        isActive
                          ? "bg-muted text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      <IconComponent className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
                <div className="my-2 h-px bg-muted" />
                {secondaryNavItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                        isActive
                          ? "bg-muted text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      <IconComponent className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Link
                href="/"
                className="flex h-8 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <span>Return to Site</span>
              </Link>
            </div>
          </div>
        </aside>
        <main className="flex flex-1 flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
