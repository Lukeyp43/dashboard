import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Settings() {
  return (
    <Layout>
      <h3 className="text-3xl font-medium text-gray-700 dark:text-gray-200 mb-6">Settings</h3>
      <Card>
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Settings options will be displayed here.</p>
        </CardContent>
      </Card>
    </Layout>
  )
}