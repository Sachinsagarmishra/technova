import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Cpu,
  FileUser,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import awsLogo from "@/assets/trusted-logos/aws.png";
import ciscoLogo from "@/assets/trusted-logos/cisco.png";
import dellLogo from "@/assets/trusted-logos/dell.png";
import googleLogo from "@/assets/trusted-logos/google.png";
import microsoftLogo from "@/assets/trusted-logos/microsoft.png";
import oracleLogo from "@/assets/trusted-logos/oracle.png";
import aiTalentIllustration from "../imges/AI-Talent-Solution.svg";
import contractStaffingIllustration from "../imges/Contract-Staffing.svg";
import forEmployersIllustration from "../imges/For-Employers.svg";
import forTalentIllustration from "../imges/For-Talent.svg";
import financialServicesIllustration from "../imges/Industries/Financial-Services.svg";
import governmentPublicSectorIllustration from "../imges/Industries/Government-Public-Sector.svg";
import healthcareIllustration from "../imges/Industries/Healthcare.svg";
import manufacturingIllustration from "../imges/Industries/Manufacturing.svg";
import retailEcommerceIllustration from "../imges/Industries/Retail-E-Commerce.svg";
import technologyIllustration from "../imges/Industries/Technology.svg";
import managedTeamsIllustration from "../imges/Managed-Teams .svg";
import technovaFavicon from "../imges/favicon.png";
import technovaLogo from "../imges/Technova Systems Logo final-13 1.svg";
import workforceConsultingIllustration from "../imges/Workforce-Consulting.svg";

const navLinks = [
  "Industries",
  "For Employers",
  "For Talent",
  "AI & Insights",
  "About Us",
];

const megaMenuDirections = [
  {
    title: "Hire high-impact talent",
    description: "Contract-to-hire, performance staffing and managed teams.",
    icon: BriefcaseBusiness,
    accent: "purple",
  },
  {
    title: "Accelerate AI delivery",
    description: "AI, ML, data and digital transformation expertise.",
    icon: BrainCircuit,
    accent: "blue",
  },
  {
    title: "Build leadership capacity",
    description: "Executive search for critical technology and business roles.",
    icon: UserRoundSearch,
    accent: "orange",
  },
];

const megaMenuSolutions = [
  { title: "AI Talent Solutions", description: "AI/ML, Data and Engineering talent", icon: BrainCircuit },
  { title: "Executive Search", description: "C-Suite to Director-level hiring", icon: UserRoundSearch },
  { title: "Workforce Consulting", description: "Strategic planning and team design", icon: UsersRound },
  { title: "Digital Transformation", description: "Modernization, automation and delivery", icon: Cpu },
  { title: "Contract Staffing", description: "Flexible teams for fast-moving needs", icon: FileUser },
  { title: "Managed Teams", description: "Dedicated delivery pods built around outcomes", icon: BadgeCheck },
];

const headlineParts = [
  { text: "We Build ", accent: false },
  { text: "High-Performance", accent: true },
  { text: " Teams That Drive ", accent: false },
  { text: "What's Next", accent: true },
];

type WavePart = {
  text: string;
  accent?: boolean;
};

const headlineText = headlineParts.map((part) => part.text).join("");

function WaveLetters({ parts }: { parts: WavePart[] }) {
  let waveIndex = 0;

  return (
    <span aria-hidden="true">
      {parts.map((part, partIndex) => (
        <span
          key={`${part.text}-${partIndex}`}
          className={part.accent ? "text-[#F59E0B]" : undefined}
        >
          {Array.from(part.text).map((letter, index) => {
            const currentIndex = letter.trim() ? waveIndex++ : waveIndex;

            return (
              <span
                key={`${partIndex}-${index}`}
                className="wave-letter"
                style={{ animationDelay: `${currentIndex * 0.035}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

const trustedLogos = [
  // { name: "Microsoft", src: microsoftLogo },
  // { name: "AWS", src: awsLogo },
  { name: "Google", src: googleLogo },
  // { name: "Oracle", src: oracleLogo },
  { name: "Dell Technologies", src: dellLogo },
  { name: "Cisco", src: ciscoLogo },
];

const employerBenefits = [
  "Contract-to-Hire & Performance Staffing",
  "Executive Search & leadership hiring",
  "AI & Digital Transformation Consulting",
  "Managed Teams & Project Solutions",
];

const talentBenefits = [
  "Top Tech & AI Opportunities",
  "Career Growth & Upskilling",
  "Work with Innovative Teams",
  "Nationwide & Remote Roles",
];

const capabilityCards = [
  {
    title: "AI Talent Solutions",
    description: "Find and engage top AI/ML, Data & Engineering talent fast.",
    icon: BrainCircuit,
    color: "blue",
    visual: "orb",
    illustration: aiTalentIllustration,
    featured: true,
  },
  {
    title: "Executive Search",
    description: "C-Suite to Director level hiring for critical leadership roles.",
    icon: UserRoundSearch,
    color: "orange",
    visual: "mini-building",
  },
  {
    title: "Workforce Consulting",
    description: "Strategic workforce planning aligned with your business goals.",
    icon: UsersRound,
    color: "mint",
    visual: "cubes",
    illustration: workforceConsultingIllustration,
    tall: true,
  },
  {
    title: "Contract Staffing",
    description: "Flexible staffing models to meet dynamic business needs.",
    icon: FileUser,
    color: "coral",
    visual: "platform",
    illustration: contractStaffingIllustration,
  },
  {
    title: "Digital Transformation",
    description: "Modernize your business with technology, data and automation.",
    icon: Cpu,
    color: "blue",
  },
  {
    title: "Managed Teams",
    description: "Build high-performing teams dedicated to your success.",
    icon: UsersRound,
    color: "purple",
    visual: "chart",
    illustration: managedTeamsIllustration,
  },
];

const industryCards = [
  {
    title: "Technology",
    description: "Powering innovation with world-class tech talent and solutions.",
    visual: "technology",
    illustration: technologyIllustration,
  },
  {
    title: "Healthcare",
    description: "Enhancing care through technology, data and specialized talent.",
    visual: "healthcare",
    illustration: healthcareIllustration,
  },
  {
    title: "Financial Services",
    description: "Driving growth with secure, compliant and future-ready solutions.",
    visual: "financial",
    illustration: financialServicesIllustration,
  },
  {
    title: "Manufacturing",
    description: "Building resilient operations with engineering and tech excellence.",
    visual: "manufacturing",
    illustration: manufacturingIllustration,
  },
  {
    title: "Retail & E-Commerce",
    description: "Scaling customer experiences with data, technology and agility.",
    visual: "retail",
    illustration: retailEcommerceIllustration,
  },
  {
    title: "Government & Public Sector",
    description: "Delivering impact through technology, security and skilled professionals.",
    visual: "government",
    illustration: governmentPublicSectorIllustration,
  },
];

function App() {
  useEffect(() => {
    const revealItems = document.querySelectorAll(".scroll-reveal-section, .scroll-reveal-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#f2f5f9] font-body text-foreground">
      <section className="relative min-h-screen overflow-hidden bg-background">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <nav className="relative z-[100] mx-auto flex max-w-7xl flex-row items-center justify-between px-8 py-6">
          <a
            href="#"
            className="font-display text-3xl font-normal tracking-tight text-foreground"
            aria-label="Technova Systems home"
          >
            <img
              src={technovaLogo}
              alt="Technova Systems"
              className="h-12 w-auto"
            />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <div className="mega-menu-wrap">
              <a
                href="#"
                className="mega-menu-trigger text-sm text-foreground transition-colors"
              >
                Solutions
                <span aria-hidden="true">⌄</span>
              </a>

              <div className="mega-menu-panel" role="menu">
                <div className="mega-menu-feature">
                  <div className="mega-menu-feature-badge">
                    <img src={technovaFavicon} alt="" />
                  </div>
                  <p className="mega-menu-eyebrow">Technova Systems</p>
                  <h2>Future-ready teams, delivered with intelligence.</h2>
                  <p>
                    Talent solutions and technology consulting for organizations
                    building what comes next.
                  </p>
                  <a className="mega-menu-feature-link" href="#">
                    Explore solutions
                    <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} />
                  </a>
                </div>

                <div className="mega-menu-directions">
                  {megaMenuDirections.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        href="#"
                        className={`mega-menu-direction mega-menu-direction-${item.accent}`}
                        key={item.title}
                      >
                        <span>
                          <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                        </span>
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                      </a>
                    );
                  })}
                </div>

                <div className="mega-menu-solutions">
                  <p className="mega-menu-section-label">Core Capabilities</p>
                  <div className="mega-menu-solution-grid">
                    {megaMenuSolutions.map((item) => {
                      const Icon = item.icon;

                      return (
                        <a className="mega-menu-solution" href="#" key={item.title}>
                          <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                          <span>
                            <strong>{item.title}</strong>
                            <small>{item.description}</small>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>

          <Button variant="glass" size="nav">
            Let's Talk
          </Button>
        </nav>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-[90px] pb-40 pt-32 text-center">
          <h1
            className="wave-heading animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-foreground sm:text-7xl md:text-8xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            aria-label={headlineText}
          >
            <WaveLetters parts={headlineParts} />
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
            AI-powered talent solutions and technology consulting that help
            organizations innovate, scale and lead in a digital-first world.
          </p>

          <Button
            variant="glass"
            size="hero"
            className="animate-fade-rise-delay-2 mt-12 cursor-pointer"
          >
            Hire Top Talent
          </Button>
        </div>
      </section>

      <section className="scroll-reveal-section overflow-hidden bg-white py-10 text-[#0b132b] sm:py-12">
        <h2
          className="wave-heading font-display mx-auto max-w-4xl text-center text-4xl font-normal leading-none text-[#0b132b] sm:text-5xl"
          aria-label="Trusted by innovators worldwide"
        >
          <WaveLetters parts={[{ text: "Trusted by innovators worldwide" }]} />
        </h2>

        <div className="logo-marquee mt-9" aria-label="Trusted companies">
          <div className="logo-marquee-track">
            {[0, 1].map((groupIndex) => (
              <div className="logo-marquee-group" key={groupIndex}>
                {trustedLogos.map((logo) => (
                  <div
                    className="logo-marquee-item"
                    key={`${logo.name}-${groupIndex}`}
                  >
                    <img src={logo.src} alt={logo.name} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-reveal-section bg-white px-4 py-10 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="opportunity-grid mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-2">
          <article className="scroll-reveal-card opportunity-card opportunity-card-employers">
            <div className="opportunity-content">
              <p className="section-kicker text-[#8B5CF6]">For Employers</p>
              <h2
                className="wave-heading font-display mt-5 max-w-md text-4xl font-normal leading-[0.95] sm:text-5xl"
                aria-label="Build. Scale. Succeed."
              >
                <WaveLetters parts={[{ text: "Build. Scale. Succeed." }]} />
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-[#475569] sm:text-lg">
                Access specialized talent, consulting expertise, and workforce
                solutions that drive real business impact.
              </p>

              <div className="mt-8 grid max-w-2xl gap-y-2">
                {employerBenefits.map((benefit) => (
                  <div className="benefit-row" key={benefit}>
                    <span className="benefit-check benefit-check-purple">
                      <Check aria-hidden="true" size={13} strokeWidth={3} />
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="opportunity-visual" aria-hidden="true">
              <div className="building-illustration">
                <img src={forEmployersIllustration} alt="" />
              </div>
            </div>
          </article>

          <article className="scroll-reveal-card opportunity-card opportunity-card-talent">
            <div className="opportunity-content">
              <p className="section-kicker text-[#F59E0B]">For Talent</p>
              <h2
                className="wave-heading font-display mt-5 max-w-lg text-4xl font-normal leading-[0.95] sm:text-5xl"
                aria-label="Your Next Move Starts Here."
              >
                <WaveLetters parts={[{ text: "Your Next Move Starts Here." }]} />
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-[#475569] sm:text-lg">
                Explore high-impact opportunities with forward-thinking
                companies and accelerate your career.
              </p>

              <div className="mt-8 grid max-w-2xl gap-y-2">
                {talentBenefits.map((benefit) => (
                  <div className="benefit-row" key={benefit}>
                    <span className="benefit-check benefit-check-orange">
                      <Check aria-hidden="true" size={13} strokeWidth={3} />
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="opportunity-visual" aria-hidden="true">
              <div className="stairs-illustration">
                <img src={forTalentIllustration} alt="" />
              </div>
            </div>
          </article>

          <div className="opportunity-brand-badge" aria-hidden="true">
            <img src={technovaFavicon} alt="" />
          </div>
        </div>
      </section>

      <section className="scroll-reveal-section capabilities-section bg-white px-4 py-16 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="section-kicker text-[#8B5CF6]">
              Our Core Capabilities
            </p>
            <h2
              className="wave-heading font-display mx-auto mt-4 max-w-5xl text-4xl font-normal leading-none sm:text-5xl"
              aria-label="End-to-End Talent & Technology Solutions"
            >
              <WaveLetters
                parts={[{ text: "End-to-End Talent & Technology Solutions" }]}
              />
            </h2>
          </div>

          <div className="capabilities-grid mt-10">
            {capabilityCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  className={[
                    "scroll-reveal-card",
                    "capability-card",
                    card.featured ? "capability-card-featured" : "",
                    card.tall ? "capability-card-tall" : "",
                    card.visual ? `capability-card-${card.visual}` : "",
                    `capability-card-${card.color}`,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={card.title}
                >
                  <div className="capability-card-copy">
                    <Icon className="capability-icon" aria-hidden="true" />
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>

                  <button
                    className="capability-arrow"
                    type="button"
                    aria-label={`Explore ${card.title}`}
                  >
                    <ArrowRight aria-hidden="true" size={22} strokeWidth={2.2} />
                  </button>

                  {card.illustration && (
                    <div
                      className={`capability-asset-illustration capability-asset-${card.visual}`}
                      aria-hidden="true"
                    >
                      <img src={card.illustration} alt="" />
                    </div>
                  )}

                  {!card.illustration && card.visual === "orb" && (
                    <div className="capability-orb" aria-hidden="true">
                      <span className="orb-core" />
                      <span className="orb-ring orb-ring-1" />
                      <span className="orb-ring orb-ring-2" />
                      <span className="orb-dot orb-dot-1" />
                      <span className="orb-dot orb-dot-2" />
                      <span className="orb-dot orb-dot-3" />
                    </div>
                  )}

                  {!card.illustration && card.visual === "mini-building" && (
                    <div className="capability-mini-building" aria-hidden="true">
                      <span className="mini-building-block mini-building-block-1" />
                      <span className="mini-building-block mini-building-block-2" />
                      <span className="mini-building-block mini-building-block-3" />
                    </div>
                  )}

                  {!card.illustration && card.visual === "cubes" && (
                    <div className="capability-cubes" aria-hidden="true">
                      <span className="cube cube-1" />
                      <span className="cube cube-2" />
                      <span className="cube cube-3" />
                      <span className="cube cube-4" />
                      <span className="cube cube-5" />
                    </div>
                  )}

                  {!card.illustration && card.visual === "platform" && (
                    <div className="capability-platform" aria-hidden="true">
                      <span className="platform-layer platform-layer-1" />
                      <span className="platform-layer platform-layer-2" />
                      <span className="platform-layer platform-layer-3" />
                      <span className="platform-bar platform-bar-1" />
                      <span className="platform-bar platform-bar-2" />
                      <span className="platform-bar platform-bar-3" />
                    </div>
                  )}

                  {!card.illustration && card.visual === "chart" && (
                    <div className="capability-chart" aria-hidden="true">
                      <span className="chart-line" />
                      <span className="chart-dot chart-dot-1" />
                      <span className="chart-dot chart-dot-2" />
                      <span className="chart-dot chart-dot-3" />
                      <span className="chart-dot chart-dot-4" />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="scroll-reveal-section industries-section px-4 py-14 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="industries-panel mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="section-kicker text-[#8B5CF6]">
              Industries We Support
            </p>
            <h2
              className="wave-heading font-display mx-auto mt-4 max-w-5xl text-4xl font-normal leading-none sm:text-5xl"
              aria-label="Strong Partnerships Across Every Industry"
            >
              <WaveLetters
                parts={[{ text: "Strong Partnerships Across Every Industry" }]}
              />
            </h2>
          </div>

          <div className="industries-row mt-8">
            {industryCards.map((card) => {
              return (
                <article
                  className="scroll-reveal-card industry-card"
                  key={card.title}
                >
                  <div className={`industry-visual industry-visual-${card.visual}`} aria-hidden="true">
                    <img src={card.illustration} alt="" />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <button
                    className="industry-card-arrow"
                    type="button"
                    aria-label={`Explore ${card.title}`}
                  >
                    <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
