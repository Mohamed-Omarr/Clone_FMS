import type { UserCredentials } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Register a new user
export function handleRegister(email: string, password: string): boolean {
  if (!email || !password) return false;

  const existingUser = localStorage.getItem("user");
  if (existingUser) {
    console.warn("User already exists!");
    return false; // prevent duplicate registration
  }

  const user: UserCredentials = { email, password };
  localStorage.setItem("user", JSON.stringify(user));
  return true; // registration successful
}

// Login a user
export function handleLogin(email: string, password: string): boolean {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    console.error("No registered user found!");
    return false;
  }

  const user: UserCredentials = JSON.parse(storedUser);
  if (user.email === email && user.password === password) {
    localStorage.setItem("isLoggedIn", "true"); // optional flag
    return true; // login successful
  }

  return false; // credentials mismatch
}

