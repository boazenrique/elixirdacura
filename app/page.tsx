import { HeroSection } from "@/components/hero-section";
import { NatureSection } from "@/components/nature-section";
import { ExpertSection } from "@/components/expert-section";
import { LearnSection } from "@/components/learn-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { BonusSection } from "@/components/bonus-section";
import { PricingSection } from "@/components/pricing-section";
import { GuaranteeSection } from "@/components/guarantee-section";
import { ExpertSection2 } from "@/components/expert-section-2";
import { FaqSection } from "@/components/faq-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <NatureSection />
      <ExpertSection />
      <LearnSection />
      <TestimonialsSection />
      <BonusSection />
      <PricingSection />
      <GuaranteeSection />
      <ExpertSection2 />
      <FaqSection />
    </main>
  );
}
