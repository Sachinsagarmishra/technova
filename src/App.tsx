import { useEffect, useState, useRef } from "react";
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
  Building2,
  Users,
  Clock,
  ShieldCheck,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
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
import darkLogo from "../imges/darklogo.svg";
import workforceConsultingIllustration from "../imges/Workforce-Consulting.svg";
import aiPoweredVideo from "../imges/AI-Powered.mp4";
import futureOfWorkAiThumbnail from "../imges/future-of-work-ai.png";
import techSkills2026Thumbnail from "../imges/tech-skills-2026.png";
import aiStaffingTrendsThumbnail from "../imges/ai-staffing-trends.png";

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

const insightArticles = [
  {
    title: "The Future of Work in the Age of AI",
    thumbnail: futureOfWorkAiThumbnail,
    link: "#",
  },
  {
    title: "Top 10 In-Demand Tech skills in 2026",
    thumbnail: techSkills2026Thumbnail,
    link: "#",
  },
  {
    title: "AI in Staffing: Trends Shaping the Industry",
    thumbnail: aiStaffingTrendsThumbnail,
    link: "#",
  },
];

function Counter({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = value;
          const totalMiliseconds = duration;
          const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
          
          const timer = setInterval(() => {
            start += Math.ceil(end / (totalMiliseconds / incrementTime));
            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(start);
            }
          }, incrementTime);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

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
            className="wave-heading animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-foreground sm:text-7xl md:text-[85px]"
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

      <section className="scroll-reveal-section w-full bg-white grid grid-cols-1 lg:grid-cols-12 text-[#0b132b]">
        {/* Left Panel */}
        <div className="relative overflow-hidden lg:col-span-5 bg-[#001726] text-white p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-between min-h-[500px]">
          {/* Background Video */}
          <video
            className="absolute inset-0 h-full w-full object-cover z-0 mix-blend-screen object-right"
            src={aiPoweredVideo}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001726]/80 via-transparent to-[#001726]/95 z-[1]" />
          
          {/* Content Wrapper aligned to the right inside the left column */}
          <div className="relative z-10 flex flex-col h-full justify-between gap-12 w-full max-w-[480px] lg:ml-auto">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
                AI & Technology Leadership
              </p>
              <h3 
                className="wave-heading font-display mt-5 text-4xl sm:text-5xl font-normal leading-[1.05] tracking-tight"
                aria-label="AI-Powered. Human-Led. Future-Ready"
              >
                <WaveLetters parts={[{ text: "AI-Powered." }]} /> <br />
                <WaveLetters parts={[{ text: "Human-Led." }]} /> <br />
                <WaveLetters parts={[{ text: "Future-Ready" }]} />
              </h3>
              <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[320px]">
                We combine the power of AI with human expertise to deliver scaling, hiring, deeper insights and better outcomes.
              </p>
            </div>
            <div className="mt-auto">
              <Button variant="glass" size="cta" className="transition-all hover:scale-[1.02] border border-white/20">
                Explore AI Solutions
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center bg-white">
          {/* Content Wrapper aligned to the left inside the right column */}
          <div className="w-full max-w-[720px] lg:mr-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left col of right panel: description */}
              <div className="md:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#0e2a90]">
                    Insights & Resources
                  </p>
                  <h3 
                    className="wave-heading font-display mt-5 text-3xl sm:text-4xl font-normal leading-tight text-[#001726]"
                    aria-label="Insights That Drive What's Next"
                  >
                    <WaveLetters parts={[{ text: "Insights That" }]} /> <br />
                    <WaveLetters parts={[{ text: "Drive What's Next" }]} />
                  </h3>
                  <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                    Stay ahead with the latest trends, reports and expert perspectives.
                  </p>
                </div>
                <div className="mt-8">
                  <Button variant="glass-dark" size="cta" className="transition-all hover:scale-[1.02]">
                    View All Insights
                  </Button>
                </div>
              </div>

              {/* Right col of right panel: blog items */}
              <div className="md:col-span-7 flex flex-col gap-6">
                {insightArticles.map((article, index) => (
                  <a 
                    href={article.link} 
                    key={index} 
                    className="group flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-all duration-300"
                  >
                    <div className="w-24 h-16 sm:w-28 sm:h-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-100">
                      <img 
                        src={article.thumbnail} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <div className="flex flex-col justify-center h-full">
                      <h4 className="font-semibold text-sm sm:text-base text-slate-900 line-clamp-2 group-hover:text-[#0e2a90] transition-colors leading-snug">
                        {article.title}
                      </h4>
                      <span className="inline-flex items-center text-xs font-semibold text-[#0e2a90] mt-2 group-hover:underline">
                        Read More <ArrowRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Numbers Impact Section */}
      <section className="scroll-reveal-section bg-white px-4 py-10 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-3xl border border-violet-100/80 bg-gradient-to-r from-violet-50 via-indigo-50/50 to-purple-50 p-8 sm:p-12 shadow-[0_15px_40px_rgba(139,92,246,0.03)] relative">
          <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none z-0" />
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5CF6]">
              Our Impact in Numbers
            </span>
            
            <div className="mt-10 grid w-full grid-cols-2 gap-8 md:grid-cols-4 md:gap-4 lg:gap-8">
              {/* Stat 1 */}
              <div className="flex items-center gap-4 pl-2 md:pl-4 border-l border-slate-200/60 first:border-0 md:first:border-0">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#8B5CF6] shadow-md shadow-indigo-100/50">
                  <Building2 size={24} />
                </div>
                <div>
                  <div className="text-3xl font-semibold sm:text-4xl text-slate-800 tracking-tight">
                    <Counter value={500} suffix="+" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                    Enterprise Clients
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-4 pl-2 md:pl-4 border-l border-slate-200/60">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#8B5CF6] shadow-md shadow-indigo-100/50">
                  <Users size={24} />
                </div>
                <div>
                  <div className="text-3xl font-semibold sm:text-4xl text-slate-800 tracking-tight">
                    <Counter value={1000} suffix="+" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                    Successful Placements
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-4 pl-2 md:pl-4 border-l border-slate-200/60">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#8B5CF6] shadow-md shadow-indigo-100/50">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="text-3xl font-semibold sm:text-4xl text-slate-800 tracking-tight">
                    <Counter value={48} suffix="H" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                    Average Shortlisting Time
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-4 pl-2 md:pl-4 border-l border-slate-200/60">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#8B5CF6] shadow-md shadow-indigo-100/50">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="text-3xl font-semibold sm:text-4xl text-slate-800 tracking-tight">
                    <Counter value={95} suffix="%" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                    Client Retention Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="scroll-reveal-section bg-white px-4 py-8 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-3xl border border-orange-100/70 bg-gradient-to-r from-orange-50/70 via-rose-50/50 to-orange-50/40 p-8 sm:p-12 lg:p-16 shadow-[0_15px_40px_rgba(249,115,22,0.02)] relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-4">
                  — CONTACT
                </p>
                <h2 
                  className="wave-heading font-display text-4xl sm:text-5xl font-normal leading-[1.1] text-slate-800 tracking-tight"
                  aria-label="Let's build something exceptional together."
                >
                  <WaveLetters parts={[{ text: "Let's build" }]} /> <br />
                  <WaveLetters parts={[{ text: "something" }]} /> <br />
                  <span className="font-serif italic text-teal-600 font-normal inline-block" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    <WaveLetters parts={[{ text: "exceptional" }]} />
                  </span> <br />
                  <WaveLetters parts={[{ text: "together." }]} />
                </h2>
                <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                  Tell us about your hiring or consulting needs. We respond to every inquiry within <strong className="text-slate-800 font-semibold">4 business hours</strong>.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-teal-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email</div>
                    <a href="mailto:hello@technovasystems.com" className="text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors">
                      hello@technovasystems.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-teal-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone</div>
                    <a href="tel:+18005550199" className="text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors">
                      +1 (800) 555-0199
                    </a>
                  </div>
                </div>

                {/* Headquarters */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-teal-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Headquarters</div>
                    <div className="text-sm font-semibold text-slate-700">
                      North America · Remote-first
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Form) */}
            <div className="lg:col-span-7 w-full">
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-100/50 w-full text-left">
                <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Cooper"
                      className="bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                    />
                  </div>

                  {/* Company */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      className="bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@acme.com"
                      className="bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 555 010 1234"
                      className="bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                    />
                  </div>

                  {/* How can we help? */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      How can we help?
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 appearance-none focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                        defaultValue="Hire Talent"
                      >
                        <option value="Hire Talent">Hire Talent</option>
                        <option value="Find Work">Find Work</option>
                        <option value="AI / Consulting">AI / Consulting</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about the role, project, or transformation you have in mind..."
                      className="bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Send Message Button */}
                  <div className="md:col-span-2 mt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#F97316] text-white hover:bg-[#EA580C] font-semibold rounded-full px-8 py-4 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-md shadow-orange-500/10 cursor-pointer"
                    >
                      Send Message
                      <svg className="w-4 h-4 transform rotate-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="scroll-reveal-section bg-white text-[#0b132b] pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12">
            {/* Bio Column */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <a href="#" className="flex items-center" aria-label="TechNova Systems Home">
                <img src={darkLogo} alt="TechNova Systems" className="h-10 w-auto" />
              </a>
              <p className="text-sm text-slate-500 leading-relaxed">
                AI staffing and technology consulting solutions that help organizations innovate, scale and lead in the digital-first world.
              </p>
              <div className="flex gap-4 text-slate-400">
                <a href="#" className="hover:text-[#8B5CF6] transition-colors" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="hover:text-[#8B5CF6] transition-colors" aria-label="X (formerly Twitter)">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-[#8B5CF6] transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-[#8B5CF6] transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Solutions Column */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Solutions</h4>
              <ul className="mt-4 space-y-2.5">
                {megaMenuSolutions.map((item) => (
                  <li key={item.title}>
                    <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Employers Column */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">For Employers</h4>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Hire Talent
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Solutions Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Resource Center
                  </a>
                </li>
              </ul>
            </div>

            {/* For Talent Column */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">For Talent</h4>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Submit Resume
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Career Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Why TechNova
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="lg:col-span-1.5 lg:col-start-10">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Company</h4>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Leadership
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    News & Insights
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Subscribe Column */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Subscribe</h4>
              <p className="text-sm text-slate-500 mt-4">
                Get the latest updates and insights.
              </p>
              <div className="relative mt-4 flex items-center">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 pr-12 text-sm text-slate-800 placeholder-slate-400 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                />
                <button className="absolute right-1.5 p-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full transition-colors" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
            <div>
              &copy; 2026 TechNova Systems. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#8B5CF6] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#8B5CF6] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
