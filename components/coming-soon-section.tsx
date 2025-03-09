"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function ComingSoonSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [activeTab, setActiveTab] = useState("churn");
  const controls = useAnimation();
  const { toast } = useToast();

  useEffect(() => {
    // Reset animation and start new animation when tab changes
    controls.start({ opacity: 0, y: 20 }).then(() => {
      controls.start({ opacity: 1, y: 0 });
    });
  }, [activeTab, controls]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Supabase through our API route
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          productInterest: activeTab,
        }),
      });

      const result = await response.json();
      console.log("Waitlist response:", result); // Debug logging

      if (response.ok) {
        // Always set isSubmitted to true for successful responses
        setIsSubmitted(true);

        // Store the response message from the server
        setResponseMessage(result.message || "Thank you for your interest!");

        // Clear the email input
        setEmail("");

        // Show toast notification
        toast({
          title: "Success!",
          description: result.message || "Thank you for your interest!",
        });
      } else {
        toast({
          title: "Error",
          description:
            result.error || "Failed to join waitlist. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting waitlist form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="py-20 bg-black text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stop Losing Customers and Sales
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Before It's Too Late
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            With Churn Shield and Cart Rescue AI, predict churn and recover
            abandoned carts instantly—or risk losing customers and revenue
            forever.
          </p>
        </motion.div>

        {/* Feature Tabs */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-900 rounded-full p-1">
              <button
                onClick={() => setActiveTab("churn")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "churn"
                    ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Churn Shield
              </button>
              <button
                onClick={() => setActiveTab("cart")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "cart"
                    ? "bg-gradient-to-r from-pink-600 to-pink-800 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Cart Rescue AI
              </button>
            </div>
          </div>

          {/* Churn Shield UI */}
          {activeTab === "churn" && (
            <motion.div
              animate={controls}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-5 gap-8 items-start"
            >
              {/* Left panel - Customer list */}
              <div className="md:col-span-2 bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <h3 className="font-medium">At-Risk Customers</h3>
                  <Badge className="bg-purple-900 text-purple-200">
                    20 identified
                  </Badge>
                </div>
                <div className="divide-y divide-gray-800">
                  {[
                    {
                      name: "Sarah Johnson",
                      risk: "High",
                      days: 14,
                      value: "$1,240",
                      activity: "Low engagement",
                    },
                    {
                      name: "Michael Chen",
                      risk: "Medium",
                      days: 30,
                      value: "$890",
                      activity: "Decreasing usage",
                    },
                    {
                      name: "Emma Williams",
                      risk: "High",
                      days: 7,
                      value: "$2,100",
                      activity: "Support tickets",
                    },
                  ].map((customer, i) => (
                    <div
                      key={i}
                      className={`p-4 hover:bg-gray-800/50 transition-colors ${
                        i === 0 ? "bg-gray-800/50" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{customer.name}</h4>
                          <p className="text-sm text-gray-400">
                            Last active {customer.days} days ago
                          </p>
                        </div>
                        <Badge
                          className={`${
                            customer.risk === "High"
                              ? "bg-red-900/30 text-red-300"
                              : customer.risk === "Medium"
                              ? "bg-yellow-900/30 text-yellow-300"
                              : "bg-green-900/30 text-green-300"
                          }`}
                        >
                          {customer.risk} Risk
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Customer value:{" "}
                          <span className="text-white">{customer.value}</span>
                        </span>
                        <span className="text-gray-400">
                          {customer.activity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right panel - Customer details & actions */}
              <div className="md:col-span-3 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Customer Insights</h3>
                    <Badge className="bg-red-900/30 text-red-300">
                      High Risk
                    </Badge>
                  </div>
                  <h2 className="text-xl font-semibold mt-2">Sarah Johnson</h2>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Lifetime Value</p>
                      <p className="text-xl font-semibold">$1,240</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Churn Probability</p>
                      <p className="text-xl font-semibold">87%</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Retention Cost</p>
                      <p className="text-xl font-semibold">$75</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      Engagement Trend
                    </h4>
                    <div className="h-24 bg-gray-800 rounded-lg overflow-hidden p-2">
                      <div className="h-full w-full flex items-end">
                        {[60, 55, 70, 65, 50, 40, 30, 25, 15, 10, 5].map(
                          (height, i) => (
                            <div key={i} className="flex-1 mx-0.5">
                              <div
                                className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-sm"
                                style={{ height: `${height}%` }}
                              ></div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>90 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      AI Recommendations
                    </h4>
                    <div className="space-y-2">
                      <div className="bg-purple-900/20 border border-purple-900/30 rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                          <p className="font-medium text-purple-300">
                            Send personalized discount
                          </p>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          15% off next purchase (Est. 65% retention chance)
                        </p>
                      </div>
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                          <p className="font-medium text-gray-300">
                            Schedule check-in call
                          </p>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Customer prefers phone contact (Est. 40% retention)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                      Apply AI Recommendation
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Custom Action
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cart Rescue UI */}
          {activeTab === "cart" && (
            <motion.div
              animate={controls}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-5 gap-8 items-start"
            >
              {/* Left panel - Abandoned carts */}
              <div className="md:col-span-2 bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <h3 className="font-medium">Abandoned Carts</h3>
                  <Badge className="bg-pink-900 text-pink-200">12 today</Badge>
                </div>
                <div className="divide-y divide-gray-800">
                  {[
                    {
                      name: "David Miller",
                      items: 3,
                      value: "$149.99",
                      time: "15 minutes ago",
                      status: "High",
                    },
                    {
                      name: "Jennifer Lee",
                      items: 1,
                      value: "$89.50",
                      time: "1 hour ago",
                      status: "Medium",
                    },
                    {
                      name: "Robert Wilson",
                      items: 5,
                      value: "$275.00",
                      time: "3 hours ago",
                      status: "Low",
                    },
                  ].map((cart, i) => (
                    <div
                      key={i}
                      className={`p-4 hover:bg-gray-800/50 transition-colors ${
                        i === 0 ? "bg-gray-800/50" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{cart.name}</h4>
                          <p className="text-sm text-gray-400">
                            {cart.items} items · {cart.time}
                          </p>
                        </div>
                        <Badge
                          className={`${
                            cart.status === "High"
                              ? "bg-green-900/30 text-green-300"
                              : cart.status === "Medium"
                              ? "bg-yellow-900/30 text-yellow-300"
                              : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {cart.status} Recovery Chance
                        </Badge>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-400">
                          Cart value:{" "}
                          <span className="text-white">{cart.value}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right panel - Cart details & recovery */}
              <div className="md:col-span-3 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Cart Recovery</h3>
                    <Badge className="bg-green-900/30 text-green-300">
                      High Recovery Chance
                    </Badge>
                  </div>
                  <h2 className="text-xl font-semibold mt-2">David Miller</h2>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Cart Value</p>
                      <p className="text-xl font-semibold">$149.99</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Recovery Chance</p>
                      <p className="text-xl font-semibold">78%</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Abandoned</p>
                      <p className="text-xl font-semibold">15m ago</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      Cart Contents
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          name: "Wireless Headphones",
                          price: "$79.99",
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Smart Watch Band",
                          price: "$29.99",
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Phone Charging Dock",
                          price: "$39.99",
                          image: "/placeholder.svg?height=40&width=40",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center bg-gray-800 p-2 rounded-lg"
                        >
                          <div className="h-10 w-10 bg-gray-700 rounded mr-3 overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                          </div>
                          <p className="text-sm font-medium">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      AI Recovery Strategy
                    </h4>
                    <div className="bg-pink-900/20 border border-pink-900/30 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="h-2 w-2 rounded-full bg-pink-500 mr-2"></div>
                        <p className="font-medium text-pink-300">
                          Personalized Email with Time-Limited Offer
                        </p>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-300 mb-1">
                          <strong>Subject:</strong> David, your cart is waiting
                          (10% off inside)
                        </p>
                        <p className="text-sm text-gray-400">
                          Hi David, we noticed you left some great items in your
                          cart. Complete your purchase in the next 4 hours and
                          get 10% off your entire order!
                        </p>
                      </div>

                      <div className="flex items-center text-sm text-gray-400">
                        <div className="flex items-center mr-4">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></div>
                          <span>78% success rate</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></div>
                          <span>Optimal send time: Now</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-pink-600 hover:bg-pink-700">
                      Send Recovery Email
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Customize Strategy
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Cart Abandonment</h3>
                <div className="text-3xl font-bold text-pink-500">70%</div>
              </div>
              <p className="text-gray-400 mb-4">
                Of shoppers abandon their carts, resulting in $18 billion lost
                annually
              </p>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-pink-600 w-[70%]"></div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Customer Churn</h3>
                <div className="text-3xl font-bold text-purple-500">20-40%</div>
              </div>
              <p className="text-gray-400 mb-4">
                Of subscribers churn annually, costing businesses millions in
                lost revenue
              </p>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 w-[40%]"></div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Recovery Potential</h3>
                <div className="text-3xl font-bold text-green-500">30%</div>
              </div>
              <p className="text-gray-400 mb-4">
                Average recovery rate with AI-powered tools, turning lost sales
                into revenue
              </p>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 w-[30%]"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border border-gray-800"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Don't Lose Another Customer or Sale
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the waiting list today and be the first to access our
            cutting-edge AI tools for{" "}
            {activeTab === "churn" ? "customer retention" : "cart recovery"}.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow mr-2 bg-gray-800 border-gray-700 text-white"
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-80"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Reserve Your Spot
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 border border-purple-500 text-purple-400 p-4 rounded-md max-w-md mx-auto"
            >
              {responseMessage}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
