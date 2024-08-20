import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Team() {
  return (
    <Layout>
      <h3 className="text-3xl font-medium text-gray-700 dark:text-gray-200 mb-6">Team</h3>
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Team member details will be displayed here.</p>
        </CardContent>
      </Card>
    </Layout>
  )
}