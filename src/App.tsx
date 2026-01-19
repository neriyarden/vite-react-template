import { Button } from '@/components/Button'
import { Layout } from '@/components/Layout'
import { ThemeToggle } from '@/components/ThemeToggle'

function App() {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Vite + React + TypeScript Template
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Interview-ready starter template
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>
    </Layout>
  )
}

export default App
