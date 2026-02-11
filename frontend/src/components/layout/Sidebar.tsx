import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home,
  Code2,
  Brain,
  Zap,
  Target,
  User,
  Trophy,
  X,
  BarChart3,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isCollapsed = false }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: location.pathname === '/dashboard' },
    { name: 'Compiler', href: '/compiler', icon: Code2, current: location.pathname === '/compiler' },
    { name: 'Code Explainer', href: '/explainer', icon: Brain, current: location.pathname === '/explainer' },
    { name: 'Code Generator', href: '/generator', icon: Zap, current: location.pathname === '/generator', badge: 'AI' },
    { name: 'Practice Arena', href: '/practice', icon: Target, current: location.pathname === '/practice' },
    { name: 'Assessment', href: '/assessment', icon: Trophy, current: location.pathname === '/assessment', badge: 'NEW' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, current: location.pathname === '/analytics' }
  ];

  const secondaryNavigation = [
    { name: 'Profile', href: '/profile', icon: User, current: location.pathname === '/profile' },
    { name: 'Settings', href: '/settings', icon: Settings, current: location.pathname === '/settings' },
    { name: 'Help & Support', href: '/help', icon: HelpCircle, current: location.pathname === '/help' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-16 left-0 z-50 min-h-screen bg-background border-r border-b border-border/20 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 overflow-x-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          "w-64"
        )}
      >
        <div className="flex flex-col h-full overflow-x-hidden">

          {/* Close button for mobile */}
          <div className="flex justify-end p-4 border-b border-border/20 lg:hidden">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Main content: navigation + account + upgrade card */}
          <div className="flex-1 flex flex-col">

            {/* Navigation + Account */}
            <div className={cn("overflow-y-auto overflow-x-hidden py-3", isCollapsed ? "px-2" : "px-4")}>
              {/* Navigation links */}
              <nav className={cn("space-y-1 mb-4", isCollapsed ? "overflow-hidden" : "")}>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => {
                      // Only close sidebar on mobile, don't affect collapsed state on desktop
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                    title={isCollapsed ? item.name : undefined}
                    className={cn(
                      "flex items-center rounded-lg text-sm font-medium relative group",
                      isCollapsed ? "justify-center px-3 py-3" : "justify-between px-3 py-2",
                      item.current
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <div className={cn("flex items-center", isCollapsed ? "justify-center" : "")}>
                      <item.icon className={cn("h-4 w-4", isCollapsed ? "" : "mr-3")} />
                      {!isCollapsed && item.name}
                    </div>
                    {!isCollapsed && item.badge && (
                      <Badge variant="secondary" className="text-xs flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.name}
                        {item.badge && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Account section */}
              <div>
                {!isCollapsed && (
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Account
                  </div>
                )}
                <div className="space-y-1 mt-2">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => {
                        // Only close sidebar on mobile, don't affect collapsed state on desktop
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      }}
                      title={isCollapsed ? item.name : undefined}
                      className={cn(
                        "flex items-center rounded-lg text-sm font-medium relative group",
                        isCollapsed ? "justify-center px-3 py-3" : "px-3 py-2",
                        item.current
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isCollapsed ? "" : "mr-3")} />
                      {!isCollapsed && item.name}
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Upgrade to Pro card */}
            {!isCollapsed && (
              <div className="px-4 py-2 flex-shrink-0">
                <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-lg text-white">
                  <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
                  <p className="text-xs text-white/80 mb-3">
                    Unlock unlimited challenges and AI features
                  </p>
                  <Button size="sm" className="w-full bg-white text-primary font-medium transition-colors hover:bg-white/90">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;