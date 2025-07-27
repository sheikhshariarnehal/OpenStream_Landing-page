"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface AccessCodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AccessCodeDialog({ open, onOpenChange, onSuccess }: AccessCodeDialogProps) {
  const [code, setCode] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!code.trim()) {
      setError("Please enter an access code")
      return
    }

    setIsValidating(true)
    setError("")

    try {
      const response = await fetch('/api/access-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'validate',
          code: code.trim()
        })
      })

      const data = await response.json()

      if (data.valid) {
        toast.success("Access code validated successfully!")
        onSuccess()
        onOpenChange(false)
        setCode("")
        setError("")
      } else {
        setError(data.error || "Invalid access code")
        toast.error(data.error || "Invalid access code")
      }
    } catch (error) {
      console.error('Validation error:', error)
      setError("Failed to validate access code. Please try again.")
      toast.error("Failed to validate access code. Please try again.")
    } finally {
      setIsValidating(false)
    }
  }

  const handleClose = () => {
    setCode("")
    setError("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Secure Server Connection
          </DialogTitle>
          <DialogDescription>
            Enter your temporary access code to connect to the premium content servers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="access-code">Access Code</Label>
            <Input
              id="access-code"
              type="text"
              placeholder="Enter 8-character code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase())
                setError("")
              }}
              maxLength={8}
              className="text-center text-lg font-mono tracking-wider"
              disabled={isValidating}
              autoFocus
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={isValidating || !code.trim()}
              className="w-full"
            >
              {isValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Connect Server
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isValidating}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </form>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>• Access codes expire after 10 minutes</p>
          <p>• Contact your administrator for a new code</p>
          <p>• Codes are case-insensitive</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
