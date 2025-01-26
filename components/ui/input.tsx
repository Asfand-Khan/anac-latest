import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-[#e5e7eb] bg-transparent px-3 py-1 text-xs font-normal shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-charcoal placeholder:text-charcoal placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
