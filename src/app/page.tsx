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
    title: "Record your health, day by day",
    description: "Snap a photo of your medication, meals, or symptoms. Panacea makes it easy to keep a visual health diary without extra effort.",
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Track what matters between visits",
    description: "Monitor symptoms, medication, and lifestyle changes so you and your doctor always have the full picture.",
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Continuous, personal care",
    description: "Health management does not stop at the clinic door. Panacea bridges the gap so every day counts toward feeling better.",
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
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-100 to-pastel-cyan flex items-center justify-center mb-8 shadow-glow">
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
        <div className="flex flex-col items-center gap-2">
          <div className="glow-soft rounded-full p-2">
            <Image
              src="/panacea-logo.svg"
              alt="Panacea"
              width={160}
              height={192}
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Tagline */}
        <p className="text-body-lg text-deep-400 text-center max-w-xs leading-relaxed">
          Continuous care, between visits
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
          Simple health logging that helps you and your doctor stay connected between clinic visits.
        </p>
      </div>
    </div>
  );
}
