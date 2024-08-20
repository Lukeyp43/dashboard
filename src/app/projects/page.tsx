import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const projects = [
  { id: 1, name: 'Website Redesign', status: 'In Progress', progress: 60, priority: 'High' },
  { id: 2, name: 'Mobile App Development', status: 'Planning', progress: 20, priority: 'Medium' },
  { id: 3, name: 'Database Migration', status: 'Completed', progress: 100, priority: 'Low' },
  { id: 4, name: 'API Integration', status: 'In Progress', progress: 40, priority: 'High' },
  { id: 5, name: 'Security Audit', status: 'Not Started', progress: 0, priority: 'High' },
]

export default function Projects() {
  return (
    <Layout>
      <h3 className="text-3xl font-medium text-gray-700 dark:text-gray-200 mb-6">Projects</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={project.progress} className="w-full" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Progress: {project.progress}%
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant={project.priority === 'High' ? 'destructive' : project.priority === 'Medium' ? 'default' : 'secondary'}>
                {project.priority}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  )
}