import { useEffect, useState, useRef } from "react";
declare global {
  interface Window {
    wpData: any;
  }
}
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
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
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShoppingCart,
  Landmark,
  Heart,
  Factory,
  Truck,
  GraduationCap,
  Building,
  Globe,
  Star,
  Award,
  TrendingUp,
  Search,
  Wrench,
  Rocket,
  ShoppingBag,
  Stethoscope,
  Wallet,
  Lock,
  Upload,
  Palette,
} from "lucide-react";
import awsLogo from "@/assets/trusted-logos/aws.png";
import ciscoLogo from "@/assets/trusted-logos/cisco.png";
import dellLogo from "@/assets/trusted-logos/dell.png";
import googleLogo from "@/assets/trusted-logos/google.png";
import microsoftLogo from "@/assets/trusted-logos/microsoft.png";
import oracleLogo from "@/assets/trusted-logos/oracle.png";
import axisBankLogo from "../imges/icons/axis bank.png";
import bluestoneLogo from "../imges/icons/bluestone.png";
import capgeminiLogo from "../imges/icons/capgemini.png";
import deloitteLogo from "../imges/icons/deloitte.png";
import eyLogo from "../imges/icons/ey.png";
import globallogicLogo from "../imges/icons/globallogic.png";
import growwLogo from "../imges/icons/groww.png";
import hdfcbankLogo from "../imges/icons/hdfcbank.png";
import icicibankLogo from "../imges/icons/icicibank.png";
import image102Logo from "../imges/icons/image 102.png";
import infosysLogo from "../imges/icons/infosys.png";
import kpmgLogo from "../imges/icons/kpmg.png";
import mycaptionLogo from "../imges/icons/mycaption.png";
import pumaLogo from "../imges/icons/puma.png";
import pwcLogo from "../imges/icons/pwc.png";
import walmartLogo from "../imges/icons/walmart.png";
import aiTalentIllustration from "../imges/AI-Talent-Solution.svg";
import contractStaffingIllustration from "../imges/Contract-Staffing.svg";
import forEmployersGif from "../imges/Industries-videos/for-Employers.gif";
import forTalentGif from "../imges/Industries-videos/for-talent.gif";
import financialServicesVideo from "../imges/Industries-videos/Financial-Services.mp4";
import governmentPublicSectorVideo from "../imges/Industries-videos/Government-Public-Sector.mp4";
import opportunityBadgeIcon from "../imges/Industries/fv.svg";
import healthcareVideo from "../imges/Industries-videos/Healthcare.mp4";
import manufacturingVideo from "../imges/Industries-videos/Manufacturing.mp4";
import retailEcommerceVideo from "../imges/Industries-videos/Retail-E-Commerce.mp4";
import technologyVideo from "../imges/Industries-videos/Technology.mp4";
import logisticsVideo from "../imges/Industries-videos/Logistics.mp4";
import realEstateVideo from "../imges/Industries-videos/Real-Estate.mp4";
import educationVideo from "../imges/Industries-videos/Education.mp4";
import industriesPageBgVideo from "../imges/Industries-videos/industiespagebg.mp4";
import managedTeamsIllustration from "../imges/Managed-Teams .svg";
import technovaFavicon from "../imges/favicon.png";
import technovaLogo from "../imges/Industries/technovalogo.svg";
import aboutUsImage from "../imges/image.png";
import industryHeroBg from "../imges/industry_hero_bg.png";
import solutionsSkyline from "../imges/solutions_skyline.png";
import ctaCubes from "../imges/cta_cubes.png";
import darkLogo from "../imges/darklogo.svg";
import workforceConsultingIllustration from "../imges/Workforce-Consulting.svg";
import firstSlideVideo from "../imges/slider/1st slide.mp4";
import fourthSlideVideo from "../imges/slider/4TH.mp4";
import secondSlideVideo from "../imges/slider/2.mp4";
import thirdSlideVideo from "../imges/slider/3slider.mp4";
import fifthSlideVideo from "../imges/slider/5thslide.mp4";
import aiPoweredVideo from "../imges/AI-Powered.mp4";
import contactUsBackground from "../imges/contact-usbg.png";
import ctaContactUsBackground from "../imges/ctacontactus.png";
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

type WavePart = {
  text: string;
  accent?: boolean;
  strike?: boolean;
  breakAfter?: boolean;
};

const iconMap: Record<string, any> = {
  Cpu,
  ShoppingCart,
  Landmark,
  Heart,
  Factory,
  Truck,
  GraduationCap,
  Building
};

function parseHeadline(text: string): WavePart[] {
  if (!text) return [];
  const regex = /(\[accent\](.*?)\[\/accent\])|(\[strike\](.*?)\[\/strike\])|([^[\]]+)/g;
  const parts: WavePart[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      parts.push({ text: match[2], accent: true });
    } else if (match[4]) {
      parts.push({ text: match[4], strike: true, breakAfter: true });
    } else if (match[5]) {
      parts.push({ text: match[5] });
    }
  }
  return parts;
}

const defaultSlides = [
  {
    bgType: "video",
    bgUrl: firstSlideVideo,
    headlineParts: [
      { text: "We Build ", accent: false },
      { text: "High-Performance", accent: true },
      { text: " Teams That Drive ", accent: false },
      { text: "What's Next", accent: true },
    ],
    description: "AI-powered talent solutions and technology consulting that help organizations innovate, scale and lead in a digital-first world.",
    ctaButtons: [
      { text: "Hire Top Talent", link: "#", primary: true },
      { text: "Explore AI Solutions", link: "#", primary: false }
    ]
  },
  {
    bgType: "video",
    bgUrl: secondSlideVideo,
    headlineParts: [
      { text: "Accelerate ", accent: false },
      { text: "Digital", accent: true },
      { text: " & ", accent: false },
      { text: "AI Transformation", accent: true },
    ],
    description: "Modernize your operations, automate complex workflows, and unlock growth with custom intelligence.",
    ctaButtons: [
      { text: "Talk to an Expert", link: "#", primary: true }
    ]
  },
  {
    bgType: "video",
    bgUrl: thirdSlideVideo,
    headlineParts: [
      { text: "Build ", accent: false },
      { text: "Visionary Leadership", accent: true },
      { text: " For What's Ahead", accent: false },
    ],
    description: "Direct-hire and executive search for critical technology and business-driving leadership roles.",
    ctaButtons: [
      { text: "Find Leaders", link: "#", primary: true },
      { text: "Our Methodology", link: "#", primary: false }
    ]
  },
  {
    bgType: "video",
    bgUrl: fourthSlideVideo,
    headlineParts: [
      { text: "Dedicated ", accent: false },
      { text: "Managed Teams", accent: true },
      { text: " Built For Speed", accent: false },
    ],
    description: "Deploy complete, high-impact engineering and data squads structured around your business outcomes.",
    ctaButtons: [
      { text: "Request a Pod", link: "#", primary: true }
    ]
  },
  {
    bgType: "video",
    bgUrl: fifthSlideVideo,
    headlineParts: [
      { text: "Empty Promises.", strike: true, breakAfter: true },
      { text: "Results Delivered.", accent: true },
    ],
    description: "",
    ctaButtons: [
      { text: "Schedule Consultation", link: "#", primary: true }
    ]
  }
];

function getAcfUrl(field: any): string {
  if (!field) return "";
  if (typeof field === "object" && field.url) {
    return field.url;
  }
  return String(field);
}

const slides = window.wpData && window.wpData.hero_slides
  ? window.wpData.hero_slides.map((s: any) => ({
      bgType: s.bg_type || "video",
      bgUrl: s.bg_type === "image" ? getAcfUrl(s.image_file) : getAcfUrl(s.video_file),
      headlineParts: parseHeadline(s.headline_accent),
      description: s.description || "",
      ctaButtons: [
        { text: "Schedule Consultation", link: "#contact", primary: true }
      ]
    }))
  : defaultSlides;


function WaveLetters({ parts }: { parts: WavePart[] }) {
  let waveIndex = 0;

  return (
    <span aria-hidden="true">
      {parts.map((part, partIndex) => (
        <span
          key={`${part.text}-${partIndex}`}
          className={[
            part.accent ? "text-[#F59E0B]" : "",
            part.strike ? "wave-strike" : "",
          ]
            .filter(Boolean)
            .join(" ") || undefined}
        >
          {(part.text.match(/\s+|\S+/g) ?? []).map((token, tokenIndex) => {
            if (!token.trim()) {
              return token;
            }

            return (
              <span
                className="wave-word"
                key={`${partIndex}-${tokenIndex}-${token}`}
              >
                {Array.from(token).map((letter, letterIndex) => {
                  const currentIndex = waveIndex++;

                  return (
                    <span
                      key={`${partIndex}-${tokenIndex}-${letterIndex}`}
                      className="wave-letter"
                      style={{ animationDelay: `${currentIndex * 0.035}s` }}
                    >
                      {letter}
                    </span>
                  );
                })}
              </span>
            );
          })}
          {part.breakAfter ? <br /> : null}
        </span>
      ))}
    </span>
  );
}

function getIconComponent(name: string): any {
  if (!name) return LucideIcons.BriefcaseBusiness;
  const Icon = (LucideIcons as any)[name];
  return Icon || LucideIcons.BriefcaseBusiness;
}

const trustedLogos = [
  { name: "Axis Bank", src: axisBankLogo },
  { name: "Bluestone", src: bluestoneLogo },
  { name: "Capgemini", src: capgeminiLogo },
  { name: "Deloitte", src: deloitteLogo },
  { name: "EY", src: eyLogo },
  { name: "GlobalLogic", src: globallogicLogo },
  { name: "Groww", src: growwLogo },
  { name: "HDFC Bank", src: hdfcbankLogo },
  { name: "ICICI Bank", src: icicibankLogo },
  { name: "Image 102", src: image102Logo },
  { name: "Infosys", src: infosysLogo },
  { name: "KPMG", src: kpmgLogo },
  { name: "MyCaption", src: mycaptionLogo },
  { name: "Puma", src: pumaLogo },
  { name: "PwC", src: pwcLogo },
  { name: "Walmart", src: walmartLogo },
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

function SiteHeader({ light = false }: { light?: boolean }) {
  const navTextClass = light ? "text-[#0b132b]" : "text-white";

  return (
    <nav
      className={[
        "relative z-[100] mx-auto flex max-w-7xl flex-row items-center justify-between px-8 py-6",
        light ? "text-[#0b132b]" : "",
      ].join(" ")}
    >
      <a
        href="#home"
        className="font-display text-3xl font-normal tracking-tight text-foreground"
        aria-label="Technova Systems home"
      >
        <img
          src={technovaLogo}
          alt="Technova Systems"
          className="h-12 w-auto"
        />
      </a>

      <div className={`nav-glass-menu hidden items-center md:flex ${light ? "nav-glass-menu-light" : ""}`}>
        <div className="mega-menu-wrap">
          <a
            href="#"
            className={`mega-menu-trigger text-sm font-medium transition-colors ${navTextClass}`}
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
            href={
              link === "About Us" ? "/about/" :
                link === "Industries" ? "/industries/" :
                  link === "For Employers" ? "/employers/" :
                    link === "For Talent" ? "/talent/" :
                      link === "AI & Insights" ? "/insights/" :
                        "/"
            }
            className={`nav-glass-link text-sm font-medium transition-colors ${navTextClass}`}
          >
            {link}
          </a>
        ))}
      </div>

      <Button
        variant="default"
        size="nav"
        className="bg-[#f59e0c] text-white shadow-lg shadow-amber-500/20 hover:bg-[#d97706] hover:scale-[1.03]"
        asChild
      >
        <a href="#contact">Let's Talk</a>
      </Button>
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="scroll-reveal-section bg-white text-[#0b132b] pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <a href="#home" className="flex items-center" aria-label="TechNova Systems Home">
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
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">For Employers</h4>
            <ul className="mt-4 space-y-2.5">
              {["Hire Talent", "Solutions Overview", "Case Studies", "Resource Center"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">For Talent</h4>
            <ul className="mt-4 space-y-2.5">
              {["Browse Jobs", "Submit Resume", "Career Resources", "Why TechNova"].map((item) => (
                <li key={item}>
                  <a href="/talent/" className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:col-start-10">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {["About Us", "Leadership", "Careers", "News & Insights", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href={item === "Contact Us" ? "/contact/" : item === "About Us" ? "/about/" : item === "News & Insights" ? "/insights/" : "/"} className="text-sm text-slate-500 hover:text-[#8B5CF6] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <div>&copy; 2026 TechNova Systems. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#8B5CF6] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#8B5CF6] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

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
    video: technologyVideo,
  },
  {
    title: "Healthcare",
    description: "Enhancing care through technology, data and specialized talent.",
    visual: "healthcare",
    video: healthcareVideo,
  },
  {
    title: "Financial Services",
    description: "Driving growth with secure, compliant and future-ready solutions.",
    visual: "financial",
    video: financialServicesVideo,
  },
  {
    title: "Manufacturing",
    description: "Building resilient operations with engineering and tech excellence.",
    visual: "manufacturing",
    video: manufacturingVideo,
  },
  {
    title: "Retail & E-Commerce",
    description: "Scaling customer experiences with data, technology and agility.",
    visual: "retail",
    video: retailEcommerceVideo,
  },
  {
    title: "Government & Public Sector",
    description: "Delivering impact through technology, security and skilled professionals.",
    visual: "government",
    video: governmentPublicSectorVideo,
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

function TurnstileWidget({ className = "" }: { className?: string }) {
  const elementId = useRef(`turnstile-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    const scriptId = "cloudflare-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const renderWidget = () => {
      const container = document.getElementById(elementId.current);
      if ((window as any).turnstile && container && container.childElementCount === 0) {
        (window as any).turnstile.render(`#${elementId.current}`, {
          sitekey: "0x4AAAAAADumwXCngu01f3kg",
        });
      }
    };

    if ((window as any).turnstile) {
      renderWidget();
      return;
    }

    const checkInterval = setInterval(() => {
      if ((window as any).turnstile) {
        clearInterval(checkInterval);
        renderWidget();
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, []);

  return <div className={className} id={elementId.current} />;
}

function AboutPage() {
  const heroValues = [
    { title: "People First", description: "Human connection at the core of everything we do.", icon: Users },
    { title: "AI-Powered", description: "Intelligent matching for better outcomes and faster results.", icon: BrainCircuit },
    { title: "Trusted Partner", description: "Long-term relationships built on transparency and trust.", icon: ShieldCheck },
    { title: "Results Driven", description: "Delivering measurable impact that accelerates growth.", icon: BadgeCheck },
  ];

  const differentiators = [
    { title: "AI-Powered Matching", description: "Advanced AI helps us connect the right talent with the right opportunities faster and smarter.", icon: BrainCircuit, color: "text-[#8B5CF6]" },
    { title: "Specialized Experts", description: "Access to a vast network of pre-vetted technology professionals across diverse domains.", icon: UserRoundSearch, color: "text-[#f59e0c]" },
    { title: "Consulting + Staffing", description: "End-to-end solutions that go beyond hiring to solve complex business challenges.", icon: BriefcaseBusiness, color: "text-emerald-400" },
    { title: "Speed with Quality", description: "Faster hiring without compromising on quality, precision, or cultural fit.", icon: Cpu, color: "text-blue-400" },
    { title: "Risk-Free Partnership", description: "Transparent process, compliance-driven, and focused on long-term partnerships.", icon: ShieldCheck, color: "text-indigo-300" },
    { title: "Impact That Scales", description: "Solutions designed to drive efficiency, innovation, and sustainable business growth.", icon: BadgeCheck, color: "text-orange-300" },
  ];

  const values = [
    { title: "Integrity", description: "We do the right thing, always.", icon: ShieldCheck },
    { title: "Excellence", description: "We pursue the highest standards in everything we do.", icon: BadgeCheck },
    { title: "Innovation", description: "We embrace change and create smarter solutions.", icon: BrainCircuit },
    { title: "Partnership", description: "We win together with our clients and candidates.", icon: Users },
    { title: "Human First", description: "We care, respect, and support each other.", icon: UsersRound },
    { title: "Growth", description: "We grow together with our people, clients, and communities.", icon: Building2 },
  ];

  return (
    <main className="about-page min-h-screen bg-[#f7f9fc] font-body text-[#0b132b]">
      <section className="relative overflow-hidden bg-[#071224] px-4 pb-20 text-white sm:px-6 lg:px-8">
        <img
          src={contactUsBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,22,0.96)_0%,rgba(4,10,22,0.74)_28%,rgba(4,10,22,0.34)_52%,rgba(4,10,22,0.70)_78%,rgba(4,10,22,0.92)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#071224]/42" />
        <div className="relative z-30 -mx-4 sm:-mx-6 lg:-mx-8">
          <SiteHeader />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] pt-12">
          <p className="section-kicker text-[#a78bfa]">{window.wpData?.about_kicker || "About Technova Systems"}</p>
          <h1 className="font-display mt-5 max-w-3xl text-5xl font-normal leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl text-white">
            {window.wpData && window.wpData.about_headline ? (
              <WaveLetters parts={parseHeadline(window.wpData.about_headline)} />
            ) : (
              <>
                People. Technology. Impact That{" "}
                <span className="text-[#f59e0c]">Lasts.</span>
              </>
            )}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
            {window.wpData?.about_description || "TechNova Systems bridges the gap between exceptional talent and forward-thinking organizations through technology, expertise, and a human-first approach."}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {heroValues.map((item) => {
              const Icon = item.icon;

              return (
                <div className="rounded-2xl bg-white/8 p-5 backdrop-blur" key={item.title}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/12 text-[#c4b5fd]">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/72">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 lg:col-span-5">
            <p className="section-kicker text-[#8B5CF6]">Our Story</p>
            <h2 className="font-display mt-4 text-4xl font-normal leading-tight">
              Solving Today's Challenges. Building Tomorrow's Advantage.
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-600">
              The world of work is changing rapidly. Businesses need specialized
              talent, smarter solutions, and the agility to adapt.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              TechNova Systems was founded to meet that need. We combine deep
              industry knowledge, technology intelligence, and a passion for
              people to deliver staffing and consulting solutions that create
              real impact.
            </p>
            <p className="mt-5 text-sm font-semibold leading-7 text-[#8B5CF6]">
              We don't just fill positions. We build teams and partnerships that
              shape the future.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 lg:col-span-4">
            <img
              src={aboutUsImage}
              alt="TechNova Systems Office"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>

          <div className="grid gap-6 lg:col-span-3">
            <article className="rounded-3xl border border-slate-200 bg-white p-7">
              <p className="section-kicker text-[#8B5CF6]">Our Mission</p>
              <h3 className="mt-4 text-lg font-semibold">Empower organizations through exceptional talent.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                We create meaningful career opportunities while helping
                companies innovate, grow, and deliver with confidence.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-7">
              <p className="section-kicker text-[#f59e0c]">Our Vision</p>
              <h3 className="mt-4 text-lg font-semibold">Be the trusted partner for technology staffing and consulting.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Recognized for transforming businesses and enriching lives
                through people, innovation, and AI-driven solutions.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px] rounded-3xl bg-[#071224] p-8 text-white">
          <div className="text-center">
            <p className="section-kicker text-[#a78bfa]">What Makes Us Different</p>
            <h2 className="font-display mt-3 text-4xl font-normal">
              A Smarter Approach. Better Outcomes.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {differentiators.map((item) => {
              const Icon = item.icon;

              return (
                <article className="rounded-2xl bg-white/8 p-5" key={item.title}>
                  <Icon className={item.color} size={30} />
                  <h3 className="mt-5 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-xs leading-6 text-white/70">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px] rounded-3xl border border-slate-200 bg-white p-7">
          <p className="section-kicker text-center text-[#8B5CF6]">Our Core Values</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div className="flex gap-4 lg:block" key={item.title}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 lg:mt-4">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="relative mx-auto grid max-w-[1440px] gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#8B5CF6] to-[#f59e0c] p-8 text-white lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl font-normal">Let's Build the Future Together</h2>
            <p className="mt-3 text-sm leading-7 text-white/84">
              Partner with TechNova Systems for technology talent, strategic
              consulting, and measurable business impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:col-span-6 lg:justify-end">
            <Button variant="glass" size="hero" asChild>
              <a href="#contact">Schedule a Consultation</a>
            </Button>
            <Button variant="glass" size="hero">
              Explore Our Solutions
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    subject: "Hire Talent",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData();
    form.append("your-name", formData.fullName);
    form.append("your-company", formData.company);
    form.append("your-email", formData.email);
    form.append("your-phone", formData.phone);
    form.append("your-subject", formData.subject);
    form.append("your-message", formData.message);
    form.append("form-source", "Contact Page Form");

    try {
      const formId = window.wpData?.contact_form_id || window.wpData?.employers_form_id || window.wpData?.talent_form_id || window.wpData?.home_contact_form_id || "21";
      const response = await fetch(
        `/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
        {
          method: "POST",
          body: form,
        }
      );
      const result = await response.json();
      if (result.status === "mail_sent") {
        setStatus("success");
        setFormData({
          fullName: "",
          company: "",
          email: "",
          phone: "",
          subject: "Hire Talent",
          message: "",
        });
      } else {
        console.error("CF7 Error Result:", result);
        alert("CF7 Error Status: " + (result.status || "Unknown") + "\nMessage: " + (result.message || "Failed to submit. Check Form ID/Fields."));
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const responseItems = [
    { label: "Response within", detail: "1 Business Day", icon: Clock },
    { label: "Enterprise Staffing", detail: "& Consulting", icon: Users },
    { label: "Dedicated Workforce", detail: "Specialists", icon: ShieldCheck },
  ];

  const contactMethods = [
    {
      title: "Corporate Office",
      detail: "3701 Pender Dr Suite 510\nFairfax, VA, 22030",
      icon: MapPin,
    },
    {
      title: "Email Us",
      detail: "Info@technovasystemsinc.com",
      icon: Mail,
    },
    {
      title: "Call Us",
      detail: "+1 (571) 651 - 0246",
      icon: Phone,
    },
  ];

  const proofItems = [
    { title: "Free Consultation", description: "No obligation. Just expert advice.", icon: Users },
    { title: "Confidential", description: "Your information is 100% secure.", icon: ShieldCheck },
    { title: "Global Reach", description: "Serving clients and talent worldwide.", icon: Building2 },
    { title: "Proven Expertise", description: "AI-led solutions that deliver results.", icon: BadgeCheck },
  ];

  const faqs = [
    "How quickly will someone contact me?",
    "Is there a consultation fee?",
    "Do you work with startups as well as enterprises?",
    "Can I submit my resume through this form?",
    "Do you offer remote hiring solutions?",
    "How is my information protected?",
  ];

  return (
    <main className="min-h-screen bg-white font-body text-[#0b132b]">
      <section className="relative overflow-hidden bg-[#071224] px-4 pb-10 text-white sm:px-6 lg:px-8">
        <img
          src={contactUsBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,22,0.94)_0%,rgba(4,10,22,0.72)_24%,rgba(4,10,22,0.30)_50%,rgba(4,10,22,0.72)_76%,rgba(4,10,22,0.94)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[34%] bg-white" />
        <div className="relative z-30 -mx-4 sm:-mx-6 lg:-mx-8">
          <SiteHeader />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1440px] gap-10 pt-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="section-kicker text-[#8B5CF6]">{window.wpData?.contact_kicker || "Get In Touch"}</p>
            <h1 className="font-display mt-5 max-w-3xl text-5xl font-normal leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {window.wpData && window.wpData.contact_headline ? (
                <WaveLetters parts={parseHeadline(window.wpData.contact_headline)} />
              ) : (
                <>
                  Let's Start a Conversation That Moves You{" "}
                  <span className="text-[#f59e0c]">Forward.</span>
                </>
              )}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
              {window.wpData?.contact_description || "Whether you're looking to hire exceptional talent, explore workforce consulting solutions, or discover your next career opportunity, our team is here to help."}
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {responseItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="flex items-center gap-3" key={item.label}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-[#c4b5fd] backdrop-blur">
                      <Icon size={20} strokeWidth={2.2} />
                    </span>
                    <span className="text-xs font-semibold leading-5 text-white/88">
                      {item.label}<br />{item.detail}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/40 bg-white p-8 text-[#0b132b] shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
              <h2 className="font-display text-3xl font-normal text-[#0b132b]">
                Get in Touch
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Reach out to us through your preferred channel.
              </p>
              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                {contactMethods.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="flex gap-4" key={item.title}>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                        <Icon size={21} />
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-500">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div id="contact-form" className="scroll-mt-24 rounded-3xl border border-white/70 bg-white p-7 text-[#0b132b] shadow-[0_12px_32px_rgba(15,23,42,0.10)] sm:p-8">
              <h2 className="font-display text-3xl font-normal text-[#0b132b]">
                Tell Us How We Can Help
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill out the form and our team will get back to you within one business day.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-7 grid gap-4 sm:grid-cols-2">
                {["Full Name*", "Company Name", "Work Email*", "Phone Number*"].map((placeholder) => (
                  <input
                    key={placeholder}
                    placeholder={placeholder}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c]"
                  />
                ))}
                <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 outline-none transition focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c] sm:col-span-2" defaultValue="">
                  <option value="" disabled>I am*</option>
                  <option>Hiring for my company</option>
                  <option>Looking for opportunities</option>
                  <option>Exploring consulting support</option>
                </select>
                <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 outline-none transition focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c] sm:col-span-2" defaultValue="">
                  <option value="" disabled>Service Interested In*</option>
                  <option>AI Talent Solutions</option>
                  <option>Contract Staffing</option>
                  <option>Workforce Consulting</option>
                  <option>Managed Teams</option>
                </select>
                <input
                  placeholder="Subject*"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c] sm:col-span-2"
                />
                <textarea
                  rows={5}
                  placeholder="Tell us about your requirements or how we can help you."
                  className="resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c] sm:col-span-2"
                />
                <TurnstileWidget className="sm:col-span-2" />
                <label className="flex items-start gap-3 text-xs leading-5 text-slate-500 sm:col-span-2">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
                  I agree to the Privacy Policy and consent to being contacted by TechNova Systems.
                </label>
                <button className="flex items-center justify-center gap-2 rounded-xl bg-[#f59e0c] px-6 py-4 text-sm font-semibold text-white shadow-md shadow-amber-500/10 transition hover:bg-[#d97706] sm:col-span-2">
                  Send Message
                  <ArrowRight size={17} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-4 rounded-3xl border border-slate-200/70 bg-white/86 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.035)] sm:grid-cols-2 lg:grid-cols-4">
          {proofItems.map((item) => {
            const Icon = item.icon;

            return (
              <div className="flex items-center gap-4" key={item.title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f59e0c]/12 text-[#f59e0c]">
                  <Icon size={22} />
                </span>
                <span>
                  <strong className="block text-sm text-slate-800">{item.title}</strong>
                  <small className="mt-1 block text-xs leading-5 text-slate-500">{item.description}</small>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative mx-auto min-h-[340px] max-w-[1440px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.7028114203863!2d-77.3310954!3d38.862159299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64ed8b59ed7bd%3A0x8edbdf9b9b6c4663!2s3701%20Pender%20Dr%20%23510%2C%20Fairfax%2C%20VA%2022030%2C%20USA!5e0!3m2!1sen!2sin!4v1783179029396!5m2!1sen!2sin"
            title="TechNova Systems office map"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className="relative z-10 m-6 ml-auto max-w-sm rounded-2xl bg-white p-7 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
            <h2 className="font-display text-3xl font-normal">Find Us</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Our headquarters is located in the heart of the business district,
              easily accessible by public transport and major highways.
            </p>
            <div className="mt-5 flex gap-3 text-sm text-slate-600">
              <MapPin className="mt-1 text-[#8B5CF6]" size={20} />
              <span>
                <strong className="block text-slate-800">TechNova Systems</strong>
                3701 Pender Dr Suite 510<br />Fairfax, VA, 22030
              </span>
            </div>
            <Button variant="glass-dark" size="nav" className="mt-6 border border-[#8B5CF6]/20 text-[#8B5CF6]">
              Get Directions
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] text-center">
          <p className="section-kicker text-[#8B5CF6]">FAQs</p>
          <h2 className="font-display mt-3 text-4xl font-normal text-[#0b132b]">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
            {faqs.map((question) => (
              <details className="group rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm" key={question}>
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                  {question}
                  <ChevronDown className="transition group-open:rotate-180" size={18} />
                </summary>
                <p className="mt-3 text-slate-500">
                  Our team will review your request and share the best next step based on your goals.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div
          className="relative mx-auto grid max-w-[1440px] gap-6 overflow-hidden rounded-3xl bg-[#071224] bg-cover bg-center p-8 shadow-[0_8px_28px_rgba(15,23,42,0.10)] lg:grid-cols-12 lg:items-center"
          style={{ backgroundImage: `url(${ctaContactUsBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#071224]/92 via-[#071224]/68 to-[#071224]/28" />
          <div className="relative z-10 lg:col-span-5">
            <h2 className="font-display text-4xl font-normal text-white">
              Need Immediate Assistance?
            </h2>
            <p className="mt-3 text-sm leading-7 text-white">
              Our specialists are available to discuss urgent hiring requirements,
              consulting projects, or career-related questions.
            </p>
          </div>
          <div className="relative z-10 flex lg:col-span-7 lg:justify-center">
            <Button
              variant="default"
              size="hero"
              className="bg-[#f59e0c] text-white shadow-md shadow-amber-500/10 hover:bg-[#d97706]"
              asChild
            >
              <a href="#contact-form">
                Talk to an Expert
                <ArrowRight size={18} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function IndustriesPage() {
  const defaultIndustries = [
    {
      title: "Technology & IT",
      description: "Powering innovation with top tech talent and advanced solutions across emerging technologies.",
      icon: Cpu,
      color: "text-purple-500 bg-purple-50 hover:bg-purple-100",
      themeColor: "#8B5CF6",
      video: technologyVideo,
    },
    {
      title: "Retail & E-commerce",
      description: "Building agile teams and digital solutions that enhance customer experiences and drive growth.",
      icon: ShoppingCart,
      color: "text-amber-500 bg-amber-50 hover:bg-amber-100",
      themeColor: "#f59e0c",
      video: retailEcommerceVideo,
    },
    {
      title: "Banking & Financial Services",
      description: "Delivering compliance-driven talent and solutions for a secure and future-ready financial sector.",
      icon: Landmark,
      color: "text-emerald-500 bg-emerald-50 hover:bg-emerald-100",
      themeColor: "#10B981",
      video: financialServicesVideo,
    },
    {
      title: "Healthcare & Life Sciences",
      description: "Connecting healthcare organizations with skilled professionals and technology that saves lives.",
      icon: Heart,
      color: "text-rose-500 bg-rose-50 hover:bg-rose-100",
      themeColor: "#F43F5E",
      video: healthcareVideo,
    },
    {
      title: "Manufacturing",
      description: "Empowering manufacturing businesses with skilled talent and process-driven solutions.",
      icon: Factory,
      color: "text-orange-500 bg-orange-50 hover:bg-orange-100",
      themeColor: "#F97316",
      video: manufacturingVideo,
    },
    {
      title: "Logistics & Supply Chain",
      description: "Strengthening supply chains with expert talent and smart, scalable technology solutions.",
      icon: Truck,
      color: "text-indigo-500 bg-indigo-50 hover:bg-indigo-100",
      themeColor: "#6366F1",
      video: logisticsVideo,
    },
    {
      title: "Education & EdTech",
      description: "Building future-ready education platforms and connecting institutions with the right technology talent.",
      icon: GraduationCap,
      color: "text-sky-500 bg-sky-50 hover:bg-sky-100",
      themeColor: "#0EA5E9",
      video: educationVideo,
    },
    {
      title: "Real Estate & Construction",
      description: "Delivering on-time projects with specialized talent and solutions that build stronger tomorrow.",
      icon: Building,
      color: "text-teal-500 bg-teal-50 hover:bg-teal-100",
      themeColor: "#14B8A6",
      video: realEstateVideo,
    },
  ];

  const industries = window.wpData && window.wpData.industries_list
    ? window.wpData.industries_list.map((item: any) => {
        const IconComponent = iconMap[item.icon_name] || Cpu;
        return {
          title: item.title,
          description: item.description,
          icon: IconComponent,
          color: item.color_class || "text-purple-500 bg-purple-50 hover:bg-purple-100",
          themeColor: "#8B5CF6",
          video: getAcfUrl(item.video_file) || undefined
        };
      })
    : defaultIndustries;

  const stats = [
    { value: "25+", label: "Industries Served", icon: Building2 },
    { value: "500+", label: "Enterprise Clients", icon: Users },
    { value: "1000+", label: "Successful Placements", icon: ShieldCheck },
    { value: "20+", label: "Countries Reached", icon: Globe },
    { value: "98%", label: "Client Satisfaction", icon: Star },
  ];

  const solutions = [
    {
      title: "Specialized Talent Networks",
      description: "Access to pre-vetted professionals with industry-specific expertise.",
      icon: Users,
    },
    {
      title: "Consulting & Strategy",
      description: "Advisory and consulting services to solve complex business challenges.",
      icon: Award,
    },
    {
      title: "Technology Solutions",
      description: "Custom technology solutions that drive efficiency and innovation.",
      icon: Cpu,
    },
    {
      title: "Flexible Engagement Models",
      description: "Scalable engagement models tailored to your business goals.",
      icon: ShieldCheck,
    },
  ];

  const caseStudies = [
    {
      client: "FinEdge Solutions",
      industry: "Banking & Financial Services",
      description: "Hired 50+ specialized professionals and built a secure data platform, improving process efficiency by 40%.",
      icon: Landmark,
      color: "text-amber-500 bg-amber-50",
    },
    {
      client: "MediCare Plus",
      industry: "Healthcare",
      description: "Built a dedicated tech team and custom patient management system, enhancing patient experience by 60%.",
      icon: Stethoscope,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      client: "ShopMax",
      industry: "Retail & E-commerce",
      description: "Scaled engineering teams and optimized their platform, resulting in 35% increase in online conversions.",
      icon: ShoppingBag,
      color: "text-rose-500 bg-rose-50",
    },
  ];

  return (
    <main className="industries-page min-h-screen bg-[#f7f9fc] font-body text-[#0b132b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#071224] px-4 pb-24 text-white sm:px-6 lg:px-8">
        <video
          src={industriesPageBgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in pointer-events-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,22,0.96)_0%,rgba(4,10,22,0.74)_28%,rgba(4,10,22,0.34)_52%,rgba(4,10,22,0.70)_78%,rgba(4,10,22,0.92)_100%)] animate-fade-in" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#071224]/50" />

        <div className="relative z-30 -mx-4 sm:-mx-6 lg:-mx-8">
          <SiteHeader />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] pt-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#a78bfa]">
            Industries We Serve
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl font-normal leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Enabling Every Industry With the Right Talent and{" "}
            <span className="text-[#f59e0c]">Technology.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
            From emerging startups to global enterprises, we deliver talent and
            solutions tailored to the unique needs of your industry.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-5xl">
            <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                <Users size={20} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">Industry-Aligned Talent</h3>
                <p className="mt-2 text-xs leading-5 text-white/70">
                  Specialized professionals who understand your domain.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <Award size={20} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">Domain Expertise</h3>
                <p className="mt-2 text-xs leading-5 text-white/70">
                  Deep knowledge of industry challenges and opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                <TrendingUp size={20} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">Measurable Impact</h3>
                <p className="mt-2 text-xs leading-5 text-white/70">
                  Solutions that drive growth, efficiency and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Industries Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
            Industries
          </p>
          <h2 className="font-display mt-4 text-center text-3xl font-normal tracking-tight text-[#0b132b] sm:text-4xl">
            Industry Expertise. Business Impact.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
            We partner with organizations across industries to build high-performing teams
            and deliver technology solutions that create lasting impact.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((item: any) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-slate-200 flex flex-col justify-between min-h-[240px]"
                >
                  <div>
                    {item.video ? (
                      <div className="relative w-[142px] h-[120px] -ml-8 -mt-4 mb-2 pointer-events-none" aria-hidden="true">
                        <video
                          src={item.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-contain"
                          controlsList="nodownload"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    ) : (
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} transition-colors duration-300`}>
                        <Icon size={24} />
                      </span>
                    )}
                    <h3 className="mt-6 text-lg font-semibold text-slate-800 group-hover:text-[#8B5CF6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors mt-6 inline-flex items-center gap-1.5"
                  >
                    Explore Industry
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Stats Bar */}
          <div className="mt-20 rounded-3xl border border-slate-100 bg-[#f8fafc] p-8 sm:px-10 flex flex-wrap gap-8 justify-around items-center">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#8B5CF6]">
                    <Icon size={20} />
                  </span>
                  <div>
                    <div className="text-3xl font-semibold text-slate-800 leading-none">{item.value}</div>
                    <div className="text-xs font-medium text-slate-400 mt-1">{item.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[#f8fafc] border-y border-slate-100">
        <div className="mx-auto max-w-[1440px] grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
              How We Help Industries
            </p>
            <h2 className="font-display mt-4 text-3xl font-normal tracking-tight text-[#0b132b] sm:text-4xl max-w-lg">
              Solutions Designed Around Your Industry Needs.
            </h2>
            <div className="mt-8 space-y-6">
              {solutions.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="flex gap-4 items-start" key={item.title}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#8B5CF6]">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden relative p-8 sm:p-12 text-white min-h-[420px] flex flex-col justify-between shadow-xl">
            <img
              src={solutionsSkyline}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#071224]/85 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071224] via-[#071224]/50 to-transparent" />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-display font-normal leading-snug max-w-md">
                We go beyond staffing. We build partnerships that transform industries.
              </h3>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10 mt-12">
              <div>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/90 mb-3">
                  <Search size={16} />
                </span>
                <h4 className="text-xs font-semibold text-white">Understand</h4>
                <p className="text-[10px] leading-relaxed text-white/70 mt-1">
                  We learn your industry and business goals.
                </p>
              </div>
              <div>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/90 mb-3">
                  <Wrench size={16} />
                </span>
                <h4 className="text-xs font-semibold text-white">Build</h4>
                <p className="text-[10px] leading-relaxed text-white/70 mt-1">
                  We deliver the right talent and solutions.
                </p>
              </div>
              <div>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/90 mb-3">
                  <Rocket size={16} />
                </span>
                <h4 className="text-xs font-semibold text-white">Transform</h4>
                <p className="text-[10px] leading-relaxed text-white/70 mt-1">
                  We drive impact and long-term growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1440px] relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#8B5CF6] to-[#f59e0c] p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex items-center gap-6">
            <img
              src={ctaCubes}
              alt=""
              className="h-24 w-auto hidden sm:block object-contain mix-blend-normal opacity-90 hover:scale-[1.05] transition-transform duration-500"
            />
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-normal leading-tight">
                Let's Drive Industry Innovation Together
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90 max-w-2xl">
                Partner with TechNova Systems to access the right talent and technology
                solutions for your industry.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Button
              variant="glass"
              size="hero"
              className="bg-white/10 hover:bg-white/20 border-white/25 shadow-lg"
              asChild
            >
              <a href="#contact">
                Schedule a Consultation
                <ArrowRight size={18} className="ml-1.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function EmployersPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    hiringFor: "",
    numberOfHires: "",
    timeline: "",
    requirements: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData();
    form.append("your-name", formData.fullName);
    form.append("your-email", formData.email);
    form.append("your-company", formData.company);
    form.append("your-phone", formData.phone);
    form.append("your-role", formData.role);
    form.append("your-hiring-for", formData.hiringFor);
    form.append("your-hires-count", formData.numberOfHires);
    form.append("your-timeline", formData.timeline);
    form.append("your-message", formData.requirements);
    form.append("form-source", "Employers Hire Request Form");

    try {
      const formId = window.wpData?.contact_form_id || window.wpData?.employers_form_id || window.wpData?.talent_form_id || window.wpData?.home_contact_form_id || "21";
      const response = await fetch(
        `/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
        {
          method: "POST",
          body: form,
        }
      );
      const result = await response.json();
      if (result.status === "mail_sent") {
        setStatus("success");
        setFormData({
          fullName: "",
          email: "",
          company: "",
          phone: "",
          role: "",
          hiringFor: "",
          numberOfHires: "",
          timeline: "",
          requirements: "",
        });
      } else {
        console.error("CF7 Error Result:", result);
        alert("CF7 Error Status: " + (result.status || "Unknown") + "\nMessage: " + (result.message || "Failed to submit. Check Form ID/Fields."));
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };
  const chooseReasons = [
    {
      title: "Deep Talent Network",
      description: "Access a vast pool of pre-vetted professionals across technologies and domains.",
      icon: BrainCircuit,
      color: "text-purple-500 bg-purple-50",
    },
    {
      title: "Industry Expertise",
      description: "Our teams understand your industry challenges and deliver role-specific talent, faster.",
      icon: Award,
      color: "text-amber-500 bg-amber-50",
    },
    {
      title: "Flexible Engagement",
      description: "From contract staffing to direct hire and managed teams—we offer what fits you best.",
      icon: Users,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      title: "Quality You Can Count On",
      description: "Rigorous screening, assessment, and validation to ensure the right talent every time.",
      icon: Star,
      color: "text-indigo-500 bg-indigo-50",
    },
  ];

  const solutions = [
    {
      title: "Direct Hire",
      description: "Full-time talent for long-term roles that drive your business forward.",
      bullets: ["Permanent placements", "Leadership hiring", "Executive search"],
      icon: Users,
      color: "text-purple-500 bg-purple-50",
    },
    {
      title: "Contract Staffing",
      description: "Skilled professionals for short-term or project-based needs.",
      bullets: ["Quick turnaround", "Specialized skills", "Flexible engagement"],
      icon: Clock,
      color: "text-amber-500 bg-amber-50",
    },
    {
      title: "Managed Teams",
      description: "Dedicated teams that integrate with your operations and scale with you.",
      bullets: ["Team of experts", "Performance managed", "Scalable delivery"],
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      title: "Workforce Consulting",
      description: "Data-driven insights and strategies to optimize your talent function.",
      bullets: ["Workforce planning", "Process optimization", "Market intelligence"],
      icon: BriefcaseBusiness,
      color: "text-indigo-500 bg-indigo-50",
    },
  ];

  const stats = [
    { value: "500+", label: "Enterprise Clients", icon: Building2 },
    { value: "1000+", label: "Successful Placements", icon: Users },
    { value: "48H", label: "Average Time to Shortlist", icon: Clock },
    { value: "95%", label: "Client Retention Rate", icon: ShieldCheck },
    { value: "8+", label: "Industries Served", icon: Globe },
  ];

  const steps = [
    { step: "STEP 01", title: "Understand", desc: "We learn your goals, challenges, and hiring needs.", icon: Search },
    { step: "STEP 02", title: "Source", desc: "We identify and shortlist the best-matched talent.", icon: UserRoundSearch },
    { step: "STEP 03", title: "Evaluate", desc: "We assess skills, culture fit, and potential.", icon: BadgeCheck },
    { step: "STEP 04", title: "Deliver", desc: "We present pre-vetted candidates for your final selection.", icon: FileUser },
    { step: "STEP 05", title: "Onboard & Support", desc: "Smooth onboarding and ongoing support for long-term success.", icon: ShieldCheck },
  ];

  const industries = [
    { title: "Technology & IT", desc: "Powering innovation with top tech talent and advanced solutions.", icon: Cpu, color: "text-purple-500 bg-purple-50", video: technologyVideo },
    { title: "Banking & Financial", desc: "Delivering expertise that drives growth and ensures compliance.", icon: Landmark, color: "text-emerald-500 bg-emerald-50", video: financialServicesVideo },
    { title: "Healthcare", desc: "Connecting healthcare organizations with skilled professionals.", icon: Heart, color: "text-rose-500 bg-rose-50", video: healthcareVideo },
    { title: "Manufacturing", desc: "Empowering manufacturers with talent that drives efficiency.", icon: Factory, color: "text-orange-500 bg-orange-50", video: manufacturingVideo },
    { title: "Retail & E-commerce", desc: "Building agile teams that enhance customer experience.", icon: ShoppingCart, color: "text-amber-500 bg-amber-50", video: retailEcommerceVideo },
    { title: "Logistics & Supply Chain", desc: "Strengthening supply chains with expert talent and smart solutions.", icon: Truck, color: "text-indigo-500 bg-indigo-50", video: logisticsVideo },
  ];

  const caseStudies = [
    {
      companyType: "FINTECH COMPANY",
      headline: "Built a dedicated product engineering team in just 3 weeks.",
      metrics: [
        { label: "Hires", val: "15+" },
        { label: "Time to Build", val: "3 Weeks" },
        { label: "Retention", val: "90%" }
      ],
      color: "bg-[#0c1a30] text-white"
    },
    {
      companyType: "MANUFACTURING FIRM",
      headline: "Reduced time-to-hire by 60% for critical roles.",
      metrics: [
        { label: "Faster Hiring", val: "60%" },
        { label: "Roles Filled", val: "35+" },
        { label: "Satisfaction", val: "95%" }
      ],
      color: "bg-[#0b132b] text-white border border-slate-800"
    },
    {
      companyType: "HEALTHCARE PROVIDER",
      headline: "Scaled operations with flexible staffing across multiple locations.",
      metrics: [
        { label: "Professionals", val: "50+" },
        { label: "Locations", val: "6+" },
        { label: "On-Time Delivery", val: "100%" }
      ],
      color: "bg-[#071224] text-white"
    }
  ];

  return (
    <main className="employers-page min-h-screen bg-[#f7f9fc] font-body text-[#0b132b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#071224] px-4 pb-24 text-white sm:px-6 lg:px-8">
        <img
          src={industryHeroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,22,0.96)_0%,rgba(4,10,22,0.74)_28%,rgba(4,10,22,0.34)_52%,rgba(4,10,22,0.70)_78%,rgba(4,10,22,0.92)_100%)] animate-fade-in" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#071224]/50" />

        <div className="relative z-30 -mx-4 sm:-mx-6 lg:-mx-8">
          <SiteHeader />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] pt-16 grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a78bfa]">
              {window.wpData?.employers_kicker || "For Employers"}
            </p>
            <h1 className="font-display mt-5 max-w-2xl text-5xl font-normal leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl text-white">
              {window.wpData && window.wpData.employers_headline ? (
                <WaveLetters parts={parseHeadline(window.wpData.employers_headline)} />
              ) : (
                <>
                  Exceptional Talent. Measurable Impact.{" "}
                  <span className="text-[#f59e0c]">Built Around You.</span>
                </>
              )}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
              {window.wpData?.employers_description || "TechNova Systems helps organizations hire, manage, and scale the right talent with speed, precision, and flexibility."}
            </p>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 max-w-xl">
              <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                  <Users size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">Access Top Pre-vetted Talent</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    Skilled professionals ready to deliver.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                  <Clock size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">Hire Faster with Quality</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    Reduce time-to-hire without compromising quality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <Wallet size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">Reduce Costs & Improve Efficiency</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    Optimize your hiring and operational costs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                  <TrendingUp size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">Scale Teams On Demand</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    Flexible staffing that grows with your business.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-5 scroll-mt-24 rounded-3xl border border-white/70 bg-white p-6 text-[#0b132b] shadow-2xl sm:p-8">
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#0b132b]">
              Hire Smarter. Scale Faster.
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-500">
              Tell us about your hiring needs and our team will get back to you within one business day.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name*"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                />
                <input
                  type="email"
                  placeholder="Work Email*"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Company Name*"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number*"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>
              <input
                type="text"
                placeholder="Job Role / Title*"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <select
                  required
                  value={formData.hiringFor}
                  onChange={(e) => setFormData({ ...formData, hiringFor: e.target.value })}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs sm:text-sm text-slate-500 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                >
                  <option value="" disabled>Hiring For*</option>
                  <option>Software Engineering</option>
                  <option>AI & Machine Learning</option>
                  <option>Product & Project Management</option>
                  <option>Data Engineering & BI</option>
                  <option>Cloud & DevOps</option>
                  <option>Other Technology Roles</option>
                </select>
                <select
                  required
                  value={formData.numberOfHires}
                  onChange={(e) => setFormData({ ...formData, numberOfHires: e.target.value })}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs sm:text-sm text-slate-500 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                >
                  <option value="" disabled>Number of Hires*</option>
                  <option>1-2 hires</option>
                  <option>3-5 hires</option>
                  <option>6-10 hires</option>
                  <option>10+ hires</option>
                </select>
                <select
                  required
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs sm:text-sm text-slate-500 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                >
                  <option value="" disabled>Timeline*</option>
                  <option>Immediate</option>
                  <option>Within 1 month</option>
                  <option>1-3 months</option>
                  <option>Flexible</option>
                </select>
              </div>
              <textarea
                rows={4}
                required
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Tell us about your requirements* (Share details about the role, skills, experience...)"
                className="resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
              />

              {/* Cloudflare Turnstile CAPTCHA */}
              <div className="flex justify-start mt-1">
                <TurnstileWidget />
              </div>

              {status === "success" && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                  Thank you! Your request has been submitted successfully.
                </div>
              )}
              {status === "error" && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-800">
                  Oops! Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-purple-500/10 transition hover:bg-[#7C3AED] w-full mt-2 disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : "Submit Request"}
                <ArrowRight size={17} />
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium mt-3">
                <Lock size={12} />
                <span>Your information is secure and confidential.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Trusted By Row */}
      <section className="bg-white py-10 overflow-hidden text-[#0b132b] sm:py-12 border-b border-slate-100">
        <p className="text-center text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
          Trusted by Organizations Worldwide
        </p>

        <div className="logo-marquee mt-8" aria-label="Trusted companies">
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

      {/* Why Choose Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1440px] grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Side */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
              Why Employers Choose TechNova
            </p>
            <h2 className="font-display mt-4 text-3xl font-normal tracking-tight text-[#0b132b] sm:text-4xl">
              A Strategic Partner for All Your Talent Needs
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              We go beyond traditional staffing. Our technology-driven approach and
              consultative partnership help you achieve better outcomes at every stage
              of your growth.
            </p>
          </div>

          {/* Right Grid */}
          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
            {chooseReasons.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-6 shadow-sm">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-sm font-semibold text-slate-800">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Staffing Solutions Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[#f8fafc] border-y border-slate-100">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
                Our Solutions
              </p>
              <h2 className="font-display mt-4 text-3xl font-normal tracking-tight text-[#0b132b] sm:text-4xl">
                Flexible Staffing Solutions Built Around Your Business
              </h2>
            </div>
            <a
              href="#contact"
              className="text-xs font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              Explore All Solutions
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col justify-between min-h-[300px]">
                  <div>
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.color}`}>
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-6 text-base font-semibold text-slate-800 group-hover:text-[#8B5CF6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <Check size={14} className="text-[#8B5CF6]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors mt-8 inline-flex items-center gap-1.5"
                  >
                    Learn More
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Stats Bar */}
          <div className="mt-20 rounded-3xl border border-slate-100 bg-white p-8 sm:px-10 flex flex-wrap gap-8 justify-around items-center shadow-sm">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#8B5CF6]">
                    <Icon size={20} />
                  </span>
                  <div>
                    <div className="text-3xl font-semibold text-slate-800 leading-none">{item.value}</div>
                    <div className="text-xs font-medium text-slate-400 mt-1">{item.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1440px] grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
              How We Work
            </p>
            <h2 className="font-display mt-4 text-3xl font-normal tracking-tight text-[#0b132b] sm:text-4xl">
              A Simple Process. Powerful Results.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              We make hiring seamless so you can focus on what matters most—growing your
              business.
            </p>
            <Button
              variant="default"
              size="hero"
              className="bg-[#8B5CF6] text-white shadow-md shadow-purple-500/10 hover:bg-[#7C3AED] mt-8"
              asChild
            >
              <a href="#contact">
                Schedule a Consultation
                <ArrowRight size={18} className="ml-1.5" />
              </a>
            </Button>
          </div>

          {/* Right Column: Timeline Progression */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Horizontal Timeline Bar */}
            <div className="relative w-full h-1 bg-slate-100 rounded-full mb-10 hidden sm:block px-3">
              {/* Active filled line */}
              <div 
                className="absolute top-0 left-3 h-full bg-gradient-to-r from-[#8B5CF6] to-[#f59e0c] transition-all duration-500 rounded-full"
                style={{ width: `calc(${(activeStep / (steps.length - 1)) * 100}% - 8px)` }}
              />
              {/* Step Dots on the line */}
              <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-3">
                {steps.map((item, idx) => {
                  const isActive = idx <= activeStep;
                  const isCurrent = idx === activeStep;
                  return (
                    <button
                      key={item.step}
                      onClick={() => setActiveStep(idx)}
                      onMouseEnter={() => setActiveStep(idx)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCurrent 
                          ? "border-[#8B5CF6] bg-white scale-125 shadow-md shadow-purple-500/20"
                          : isActive
                          ? "border-[#8B5CF6] bg-[#8B5CF6] text-white scale-110"
                          : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Columns */}
            <div className="space-y-6 sm:space-y-0 sm:flex sm:gap-4 sm:overflow-x-auto pb-4">
              {steps.map((item, idx) => {
                const Icon = item.icon;
                const isCurrent = idx === activeStep;
                return (
                  <div 
                    key={item.step} 
                    className={`flex-1 min-w-[180px] p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isCurrent 
                        ? "border-purple-200 bg-purple-50/30 shadow-[0_8px_20px_rgba(139,92,246,0.06)] -translate-y-1" 
                        : "border-transparent bg-transparent hover:bg-slate-50/50"
                    }`}
                    onMouseEnter={() => setActiveStep(idx)}
                    onClick={() => setActiveStep(idx)}
                  >
                    {/* Step pill */}
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors duration-300 ${
                      isCurrent 
                        ? "text-white bg-[#8B5CF6]" 
                        : "text-[#8B5CF6] bg-purple-50"
                    }`}>
                      {item.step}
                    </span>
                    
                    <div className="mt-5 flex items-center gap-2">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 ${
                        isCurrent 
                          ? "bg-[#8B5CF6] text-white" 
                          : "bg-slate-50 text-slate-600"
                      }`}>
                        <Icon size={16} />
                      </span>
                      <h3 className={`text-sm font-semibold transition-colors duration-300 ${
                        isCurrent ? "text-[#8B5CF6]" : "text-slate-800"
                      }`}>{item.title}</h3>
                    </div>
                    
                    <p className="mt-3 text-xs leading-relaxed text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[#f8fafc] border-t border-slate-100">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
            Industries We Serve
          </p>
          <h2 className="font-display mt-4 text-center text-3xl font-normal tracking-tight text-[#0b132b] sm:text-4xl">
            Industry-Aligned Expertise
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {industries.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm text-center flex flex-col justify-between min-h-[220px]">
                  <div>
                    {item.video ? (
                      <div className="relative mx-auto w-[120px] h-[90px] mb-2 pointer-events-none" aria-hidden="true">
                        <video
                          src={item.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-contain"
                          controlsList="nodownload"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    ) : (
                      <span className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${item.color} mb-3`}>
                        <Icon size={20} />
                      </span>
                    )}
                    <h3 className="mt-4 text-xs font-bold text-slate-800">{item.title}</h3>
                    <p className="mt-2 text-[10px] leading-relaxed text-slate-400">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1440px] grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Side */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]">
              Success Story
            </p>
            <h2 className="font-display mt-4 text-3xl font-normal tracking-tight text-[#0b132b] sm:text-4xl">
              Real Impact. Real Results.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              See how we help organizations achieve their hiring goals.
            </p>
            <a
              href="#contact"
              className="text-xs font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors mt-8 inline-flex items-center gap-1.5"
            >
              View All Case Studies
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Right Column: Case Studies */}
          <div className="lg:col-span-8 grid gap-6 md:grid-cols-3">
            {caseStudies.map((item) => {
              return (
                <div key={item.companyType} className={`rounded-3xl p-7 flex flex-col justify-between min-h-[320px] ${item.color}`}>
                  <div>
                    <span className="text-[9px] font-semibold tracking-wider text-[#a78bfa] uppercase">
                      {item.companyType}
                    </span>
                    <h3 className="mt-4 text-sm font-semibold leading-relaxed">
                      {item.headline}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/10 mt-6">
                    {item.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-lg font-bold text-white leading-none">{m.val}</div>
                        <div className="text-[9px] font-medium text-white/60 mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-[1440px] relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#8B5CF6] to-[#f59e0c] p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex items-center gap-6">
            <img
              src={ctaCubes}
              alt=""
              className="h-24 w-auto hidden sm:block object-contain mix-blend-normal opacity-90 hover:scale-[1.05] transition-transform duration-500"
            />
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-normal leading-tight">
                Let's Build Your Dream Team
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90 max-w-2xl">
                Partner with TechNova Systems to find, hire, and manage the right talent—faster.
                Your next great hire is just one conversation away.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Button
              variant="glass"
              size="hero"
              className="bg-white/10 hover:bg-white/20 border-white/25 shadow-lg"
              asChild
            >
              <a href="#contact">
                Schedule a Consultation
                <ArrowRight size={18} className="ml-1.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "",
  });
  const [interests, setInterests] = useState({
    aiStrategy: false,
    digitalTransformation: false,
    workforceTrends: false,
    cybersecurity: false,
    cloud: false,
  });
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribeFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    const form = new FormData();
    form.append("your-name", formData.fullName);
    form.append("your-email", formData.email);
    form.append("your-company", formData.company);
    form.append("your-role", formData.role);
    const chosenInterests = Object.keys(interests)
      .filter((k) => (interests as any)[k])
      .join(", ");
    form.append("your-interests", chosenInterests);

    try {
      const formId = window.wpData && window.wpData.subscribe_form_id ? window.wpData.subscribe_form_id : "1002";
      await fetch(`/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
        method: "POST",
        body: form,
      });
      setTimeout(() => {
        setSubscribed(false);
        setFormData({
          fullName: "",
          email: "",
          company: "",
          role: "",
        });
        setInterests({
          aiStrategy: false,
          digitalTransformation: false,
          workforceTrends: false,
          cybersecurity: false,
          cloud: false,
        });
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewsletterBarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubscribed(true);
    const form = new FormData();
    form.append("your-email", newsletterEmail);

    try {
      const formId = window.wpData && window.wpData.newsletter_form_id ? window.wpData.newsletter_form_id : "1003";
      await fetch(`/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
        method: "POST",
        body: form,
      });
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail("");
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="insights-page min-h-screen bg-[#f7f9fc] font-body text-[#0b132b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#071224] px-4 pb-24 text-white sm:px-6 lg:px-8">
        <img
          src={industryHeroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,22,0.96)_0%,rgba(4,10,22,0.74)_28%,rgba(4,10,22,0.34)_52%,rgba(4,10,22,0.70)_78%,rgba(4,10,22,0.92)_100%)] animate-fade-in" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#071224]/50" />

        <div className="relative z-30 -mx-4 sm:-mx-6 lg:-mx-8">
          <SiteHeader />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] pt-16 grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 pt-4 animate-fade-rise">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a78bfa]">
              {window.wpData?.insights_kicker || "AI & Insights"}
            </p>
            <h1 className="font-display mt-5 max-w-2xl text-5xl font-normal leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl text-white">
              {window.wpData && window.wpData.insights_headline ? (
                <WaveLetters parts={parseHeadline(window.wpData.insights_headline)} />
              ) : (
                <>
                  Ideas. Insights. Intelligence. <span className="text-[#f59e0c]">Impact.</span>
                </>
              )}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
              {window.wpData?.insights_description || "Expert perspectives, industry trends, and practical strategies at the intersection of AI, technology, and the future of work."}
            </p>

            {/* Search Bar */}
            <form onSubmit={(e) => e.preventDefault()} className="mt-10 max-w-xl flex gap-3">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 pl-12 text-sm text-white placeholder-white/50 outline-none backdrop-blur-sm transition focus:border-white/40 focus:bg-white/15"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                  <Search size={18} />
                </span>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center rounded-xl bg-[#8B5CF6] hover:bg-[#7c3aed] text-white px-6 transition-colors shadow-lg shadow-purple-500/20 cursor-pointer"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right Column: Newsletter Subscription Card */}
          <div className="lg:col-span-5 scroll-mt-24 rounded-3xl border border-white/70 bg-white p-6 text-[#0b132b] shadow-2xl sm:p-8 animate-fade-rise-delay">
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#0b132b] flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-[#8B5CF6]">
                <Mail size={16} />
              </span>
              Stay Ahead with AI & Technology
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-500">
              Get exclusive AI insights, technology trends, hiring reports, and digital transformation strategies delivered to your inbox.
            </p>

            {subscribed ? (
              <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
                  <Check size={32} strokeWidth={3} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-800">Subscription Confirmed!</h3>
                <p className="mt-2 text-sm text-slate-500 max-w-xs">
                  Thank you for subscribing. We will send you our next update soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribeFormSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full Name*"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                  />
                  <input
                    type="email"
                    placeholder="Work Email*"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Company Name*"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                  />
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                  >
                    <option value="" disabled hidden>I am...*</option>
                    <option value="executive">Executive / C-Suite</option>
                    <option value="manager">Manager / Director</option>
                    <option value="contributor">Individual Contributor</option>
                    <option value="consultant">Consultant</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-2">Areas of Interest (Select all that apply)</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {[
                      { key: "aiStrategy", label: "AI Strategy" },
                      { key: "digitalTransformation", label: "Digital Transformation" },
                      { key: "workforceTrends", label: "Workforce Trends" },
                      { key: "cybersecurity", label: "Cybersecurity" },
                      { key: "cloud", label: "Cloud" }
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={interests[item.key as keyof typeof interests]}
                          onChange={(e) => setInterests({ ...interests, [item.key]: e.target.checked })}
                          className="rounded border-slate-300 text-[#8B5CF6] focus:ring-[#8B5CF6] h-4 w-4"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="hero"
                  className="mt-2 w-full justify-center bg-gradient-to-r from-[#8B5CF6] to-[#f59e0c] text-white hover:opacity-90 shadow-lg shadow-purple-500/20 hover:scale-[1.01] transition-all cursor-pointer font-semibold"
                >
                  Subscribe & Get Insights
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <div className="flex justify-center gap-4 text-[10px] text-slate-400 mt-2">
                  <span>📅 Weekly insights</span>
                  <span>🛡️ No spam</span>
                  <span>🔒 Unsubscribe anytime</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Featured Insight Section */}
      <section className="scroll-reveal-section bg-white px-4 py-20 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6] mb-8">
            Featured Insight
          </h2>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Big Card */}
            <article className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-100 bg-[#f8fafc] overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-[320px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
                  alt="AI Node Network Over City"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute left-6 top-6 rounded-full bg-[#8B5CF6] text-white text-xs font-bold px-3 py-1 uppercase animate-pulse">
                  Featured
                </span>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">May 20, 2024 &bull; 8 min read</p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-slate-800 mt-3 leading-tight group-hover:text-[#8B5CF6] transition-colors">
                    The Enterprise AI Advantage: Turning Innovation into Measurable Business Impact
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-500">
                    How forward-thinking organizations are leveraging AI to drive efficiency, enhance customer experiences, and unlock new growth opportunities in a hyper-competitive landscape.
                  </p>
                </div>
                <a href="#newsletter-bar" className="mt-8 flex items-center text-sm font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors group-hover:translate-x-1 duration-200">
                  Read More
                  <ArrowRight size={16} className="ml-1.5" />
                </a>
              </div>
            </article>

            {/* Right List Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {[
                {
                  kicker: "AI Strategy",
                  title: "Building an AI Roadmap That Delivers Real ROI",
                  meta: "May 15, 2024 &bull; 6 min read",
                  color: "text-purple-600 bg-purple-50"
                },
                {
                  kicker: "Future of Work",
                  title: "Skills That Will Define the Future Workforce",
                  meta: "May 10, 2024 &bull; 5 min read",
                  color: "text-amber-600 bg-amber-50"
                },
                {
                  kicker: "Technology",
                  title: "Cloud, Data, and AI: The Power Trio for Digital Transformation",
                  meta: "May 5, 2024 &bull; 7 min read",
                  color: "text-emerald-600 bg-emerald-50"
                }
              ].map((article, i) => (
                <article key={i} className="rounded-3xl border border-slate-100 bg-white p-6 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between flex-grow">
                  <div>
                    <span className={`inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-xs font-bold uppercase ${article.color}`}>
                      {article.kicker}
                    </span>
                    <h4 className="text-base font-bold text-slate-800 mt-4 leading-snug group-hover:text-[#8B5CF6] transition-colors">
                      {article.title}
                    </h4>
                  </div>
                  <div className="mt-6 flex justify-between items-center border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-400 font-semibold">{article.meta}</span>
                    <a href="#newsletter-bar" className="flex items-center text-xs font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">
                      Read More
                      <ArrowRight size={14} className="ml-1" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="scroll-reveal-section bg-slate-50/50 px-4 py-20 text-[#0b132b] sm:px-6 lg:px-8 border-t border-b border-slate-100">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
                Latest Articles
              </p>
              <h2 className="font-display mt-4 text-4xl font-normal leading-none sm:text-5xl">
                Recent Insights & Perspectives
              </h2>
            </div>
            <a href="#newsletter-bar" className="text-sm font-semibold text-[#8B5CF6] hover:text-[#7C3AED] flex items-center mt-4 sm:mt-0">
              View All Articles
              <ArrowRight size={16} className="ml-1.5" />
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                category: "AI Strategy",
                date: "May 12, 2024",
                readTime: "6 min read",
                title: "From Pilot to Scale: 7 Steps to Successful AI Implementation",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
                color: "text-purple-600 bg-purple-50"
              },
              {
                category: "Leadership",
                date: "May 10, 2024",
                readTime: "5 min read",
                title: "Leading Through Change: How Leaders Can Drive AI Adoption",
                img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
                color: "text-blue-600 bg-blue-50"
              },
              {
                category: "Industry Trends",
                date: "May 5, 2024",
                readTime: "7 min read",
                title: "Sustainability and AI: Building a Smarter, Greener Tomorrow",
                img: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=400&auto=format&fit=crop",
                color: "text-emerald-600 bg-emerald-50"
              }
            ].map((article, i) => (
              <article key={i} className="rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
                <div className="h-48 overflow-hidden relative">
                  <img src={article.img} alt={article.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${article.color}`}>
                        {article.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{article.date} &bull; {article.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mt-4 leading-snug group-hover:text-[#8B5CF6] transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <a href="#newsletter-bar" className="mt-6 flex items-center text-xs font-bold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">
                    Read More
                    <ArrowRight size={12} className="ml-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reports & Resources Section */}
      <section className="scroll-reveal-section bg-white px-4 py-20 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#f59e0c]">
                Featured Reports & Resources
              </p>
              <h2 className="font-display mt-4 text-4xl font-normal leading-none sm:text-5xl">
                Deep-Dive Reports & Whitepapers
              </h2>
            </div>
            <a href="#newsletter-bar" className="text-sm font-semibold text-[#8B5CF6] hover:text-[#7C3AED] flex items-center mt-4 sm:mt-0">
              Explore All Resources
              <ArrowRight size={16} className="ml-1.5" />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "AI Hiring Report 2026",
                desc: "Key hiring trends, in-demand skills, and salary benchmarks.",
                icon: BrainCircuit,
                theme: "bg-slate-900 border-slate-800 text-white"
              },
              {
                title: "Future of Work Outlook 2026",
                desc: "Workforce trends shaping the next decade.",
                icon: UsersRound,
                theme: "bg-indigo-950 border-indigo-900 text-white"
              },
              {
                title: "Enterprise AI Adoption Playbook",
                desc: "A practical guide to successfully adopt AI at scale.",
                icon: BadgeCheck,
                theme: "bg-emerald-950 border-emerald-900 text-white"
              },
              {
                title: "Digital Transformation Guide",
                desc: "Strategies to modernize operations and drive growth.",
                icon: TrendingUp,
                theme: "bg-amber-950 border-amber-900 text-white"
              }
            ].map((report, i) => {
              const Icon = report.icon;
              return (
                <div key={i} className={`rounded-3xl border p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group ${report.theme} min-h-[300px]`}>
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white mb-6">
                      <Icon size={24} />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">{report.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-white/70">{report.desc}</p>
                  </div>
                  <a href="#newsletter-bar" className="mt-8 flex items-center justify-start text-xs font-semibold text-white/90 hover:text-white transition-colors group-hover:translate-y-0.5 duration-200">
                    Download Now
                    <ArrowRight size={14} className="ml-1.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekly Newsletter Bar */}
      <section id="newsletter-bar" className="scroll-reveal-section px-4 py-12 bg-slate-950 text-white border-t border-white/5">
        <div className="mx-auto max-w-[1440px] flex flex-col lg:flex-row justify-between items-center gap-8 px-6">
          <div className="flex gap-4 items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-[#c4b5fd]">
              <Mail size={22} />
            </span>
            <div>
              <h3 className="text-xl font-bold font-display tracking-tight text-white sm:text-2xl">
                The Future Belongs to Organizations That Learn Faster.
              </h3>
              <p className="mt-1 text-xs text-white/60 font-semibold">
                Get practical insights from TechNova experts every week.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px] lg:min-w-[420px]">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-500/10 border border-emerald-500/20 px-5 py-3.5 rounded-xl w-full">
                <Check size={16} strokeWidth={3} />
                Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleNewsletterBarSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-grow rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/20 focus:bg-white/10"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#f59e0c] text-white hover:opacity-90 font-semibold px-6 py-3.5 text-sm transition-all shadow-lg shadow-purple-500/20 cursor-pointer text-center"
                >
                  Subscribe Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Why Read TechNova Insights Section */}
      <section className="scroll-reveal-section bg-white px-4 py-20 text-[#0b132b] sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
              Why Read TechNova Insights?
            </p>
            <h2 className="font-display mt-4 text-4xl font-normal leading-none sm:text-5xl">
              Equip Your Organization with What's Next
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Research-backed Insights",
                desc: "In-depth analysis backed by data, research, and real-world experience.",
                icon: Search,
                color: "text-purple-600 bg-purple-50"
              },
              {
                title: "Practical AI Strategies",
                desc: "Actionable frameworks and strategies you can implement today.",
                icon: Cpu,
                color: "text-amber-600 bg-amber-50"
              },
              {
                title: "Enterprise Case Studies",
                desc: "Learn from real organizations driving transformation with technology.",
                icon: Building2,
                color: "text-emerald-600 bg-emerald-50"
              },
              {
                title: "Industry Thought Leadership",
                desc: "Expert opinions from leaders shaping the future of AI and work.",
                icon: UsersRound,
                color: "text-blue-600 bg-blue-50"
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-4 items-start">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.color} shadow-inner`}>
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 leading-snug">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="scroll-reveal-section px-4 pb-16 pt-16 bg-white">
        <div className="relative mx-auto grid max-w-[1440px] gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#8B5CF6] to-[#f59e0c] p-10 text-white lg:grid-cols-12 lg:items-center">
          {/* Decorative shapes */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <img src={ctaCubes} alt="" className="h-64 w-auto object-contain" />
          </div>

          <div className="lg:col-span-8 relative z-10">
            <h2 className="font-display text-4xl font-normal tracking-tight sm:text-5xl">
              Ready to Transform Your Workforce?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/90 max-w-2xl">
              Partner with TechNova to build future-ready teams and drive measurable business impact.
            </p>
          </div>
          <div className="flex lg:col-span-4 lg:justify-end relative z-10">
            <Button
              variant="glass"
              size="hero"
              asChild
              className="bg-white text-slate-900 border-white hover:bg-white/90 font-semibold cursor-pointer shadow-xl hover:scale-[1.03]"
            >
              <a href="#contact">
                Schedule a Consultation
                <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function TalentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    location: "",
    jobTitle: "",
    experience: "",
    primarySkill: "",
    jobType: "",
    workLocation: "",
    expectedSalary: "",
    linkedin: "",
    portfolio: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData();
    form.append("your-name", formData.fullName);
    form.append("your-email", formData.email);
    form.append("your-phone", formData.mobile);
    form.append("your-location", formData.location);
    form.append("your-title", formData.jobTitle);
    form.append("your-experience", formData.experience);
    form.append("your-skill", formData.primarySkill);
    form.append("your-jobtype", formData.jobType);
    form.append("your-worklocation", formData.workLocation);
    form.append("your-salary", formData.expectedSalary);
    form.append("your-linkedin", formData.linkedin);
    form.append("your-portfolio", formData.portfolio);
    if (resumeFile) {
      form.append("resume-file", resumeFile);
    }
    form.append("form-source", "Talent Resume Submission");

    try {
      const formId = window.wpData?.contact_form_id || window.wpData?.employers_form_id || window.wpData?.talent_form_id || window.wpData?.home_contact_form_id || "21";
      const response = await fetch(
        `/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
        {
          method: "POST",
          body: form,
        }
      );
      const result = await response.json();
      if (result.status === "mail_sent") {
        setStatus("success");
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          location: "",
          jobTitle: "",
          experience: "",
          primarySkill: "",
          jobType: "",
          workLocation: "",
          expectedSalary: "",
          linkedin: "",
          portfolio: "",
        });
        setResumeFile(null);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("CF7 Error Result:", result);
        alert("CF7 Error Status: " + (result.status || "Unknown") + "\nMessage: " + (result.message || "Failed to submit. Check Form ID/Fields."));
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="talent-page min-h-screen bg-[#f7f9fc] font-body text-[#0b132b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#071224] px-4 pb-24 text-white sm:px-6 lg:px-8">
        <img
          src={industryHeroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,22,0.96)_0%,rgba(4,10,22,0.74)_28%,rgba(4,10,22,0.34)_52%,rgba(4,10,22,0.70)_78%,rgba(4,10,22,0.92)_100%)] animate-fade-in" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#071224]/50" />

        <div className="relative z-30 -mx-4 sm:-mx-6 lg:-mx-8">
          <SiteHeader />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] pt-16 grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 pt-4 animate-fade-rise">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a78bfa]">
              {window.wpData?.talent_kicker || "For Talent"}
            </p>
            <h1 className="font-display mt-5 max-w-2xl text-5xl font-normal leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl text-white">
              {window.wpData && window.wpData.talent_headline ? (
                <WaveLetters parts={parseHeadline(window.wpData.talent_headline)} />
              ) : (
                <>
                  Find the Right Opportunity. Build the Career{" "}
                  <span className="text-[#f59e0c]">You Deserve.</span>
                </>
              )}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
              {window.wpData?.talent_description || "We connect exceptional talent with forward-thinking companies and opportunities that help you grow, earn more, and make a real impact."}
            </p>

            <div className="mt-16 grid gap-6 sm:grid-cols-3 max-w-2xl">
              <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                  <Building2 size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">Top Companies</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    Access leading organizations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                  <TrendingUp size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">Career Growth</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    Opportunities that accelerate your career.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/20 text-[#a78bfa]">
                  <BadgeCheck size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">Personalized Match</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    AI-powered matching for the right roles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div id="resume-form" className="lg:col-span-5 scroll-mt-24 rounded-3xl border border-white/70 bg-white p-6 text-[#0b132b] shadow-2xl sm:p-8 animate-fade-rise-delay">
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#0b132b]">
              Submit Your Resume
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-500">
              Take the next step in your career. We'll help you find the right opportunities.
            </p>
            {submitted ? (
              <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
                  <Check size={32} strokeWidth={3} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-800">Application Submitted!</h3>
                <p className="mt-2 text-sm text-slate-500 max-w-xs">
                  Thank you for submitting your resume. Our team will review your profile and contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Full Name*"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="email"
                      placeholder="Email Address*"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <input
                      type="tel"
                      placeholder="Mobile Number*"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Current Location*"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Current Job Title*"
                      required
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <select
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    >
                      <option value="" disabled hidden>Years of Experience*</option>
                      <option value="1-2">1-2 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5-8">5-8 Years</option>
                      <option value="8+">8+ Years</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Primary Skill*"
                      required
                      value={formData.primarySkill}
                      onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <select
                      required
                      value={formData.jobType}
                      onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    >
                      <option value="" disabled hidden>Preferred Job Type*</option>
                      <option value="full-time">Full-time</option>
                      <option value="contract">Contract</option>
                      <option value="contract-to-hire">Contract-to-hire</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <select
                      required
                      value={formData.workLocation}
                      onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    >
                      <option value="" disabled hidden>Preferred Work Location*</option>
                      <option value="on-site">On-site</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <select
                      required
                      value={formData.expectedSalary}
                      onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    >
                      <option value="" disabled hidden>Expected Salary*</option>
                      <option value="<50k">&lt; $50k</option>
                      <option value="50k-100k">$50k - $100k</option>
                      <option value="100k-150k">$100k - $150k</option>
                      <option value="150k+">$150k+</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <input
                      type="url"
                      placeholder="LinkedIn Profile (Optional)"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="url"
                      placeholder="Portfolio / GitHub (Optional)"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-slate-700 mb-2">Upload Your Resume*</label>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${dragActive ? "border-[#8B5CF6] bg-purple-50/50" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
                      }`}
                  >
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-[#8B5CF6] mb-3">
                      <Upload size={20} />
                    </span>
                    {resumeFile ? (
                      <p className="text-sm font-semibold text-slate-700">{resumeFile.name}</p>
                    ) : (
                      <>
                        <p className="text-sm text-slate-600">
                          Drag & drop your file here or <span className="text-[#8B5CF6] font-medium underline">Browse File</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-400">PDF, DOC, DOCX (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                {status === "error" && (
                  <div className="bg-rose-50 text-rose-800 text-sm px-4 py-3 rounded-xl border border-rose-100 font-medium mt-2">
                    Oops! Something went wrong while submitting. Please try again.
                  </div>
                )}

                <Button
                  type="submit"
                  variant="default"
                  size="hero"
                  disabled={status === "loading"}
                  className="mt-4 w-full justify-center bg-gradient-to-r from-[#8B5CF6] to-[#f59e0c] text-white hover:opacity-90 shadow-lg shadow-purple-500/20 hover:scale-[1.01] transition-all cursor-pointer font-semibold disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting Resume..." : "Submit Resume"}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <p className="text-center text-[10px] text-slate-400 mt-2">
                  🔒 Your information is secure and confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="scroll-reveal-section relative z-10 -mt-12 mx-4 sm:mx-6 lg:mx-8">
        <div className="mx-auto max-w-[1440px] rounded-3xl bg-[#0b132b] px-6 py-8 shadow-2xl border border-white/10 text-white sm:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "1000+", label: "Active Job Opportunities", icon: BriefcaseBusiness, color: "text-purple-400 bg-purple-500/10" },
              { value: "500+", label: "Top Hiring Partners", icon: Building2, color: "text-amber-400 bg-amber-500/10" },
              { value: "25K+", label: "Talents Placed", icon: Users, color: "text-emerald-400 bg-emerald-500/10" },
              { value: "98%", label: "Candidate Satisfaction", icon: Star, color: "text-blue-400 bg-blue-500/10" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
                    <Icon size={22} />
                  </span>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">{stat.value}</div>
                    <div className="text-xs text-white/60 font-medium mt-0.5">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Opportunities Section */}
      <section className="scroll-reveal-section bg-white px-4 pt-20 pb-16 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center animate-fade-rise">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
              Explore Opportunities
            </p>
            <h2 className="font-display mt-4 text-4xl font-normal leading-none sm:text-5xl">
              Featured Opportunities
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {[
              { title: "AI & Machine Learning", desc: "Build intelligent systems that shape the future.", icon: BrainCircuit, color: "text-purple-600 bg-purple-50 hover:bg-purple-100/50" },
              { title: "Software Development", desc: "Create scalable applications and digital experiences.", icon: Cpu, color: "text-orange-600 bg-orange-50 hover:bg-orange-100/50" },
              { title: "Cloud & DevOps", desc: "Design, deploy and scale modern cloud solutions.", icon: Globe, color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100/50" },
              { title: "Cybersecurity", desc: "Protect systems and data in a digital-first world.", icon: Lock, color: "text-blue-600 bg-blue-50 hover:bg-blue-100/50" },
              { title: "UI/UX Design", desc: "Design meaningful experiences people love.", icon: Palette, color: "text-[#db2777] bg-pink-50 hover:bg-pink-100/50" },
              { title: "Data Science", desc: "Turn data into insights and business impact.", icon: TrendingUp, color: "text-cyan-600 bg-cyan-50 hover:bg-cyan-100/50" },
            ].map((role, i) => {
              const Icon = role.icon;
              return (
                <div key={i} className="flex flex-col justify-between p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                  <div>
                    <span className={`flex h-12 w-12 items-center justify-center rounded-full mb-6 ${role.color.split(" ")[1]} ${role.color.split(" ")[0]} transition-colors`}>
                      <Icon size={22} />
                    </span>
                    <h3 className="text-base font-semibold text-slate-800 leading-snug">{role.title}</h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-500">{role.desc}</p>
                  </div>
                  <a href="#resume-form" className="mt-6 flex items-center text-xs font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors group-hover:translate-x-1 duration-200">
                    Explore Jobs
                    <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose TechNova Section */}
      <section className="scroll-reveal-section bg-slate-50/50 px-4 py-16 text-[#0b132b] sm:px-6 lg:px-8 border-t border-b border-slate-100">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#f59e0c]">
              Why Choose TechNova
            </p>
            <h2 className="font-display mt-4 text-4xl font-normal leading-none sm:text-5xl">
              We're With You at Every Step of Your Career Journey
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Career Growth",
                desc: "Access learning resources, upskilling programs, and challenging opportunities.",
                icon: TrendingUp,
                color: "text-purple-600 bg-purple-100/50",
                gradient: "from-purple-500/5 to-transparent"
              },
              {
                title: "Top Employers",
                desc: "Work with leading companies that value talent and drive innovation.",
                icon: Building2,
                color: "text-amber-600 bg-amber-100/50",
                gradient: "from-amber-500/5 to-transparent"
              },
              {
                title: "Personalized Matching",
                desc: "AI-powered matching connects you with roles that fit your skills and goals.",
                icon: BrainCircuit,
                color: "text-emerald-600 bg-emerald-100/50",
                gradient: "from-emerald-500/5 to-transparent"
              },
              {
                title: "Dedicated Support",
                desc: "Our career experts are here to guide you at every stage of your journey.",
                icon: ShieldCheck,
                color: "text-blue-600 bg-blue-100/50",
                gradient: "from-blue-500/5 to-transparent"
              },
            ].map((reason, i) => {
              const Icon = reason.icon;
              return (
                <div key={i} className={`relative overflow-hidden p-8 rounded-3xl border border-slate-200 bg-white hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${reason.gradient}`}>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl mb-6 ${reason.color}`}>
                    <Icon size={24} />
                  </span>
                  <h3 className="text-lg font-semibold text-slate-800">{reason.title}</h3>
                  <p className="mt-3.5 text-sm leading-relaxed text-slate-500">{reason.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="scroll-reveal-section bg-white px-4 py-20 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
              How It Works
            </p>
            <h2 className="font-display mt-4 text-4xl font-normal leading-none sm:text-5xl">
              Your Journey to the Right Opportunity
            </h2>
          </div>

          <div className="relative mt-16 max-w-5xl mx-auto">
            {/* Connection Line */}
            <div className="absolute top-[32px] left-[10%] right-[10%] h-0.5 hidden lg:block z-0">
              <svg className="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none">
                <line x1="0" y1="1" x2="100%" y2="1" stroke="#cbd5e1" strokeWidth="2" className="animate-timeline-flow" />
              </svg>
            </div>

            <div className="grid gap-8 lg:grid-cols-5 relative z-10">
              {[
                { step: "1", title: "Submit Resume", desc: "Share your profile and experience with us.", icon: FileUser, color: "border-purple-200 bg-purple-50 text-purple-600" },
                { step: "2", title: "Profile Review", desc: "Our experts review your profile and understand your goals.", icon: UserRoundSearch, color: "border-amber-200 bg-amber-50 text-amber-600" },
                { step: "3", title: "Interview Matching", desc: "We match you with the best opportunities.", icon: UsersRound, color: "border-emerald-200 bg-emerald-50 text-emerald-600" },
                { step: "4", title: "Employer Interviews", desc: "Meet with top companies and showcase your skills.", icon: Building2, color: "border-blue-200 bg-blue-50 text-blue-600" },
                { step: "5", title: "Offer & Onboarding", desc: "Get your offer and start your new career journey.", icon: BadgeCheck, color: "border-rose-200 bg-rose-50 text-rose-600" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center bg-white lg:bg-transparent p-4 lg:p-0 rounded-2xl">
                    <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${item.color} shadow-lg mb-6 hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">{item.step}. {item.title}</h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-500 max-w-[180px]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="scroll-reveal-section bg-white py-20 text-[#0b132b]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
                Success Stories
              </p>
              <h2 className="font-display mt-4 text-4xl font-normal leading-none sm:text-5xl">
                Real People. Real Journeys. Real Impact.
              </h2>
            </div>
            <a href="#resume-form" className="text-sm font-semibold text-[#8B5CF6] hover:text-[#7C3AED] flex items-center mt-4 sm:mt-0">
              View All Stories
              <ArrowRight size={16} className="ml-1.5" />
            </a>
          </div>
        </div>

        {/* Testimonial Marquee */}
        <div className="testimonial-marquee">
          <div className="testimonial-marquee-track">
            {[0, 1].map((groupIndex) => (
              <div className="testimonial-marquee-group" key={groupIndex}>
                {[
                  {
                    quote: "TechNova helped me transition into a product role at a top SaaS company. Their guidance and support made all the difference.",
                    author: "Arjun Mehta",
                    role: "Product Manager",
                    logo: microsoftLogo,
                    companyName: "Microsoft",
                    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                  },
                  {
                    quote: "The opportunities and mentorship I received through TechNova accelerated my growth beyond what I imagined.",
                    author: "Priya Sharma",
                    role: "Data Scientist",
                    logo: null,
                    companyName: "Deloitte.",
                    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"
                  },
                  {
                    quote: "Within weeks, I connected with the right team and the right role. Truly a game-changer for my career.",
                    author: "Rahul Verma",
                    role: "DevOps Engineer",
                    logo: awsLogo,
                    companyName: "AWS",
                    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
                  },
                  {
                    quote: "Designing user-centric products is my passion, and TechNova matched me with the exact creative team I was searching for.",
                    author: "Anjali Rao",
                    role: "UX Designer",
                    logo: googleLogo,
                    companyName: "Google",
                    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                  },
                  {
                    quote: "I wanted to work on high-scale systems. TechNova aligned my technical strengths with an amazing team.",
                    author: "Vikram Singh",
                    role: "Full Stack Engineer",
                    logo: ciscoLogo,
                    companyName: "Cisco",
                    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop"
                  },
                  {
                    quote: "The transition from academia to industry was seamless. TechNova understood the unique nature of my AI background.",
                    author: "Sneha Patel",
                    role: "AI Research Engineer",
                    logo: oracleLogo,
                    companyName: "Oracle",
                    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop"
                  }
                ].map((story, i) => (
                  <div key={`${story.author}-${groupIndex}-${i}`} className="w-[360px] shrink-0 rounded-3xl border border-slate-100 bg-[#f8fafc] p-8 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-6xl font-serif text-purple-200 absolute top-4 left-6 pointer-events-none font-display">“</span>
                    <p className="text-sm leading-relaxed text-slate-600 italic relative z-10 mb-8 mt-2 h-20 overflow-hidden line-clamp-3">
                      {story.quote}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-200/60 pt-6 mt-auto">
                      <div className="flex items-center gap-3">
                        <img src={story.img} alt={story.author} className="h-10 w-10 rounded-full object-cover border border-slate-200" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 leading-snug">{story.author}</h4>
                          <p className="text-xs text-slate-400 font-semibold">{story.role}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Placed At</span>
                        {story.logo ? (
                          <img src={story.logo} alt={story.companyName} className="h-4 w-auto opacity-80" />
                        ) : (
                          <span className="text-sm font-extrabold text-emerald-600 tracking-tight">{story.companyName}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Resources Section */}
      <section className="scroll-reveal-section bg-slate-50/50 px-4 py-20 text-[#0b132b] sm:px-6 lg:px-8 border-t border-b border-slate-100">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
              Career Resources
            </p>
            <h2 className="font-display mt-4 text-4xl font-normal leading-none sm:text-5xl">
              Tools and Insights to Accelerate Your Career
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Resume Tips", desc: "Craft a resume that gets you noticed.", icon: FileUser, color: "text-purple-600 bg-purple-50" },
              { title: "Interview Preparation", desc: "Ace your interviews with expert guidance and resources.", icon: BrainCircuit, color: "text-[#8b5cf6] bg-[#8b5cf6]/5" },
              { title: "Salary Guide", desc: "Know your worth with role and industry insights.", icon: Wallet, color: "text-emerald-600 bg-emerald-50" },
              { title: "AI Career Trends", desc: "Explore how AI is shaping the future of work.", icon: Cpu, color: "text-blue-600 bg-blue-50" },
            ].map((resource, i) => {
              const Icon = resource.icon;
              return (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
                  <div>
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl mb-4 ${resource.color}`}>
                      <Icon size={20} />
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 leading-snug">{resource.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{resource.desc}</p>
                  </div>
                  <a href="#resume-form" className="mt-6 flex items-center text-xs font-bold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors group-hover:translate-x-0.5 duration-200">
                    Read More
                    <ArrowRight size={12} className="ml-1" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="scroll-reveal-section bg-white px-4 py-20 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#f59e0c]">
              FAQs
            </p>
            <h2 className="font-display mt-4 text-4xl font-normal leading-none sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
            {[
              {
                q: "How can I apply for jobs through TechNova Systems?",
                a: "You can apply by submitting your resume through our online form above. Once submitted, our AI-powered matching system and career consultants will review your profile and match you with suitable open positions."
              },
              {
                q: "How does TechNova match me with jobs?",
                a: "We use a combination of advanced AI-powered matching algorithms and expert human review to assess your skills, experience, and career goals, ensuring we find roles that are a perfect fit."
              },
              {
                q: "Is there a fee to apply for jobs?",
                a: "No, there is absolutely no fee for candidates. Our recruitment services are entirely free for job seekers, as we partner with employers to fill their open roles."
              },
              {
                q: "Can I update my resume after submitting?",
                a: "Yes! You can re-submit the form at any time with your updated resume, or reach out directly to your assigned TechNova career consultant to update your profile details."
              },
              {
                q: "How long does the hiring process take?",
                a: "The timeline varies based on the role and employer requirements. Typically, we present shortlisted candidates to employers within 48 hours of initial review, and the full process takes between 2 to 4 weeks."
              },
              {
                q: "What types of companies hire through TechNova?",
                a: "We work with a wide range of companies, from fast-growing technology startups to Fortune 500 enterprises, across industries like Tech, Finance, Healthcare, Retail, and Manufacturing."
              }
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 transition-all">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="flex w-full items-center justify-between text-left font-bold text-slate-800 focus:outline-none"
                >
                  <span className="text-sm leading-snug pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-slate-400 transition-transform duration-300 ${openFaqIndex === i ? "rotate-180 text-[#8B5CF6]" : ""
                      }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${openFaqIndex === i ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 h-0 overflow-hidden"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs leading-relaxed text-slate-500">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="scroll-reveal-section px-4 pb-16 pt-8 sm:px-6 lg:px-8 bg-white">
        <div className="relative mx-auto grid max-w-[1440px] gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#8B5CF6] to-[#f59e0c] p-10 text-white lg:grid-cols-12 lg:items-center">
          {/* Decorative shapes */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <img src={ctaCubes} alt="" className="h-64 w-auto object-contain" />
          </div>

          <div className="lg:col-span-8 relative z-10">
            <h2 className="font-display text-4xl font-normal tracking-tight sm:text-5xl">
              Your Next Opportunity Starts Here
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/90 max-w-2xl">
              Submit your resume today and let our experts help you find the right role, faster.
            </p>
          </div>
          <div className="flex lg:col-span-4 lg:justify-end relative z-10">
            <Button
              variant="glass"
              size="hero"
              onClick={() => {
                const element = document.getElementById("resume-form");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-white text-slate-900 border-white hover:bg-white/90 font-semibold cursor-pointer shadow-xl hover:scale-[1.03]"
            >
              Submit Your Resume
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function App() {
  const partnersList = window.wpData?.home_partners
    ? window.wpData.home_partners.map((p: any) => ({ name: p.partner_name, src: p.logo_image }))
    : trustedLogos;

  const solutionsList = window.wpData?.home_solutions
    ? window.wpData.home_solutions.map((s: any) => ({
        title: s.title,
        description: s.description,
        icon: getIconComponent(s.icon_name),
        color: s.color_class || "blue",
        video: s.video_file,
      }))
    : capabilityCards;

  const industriesList = window.wpData?.industries_list
    ? window.wpData.industries_list.map((i: any) => ({
        title: i.title,
        description: i.description,
        video: i.video_file,
        visual: i.title.toLowerCase().split(" ")[0],
      }))
    : industryCards;

  const statsList = window.wpData?.home_stats
    ? window.wpData.home_stats.map((s: any) => ({
        value: s.value,
        label: s.label,
        icon: getIconComponent(s.icon_name),
      }))
    : [
        { value: "500+", label: "Enterprise Clients", icon: LucideIcons.Building2 },
        { value: "1000+", label: "Successful Placements", icon: LucideIcons.Users },
        { value: "48H", label: "Average Shortlisting Time", icon: LucideIcons.Clock },
        { value: "95%", label: "Client Retention Rate", icon: LucideIcons.ShieldCheck }
      ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeContactData, setHomeContactData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    subject: "Hire Talent",
    message: "",
  });
  const [homeContactStatus, setHomeContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleHomeContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHomeContactStatus("loading");

    const form = new FormData();
    form.append("your-name", homeContactData.fullName);
    form.append("your-company", homeContactData.company);
    form.append("your-email", homeContactData.email);
    form.append("your-phone", homeContactData.phone);
    form.append("your-subject", homeContactData.subject);
    form.append("your-message", homeContactData.message);
    form.append("form-source", "Homepage Contact Form");

    try {
      const formId = window.wpData?.contact_form_id || window.wpData?.employers_form_id || window.wpData?.talent_form_id || window.wpData?.home_contact_form_id || "21";
      const response = await fetch(
        `/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
        {
          method: "POST",
          body: form,
        }
      );
      const result = await response.json();
      if (result.status === "mail_sent") {
        setHomeContactStatus("success");
        setHomeContactData({
          fullName: "",
          company: "",
          email: "",
          phone: "",
          subject: "Hire Talent",
          message: "",
        });
      } else {
        console.error("CF7 Error Result:", result);
        alert("CF7 Error Status: " + (result.status || "Unknown") + "\nMessage: " + (result.message || "Failed to submit. Check Form ID/Fields."));
        setHomeContactStatus("error");
      }
    } catch (err) {
      console.error(err);
      setHomeContactStatus("error");
    }
  };
  const [isPlaying, setIsPlaying] = useState(true);
  const [routeHash, setRouteHash] = useState(() => {
    const path = window.location.pathname.replace(/\/$/, "");
    if (path.endsWith("/contact")) return "#contact";
    if (path.endsWith("/about")) return "#about";
    if (path.endsWith("/industries")) return "#industries";
    if (path.endsWith("/employers")) return "#employers";
    if (path.endsWith("/talent")) return "#talent";
    if (path.endsWith("/insights")) return "#insights";
    return window.location.hash || "#home";
  });
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.pathname.replace(/\/$/, "");
      if (path.endsWith("/contact")) setRouteHash("#contact");
      else if (path.endsWith("/about")) setRouteHash("#about");
      else if (path.endsWith("/industries")) setRouteHash("#industries");
      else if (path.endsWith("/employers")) setRouteHash("#employers");
      else if (path.endsWith("/talent")) setRouteHash("#talent");
      else if (path.endsWith("/insights")) setRouteHash("#insights");
      else setRouteHash(window.location.hash || "#home");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 18000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    // Pause all videos
    videoRefs.current.forEach((vid) => {
      if (vid) vid.pause();
    });

    // Play active video if isPlaying is true
    const activeSlide = slides[currentSlide];
    if (activeSlide && activeSlide.bgType === "video") {
      const activeVid = videoRefs.current[currentSlide];
      if (activeVid) {
        if (isPlaying) {
          activeVid.play().catch((err) => console.log("Video play interrupted:", err));
        } else {
          activeVid.pause();
        }
      }
    }
  }, [currentSlide, isPlaying]);

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
  }, [routeHash]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [routeHash]);

  if (routeHash === "#contact") {
    return <ContactPage />;
  }

  if (routeHash === "#about") {
    return <AboutPage />;
  }

  if (routeHash === "#industries") {
    return <IndustriesPage />;
  }

  if (routeHash === "#employers") {
    return <EmployersPage />;
  }

  if (routeHash === "#talent") {
    return <TalentPage />;
  }

  if (routeHash === "#insights") {
    return <InsightsPage />;
  }

  return (
    <main className="bg-[#f2f5f9] font-body text-foreground">
      <section className="relative min-h-screen overflow-hidden bg-background">
        {/* Background cross-fade elements */}
        {slides.map((slide: any, index: number) => {
          if (slide.bgType === "video") {
            return (
              <video
                key={index}
                ref={(el) => { videoRefs.current[index] = el; }}
                className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                src={slide.bgUrl}
                autoPlay
                loop
                muted
                playsInline
              />
            );
          } else {
            return (
              <div
                key={index}
                className={`absolute inset-0 z-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                style={{ backgroundImage: `url(${slide.bgUrl})` }}
              />
            );
          }
        })}
        {/* Dark overlay to ensure text contrast */}
        <div className={`absolute inset-0 transition-colors duration-1000 z-[1] pointer-events-none ${
          currentSlide === 3 || currentSlide === 4 ? "bg-[#001726]/70" : "bg-[#001726]/40"
        }`} />

        <SiteHeader />

        {/* Carousel Content */}
        <div
          key={currentSlide}
          className="relative z-10 flex flex-col items-center justify-center px-6 py-[90px] pb-40 pt-32 text-center max-w-7xl mx-auto w-full min-h-[calc(100vh-100px)]"
        >
          <h1
            className="wave-heading animate-fade-rise max-w-[1180px] text-5xl font-normal leading-[1.02] tracking-[-2.46px] text-white sm:text-6xl md:text-[76px] lg:text-[82px]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            aria-label={slides[currentSlide].headlineParts.map((part: any) => part.text).join("")}
          >
            <WaveLetters parts={slides[currentSlide].headlineParts} />
          </h1>

          {slides[currentSlide].description ? (
            <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              {slides[currentSlide].description}
            </p>
          ) : null}

          <div className="animate-fade-rise-delay-2 mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {slides[currentSlide].ctaButtons.map((btn: any, btnIndex: number) => (
              <Button
                key={btnIndex}
                variant={btn.primary ? "default" : "glass"}
                size="hero"
                className={`cursor-pointer font-semibold transition-all ${btn.primary
                    ? "bg-[#f59e0c] text-white hover:bg-[#d97706] border border-[#f59e0c]/20 shadow-lg shadow-amber-500/20 hover:scale-[1.03]"
                    : ""
                  }`}
                asChild
              >
                <a href={btn.link}>{btn.text}</a>
              </Button>
            ))}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-8 md:left-12 z-20 hidden md:flex items-center gap-2 text-white/50 pointer-events-none animate-bounce">
          <ChevronDown size={24} />
        </div>

        {/* Carousel controls (bottom-right) */}
        <div className="absolute bottom-8 right-8 md:right-12 z-20 flex items-center gap-4">
          {/* Pill Indicator */}
          <div className="bg-black/50 text-white px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest backdrop-blur-md border border-white/10 shadow-lg">
            0{currentSlide + 1} / 0{slides.length}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:text-[#f59e0c] transition-colors p-2 cursor-pointer flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full h-10 w-10 border border-white/10 backdrop-blur-md"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              variant="glass"
              className="h-10 w-10 rounded-full flex items-center justify-center p-0 cursor-pointer text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </Button>
            <Button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              variant="glass"
              className="h-10 w-10 rounded-full flex items-center justify-center p-0 cursor-pointer text-white"
              aria-label="Next slide"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </section>

      <section className="scroll-reveal-section overflow-hidden bg-white py-10 text-[#0b132b] sm:py-12">
        <h2
          className="font-display mx-auto max-w-4xl text-center text-4xl font-normal leading-none text-[#0b132b] sm:text-5xl"
          aria-label={window.wpData?.home_partners_title || "Trusted by Leading Companies Worldwide"}
        >
          {window.wpData?.home_partners_title || "Trusted by Leading Companies Worldwide"}
        </h2>

        <div className="logo-marquee mt-9" aria-label="Trusted companies">
          <div className="logo-marquee-track">
            {[0, 1].map((groupIndex) => (
              <div className="logo-marquee-group" key={groupIndex}>
                {partnersList.map((logo: any) => (
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

      <section className="scroll-reveal-section bg-white px-4 pt-10 pb-16 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="opportunity-grid mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-2">
          <article className="scroll-reveal-card opportunity-card opportunity-card-employers">
            <div className="opportunity-content">
              <p className="section-kicker text-[#8B5CF6]">
                {window.wpData?.home_employers_card_kicker || "For Employers"}
              </p>
              <h2
                className="font-display mt-5 max-w-md text-4xl font-normal leading-[0.95] sm:text-5xl"
                aria-label={window.wpData?.home_employers_card_title || "Build. Scale. Succeed."}
              >
                {window.wpData?.home_employers_card_title || "Build. Scale. Succeed."}
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-[#475569] sm:text-lg">
                Access specialized talent, consulting expertise, and workforce solutions that drive real business impact.
              </p>

              <div className="mt-8 grid max-w-2xl gap-y-2">
                {(window.wpData?.home_employers_card_bullets || [
                  { text: "Contract-to-Hire & Performance Staffing" },
                  { text: "Executive Search & leadership hiring" },
                  { text: "AI & Digital Transformation Consulting" },
                  { text: "Managed Teams & Project Solutions" }
                ]).map((bullet: any, idx: number) => (
                  <div className="benefit-row" key={idx}>
                    <span className="benefit-check benefit-check-purple">
                      <Check aria-hidden="true" size={13} strokeWidth={3} />
                    </span>
                    <span>{bullet.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="opportunity-visual" aria-hidden="true">
              <div className="building-illustration">
                <img src={window.wpData?.home_employers_card_image || forEmployersGif} alt="" />
              </div>
            </div>
          </article>

          <article className="scroll-reveal-card opportunity-card opportunity-card-talent">
            <div className="opportunity-content">
              <p className="section-kicker text-[#F59E0B]">
                {window.wpData?.home_talent_card_kicker || "For Talent"}
              </p>
              <h2
                className="font-display mt-5 max-w-lg text-4xl font-normal leading-[0.95] sm:text-5xl"
                aria-label={window.wpData?.home_talent_card_title || "Your Next Move Starts Here."}
              >
                {window.wpData?.home_talent_card_title || "Your Next Move Starts Here."}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-[#475569] sm:text-lg">
                Explore high-impact opportunities with forward-thinking companies and accelerate your career.
              </p>

              <div className="mt-8 grid max-w-2xl gap-y-2">
                {(window.wpData?.home_talent_card_bullets || [
                  { text: "Top Tech & AI Opportunities" },
                  { text: "Career Growth & Upskilling" },
                  { text: "Work with Innovative Teams" },
                  { text: "Nationwide & Remote Roles" }
                ]).map((bullet: any, idx: number) => (
                  <div className="benefit-row" key={idx}>
                    <span className="benefit-check benefit-check-orange">
                      <Check aria-hidden="true" size={13} strokeWidth={3} />
                    </span>
                    <span>{bullet.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="opportunity-visual" aria-hidden="true">
              <div className="stairs-illustration">
                <img src={window.wpData?.home_talent_card_image || forTalentGif} alt="" />
              </div>
            </div>
          </article>

          <div className="opportunity-brand-badge" aria-hidden="true">
            <img src={opportunityBadgeIcon} alt="" />
          </div>
        </div>
      </section>

      <section className="scroll-reveal-section capabilities-section bg-white px-4 py-16 text-[#0b132b] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="section-kicker text-[#8B5CF6]">
              {window.wpData?.home_solutions_kicker || "Our Core Capabilities"}
            </p>
            <h2
              className="font-display mx-auto mt-4 max-w-5xl text-4xl font-normal leading-none sm:text-5xl"
              aria-label={window.wpData?.home_solutions_title || "End-to-End Talent & Technology Solutions"}
            >
              {window.wpData?.home_solutions_title || "End-to-End Talent & Technology Solutions"}
            </h2>
          </div>

          <div className="capabilities-grid mt-10">
            {solutionsList.map((card: any) => {
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
              {window.wpData?.home_industries_kicker || "Industries We Support"}
            </p>
            <h2
              className="font-display mx-auto mt-4 max-w-5xl text-4xl font-normal leading-none sm:text-5xl"
              aria-label={window.wpData?.home_industries_title || "Strong Partnerships Across Every Industry"}
            >
              {window.wpData?.home_industries_title || "Strong Partnerships Across Every Industry"}
            </h2>
          </div>

          <div className="industries-row mt-8">
            {industriesList.map((card: any) => {
              return (
                <article
                  className="scroll-reveal-card industry-card"
                  key={card.title}
                >
                  <div className={`industry-visual industry-visual-${card.visual}`} aria-hidden="true">
                    <video
                      src={card.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controlsList="nodownload"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
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
                {window.wpData?.home_cta_left_kicker || "AI & Technology Leadership"}
              </p>
              <h3
                className="font-display mt-5 text-4xl sm:text-5xl font-normal leading-[1.05] tracking-tight text-white"
                aria-label={window.wpData?.home_cta_left_title || "AI-Powered. Human-Led. Future-Ready"}
              >
                {window.wpData && window.wpData.home_cta_left_title ? (
                  <WaveLetters parts={parseHeadline(window.wpData.home_cta_left_title)} />
                ) : (
                  <>
                    AI-Powered. <br />
                    Human-Led. <br />
                    Future-Ready
                  </>
                )}
              </h3>
              <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed max-w-[320px]">
                {window.wpData?.home_cta_left_desc || "We combine the power of AI with human expertise to deliver scaling, hiring, deeper insights and better outcomes."}
              </p>
            </div>
            <div className="mt-auto">
              <Button variant="glass" size="cta" className="transition-all hover:scale-[1.02] border border-white/20">
                {window.wpData?.home_cta_left_btn_text || "Explore AI Solutions"}
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
                    {window.wpData?.home_cta_right_kicker || "Insights & Resources"}
                  </p>
                  <h3
                    className="font-display mt-5 text-3xl sm:text-4xl font-normal leading-tight text-[#001726]"
                    aria-label={window.wpData?.home_cta_right_title || "Insights That Drive What's Next"}
                  >
                    {window.wpData && window.wpData.home_cta_right_title ? (
                      <WaveLetters parts={parseHeadline(window.wpData.home_cta_right_title)} />
                    ) : (
                      <>
                        Insights That <br />
                        Drive What's Next
                      </>
                    )}
                  </h3>
                  <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                    {window.wpData?.home_cta_right_desc || "Stay ahead with the latest trends, reports and expert perspectives."}
                  </p>
                </div>
                <div className="mt-8">
                  <Button variant="glass-dark" size="cta" className="transition-all hover:scale-[1.02]">
                    {window.wpData?.home_cta_right_btn_text || "View All Insights"}
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
              {statsList.map((stat: any, idx: number) => {
                const Icon = stat.icon;
                const numMatch = stat.value.match(/\d+/);
                const num = numMatch ? parseInt(numMatch[0]) : 0;
                const suffix = stat.value.replace(/\d+/, "");

                return (
                  <div className="flex items-center gap-4 pl-2 md:pl-4 border-l border-slate-200/60 first:border-0 md:first:border-0" key={idx}>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#8B5CF6] shadow-md shadow-indigo-100/50">
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="text-3xl font-semibold sm:text-4xl text-slate-800 tracking-tight">
                        {num > 0 ? <Counter value={num} suffix={suffix} /> : stat.value}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
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
                <p className="text-xs font-semibold uppercase tracking-wider text-[#f59e0c] mb-4">
                  {window.wpData?.home_contact_kicker || "— CONTACT"}
                </p>
                <h2
                  className="font-display text-4xl sm:text-5xl font-normal leading-[1.1] text-slate-800 tracking-tight"
                  aria-label={window.wpData?.home_contact_headline || "Let's build something exceptional together."}
                >
                  {window.wpData && window.wpData.home_contact_headline ? (
                    <WaveLetters parts={parseHeadline(window.wpData.home_contact_headline)} />
                  ) : (
                    <>
                      Let's build something <br />
                      <span className="font-serif italic text-[#f59e0c] font-normal inline-block" style={{ fontFamily: "'Instrument Serif', serif" }}>
                        exceptional
                      </span>{" "}
                      together.
                    </>
                  )}
                </h2>
                <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                  {window.wpData?.home_contact_description || "Tell us about your hiring or consulting needs. We respond to every inquiry within 4 business hours."}
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-[#f59e0c]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email</div>
                    <a href="mailto:Info@technovasystemsinc.com" className="text-sm font-semibold text-slate-700 hover:text-[#f59e0c] transition-colors">
                      Info@technovasystemsinc.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-[#f59e0c]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone</div>
                    <a href="tel:+15716510246" className="text-sm font-semibold text-slate-700 hover:text-[#f59e0c] transition-colors">
                      +1 (571) 651 - 0246
                    </a>
                  </div>
                </div>

                {/* Headquarters */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-[#f59e0c]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Headquarters</div>
                    <div className="text-sm font-semibold leading-6 text-slate-700">
                      3701 Pender Dr Suite 510<br />
                      Fairfax, VA, 22030
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Form) */}
            <div className="lg:col-span-7 w-full">
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-100/50 w-full text-left">
                <form onSubmit={handleHomeContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={homeContactData.fullName}
                      onChange={(e) => setHomeContactData({ ...homeContactData, fullName: e.target.value })}
                      placeholder="Jane Cooper"
                      className="bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c] transition-all text-sm"
                    />
                  </div>

                  {/* Company */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={homeContactData.company}
                      onChange={(e) => setHomeContactData({ ...homeContactData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c] transition-all text-sm"
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
                      value={homeContactData.email}
                      onChange={(e) => setHomeContactData({ ...homeContactData, email: e.target.value })}
                      placeholder="jane@acme.com"
                      className="bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c] transition-all text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={homeContactData.phone}
                      onChange={(e) => setHomeContactData({ ...homeContactData, phone: e.target.value })}
                      placeholder="+1 (571) 651 - 0246"
                      className="bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c] transition-all text-sm"
                    />
                  </div>

                  {/* How can we help? */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      How can we help?
                    </label>
                    <div className="relative">
                      <select
                        value={homeContactData.subject}
                        onChange={(e) => setHomeContactData({ ...homeContactData, subject: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 appearance-none focus:outline-none focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c] transition-all text-sm"
                      >
                        <option value="Hire Talent">Hire Talent</option>
                        <option value="Find Work">Find Work</option>
                        <option value="AI / Consulting">AI / Consulting</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
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
                      value={homeContactData.message}
                      onChange={(e) => setHomeContactData({ ...homeContactData, message: e.target.value })}
                      placeholder="Tell us about the role, project, or transformation you have in mind..."
                      className="bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f59e0c] focus:ring-1 focus:ring-[#f59e0c] transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Cloudflare Turnstile CAPTCHA */}
                  <div className="md:col-span-2 flex justify-start my-2">
                    <TurnstileWidget />
                  </div>

                  {homeContactStatus === "success" && (
                    <div className="md:col-span-2 bg-emerald-50 text-emerald-800 text-sm px-4 py-3 rounded-xl border border-emerald-100 font-medium">
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}

                  {homeContactStatus === "error" && (
                    <div className="md:col-span-2 bg-rose-50 text-rose-800 text-sm px-4 py-3 rounded-xl border border-rose-100 font-medium">
                      Oops! Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  {/* Send Message Button */}
                  <div className="md:col-span-2 mt-2">
                    <button
                      type="submit"
                      disabled={homeContactStatus === "loading"}
                      className="w-full sm:w-auto bg-[#f59e0c] text-white hover:bg-[#d97706] font-semibold rounded-full px-8 py-4 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-md shadow-amber-500/10 cursor-pointer disabled:opacity-50"
                    >
                      {homeContactStatus === "loading" ? "Sending..." : "Send Message"}
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

      <SiteFooter />
    </main>
  );
}

export default App;
