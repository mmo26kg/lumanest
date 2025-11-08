"use client";
import * as React from "react"
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const [scrollProgress, setScrollProgress] = React.useState(0); // Thêm state này
  const onScroll = React.useCallback((api) => {  // Thêm callback này
    if (!api) return;
    setScrollProgress(api.scrollProgress());  // Lấy progress từ 0-1
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }
  }, [scrollPrev, scrollNext])

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    api.on("scroll", onScroll); // Đăng ký sự kiện scroll

    return () => {
      api?.off("select", onSelect)
      api?.off("scroll", onScroll); // Hủy đăng ký sự kiện scroll
    };
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        scrollProgress, // Cung cấp scrollProgress trong context
      }}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}



function CarouselContent({
  className,
  overflow = "hidden",
  ...props
}) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className={cn(overflow === "hidden" ? "overflow-hidden" : "overflow-visible")}
      data-slot="carousel-content">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",

          className
        )}
        {...props} />
    </div>
  );
}

function CarouselItem({
  className,
  ...props
}) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props} />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(" group absolute hover:bg-secondary border-secondary size-8 rounded-full", orientation === "horizontal"
        ? "-bottom-24 right-1/2 mr-2"
        : "top-1/2 -left-16 -translate-y-1/2 rotate-90 mb-2", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}>
      <ArrowLeft className="text-secondary group-hover:text-secondary-foreground" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn("absolute size-8 hover:bg-secondary  border-secondary rounded-full group", orientation === "horizontal"
        ? "-bottom-24 left-1/2 ml-2"
        : "top-1/2 -left-16 translate-y-1/2 rotate-90 mt-2", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}>
      <ArrowRight className="text-secondary group-hover:text-secondary-foreground" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

function CarouselScrollBar({ className, ...props }) {
  const { orientation, scrollProgress, api, canScrollNext, canScrollPrev } = useCarousel();
  const trackRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const isHorizontal = orientation === "horizontal";

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = React.useCallback((event) => {
    if (!isDragging || !api || !trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const newProgress = isHorizontal
      ? Math.max(0, Math.min(1, (event.clientX - trackRect.left) / trackRect.width))
      : Math.max(0, Math.min(1, (event.clientY - trackRect.top) / trackRect.height));

    // Scroll carousel đến vị trí tương ứng
    const targetIndex = Math.round(newProgress * (api.scrollSnapList().length - 1));
    api.scrollTo(targetIndex);
  }, [isDragging, api, isHorizontal]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  // Setup/cleanup event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const progress = Math.max(0, Math.min(1, scrollProgress || 0));
  const thumbSize = isHorizontal ? "w-24 h-full" : "w-full h-24";
  const isShowScrollBar = canScrollNext || canScrollPrev;
  const thumbPosition = isHorizontal
    ? `calc(${progress * 100}% - ${progress * 6}rem)`
    : `calc(${progress * 100}% - ${progress * 6}rem)`;

  return (
    <div className={cn(orientation === "horizontal"
      ? "absolute -bottom-10 w-full pointer-events-auto"
      : "absolute top-0 right-0 h-full pointer-events-auto", !isShowScrollBar && "hidden")}>
      <div
        ref={trackRef}
        role="scrollbar"
        aria-label="Carousel scrollbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "relative bg-muted rounded-full overflow-visible cursor-pointer transition-all",
          isHorizontal ? "h-1 w-full" : "w-1 h-full",
          isHovering && (isHorizontal ? "h-2" : "w-2"),

          className
        )}
        onClick={(e) => {
          // Click vào track để jump
          if (!api || !trackRef.current) return;
          const trackRect = trackRef.current.getBoundingClientRect();
          const clickProgress = isHorizontal
            ? (e.clientX - trackRect.left) / trackRect.width
            : (e.clientY - trackRect.top) / trackRect.height;
          const targetIndex = Math.round(clickProgress * (api.scrollSnapList().length - 1));
          api.scrollTo(targetIndex);
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...props}
      >
        {/* Thumb */}
        <div
          className={cn(
            "absolute bg-primary rounded-full cursor-grab active:cursor-grabbing",
            isDragging && "scale-110 shadow-lg",
            thumbSize
          )}
          onMouseDown={handleMouseDown}
          style={isHorizontal
            ? { left: thumbPosition }
            : { top: thumbPosition }
          }
        />
      </div>
    </div>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselScrollBar };
