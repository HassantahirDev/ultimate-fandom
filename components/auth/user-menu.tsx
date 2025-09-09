"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, LogOut } from "lucide-react"
import { SignInModal } from "./sign-in-modal"
import { toast } from "sonner"

export function UserMenu() {
  // Placeholder state - no real session management
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data for when "signed in"
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    image: ""
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    toast.success("Signed out successfully")
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <User className="h-5 w-5" />
      </Button>
    )
  }

  if (!isSignedIn) {
    return (
      <>
        <Button variant="ghost" size="sm" onClick={() => setShowSignInModal(true)}>
          <User className="h-5 w-5" />
          <span className="hidden md:inline ml-2">Sign in</span>
        </Button>
        <SignInModal 
          open={showSignInModal} 
          onOpenChange={(open) => {
            setShowSignInModal(open)
            // Simulate sign in for demo purposes
            if (!open && showSignInModal) {
              setTimeout(() => {
                setIsSignedIn(true)
                toast.success("Signed in successfully (demo mode)")
              }, 1000)
            }
          }} 
        />
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Avatar className="h-6 w-6">
            <AvatarImage src={mockUser.image} alt={mockUser.name} />
            <AvatarFallback>{mockUser.name?.charAt(0) || mockUser.email?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline ml-2">{mockUser.name || "Account"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {mockUser.name && <p className="font-medium">{mockUser.name}</p>}
            {mockUser.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">{mockUser.email}</p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 