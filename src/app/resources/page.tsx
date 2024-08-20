import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Resources() {
  return (
    <Layout>
      <h3 className="text-3xl font-medium text-gray-700 dark:text-gray-200 mb-6">Resources</h3>
      <Card>
        <CardHeader>
          <CardTitle>Available Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p>List of resources will be displayed here.</p>
        </CardContent>
      </Card>
    </Layout>
  )
}