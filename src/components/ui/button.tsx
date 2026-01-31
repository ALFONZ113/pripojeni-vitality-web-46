import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 touch-manipulation",
  {
    variants: {
      variant: {
        // Primary Gold CTA
        default: "bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(38,92%,50%,0.4)] hover:-translate-y-1 hover:scale-[1.02]",
        gold: "bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(38,92%,50%,0.5)] hover:-translate-y-1 hover:scale-[1.02]",
        
        // Noir Secondary
        noir: "bg-secondary text-foreground border border-border hover:bg-muted hover:-translate-y-1 hover:border-primary/30",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-muted hover:-translate-y-1 hover:border-primary/30",
        
        // Glass Effect
        glass: "bg-transparent backdrop-blur-xl border border-border/50 text-foreground hover:bg-secondary/40 hover:-translate-y-1",
        
        // Outline Variants
        outline: "border border-border bg-transparent text-foreground hover:bg-secondary hover:-translate-y-1 hover:border-primary/30",
        heroOutline: "border-2 border-primary/50 text-primary bg-transparent hover:bg-primary/10 hover:-translate-y-1",
        
        // Utility Variants
        ghost: "text-foreground hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-5 py-2.5 text-sm [&_svg]:size-4",
        sm: "h-9 px-4 text-xs rounded-md [&_svg]:size-3.5",
        lg: "h-12 px-8 text-base rounded-lg [&_svg]:size-5",
        xl: "h-14 px-10 text-lg font-semibold rounded-lg [&_svg]:size-5",
        icon: "h-11 w-11 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
