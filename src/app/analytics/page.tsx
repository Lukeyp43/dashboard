"use client";

import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Analytics() {
  return (
    <Layout>
      <h3 className="text-3xl font-medium text-gray-700 dark:text-gray-200 mb-6">Analytics</h3>
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Analytics charts and data will be displayed here.</p>
        </CardContent>
      </Card>
    </Layout>
  )
}