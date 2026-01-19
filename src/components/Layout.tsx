import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100',
        className
      )}
    >
      {children}
    </div>
  )
}
