"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const onboardingSlides = [
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    title: "Capture daily health with ease",
    description: "Snap meals, medication, or symptoms in seconds, and build a simple visual record of the moments that shape your health every day.",
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Get clarity when it matters",
    description: "From symptoms to daily routines, Panacea AI offers instant, thoughtful guidance whenever something feels uncertain.",
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Stay ahead of what matters",
    description: "Follow changes over time and receive early alerts when your condition may need closer attention, so you can act with confidence.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleGetStarted = () => {
    setShowOnboarding(true);
  };

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push("/onboarding");
    }
  };

  const handleSkip = () => {
    router.push("/onboarding");
  };

  // Onboarding intro screens
  if (showOnboarding) {
    const slide = onboardingSlides[currentSlide];
    const isLast = currentSlide === onboardingSlides.length - 1;

    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        {/* Skip button */}
        <div className="flex justify-end px-6 pt-6">
          <button
            onClick={handleSkip}
            className="text-body-sm text-deep-400 hover:text-deep-600 font-medium px-3 py-2 rounded-xl transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Slide content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white to-primary-50 flex items-center justify-center mb-8"
            style={{ boxShadow: "0 0 0 10px rgba(255,255,255,0.8), 0 0 50px rgba(56,192,200,0.4), 0 6px 20px rgba(0,0,0,0.08)" }}
          >
            {slide.icon}
          </div>
          <h2 className="text-heading-1 text-deep-800 text-center mb-4 max-w-sm">
            {slide.title}
          </h2>
          <p className="text-body text-deep-400 text-center max-w-sm leading-relaxed">
            {slide.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="px-8 pb-12">
          {/* Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingSlides.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === currentSlide
                    ? "w-8 bg-gradient-to-r from-primary-400 to-primary-500"
                    : "w-2 bg-deep-200"
                )}
              />
            ))}
          </div>
          <Button fullWidth size="lg" onClick={handleNext}>
            {isLast ? "Get Started" : "Next"}
          </Button>
        </div>
      </div>
    );
  }

  // Splash / landing page
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/panacea-icon.png"
            alt="Panacea"
            width={140}
            height={140}
            priority
            className="object-contain"
          />
          <span
            className="font-medium leading-none text-primary-500"
            style={{ fontSize: "2.6rem" }}
          >
            panacea
          </span>
        </div>

        {/* Tagline */}
        <p className="text-body-lg text-deep-400 text-center max-w-xs leading-relaxed">
          One tap closes the care gap.
        </p>

        {/* CTA */}
        <div className="w-full flex flex-col gap-4">
          <Button
            fullWidth
            size="lg"
            onClick={handleGetStarted}
            aria-label="Get Started"
          >
            Get Started
          </Button>
          <Button
            fullWidth
            size="lg"
            variant="secondary"
            onClick={() => router.push("/onboarding")}
            aria-label="I already have an account"
          >
            I already have an account
          </Button>
        </div>

        {/* Trust note */}
        <p className="text-body-sm text-deep-300 text-center max-w-xs leading-relaxed">
          Simple health logging for continuous care between visits.
        </p>
      </div>
    </div>
  );
}
