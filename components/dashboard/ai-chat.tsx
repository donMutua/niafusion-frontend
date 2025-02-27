"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  role: "assistant" | "user"
  content: string
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessages = [
      ...messages,
      { role: "user", content: input },
      {
        role: "assistant",
        content:
          "This is a demo response from the AI assistant. In a real implementation, this would be connected to an AI service.",
      },
    ]
    setMessages(newMessages)
    setInput("")
  }

  return (
    <Card className="border-gray-800 bg-gray-900">
      <CardContent className="p-4">
        <div className="h-[400px] space-y-4 overflow-y-auto p-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex items-start gap-3 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                {message.role === "assistant" && (
                  <div className="rounded-full bg-purple-500/20 p-2">
                    <Bot className="h-4 w-4 text-purple-400" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === "assistant" ? "bg-gray-800 text-white" : "bg-purple-500 text-white"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="rounded-full bg-purple-500 p-2">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-400">Send a message to start the conversation.</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 p-4">
        <div className="flex w-full items-center gap-2">
          <Textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] flex-1 resize-none border-gray-800 bg-gray-800 text-white placeholder-gray-400"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-11 w-11 rounded-lg bg-purple-500 p-0 hover:bg-purple-600"
          >
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

