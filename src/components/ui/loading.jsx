import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loadingVariants = cva("inline-flex items-center justify-center", {
    variants: {
        variant: {
            spinner: "animate-spin",
            dots: "space-x-1",
            pulse: "animate-pulse",
            bars: "space-x-1",
            wave: "space-x-1",
            orbit: "relative",
            flip: "",
            morph: "animate-morph",
            glow: "animate-glow",
            ripple: "relative",
        },
        size: {
            sm: "w-4 h-4",
            md: "w-6 h-6",
            lg: "w-8 h-8",
            xl: "w-12 h-12",
        },
    },
    defaultVariants: {
        variant: "spinner",
        size: "md",
    },
});

// export interface LoadingProps
//     extends React.HTMLAttributes,
//     VariantProps {
//     text?: string;
// }
// export 

const Loading = React.forwardRef(
    ({ className, variant, size, text = "Processing", ...props }, ref) => {
        const renderContent = () => {
            switch (variant) {
                case "spinner":
                    return (
                        <svg
                            className={cn(loadingVariants({ size }), "text-primary")}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    );
                case "dots":
                    const dotSize =
                        size === "sm" ? "w-1.5 h-1.5" : size === "lg" ? "w-3 h-3" : size === "xl" ? "w-4 h-4" : "w-2 h-2";
                    return (
                        <div className={cn(loadingVariants({ variant, className }))}>
                            <div className={cn(dotSize, "bg-primary rounded-full animate-bounce")} style={{ animationDelay: "0ms" }} />
                            <div className={cn(dotSize, "bg-primary rounded-full animate-bounce")} style={{ animationDelay: "150ms" }} />
                            <div className={cn(dotSize, "bg-primary rounded-full animate-bounce")} style={{ animationDelay: "300ms" }} />
                        </div>
                    );
                case "pulse":
                    return (
                        <div className={cn(loadingVariants({ size }), "bg-primary rounded-full", className)} />
                    );
                case "bars":
                    const barWidth =
                        size === "sm" ? "w-1" : size === "lg" ? "w-1.5" : size === "xl" ? "w-2" : "w-1";
                    const barHeight =
                        size === "sm" ? "h-4" : size === "lg" ? "h-8" : size === "xl" ? "h-12" : "h-6";
                    return (
                        <div className={cn(loadingVariants({ variant, className }))}>
                            <div className={cn(barWidth, barHeight, "bg-primary rounded-full animate-pulse")} style={{ animationDelay: "0ms" }} />
                            <div className={cn(barWidth, barHeight, "bg-primary rounded-full animate-pulse")} style={{ animationDelay: "150ms" }} />
                            <div className={cn(barWidth, barHeight, "bg-primary rounded-full animate-pulse")} style={{ animationDelay: "300ms" }} />
                        </div>
                    );
                case "wave":
                    const waveWidth =
                        size === "sm" ? "w-1" : size === "lg" ? "w-1.5" : size === "xl" ? "w-2" : "w-1";
                    const waveHeight =
                        size === "sm" ? "h-4" : size === "lg" ? "h-8" : size === "xl" ? "h-12" : "h-6";
                    return (
                        <div className={cn(loadingVariants({ variant, className }))}>
                            <div className={cn(waveWidth, waveHeight, "bg-primary rounded-full animate-wave origin-bottom")} style={{ animationDelay: "0ms" }} />
                            <div className={cn(waveWidth, waveHeight, "bg-primary rounded-full animate-wave origin-bottom")} style={{ animationDelay: "150ms" }} />
                            <div className={cn(waveWidth, waveHeight, "bg-primary rounded-full animate-wave origin-bottom")} style={{ animationDelay: "300ms" }} />
                            <div className={cn(waveWidth, waveHeight, "bg-primary rounded-full animate-wave origin-bottom")} style={{ animationDelay: "450ms" }} />
                        </div>
                    );
                case "orbit":
                    const orbitSize =
                        size === "sm" ? "w-12 h-12" : size === "lg" ? "w-20 h-20" : size === "xl" ? "w-28 h-28" : "w-16 h-16";
                    const planetSize =
                        size === "sm" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : size === "xl" ? "w-4 h-4" : "w-2.5 h-2.5";
                    return (
                        <div className={cn(orbitSize, "relative")}>
                            <div className={cn(planetSize, "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full animate-orbit")} />
                            <div className={cn(planetSize, "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/60 rounded-full animate-orbit")} style={{ animationDelay: "0.5s" }} />
                        </div>
                    );
                case "flip":
                    const flipSize =
                        size === "sm" ? "w-4 h-4" : size === "lg" ? "w-8 h-8" : size === "xl" ? "w-12 h-12" : "w-6 h-6";
                    return (
                        <div className={cn(flipSize, "bg-primary rounded-md animate-flip")} style={{ transformStyle: "preserve-3d" }} />
                    );
                case "morph":
                    return (
                        <div className={cn(loadingVariants({ size }), "bg-primary", className)} />
                    );
                case "glow":
                    return (
                        <div className={cn(loadingVariants({ size }), "bg-primary rounded-full", className)} />
                    );
                case "ripple":
                    const rippleSize =
                        size === "sm" ? "w-12 h-12" : size === "lg" ? "w-20 h-20" : size === "xl" ? "w-28 h-28" : "w-16 h-16";
                    const innerSize =
                        size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : size === "xl" ? "w-7 h-7" : "w-4 h-4";
                    return (
                        <div className={cn(rippleSize, "relative flex items-center justify-center")}>
                            <div className={cn(innerSize, "absolute rounded-full border-2 border-primary animate-ripple")} />
                            <div className={cn(innerSize, "absolute rounded-full border-2 border-primary animate-ripple")} style={{ animationDelay: "0.5s" }} />
                            <div className={cn(innerSize, "bg-primary rounded-full")} />
                        </div>
                    );
                default:
                    return null;
            }
        };

        return (
            <div
                ref={ref}
                className={cn("flex flex-col items-center justify-center gap-2", className)}
                role="status"
                aria-label="Loading"
                {...props}
            >
                {renderContent()}
                {text && <p className="text-sm text-muted-foreground">{text}</p>}
            </div>
        );
    }
);

Loading.displayName = "Loading";

export { Loading, loadingVariants };
