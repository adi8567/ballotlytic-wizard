
import { useState, useEffect } from 'react';

interface FadeProps {
  duration?: number;
  delay?: number;
}

export function useFadeIn({ duration = 300, delay = 0 }: FadeProps = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const style = {
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${duration}ms ease-in-out`,
  };

  return { style, isVisible };
}

export function useStaggeredFadeIn(items: any[], baseDelay = 100) {
  return items.map((item, index) => ({
    ...item,
    fadeProps: useFadeIn({ delay: baseDelay * index }),
  }));
}

export function useSequenceAnimation(steps: number, delayBetweenSteps = 200) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, delayBetweenSteps);

    return () => clearTimeout(timer);
  }, [currentStep, steps, delayBetweenSteps]);

  const isStepVisible = (step: number) => currentStep >= step;

  return { currentStep, isStepVisible };
}

export const slideVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { x: -20, opacity: 0, transition: { duration: 0.2 } },
};

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const scaleVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
};
