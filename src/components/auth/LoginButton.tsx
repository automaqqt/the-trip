"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have shadcn/ui Input
import { Label } from "@/components/ui/label";   // Assuming you have shadcn/ui Label
import { LogIn, LogOut, UserCircle, Loader2, UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; // npm install react-icons
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, // For form actions
} from "@/components/ui/dialog";
import React, { useState, FormEvent } from "react";

const LoginButton = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between Sign In and Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For sign up
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [open, setOpen] = useState(false); // Control dialog open state

  const handleCredentialsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (isSignUp) {
      // Handle Sign Up
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        setSuccess('Registration successful! Please sign in.');
        setIsSignUp(false); // Switch to sign-in form
      } catch (err: any) {
        setError(err.message || 'Registration failed.');
      }
    } else {
      // Handle Sign In
      const result = await signIn("credentials", {
        redirect: false, // Handle redirect manually or based on result
        email,
        password,
      });

      if (result?.error) {
        setError(result.error === "CredentialsSignin" ? "Invalid email or password." : result.error);
      } else if (result?.ok) {
        setOpen(false); // Close dialog on successful sign in
        // router.push('/dashboard'); // Or wherever you want to redirect
      }
    }
    setIsLoading(false);
  };

  if (status === "loading") {
    return (
      <Button variant="outline" size="sm" disabled className="min-w-[100px]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user?.image ? (
          <img src={session.user.image} alt={session.user.name || "User"} className="w-8 h-8 rounded-full border-2 border-primary" />
        ) : (
          <UserCircle className="w-7 h-7 text-primary" />
        )}
        <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-tripPink hover:text-tripPink/80 hover:bg-transparent">
          <LogOut className="mr-2 h-4 w-4" />
          Abmelden
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="bg-gradient-to-r from-tripPurple to-tripPink hover:opacity-90 transition-opacity text-white shadow-md hover:shadow-lg">
          <LogIn className="mr-2 h-4 w-4" />
          Anmelden
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-center text-primary">
            {isSignUp ? "Erstelle einen Account" : "Willkommen zu The Trip"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground pt-2">
            {isSignUp ? "Lass mal ne geile Party starten." : "Meld dich an um Bilder hochzuladen."}
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-sm text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded-md">{error}</p>}
        {success && <p className="text-sm text-center text-green-600 bg-green-100 dark:bg-green-900/30 p-2 rounded-md">{success}</p>}

        <form onSubmit={handleCredentialsSubmit} className="grid gap-4 py-4">
          {isSignUp && (
            <div className="grid gap-1.5">
              <Label htmlFor="name">Name (Optional)</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dein Name" />
            </div>
          )}
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (isSignUp ? <UserPlus className="mr-2 h-4 w-4"/> : <LogIn className="mr-2 h-4 w-4"/>)}
            {isSignUp ? "Registrieren" : "Anmelden"}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Oder nutze..</span>
          </div>
        </div>

        <div className="grid gap-3">
          <Button
            variant="outline"
            onClick={() => { setIsLoading(true); signIn("google", { callbackUrl: "/" }); }}
            disabled={isLoading}
            className="w-full group border-border hover:border-primary/70 transition-all"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FcGoogle className="mr-2 h-5 w-5" />}
            Google
          </Button>
          {/* Add other OAuth providers here if needed */}
        </div>

        <DialogFooter className="mt-4 sm:justify-center">
          <Button variant="link" onClick={() => { setIsSignUp(!isSignUp); setError(null); setSuccess(null); }} className="text-sm text-primary hover:text-primary/80">
            {isSignUp ? "Du hast schon einen Account? Melde dich an." : "Noch keinen Account? Registriere dich hier."}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;