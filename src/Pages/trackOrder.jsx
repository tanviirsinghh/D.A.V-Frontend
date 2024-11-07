"use client"

import { useState } from "react"
import { Check, Clock } from "lucide-react"

export default function Component() {
  const stages = ["Approval", "Block  Incharge", "Manufacturing", "Dispatched"]

  const [clients] = useState([
    { id: "1", name: "Alice Johnson", currentStage: 2 },
    { id: "2", name: "Bob Smith", currentStage: 1 },
    { id: "3", name: "Charlie Brown", currentStage: 3 },
    { id: "4", name: "Diana Prince", currentStage: 0 },
  ])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Order Process Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">{client.name}</h2>
            </div>
            <div className="p-4">
              <div className="space-y-6">
                {stages.map((stage, index) => (
                  <div key={`${client.id}-${stage}`} className="relative">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center">
                        {index < client.currentStage ? (
                          <div className="rounded-full bg-green-500 p-2">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        ) : index === client.currentStage ? (
                          <div className="rounded-full bg-blue-500 p-2">
                            <Clock className="h-4 w-4 text-white animate-pulse" />
                          </div>
                        ) : (
                          <div className="rounded-full border-2 border-gray-300 p-2">
                            <div className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{stage}</h3>
                        <p className="text-sm text-gray-600">
                          {index < client.currentStage
                            ? "Completed"
                            : index === client.currentStage
                              ? "In Progress"
                              : "Pending"}
                        </p>
                      </div>
                    </div>
                    {index < stages.length - 1 && (
                      <div className="absolute left-[1.3125rem] top-[2.875rem] h-[calc(100%+1rem)] w-px bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}