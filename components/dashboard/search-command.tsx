"use client"

import { useState } from "react"
import { Command } from "cmdk"
import { Search } from "lucide-react"

export function SearchCommand() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <div
        className="flex h-12 w-full cursor-text items-center gap-2 rounded-lg bg-gray-800 px-4 text-gray-400 hover:bg-gray-800/80"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
        <span className="text-sm">Type a command or search...</span>
      </div>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        className="fixed inset-x-0 top-24 z-50 mx-auto max-w-2xl overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-2xl animate-in fade-in-0 slide-in-from-top-2"
      >
        <Command.Input
          placeholder="Type a command or search..."
          className="w-full border-none bg-transparent p-4 text-white placeholder-gray-400 focus:outline-none"
        />
        <Command.List className="max-h-96 overflow-y-auto p-2">
          <Command.Empty className="p-4 text-sm text-gray-400">No results found.</Command.Empty>
          <Command.Group heading="Suggestions" className="p-2">
            <Command.Item className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-gray-800">
              <Search className="h-4 w-4" />
              Analyze website performance
            </Command.Item>
            <Command.Item className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-gray-800">
              <Search className="h-4 w-4" />
              Generate SEO recommendations
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </div>
  )
}

