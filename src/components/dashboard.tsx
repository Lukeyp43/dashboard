import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import { 
  AlertCircle, Bell, ChevronDown, Clock, Code, Coffee, 
  Database, File, Grid, Home, Moon, Plus, Search, Settings, 
  Sun, Users, X, Activity, DollarSign, TrendingUp, BarChart2
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

ChartJS.register(...registerables)

// Expanded mock data for charts
const chartData = {
  bar: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  },
  line: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Project A',
        data: [65, 59, 80, 81, 56, 55, 40, 65],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Project B',
        data: [28, 48, 40, 19, 86, 27, 90, 102],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  },
  pie: {
    labels: ['Design', 'Frontend', 'Backend', 'DevOps', 'Testing'],
    datasets: [{
      data: [300, 50, 100, 40, 120],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  },
  doughnut: {
    labels: ['Allocated', 'Available', 'Overallocated'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  },
  radar: {
    labels: ['Coding', 'Design', 'Communication', 'Problem Solving', 'Teamwork', 'Adaptability'],
    datasets: [{
      label: 'Team Skills',
      data: [85, 75, 90, 80, 95, 70],
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      pointBackgroundColor: 'rgb(75, 192, 192)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(75, 192, 192)'
    }]
  }
}

const tasks = [
  { id: 1, title: 'Design new landing page', status: 'To Do', assignee: 'Alice', priority: 'High' },
  { id: 2, title: 'Implement authentication', status: 'In Progress', assignee: 'Bob', priority: 'Medium' },
  { id: 3, title: 'Optimize database queries', status: 'In Progress', assignee: 'Charlie', priority: 'High' },
  { id: 4, title: 'Write unit tests', status: 'To Do', assignee: 'David', priority: 'Low' },
  { id: 5, title: 'Deploy to production', status: 'Done', assignee: 'Eve', priority: 'High' },
]

const team = [
  { name: 'Alice Johnson', role: 'Frontend Developer', avatar: '/placeholder.svg?height=40&width=40', status: 'online' },
  { name: 'Bob Smith', role: 'Backend Developer', avatar: '/placeholder.svg?height=40&width=40', status: 'offline' },
  { name: 'Charlie Brown', role: 'DevOps Engineer', avatar: '/placeholder.svg?height=40&width=40', status: 'online' },
  { name: 'David Lee', role: 'UI/UX Designer', avatar: '/placeholder.svg?height=40&width=40', status: 'away' },
  { name: 'Eve Taylor', role: 'Project Manager', avatar: '/placeholder.svg?height=40&width=40', status: 'online' },
]

const activityFeed = [
  { id: 1, user: 'Alice Johnson', action: 'completed task', target: 'Design homepage mockup', time: '5 minutes ago' },
  { id: 2, user: 'Bob Smith', action: 'commented on', target: 'API documentation', time: '15 minutes ago' },
  { id: 3, user: 'Charlie Brown', action: 'deployed', target: 'v2.1.0 to production', time: '1 hour ago' },
  { id: 4, user: 'David Lee', action: 'updated', target: 'project timeline', time: '2 hours ago' },
  { id: 5, user: 'Eve Taylor', action: 'scheduled meeting', target: 'Sprint Planning', time: '3 hours ago' },
]

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [heatmapData, setHeatmapData] = useState<{ day: string; time: string; value: number; }[]>([])

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Users, label: 'Team', href: '/team' },
    { icon: File, label: 'Projects', href: '/projects' },
    { icon: Clock, label: 'Time Tracking', href: '/time-tracking' },
    { icon: Database, label: 'Resources', href: '/resources' },
    { icon: TrendingUp, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  useEffect(() => {
    // Generate mock heatmap data
    const generateHeatmapData = () => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      const times = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM']
      const data: { day: string; time: string; value: number; }[] = []
      for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < times.length; j++) {
          data.push({
            day: days[i],
            time: times[j],
            value: Math.floor(Math.random() * 100)
          })
        }
      }
      setHeatmapData(data)
    }
    generateHeatmapData()
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, you'd apply the theme change here
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              exit={{ width: 0 }}
              className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
            >
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">TechNexus</h2>
              </div>
              <nav className="mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <Grid className="h-5 w-5" />
                </Button>
                <div className="ml-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <img
                        className="rounded-full"
                        src="/placeholder.svg?height=32&width=32"
                        alt="Avatar"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              <h3 className="text-3xl font-medium text-gray-700 dark:text-gray-200">Dashboard</h3>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="mt-8">
                    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                      {[
                        { title: 'Total Revenue', value: '$45,231', icon: DollarSign, change: '+20%', changeType: 'positive' },
                        { title: 'Active Projects', value: '17', icon: Code, change: '+2', changeType: 'positive' },
                        { title: 'Team Utilization', value: '85%', icon: Users, change: '-5%', changeType: 'negative' },
                        { title: 'Completed Tasks', value: '243', icon: Coffee, change: '+12%', changeType: 'positive' },
                      ].map((item, index) => (
                        <Card key={index}>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                            <p className={`text-xs ${item.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                              {item.change} from last month
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="grid gap-6 mb-8 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Revenue Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Bar data={chartData.bar} options={{ responsive: true }} />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Project Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Line data={chartData.line} options={{ responsive: true }} />
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid gap-6 mb-8 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Team Activity Heatmap</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64 w-full">
                            {/* Placeholder for heatmap - in a real app, use a library like react-heatmap-grid */}
                            <div className="grid grid-cols-5 gap-1 h-full">
                              {heatmapData.map((cell, index) => (
                                <div
                                  key={index}
                                  className="bg-green-500"
                                  style={{ opacity: cell.value / 100 }}
                                  title={`${cell.day} ${cell.time}: ${cell.value}%`}
                                />
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Team Skills Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Radar data={chartData.radar} options={{ responsive: true }} />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="projects">
                  <div className="mt-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Timeline</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* Placeholder for Gantt chart - in a real app, use a library like react-gantt-chart */}
                        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
                          <p className="text-center text-gray-500 dark:text-gray-400">Gantt Chart Placeholder</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Task Board</CardTitle>
                        <CardDescription>Manage and track project tasks</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          {['To Do', 'In Progress', 'Done'].map((status) => (
                            <div key={status} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                              <h4 className="font-semibold mb-4">{status}</h4>
                              {tasks
                                .filter((task) => task.status === status)
                                .map((task) => (
                                  <Card key={task.id} className="mb-4">
                                    <CardHeader>
                                      <CardTitle className="text-sm">{task.title}</CardTitle>
                                      <CardDescription>{task.assignee}</CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                      <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'secondary'}>
                                        {task.priority}
                                      </Badge>
                                    </CardFooter>
                                  </Card>
                                ))}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="team">
                  <div className="mt-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Team Overview</CardTitle>
                        <CardDescription>Manage your team and their roles</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {team.map((member) => (
                            <div key={member.name} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center space-x-4">
                                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                                <div>
                                  <p className="font-semibold">{member.name}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                                </div>
                              </div>
                              <Badge variant={member.status === 'online' ? 'default' : member.status === 'away' ? 'secondary' : 'outline'}>
                                {member.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="resources">
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Resource Allocation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Doughnut data={chartData.doughnut} options={{ responsive: true }} />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Pie data={chartData.pie} options={{ responsive: true }} />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Real-time Activity Feed */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Activity Feed</CardTitle>
                  <CardDescription>Real-time updates from your team</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {activityFeed.map((activity) => (
                      <li key={activity.id} className="flex items-start space-x-4">
                        <div className="bg-blue-500 rounded-full p-2">
                          <Activity className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-semibold">{activity.user}</span> {activity.action}{' '}
                            <span className="font-semibold">{activity.target}</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      {/* Quick Add Floating Action Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="fixed bottom-8 right-8 rounded-full shadow-lg"
              size="icon"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Quick Add</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}