"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Package, DollarSign, TrendingUp } from "lucide-react"

const metrics = [
  {
    name: "Today Sales",
    value: "2,312",
    icon: ShoppingBag,
    change: "+12.5%",
    changeType: "increase",
  },
  {
    name: "Total Items Posted",
    value: "1,345",
    icon: Package,
    change: "+8.2%",
    changeType: "increase",
  },
  {
    name: "Delivery Pending",
    value: "12",
    icon: TrendingUp,
    change: "-2.4%",
    changeType: "decrease",
  },
  {
    name: "Cost of Value",
    value: "$34,890.89",
    icon: DollarSign,
    change: "+6.8%",
    changeType: "increase",
  },
]

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.name} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                <p className="text-2xl font-semibold mt-1">{metric.value}</p>
              </div>
              <div className={`rounded-full p-2 ${metric.changeType === "increase" ? "bg-green-100" : "bg-red-100"}`}>
                <metric.icon
                  className={`h-5 w-5 ${metric.changeType === "increase" ? "text-green-600" : "text-red-600"}`}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  metric.changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

