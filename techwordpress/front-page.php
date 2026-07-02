<?php
/**
 * TechNova Theme Front Page
 */
get_header();

// ----------------------------------------------------
// 1. DATA PREPARATION & FALLBACKS (ACF Support)
// ----------------------------------------------------

$theme_dir = get_template_directory_uri();

// Slide 1 Video Fallback
$default_video_url = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

// Hero Slides Fallbacks
$slides = get_field('hero_slides');
if ( ! $slides ) {
    $slides = array(
        array(
            'bg_type' => 'video',
            'bg_url' => $default_video_url,
            'heading' => 'We Build <strong>High-Performance</strong> Teams That Drive <strong>What\'s Next</strong>',
            'description' => 'AI-powered talent solutions and technology consulting that help organizations innovate, scale and lead in a digital-first world.',
            'cta_buttons' => array(
                array('text' => 'Hire Top Talent', 'link' => '#', 'primary' => true),
                array('text' => 'Explore AI Solutions', 'link' => '#', 'primary' => false),
            )
        ),
        array(
            'bg_type' => 'video',
            'bg_url' => $theme_dir . '/assets/images/AI-Powered.mp4',
            'heading' => 'Accelerate <strong>Digital</strong> & <strong>AI Transformation</strong>',
            'description' => 'Modernize your operations, automate complex workflows, and unlock growth with custom intelligence.',
            'cta_buttons' => array(
                array('text' => 'Talk to an Expert', 'link' => '#', 'primary' => true),
            )
        ),
        array(
            'bg_type' => 'image',
            'bg_url' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
            'heading' => 'Build <strong>Visionary Leadership</strong> For What\'s Ahead',
            'description' => 'Direct-hire and executive search for critical technology and business-driving leadership roles.',
            'cta_buttons' => array(
                array('text' => 'Find Leaders', 'link' => '#', 'primary' => true),
                array('text' => 'Our Methodology', 'link' => '#', 'primary' => false),
            )
        ),
        array(
            'bg_type' => 'image',
            'bg_url' => 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop',
            'heading' => 'Dedicated <strong>Managed Teams</strong> Built For Speed',
            'description' => 'Deploy complete, high-impact engineering and data squads structured around your business outcomes.',
            'cta_buttons' => array(
                array('text' => 'Request a Pod', 'link' => '#', 'primary' => true),
            )
        ),
        array(
            'bg_type' => 'image',
            'bg_url' => 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1920&auto=format&fit=crop',
            'heading' => 'Strategic <strong>Workforce</strong> Planning & Design',
            'description' => 'Align your talent acquisition strategy directly with technical roadmaps and business growth goals.',
            'cta_buttons' => array(
                array('text' => 'Schedule Consultation', 'link' => '#', 'primary' => true),
            )
        )
    );
}

// Trusted Logos
$trusted_logos = get_field('trusted_logos');
if ( ! $trusted_logos ) {
    $trusted_logos = array(
        array('name' => 'AWS', 'src' => $theme_dir . '/assets/images/trusted-logos/aws.png'),
        array('name' => 'Cisco', 'src' => $theme_dir . '/assets/images/trusted-logos/cisco.png'),
        array('name' => 'Dell', 'src' => $theme_dir . '/assets/images/trusted-logos/dell.png'),
        array('name' => 'Google', 'src' => $theme_dir . '/assets/images/trusted-logos/google.png'),
        array('name' => 'Microsoft', 'src' => $theme_dir . '/assets/images/trusted-logos/microsoft.png'),
        array('name' => 'Oracle', 'src' => $theme_dir . '/assets/images/trusted-logos/oracle.png'),
    );
}

// Capabilities Directions (Mega Menu & Intro)
$capabilities = get_field('capabilities');
if ( ! $capabilities ) {
    $capabilities = array(
        array(
            'title' => 'AI Talent Solutions',
            'description' => 'Deploy pre-vetted AI, Machine Learning, Data Science, and software engineering professionals to accelerate development.',
            'icon_class' => 'brain-circuit',
            'image' => $theme_dir . '/assets/images/AI-Talent-Solution.svg',
            'list' => array('Machine Learning Engineering', 'Data Engineering & Science', 'Full Stack Development', 'Cloud Architecture')
        ),
        array(
            'title' => 'Managed Teams',
            'description' => 'Outcome-driven engineering pods led by delivery managers to own and execute your technical roadmap.',
            'icon_class' => 'badge-check',
            'image' => $theme_dir . '/assets/images/Managed-Teams .svg',
            'list' => array('Dedicated Project Leads', 'Agile Delivery Frameworks', 'Full-cycle Software Creation', 'DevOps & Infrastructure')
        ),
        array(
            'title' => 'Workforce Consulting',
            'description' => 'Align your talent acquisition framework with product pipelines and long-term technical strategies.',
            'icon_class' => 'users-round',
            'image' => $theme_dir . '/assets/images/Workforce-Consulting.svg',
            'list' => array('Skills Gap Analysis', 'Org Structure Design', 'Vendor Optimization', 'Scale Planning')
        ),
        array(
            'title' => 'Contract Staffing',
            'description' => 'Scale teams up or down dynamically with pre-screened technical contractors for project-based milestones.',
            'icon_class' => 'file-user',
            'image' => $theme_dir . '/assets/images/Contract-Staffing.svg',
            'list' => array('Rapid Deployment', 'Flexible Project Scaling', 'ACF Compliance Audited', 'Turnkey Onboarding')
        )
    );
}

// Mega Menu Directions
$megaMenuDirections = array(
    array('title' => 'Hire high-impact talent', 'description' => 'Contract-to-hire, performance staffing and managed teams.', 'icon' => 'BriefcaseBusiness', 'accent' => 'purple'),
    array('title' => 'Accelerate AI delivery', 'description' => 'AI, ML, data and digital transformation expertise.', 'icon' => 'BrainCircuit', 'accent' => 'blue'),
    array('title' => 'Build leadership capacity', 'description' => 'Executive search for critical technology and business roles.', 'icon' => 'UserRoundSearch', 'accent' => 'orange'),
);

$megaMenuSolutions = array(
    array('title' => 'AI Talent Solutions', 'description' => 'AI/ML, Data and Engineering talent', 'icon' => 'BrainCircuit'),
    array('title' => 'Executive Search', 'description' => 'C-Suite to Director-level hiring', 'icon' => 'UserRoundSearch'),
    array('title' => 'Workforce Consulting', 'description' => 'Strategic planning and team design', 'icon' => 'UsersRound'),
    array('title' => 'Digital Transformation', 'description' => 'Modernization, automation and delivery', 'icon' => 'Cpu'),
    array('title' => 'Contract Staffing', 'description' => 'Flexible teams for fast-moving needs', 'icon' => 'FileUser'),
    array('title' => 'Managed Teams', 'description' => 'Dedicated delivery pods built around outcomes', 'icon' => 'BadgeCheck'),
);

// Industries mapping
$industries = get_field('industries');
if ( ! $industries ) {
    $industries = array(
        array('title' => 'Technology', 'description' => 'Software engineering, cloud and AI product squads built for rapid releases.', 'visual' => 'technology', 'illustration' => $theme_dir . '/assets/images/Industries/Technology.svg'),
        array('title' => 'Financial Services', 'description' => 'Secure engineering teams built around risk mitigation and next-gen fintech.', 'visual' => 'financial', 'illustration' => $theme_dir . '/assets/images/Industries/Financial-Services.svg'),
        array('title' => 'Healthcare', 'description' => 'Compliance-first product teams managing digital health platforms.', 'visual' => 'healthcare', 'illustration' => $theme_dir . '/assets/images/Industries/Healthcare.svg'),
        array('title' => 'Retail & E-commerce', 'description' => 'Scaling storefront architectures, supply-chain automations and dynamic pricing systems.', 'visual' => 'retail', 'illustration' => $theme_dir . '/assets/images/Industries/Retail-E-Commerce.svg'),
        array('title' => 'Manufacturing', 'description' => 'Deploying operational technologies, automation software, and systems integration experts.', 'visual' => 'manufacturing', 'illustration' => $theme_dir . '/assets/images/Industries/Manufacturing.svg'),
        array('title' => 'Government & Public Sector', 'description' => 'Delivering impact through technology, security and skilled professionals.', 'visual' => 'government', 'illustration' => $theme_dir . '/assets/images/Industries/Government-Public-Sector.svg'),
    );
}

// Insights
$insights = get_field('insights_articles');
if ( ! $insights ) {
    $insights = array(
        array('title' => 'The Future of Work in the Age of AI', 'thumbnail' => $theme_dir . '/assets/images/future-of-work-ai.png', 'link' => '#'),
        array('title' => 'Top 10 In-Demand Tech skills in 2026', 'thumbnail' => $theme_dir . '/assets/images/tech-skills-2026.png', 'link' => '#'),
        array('title' => 'AI in Staffing: Trends Shaping the Industry', 'thumbnail' => $theme_dir . '/assets/images/ai-staffing-trends.png', 'link' => '#'),
    );
}

// Stats / Counters
$stats = get_field('stats_counters');
if ( ! $stats ) {
    $stats = array(
        array('target' => 97, 'suffix' => '%', 'label' => 'Placement Success Rate'),
        array('target' => 500, 'suffix' => '+', 'label' => 'Placements Annually'),
        array('target' => 14, 'suffix' => ' Days', 'label' => 'Average Time to Fill'),
        array('target' => 4.8, 'suffix' => '/5', 'label' => 'Client Satisfaction Score'),
    );
}

// Contact Details
$contact_phone = get_field('contact_phone', 'option') ?: '+1 (800) 555-0199';
$contact_email = get_field('contact_email', 'option') ?: 'hello@technovasystems.com';
$contact_address = get_field('contact_address', 'option') ?: '251 Little Falls Drive, Wilmington, DE 19808';
$cloudflare_sitekey = get_field('cloudflare_sitekey', 'option') ?: '0x4AAAAAADumwXCngu01f3kg';

?>

<!-- ---------------------------------------------------- -->
<!-- 2. NAVBAR SECTION -->
<!-- ---------------------------------------------------- -->
<section class="relative hero-carousel-section min-h-screen overflow-hidden bg-background">
    <!-- Background cross-fade elements -->
    <?php foreach ($slides as $index => $slide): ?>
        <?php if ($slide['bg_type'] === 'video'): ?>
            <div class="absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-1000 carousel-bg-slide <?php echo $index === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'; ?>">
                <video
                    class="h-full w-full object-cover"
                    src="<?php echo esc_url($slide['bg_url']); ?>"
                    loop
                    muted
                    playsinline
                ></video>
            </div>
        <?php else: ?>
            <div
                class="absolute inset-0 z-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 carousel-bg-slide <?php echo $index === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'; ?>"
                style="background-image: url('<?php echo esc_url($slide['bg_url']); ?>')"
            ></div>
        <?php endif; ?>
    <?php endforeach; ?>
    
    <!-- Dark overlay to ensure text contrast -->
    <div class="absolute inset-0 bg-[#001726]/40 z-[1] pointer-events-none"></div>

    <nav class="relative z-[100] mx-auto flex max-w-7xl flex-row items-center justify-between px-8 py-6">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="font-display text-3xl font-normal tracking-tight text-foreground" aria-label="Technova Systems home">
            <img src="<?php echo esc_url($theme_dir); ?>/assets/images/Technova Systems Logo final-13 1.svg" alt="Technova Systems" class="h-12 w-auto" />
        </a>

        <div class="hidden items-center gap-8 md:flex">
            <div class="mega-menu-wrap">
                <a href="#" class="mega-menu-trigger text-sm text-foreground transition-colors">
                    Solutions <span aria-hidden="true">⌄</span>
                </a>

                <div class="mega-menu-panel" role="menu">
                    <div class="mega-menu-feature">
                        <div class="mega-menu-feature-badge">
                            <img src="<?php echo esc_url($theme_dir); ?>/assets/images/favicon.png" alt="" />
                        </div>
                        <p class="mega-menu-eyebrow">Technova Systems</p>
                        <h2>Future-ready teams, delivered with intelligence.</h2>
                        <p>Talent solutions and technology consulting for organizations building what comes next.</p>
                        <a class="mega-menu-feature-link" href="#solutions">
                            Explore solutions
                            <svg class="inline-block ml-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </a>
                    </div>

                    <div class="mega-menu-directions">
                        <?php foreach ($megaMenuDirections as $item): ?>
                            <a href="#solutions" class="mega-menu-direction mega-menu-direction-<?php echo esc_attr($item['accent']); ?>">
                                <strong><?php echo esc_html($item['title']); ?></strong>
                                <small><?php echo esc_html($item['description']); ?></small>
                            </a>
                        <?php endforeach; ?>
                    </div>

                    <div class="mega-menu-solutions">
                        <p class="mega-menu-section-label">Core Capabilities</p>
                        <div class="mega-menu-solution-grid">
                            <?php foreach ($megaMenuSolutions as $item): ?>
                                <a class="mega-menu-solution" href="#solutions">
                                    <span>
                                        <strong><?php echo esc_html($item['title']); ?></strong>
                                        <small><?php echo esc_html($item['description']); ?></small>
                                    </span>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>

            <a href="#industries" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Industries</a>
            <a href="#solutions" class="text-sm text-muted-foreground transition-colors hover:text-foreground">For Employers</a>
            <a href="#solutions" class="text-sm text-muted-foreground transition-colors hover:text-foreground">For Talent</a>
            <a href="#insights" class="text-sm text-muted-foreground transition-colors hover:text-foreground">AI & Insights</a>
            <a href="#about" class="text-sm text-muted-foreground transition-colors hover:text-foreground">About Us</a>
        </div>

        <a href="#contact" class="liquid-glass text-white text-sm rounded-full px-6 py-2.5 hover:scale-[1.03] transition-all">
            Let's Talk
        </a>
    </nav>

    <!-- ---------------------------------------------------- -->
    <!-- 3. HERO CONTENT CAROUSEL -->
    <!-- ---------------------------------------------------- -->
    <?php foreach ($slides as $index => $slide): ?>
        <div 
            class="relative z-10 flex-col items-center justify-center px-6 py-[90px] pb-40 pt-32 text-center max-w-7xl mx-auto w-full min-h-[calc(100vh-100px)] <?php echo $index === 0 ? 'flex animate-fade-rise' : 'hidden'; ?> carousel-content-slide"
        >
            <h1
                class="wave-heading max-w-5xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-white sm:text-7xl md:text-[85px]"
                style="font-family: 'Instrument Serif', serif;"
            ><?php echo $slide['heading']; ?></h1>

            <p class="mt-8 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                <?php echo esc_html($slide['description']); ?>
            </p>

            <div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <?php foreach ($slide['cta_buttons'] as $btn): ?>
                    <a 
                        href="#contact" 
                        class="rounded-full px-14 py-5 text-base cursor-pointer font-semibold transition-all <?php echo $btn['primary'] ? 'bg-[#f59e0c] text-white hover:bg-[#d97706] border border-[#f59e0c]/20 shadow-lg shadow-amber-500/20 hover:scale-[1.03]' : 'liquid-glass text-white hover:scale-[1.03]'; ?>"
                    >
                        <?php echo esc_html($btn['text']); ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    <?php endforeach; ?>

    <!-- Scroll Down Indicator -->
    <div class="absolute bottom-10 left-8 md:left-12 z-20 hidden md:flex items-center gap-2 text-white/50 pointer-events-none animate-bounce">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
    </div>

    <!-- Carousel controls (bottom-right) -->
    <div class="absolute bottom-8 right-8 md:right-12 z-20 flex items-center gap-4">
        <!-- Pill Indicator -->
        <div class="bg-black/50 text-white px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest backdrop-blur-md border border-white/10 shadow-lg carousel-counter-display">
            01 / 05
        </div>

        <!-- Play/Pause Button -->
        <button
            class="text-white hover:text-[#f59e0c] transition-colors p-2 cursor-pointer flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full h-10 w-10 border border-white/10 backdrop-blur-md carousel-play-pause-btn"
            aria-label="Pause slideshow"
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/></svg>
        </button>

        <!-- Navigation Arrows -->
        <div class="flex gap-2">
            <button
                class="h-10 w-10 rounded-full liquid-glass text-white hover:scale-[1.03] transition-all flex items-center justify-center p-0 cursor-pointer carousel-prev-btn"
                aria-label="Previous slide"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
            </button>
            <button
                class="h-10 w-10 rounded-full liquid-glass text-white hover:scale-[1.03] transition-all flex items-center justify-center p-0 cursor-pointer carousel-next-btn"
                aria-label="Next slide"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            </button>
        </div>
    </div>
</section>

<!-- ---------------------------------------------------- -->
<!-- 4. TRUSTED LOGOS MARQUEE -->
<!-- ---------------------------------------------------- -->
<section class="scroll-reveal-section overflow-hidden bg-white py-10 text-[#0b132b] sm:py-12">
    <h2 class="wave-heading font-display mx-auto max-w-4xl text-center text-4xl font-normal leading-none text-[#0b132b] sm:text-5xl">
        Trusted by innovators worldwide
    </h2>

    <div class="logo-marquee mt-9" aria-label="Trusted companies">
        <div class="logo-marquee-track">
            <?php for ($g = 0; $g < 2; $g++): ?>
                <div class="logo-marquee-group">
                    <?php foreach ($trusted_logos as $logo): ?>
                        <div class="logo-marquee-item">
                            <img src="<?php echo esc_url($logo['src']); ?>" alt="<?php echo esc_attr($logo['name']); ?>" />
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endfor; ?>
        </div>
    </div>
</section>

<!-- ---------------------------------------------------- -->
<!-- 5. CAPABILITIES & SOLUTIONS -->
<!-- ---------------------------------------------------- -->
<section id="solutions" class="scroll-reveal-section bg-white pb-36 pt-24 text-[#0b132b]">
    <div class="mx-auto max-w-7xl px-8">
        <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
                <h2 class="wave-heading font-display max-w-lg text-5xl font-normal leading-[0.95] tracking-tight text-[#0b132b] sm:text-6xl">
                    Dynamic Talent Solutions Designed For Modern <strong>Enterprise Scale</strong>
                </h2>
            </div>
            <div>
                <p class="text-lg leading-relaxed text-slate-700">
                    We bridge critical skills gaps and optimize engineering velocity with pre-vetted AI, engineering, and digital transformation experts. From single experts to outcome-driven managed teams, we customize our model around your technical requirements and culture.
                </p>
            </div>
        </div>

        <div class="mt-24 space-y-32">
            <?php foreach ($capabilities as $index => $cap): ?>
                <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
                    <div class="space-y-8 lg:col-span-6 <?php echo $index % 2 === 1 ? 'lg:order-last' : ''; ?>">
                        <div class="flex items-center gap-3">
                            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f59e0c]/10 text-[#f59e0c]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </span>
                            <span class="text-sm font-semibold tracking-wider uppercase text-slate-500">Core Capability</span>
                        </div>
                        <h3 class="wave-heading font-display text-4xl font-normal leading-none tracking-tight text-[#0b132b] sm:text-5xl">
                            <?php echo esc_html($cap['title']); ?>
                        </h3>
                        <p class="text-base leading-relaxed text-slate-600">
                            <?php echo esc_html($cap['description']); ?>
                        </p>
                        <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <?php foreach ($cap['list'] as $item): ?>
                                <li class="flex items-center gap-2.5 text-sm text-slate-700">
                                    <svg class="w-4 h-4 text-[#f59e0c]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                                    <?php echo esc_html($item); ?>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <div class="pt-4">
                            <a href="#contact" class="rounded-full bg-[#f59e0c] px-8 py-4 text-base cursor-pointer font-semibold text-white hover:bg-[#d97706] transition-all shadow-md shadow-amber-500/20 inline-block hover:scale-[1.03]">
                                Hire Top Talent
                            </a>
                        </div>
                    </div>
                    <div class="lg:col-span-6">
                        <div class="relative overflow-hidden rounded-2xl bg-[#f8fafc] p-12 aspect-[4/3] flex items-center justify-center">
                            <img class="max-h-[90%] max-w-[90%] object-contain" src="<?php echo esc_url($cap['image']); ?>" alt="<?php echo esc_attr($cap['title']); ?>" />
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ---------------------------------------------------- -->
<!-- 6. INDUSTRIES SECTION -->
<!-- ---------------------------------------------------- -->
<section id="industries" class="scroll-reveal-section bg-[#0a1128] py-28 text-white">
    <div class="mx-auto max-w-7xl px-8">
        <div class="text-center">
            <h2 class="wave-heading font-display mx-auto max-w-3xl text-5xl font-normal leading-[0.95] tracking-tight sm:text-6xl">
                Domain Expertise Across Critical <strong>High-Performance Industries</strong>
            </h2>
            <p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400">
                We deliver compliant, robust, and highly functional technical resources tailored specifically to the standards, technologies, and metrics of your industry.
            </p>
        </div>

        <div class="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <?php foreach ($industries as $ind): ?>
                <div class="scroll-reveal-card group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
                    <div class="relative z-10 flex h-full flex-col justify-between">
                        <div>
                            <h3 class="font-display text-2xl font-normal text-white">
                                <?php echo esc_html($ind['title']); ?>
                            </h3>
                            <p class="mt-4 text-sm leading-relaxed text-slate-400">
                                <?php echo esc_html($ind['description']); ?>
                            </p>
                        </div>
                        <div class="mt-8 flex items-center justify-center p-6 bg-white/[0.01] rounded-xl aspect-[1.8/1] overflow-hidden">
                            <img class="max-h-[100%] max-w-[100%] object-contain" src="<?php echo esc_url($ind['illustration']); ?>" alt="" />
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ---------------------------------------------------- -->
<!-- 7. ABOUT STATS COUNTER -->
<!-- ---------------------------------------------------- -->
<section id="about" class="scroll-reveal-section bg-white py-24 text-[#0b132b]">
    <div class="mx-auto max-w-7xl px-8">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
                <h2 class="wave-heading font-display max-w-lg text-5xl font-normal leading-[0.95] tracking-tight text-[#0b132b] sm:text-6xl">
                    Proven Delivery Outcomes Guided By <strong>Rigorous Analytics</strong>
                </h2>
            </div>
            <div>
                <p class="text-base leading-relaxed text-slate-600">
                    We evaluate our solutions on tangible engineering and delivery metrics. Our deep-vetting process ensures that 97% of our placements meet or exceed performance KPIs within their first 90 days.
                </p>
            </div>
        </div>

        <div class="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
            <?php foreach ($stats as $stat): ?>
                <div class="text-center md:text-left">
                    <span 
                        class="counter-value font-display text-5xl font-normal tracking-tight text-[#f59e0c] sm:text-6xl"
                        data-target="<?php echo esc_attr($stat['target']); ?>"
                        data-suffix="<?php echo esc_attr($stat['suffix']); ?>"
                    >0</span>
                    <p class="mt-3 text-sm font-medium tracking-wide uppercase text-slate-500">
                        <?php echo esc_html($stat['label']); ?>
                    </p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ---------------------------------------------------- -->
<!-- 8. INSIGHTS ARTICLES -->
<!-- ---------------------------------------------------- -->
<section id="insights" class="scroll-reveal-section bg-[#f8fafc] py-28 text-[#0b132b]">
    <div class="mx-auto max-w-7xl px-8">
        <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
                <h2 class="wave-heading font-display text-5xl font-normal leading-[0.95] tracking-tight text-[#0b132b] sm:text-6xl">
                    Explore Technical <strong>Insights & Perspectives</strong>
                </h2>
                <p class="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
                    Get regular research updates, analysis, and blueprints for managing distributed technical teams and deploying artificial intelligence.
                </p>
            </div>
            <a href="#" class="rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all inline-block hover:scale-[1.03]">
                View All Articles
            </a>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <?php foreach ($insights as $art): ?>
                <a href="<?php echo esc_url($art['link']); ?>" class="group block overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <div class="aspect-[16/10] overflow-hidden bg-slate-100">
                        <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="<?php echo esc_url($art['thumbnail']); ?>" alt="" />
                    </div>
                    <div class="p-8">
                        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Insight Article</span>
                        <h3 class="font-display mt-3 text-xl font-normal leading-snug text-[#0b132b] group-hover:text-[#f59e0c] transition-colors">
                            <?php echo esc_html($art['title']); ?>
                        </h3>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ---------------------------------------------------- -->
<!-- 9. CONTACT FORM SECTION -->
<!-- ---------------------------------------------------- -->
<section id="contact" class="scroll-reveal-section bg-[#001726] py-28 text-white relative">
    <div class="mx-auto max-w-7xl px-8">
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
            
            <!-- Left Info Column -->
            <div class="lg:col-span-5 space-y-12">
                <div>
                    <span class="text-[#f59e0c] font-mono text-sm tracking-widest uppercase font-semibold">GET IN TOUCH</span>
                    <h2 class="wave-heading font-display mt-4 text-5xl font-normal leading-[0.95] tracking-tight sm:text-6xl">
                        Let's Talk About Your <strong>Technical Strategy</strong>
                    </h2>
                    <p class="mt-6 text-slate-400 leading-relaxed max-w-md">
                        Speak with our principal advisors today to build a custom scaling or technical consulting roadmap.
                    </p>
                </div>
                
                <div class="space-y-6 pt-4">
                    <div class="flex items-start gap-4">
                        <span class="p-3 bg-white/5 rounded-lg border border-white/5 text-[#f59e0c]">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                        </span>
                        <div>
                            <span class="block text-xs font-semibold uppercase tracking-wider text-slate-500">EMAIL US</span>
                            <a href="mailto:<?php echo esc_attr($contact_email); ?>" class="text-white hover:text-[#f59e0c] transition-colors text-base"><?php echo esc_html($contact_email); ?></a>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <span class="p-3 bg-white/5 rounded-lg border border-white/5 text-[#f59e0c]">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a20.373 20.373 0 01-7.182-7.182c-.155-.441.012-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                        </span>
                        <div>
                            <span class="block text-xs font-semibold uppercase tracking-wider text-slate-500">CALL US</span>
                            <a href="tel:<?php echo esc_attr($contact_phone); ?>" class="text-white hover:text-[#f59e0c] transition-colors text-base"><?php echo esc_html($contact_phone); ?></a>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <span class="p-3 bg-white/5 rounded-lg border border-white/5 text-[#f59e0c]">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                        </span>
                        <div>
                            <span class="block text-xs font-semibold uppercase tracking-wider text-slate-500">VISIT US</span>
                            <span class="text-slate-400 text-base leading-relaxed"><?php echo esc_html($contact_address); ?></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Form Column -->
            <div class="lg:col-span-7 bg-white/[0.02] border border-white/5 p-8 sm:p-12 rounded-2xl backdrop-blur-sm">
                <form id="technova-theme-contact-form" class="space-y-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="fullName">Full Name</label>
                            <input class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#f59e0c] transition-all" id="fullName" name="fullName" type="text" placeholder="Sarah Jenkins" required />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="company">Company</label>
                            <input class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#f59e0c] transition-all" id="company" name="company" type="text" placeholder="Acme Corp" required />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="email">Email Address</label>
                            <input class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#f59e0c] transition-all" id="email" name="email" type="email" placeholder="sarah@company.com" required />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="phone">Phone Number</label>
                            <input class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#f59e0c] transition-all" id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="talentNeed">Talent Need</label>
                        <select class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-[#f59e0c] transition-all" id="talentNeed" name="talentNeed" required>
                            <option value="" disabled selected>Select an option</option>
                            <option value="ai-talent">AI / Machine Learning Solutions</option>
                            <option value="managed-team">Dedicated Managed Teams</option>
                            <option value="staffing">Contract Technical Staffing</option>
                            <option value="consulting">Strategic Workforce Consulting</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="message">Message</label>
                        <textarea class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#f59e0c] transition-all h-36 resize-none" id="message" name="message" placeholder="Outline your staffing timeline, required skills, and objectives..." required></textarea>
                    </div>

                    <!-- Cloudflare Turnstile CAPTCHA container -->
                    <div id="turnstile-container" class="my-4"></div>

                    <button class="w-full bg-[#f59e0c] hover:bg-[#d97706] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer" type="submit">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>

<!-- ---------------------------------------------------- -->
<!-- 10. FOOTER -->
<!-- ---------------------------------------------------- -->
<footer class="bg-[#00121e] text-slate-400 py-16 border-t border-white/5">
    <div class="mx-auto max-w-7xl px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
            
            <!-- Branding Column -->
            <div class="space-y-6">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="block">
                    <img src="<?php echo esc_url($theme_dir); ?>/assets/images/darklogo.svg" alt="Technova Systems" class="h-10 w-auto" />
                </a>
                <p class="text-xs leading-relaxed text-slate-500">
                    AI-powered talent solutions and technology consulting built for high-performance squads.
                </p>
                <div class="flex gap-4">
                    <a href="#" class="p-2 bg-white/5 hover:bg-[#f59e0c] hover:text-white rounded-full border border-white/5 text-slate-400 transition-all cursor-pointer">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="#" class="p-2 bg-white/5 hover:bg-[#f59e0c] hover:text-white rounded-full border border-white/5 text-slate-400 transition-all cursor-pointer">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                </div>
            </div>

            <!-- Links Columns -->
            <div>
                <h4 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">SOLUTIONS</h4>
                <ul class="space-y-3 text-sm">
                    <li><a href="#solutions" class="hover:text-white transition-colors">AI Talent Solutions</a></li>
                    <li><a href="#solutions" class="hover:text-white transition-colors">Managed Teams</a></li>
                    <li><a href="#solutions" class="hover:text-white transition-colors">Contract Staffing</a></li>
                    <li><a href="#solutions" class="hover:text-white transition-colors">Workforce Consulting</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">INDUSTRIES</h4>
                <ul class="space-y-3 text-sm">
                    <li><a href="#industries" class="hover:text-white transition-colors">Technology</a></li>
                    <li><a href="#industries" class="hover:text-white transition-colors">Financial Services</a></li>
                    <li><a href="#industries" class="hover:text-white transition-colors">Healthcare</a></li>
                    <li><a href="#industries" class="hover:text-white transition-colors">Retail & E-commerce</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">COMPANY</h4>
                <ul class="space-y-3 text-sm">
                    <li><a href="#about" class="hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#insights" class="hover:text-white transition-colors">Insights & Articles</a></li>
                    <li><a href="#contact" class="hover:text-white transition-colors">Contact & Support</a></li>
                </ul>
            </div>
        </div>

        <div class="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <span>&copy; <?php echo date('Y'); ?> TechNova Systems. All rights reserved.</span>
            <div class="flex gap-6">
                <a href="#" class="hover:text-slate-400 transition-colors">Privacy Policy</a>
                <a href="#" class="hover:text-slate-400 transition-colors">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>

<!-- Initialize Cloudflare Turnstile on load -->
<script>
document.addEventListener("DOMContentLoaded", () => {
    const renderWidget = () => {
        const container = document.getElementById("turnstile-container");
        if (window.turnstile && container && container.childElementCount === 0) {
            window.turnstile.render("#turnstile-container", {
                sitekey: "<?php echo esc_js($cloudflare_sitekey); ?>",
                callback: (token) => {
                    // Turnstile verification token ready
                },
            });
        }
    };

    if (window.turnstile) {
        renderWidget();
    } else {
        const checkInterval = setInterval(() => {
            if (window.turnstile) {
                clearInterval(checkInterval);
                renderWidget();
            }
        }, 100);
    }
});
</script>

<?php
get_footer();
