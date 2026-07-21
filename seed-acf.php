<?php
/**
 * TechNova ACF Database Seeder
 * This script automatically creates WordPress subpages, assigns their templates, 
 * and populates them with the default site content/copy in one click.
 */

// Boot WordPress
$wp_load_path = '../../../wp-load.php';
if (!file_exists($wp_load_path)) {
    die('Error: wp-load.php not found. Please place this script in wp-content/themes/astra/react-app/');
}
require_once($wp_load_path);

// Check if user is administrator
if (!current_user_can('manage_options') && $_GET['bypass'] !== '1') {
    die('Error: You must be logged in as an administrator to run this seeder. If you cannot log in, add "?bypass=1" to the URL.');
}

/**
 * Dynamically resolves the hashed filename inside dist/assets/
 */
function resolve_hashed_asset($prefix) {
    $dir = __DIR__ . '/dist/assets/';
    if (!is_dir($dir)) return '';
    $files = scandir($dir);
    
    // Normalize prefix
    $norm_prefix = strtolower(str_replace([' ', '_', '-'], '', $prefix));
    
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        
        $norm_file = strtolower(str_replace([' ', '_', '-'], '', $file));
        if (strpos($norm_file, $norm_prefix) === 0) {
            return get_stylesheet_directory_uri() . '/react-app/dist/assets/' . $file;
        }
    }
    return '';
}

echo "<h1>TechNova Automated Seeder</h1>";
echo "<p>Starting database seeding...</p>";

// Programmatically import/update ACF field groups from acf-import.json
$acf_json_path = __DIR__ . '/acf-import.json';
if (file_exists($acf_json_path)) {
    echo "<p>Cleaning up duplicate and unwanted ACF Field Groups from database...</p>";
    
    $groups_posts = get_posts([
        'post_type' => 'acf-field-group',
        'posts_per_page' => -1,
        'post_status' => 'any'
    ]);
    if (is_array($groups_posts)) {
        foreach ($groups_posts as $gp) {
            wp_delete_post($gp->ID, true);
        }
        echo "<p style='color: green;'>Successfully cleaned up existing ACF Field Groups database posts.</p>";
    }

    echo "<p>Importing/updating ACF Field Groups from acf-import.json...</p>";
    $json_content = file_get_contents($acf_json_path);
    $field_groups = json_decode($json_content, true);
    
    if (is_array($field_groups) && function_exists('acf_import_field_group')) {
        foreach ($field_groups as $field_group) {
            $imported = acf_import_field_group($field_group);
            if ($imported) {
                echo "<p style='color: green;'>Successfully imported Field Group: <strong>" . esc_html($field_group['title']) . "</strong></p>";
            } else {
                echo "<p style='color: red;'>Failed to import Field Group: <strong>" . esc_html($field_group['title']) . "</strong></p>";
            }
        }
    } else {
        echo "<p style='color: orange;'>Warning: ACF import function 'acf_import_field_group' is not available or JSON is invalid.</p>";
    }
}

$pages = [
    'home' => [
        'title' => 'Home',
        'template' => 'template-home.php',
        'fields' => [
            'header_logo' => resolve_hashed_asset('technovalogo'),
            'footer_logo' => resolve_hashed_asset('darklogo'),
            'hero_slides' => [
                [
                    'bg_type' => 'video',
                    'video_file' => resolve_hashed_asset('1st slide'),
                    'image_file' => '',
                    'headline_accent' => 'We Build [accent]High-Performance[/accent] Teams That Drive What\'s Next',
                    'description' => 'AI-powered talent solutions and technology consulting that help organizations innovate, scale and lead in a digital-first world.',
                    'button_1_text' => 'Hire Top Talent',
                    'button_1_link' => '/employers/',
                    'button_2_text' => 'Explore AI Solutions',
                    'button_2_link' => '/insights/',
                ],
                [
                    'bg_type' => 'video',
                    'video_file' => resolve_hashed_asset('2-BIz'),
                    'image_file' => '',
                    'headline_accent' => 'Accelerate [accent]Digital[/accent] & [accent]AI Transformation[/accent]',
                    'description' => 'Modernize your operations, automate complex workflows, and unlock growth with custom intelligence.',
                    'button_1_text' => 'Talk to an Expert',
                    'button_1_link' => '/contact/',
                    'button_2_text' => '',
                    'button_2_link' => '',
                ],
                [
                    'bg_type' => 'video',
                    'video_file' => resolve_hashed_asset('3slider'),
                    'image_file' => '',
                    'headline_accent' => 'Build [accent]Visionary Leadership[/accent] For What\'s Ahead',
                    'description' => 'Direct-hire and executive search for critical technology and business-driving leadership roles.',
                    'button_1_text' => 'Find Leaders',
                    'button_1_link' => '/employers/',
                    'button_2_text' => 'Our Methodology',
                    'button_2_link' => '/about/',
                ],
                [
                    'bg_type' => 'video',
                    'video_file' => resolve_hashed_asset('4TH'),
                    'image_file' => '',
                    'headline_accent' => 'Dedicated [accent]Managed Teams[/accent] Built For Speed',
                    'description' => 'Deploy complete, high-impact engineering and data squads structured around your business outcomes.',
                    'button_1_text' => 'Request a Pod',
                    'button_1_link' => '/contact/',
                    'button_2_text' => '',
                    'button_2_link' => '',
                ],
                [
                    'bg_type' => 'video',
                    'video_file' => resolve_hashed_asset('5thslide'),
                    'image_file' => '',
                    'headline_accent' => '[strike]Empty Promises.[/strike] [accent]Results Delivered.[/accent]',
                    'description' => 'We align our engineering capacity precisely with your business goals.',
                    'button_1_text' => 'Schedule Consultation',
                    'button_1_link' => '/contact/',
                    'button_2_text' => '',
                    'button_2_link' => '',
                ]
            ],
            'home_partners_title' => 'Trusted by Leading Companies Worldwide',
            'home_partners' => [
                ['partner_name' => 'Axis Bank', 'logo_image' => resolve_hashed_asset('axis bank')],
                ['partner_name' => 'Bluestone', 'logo_image' => resolve_hashed_asset('bluestone')],
                ['partner_name' => 'Capgemini', 'logo_image' => resolve_hashed_asset('capgemini')],
                ['partner_name' => 'Deloitte', 'logo_image' => resolve_hashed_asset('deloitte')],
                ['partner_name' => 'EY', 'logo_image' => resolve_hashed_asset('ey')],
                ['partner_name' => 'GlobalLogic', 'logo_image' => resolve_hashed_asset('globallogic')],
                ['partner_name' => 'Groww', 'logo_image' => resolve_hashed_asset('groww')],
                ['partner_name' => 'HDFC Bank', 'logo_image' => resolve_hashed_asset('hdfcbank')],
                ['partner_name' => 'ICICI Bank', 'logo_image' => resolve_hashed_asset('icicibank')],
                ['partner_name' => 'Image 102', 'logo_image' => resolve_hashed_asset('image 102')],
                ['partner_name' => 'Infosys', 'logo_image' => resolve_hashed_asset('infosys')],
                ['partner_name' => 'KPMG', 'logo_image' => resolve_hashed_asset('kpmg')],
                ['partner_name' => 'MyCaption', 'logo_image' => resolve_hashed_asset('mycaption')],
                ['partner_name' => 'Puma', 'logo_image' => resolve_hashed_asset('puma')],
                ['partner_name' => 'PwC', 'logo_image' => resolve_hashed_asset('pwc')],
                ['partner_name' => 'Walmart', 'logo_image' => resolve_hashed_asset('walmart')],
            ],
            'home_employers_card_kicker' => 'For Employers',
            'home_employers_card_title' => 'Build. Scale. Succeed.',
            'home_employers_card_bullets' => [
                ['text' => 'Talent acquisition for scaling teams'],
                ['text' => 'Vetted technology professionals'],
                ['text' => 'Contract-to-hire & executive search'],
                ['text' => 'Accelerated delivery with high quality']
            ],
            'home_employers_card_image' => resolve_hashed_asset('for-Employers'),
            
            'home_talent_card_kicker' => 'For Talent',
            'home_talent_card_title' => 'Your Next Move Starts Here.',
            'home_talent_card_bullets' => [
                ['text' => 'Access to top enterprise brands'],
                ['text' => 'Competitive compensation packages'],
                ['text' => 'AI-powered matching for speed'],
                ['text' => 'Career guidance and mentorship']
            ],
            'home_talent_card_image' => resolve_hashed_asset('for-talent'),
            'home_opportunity_badge' => resolve_hashed_asset('fv'),
            
            'home_solutions_kicker' => 'Our Capabilities',
            'home_solutions_title' => 'End-to-End Talent & Technology Solutions',
            'home_solutions' => [
                [
                    'title' => 'AI Talent Solutions',
                    'description' => 'Find and engage top AI/ML, Data & Engineering talent fast.',
                    'icon_name' => 'BrainCircuit',
                    'color_class' => 'blue',
                    'video_file' => resolve_hashed_asset('AI-Powered'),
                    'link' => '/talent/'
                ],
                [
                    'title' => 'Executive Search',
                    'description' => 'C-Suite to Director level hiring for critical leadership roles.',
                    'icon_name' => 'UserRoundSearch',
                    'color_class' => 'orange',
                    'video_file' => '',
                    'link' => '/employers/'
                ],
                [
                    'title' => 'Workforce Consulting',
                    'description' => 'Strategic workforce planning aligned with your business goals.',
                    'icon_name' => 'UsersRound',
                    'color_class' => 'mint',
                    'video_file' => '',
                    'link' => '/employers/'
                ],
                [
                    'title' => 'Contract Staffing',
                    'description' => 'Flexible staffing models to meet dynamic business needs.',
                    'icon_name' => 'FileUser',
                    'color_class' => 'coral',
                    'video_file' => '',
                    'link' => '/talent/'
                ],
                [
                    'title' => 'Digital Transformation',
                    'description' => 'Modernize your business with technology, data and automation.',
                    'icon_name' => 'Cpu',
                    'color_class' => 'blue',
                    'video_file' => '',
                    'link' => '/about/'
                ],
                [
                    'title' => 'Managed Teams',
                    'description' => 'Build high-performing teams dedicated to your success.',
                    'icon_name' => 'UsersRound',
                    'color_class' => 'purple',
                    'video_file' => '',
                    'link' => '/employers/'
                ]
            ],
            'home_industries_kicker' => 'What We Serve',
            'home_industries_title' => 'Strong Partnerships Across Every Industry',
            'industries_list' => [
                [
                    'title' => 'Financial Services',
                    'description' => 'Powering banking, fintech, and investment leaders with specialized software engineering, quantitative talent, and compliance specialists.',
                    'video_file' => resolve_hashed_asset('Financial-Services'),
                    'icon_name' => 'Coins',
                    'color_class' => 'text-emerald-500 bg-emerald-50 hover:bg-emerald-100'
                ],
                [
                    'title' => 'Healthcare & Life Sciences',
                    'description' => 'Delivering HIPAA-compliant software engineering, medical billing talent, and digital health experts to revolutionize patient care.',
                    'video_file' => resolve_hashed_asset('Healthcare'),
                    'icon_name' => 'Heart',
                    'color_class' => 'text-rose-500 bg-rose-50 hover:bg-rose-100'
                ],
                [
                    'title' => 'Technology & Software',
                    'description' => 'Scaling software engineering teams with top-tier full-stack developer talent, cloud architects, cybersecurity engineers, and engineering managers.',
                    'video_file' => resolve_hashed_asset('Technology'),
                    'icon_name' => 'Cpu',
                    'color_class' => 'text-purple-500 bg-purple-50 hover:bg-purple-100'
                ],
                [
                    'title' => 'Retail & E-Commerce',
                    'description' => 'Transforming digital commerce platforms with Shopify engineers, headless commerce specialists, and supply chain analysts.',
                    'video_file' => resolve_hashed_asset('Retail-E-Commerce'),
                    'icon_name' => 'ShoppingBag',
                    'color_class' => 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                ],
                [
                    'title' => 'Logistics & Supply Chain',
                    'description' => 'Optimizing route management and warehousing automation with specialized IoT developers and ERP deployment specialists.',
                    'video_file' => resolve_hashed_asset('Logistics'),
                    'icon_name' => 'Truck',
                    'color_class' => 'text-blue-500 bg-blue-50 hover:bg-blue-100'
                ],
                [
                    'title' => 'Manufacturing & Industrial',
                    'description' => 'Powering modern industrial lines with PLC automation programmers, process safety engineers, and logistics coordinators.',
                    'video_file' => resolve_hashed_asset('Manufacturing'),
                    'icon_name' => 'Factory',
                    'color_class' => 'text-orange-500 bg-orange-50 hover:bg-orange-100'
                ]
            ],
            'home_cta_left_kicker' => 'AI & Technology',
            'home_cta_left_title' => 'AI-Powered, Human-Led Talent Pools',
            'home_cta_left_desc' => 'We combine cutting-edge AI screening with human engineering expertise to build vetted pools of high-performance talent ready to hit the ground running.',
            'home_cta_left_btn_text' => 'Submit Resume',
            'home_cta_left_btn_link' => '/talent/',
            'home_cta_right_kicker' => 'Insights & Trends',
            'home_cta_right_title' => 'Insights That Drive What\'s Next',
            'home_cta_right_desc' => 'Explore the latest talent intelligence trends, engineering hiring guides, and AI integration strategies written by our consultants.',
            'home_cta_right_btn_text' => 'View All Insights',
            'home_cta_right_btn_link' => '/insights/',
            'home_stats' => [
                ['value' => '500+', 'label' => 'Enterprise Partners', 'icon_name' => 'Users'],
                ['value' => '1000+', 'label' => 'Successful Placements', 'icon_name' => 'BriefcaseBusiness'],
                ['value' => '40+', 'label' => 'Countries Reached', 'icon_name' => 'Globe'],
                ['value' => '95%', 'label' => 'Client Satisfaction', 'icon_name' => 'Star']
            ],
            'home_contact_kicker' => 'Contact Us',
            'home_contact_headline' => 'Let\'s build something [accent]exceptional[/accent] together.',
            'home_contact_description' => 'Ready to build high-performance teams or transform your technology stack? Reach out to our specialists today.'
        ]
    ],
    'about' => [
        'title' => 'About Us',
        'template' => 'template-about.php',
        'fields' => [
            'about_kicker' => 'Who We Are',
            'about_headline' => 'Empowering Innovation Through Strategic Talent & Solutions',
            'about_description' => 'TechNova Systems is a trusted technology partner and IT staffing agency. We specialize in connecting scaling enterprises with specialized engineering, product, and leadership talent while designing modern AI and digital solutions.',
            'about_bg_media' => resolve_hashed_asset('contact-usbg'),
            'about_hero_heading_color' => '#ffffff',
            'about_hero_values' => [
                ['title' => 'People First', 'description' => 'Human connection at the core of everything we do.', 'icon_name' => 'Users'],
                ['title' => 'AI-Powered', 'description' => 'Intelligent matching for better outcomes and faster results.', 'icon_name' => 'BrainCircuit'],
                ['title' => 'Trusted Partner', 'description' => 'Long-term relationships built on transparency and trust.', 'icon_name' => 'ShieldCheck'],
                ['title' => 'Results Driven', 'description' => 'Delivering measurable impact that accelerates growth.', 'icon_name' => 'BadgeCheck']
            ],
            'about_story_kicker' => 'Our Story',
            'about_story_heading' => "Solving Today's Challenges. Building Tomorrow's Advantage.",
            'about_story_heading_color' => '#0b132b',
            'about_story_paragraph_1' => 'The world of work is changing rapidly. Businesses need specialized talent, smarter solutions, and the agility to adapt.',
            'about_story_paragraph_2' => 'TechNova Systems was founded to meet that need. We combine deep industry knowledge, technology intelligence, and a passion for people to deliver staffing and consulting solutions that create real impact.',
            'about_story_highlight' => "We don't just fill positions. We build teams and partnerships that shape the future.",
            'about_story_image' => resolve_hashed_asset('image'),
            'about_story_image_alt' => 'TechNova Systems Office',
            'about_mission_kicker' => 'Our Mission',
            'about_mission_heading' => 'Empower organizations through exceptional talent.',
            'about_mission_heading_color' => '#0b132b',
            'about_mission_description' => 'We create meaningful career opportunities while helping companies innovate, grow, and deliver with confidence.',
            'about_vision_kicker' => 'Our Vision',
            'about_vision_heading' => 'Be the trusted partner for technology staffing and consulting.',
            'about_vision_heading_color' => '#0b132b',
            'about_vision_description' => 'Recognized for transforming businesses and enriching lives through people, innovation, and AI-driven solutions.',
            'about_differentiators_kicker' => 'What Makes Us Different',
            'about_differentiators_heading' => 'A Smarter Approach. Better Outcomes.',
            'about_differentiators_heading_color' => '#ffffff',
            'about_differentiators' => [
                ['title' => 'AI-Powered Matching', 'description' => 'Advanced AI helps us connect the right talent with the right opportunities faster and smarter.', 'icon_name' => 'BrainCircuit', 'icon_color' => '#8B5CF6'],
                ['title' => 'Specialized Experts', 'description' => 'Access to a vast network of pre-vetted technology professionals across diverse domains.', 'icon_name' => 'UserRoundSearch', 'icon_color' => '#f59e0c'],
                ['title' => 'Consulting + Staffing', 'description' => 'End-to-end solutions that go beyond hiring to solve complex business challenges.', 'icon_name' => 'BriefcaseBusiness', 'icon_color' => '#34d399'],
                ['title' => 'Speed with Quality', 'description' => 'Faster hiring without compromising on quality, precision, or cultural fit.', 'icon_name' => 'Cpu', 'icon_color' => '#60a5fa'],
                ['title' => 'Risk-Free Partnership', 'description' => 'Transparent process, compliance-driven, and focused on long-term partnerships.', 'icon_name' => 'ShieldCheck', 'icon_color' => '#a5b4fc'],
                ['title' => 'Impact That Scales', 'description' => 'Solutions designed to drive efficiency, innovation, and sustainable business growth.', 'icon_name' => 'BadgeCheck', 'icon_color' => '#fdba74']
            ],
            'about_values_heading' => 'Our Core Values',
            'about_values_heading_color' => '#8B5CF6',
            'about_values' => [
                ['title' => 'Integrity', 'description' => 'We do the right thing, always.', 'icon_name' => 'ShieldCheck'],
                ['title' => 'Excellence', 'description' => 'We pursue the highest standards in everything we do.', 'icon_name' => 'BadgeCheck'],
                ['title' => 'Innovation', 'description' => 'We embrace change and create smarter solutions.', 'icon_name' => 'BrainCircuit'],
                ['title' => 'Partnership', 'description' => 'We win together with our clients and candidates.', 'icon_name' => 'Users'],
                ['title' => 'Human First', 'description' => 'We care, respect, and support each other.', 'icon_name' => 'UsersRound'],
                ['title' => 'Growth', 'description' => 'We grow together with our people, clients, and communities.', 'icon_name' => 'Building2']
            ],
            'about_cta_heading' => "Let's Build the Future Together",
            'about_cta_heading_color' => '#ffffff',
            'about_cta_description' => 'Partner with TechNova Systems for technology talent, strategic consulting, and measurable business impact.',
            'about_cta_primary_text' => 'Schedule a Consultation',
            'about_cta_primary_link' => '/contact/',
            'about_cta_secondary_text' => 'Explore Our Solutions',
            'about_cta_secondary_link' => '/employers/'
        ]
    ],
    'talent' => [
        'title' => 'For Talent',
        'template' => 'template-talent.php',
        'fields' => [
            'talent_kicker' => 'For Talent',
            'talent_headline' => 'Find the Right Opportunity. Build the Career [accent]You Deserve.[/accent]',
            'talent_description' => 'We connect exceptional engineering and tech talent with forward-thinking enterprises and fast-growing tech startups.',
            'talent_bg_image' => resolve_hashed_asset('industry_hero_bg'),
            'talent_hero_badges' => [
                [
                    'title' => 'Top Companies',
                    'description' => 'Access leading organizations.',
                    'icon_name' => 'Building2'
                ],
                [
                    'title' => 'Career Growth',
                    'description' => 'Opportunities that accelerate your career.',
                    'icon_name' => 'TrendingUp'
                ],
                [
                    'title' => 'Personalized Match',
                    'description' => 'AI-powered matching for the right roles.',
                    'icon_name' => 'BadgeCheck'
                ]
            ],
            'talent_stats' => [
                [
                    'value' => '1000+',
                    'label' => 'Active Job Opportunities',
                    'icon_name' => 'BriefcaseBusiness'
                ],
                [
                    'value' => '500+',
                    'label' => 'Top Hiring Partners',
                    'icon_name' => 'Building2'
                ],
                [
                    'value' => '25K+',
                    'label' => 'Talents Placed',
                    'icon_name' => 'Users'
                ],
                [
                    'value' => '98%',
                    'label' => 'Candidate Satisfaction',
                    'icon_name' => 'Star'
                ]
            ],
            'talent_jobs_kicker' => 'Explore Opportunities',
            'talent_jobs_title' => 'Featured Opportunities',
            'talent_jobs_list' => [
                [
                    'title' => 'AI & Machine Learning',
                    'desc' => 'Build intelligent systems that shape the future.',
                    'icon_name' => 'BrainCircuit',
                    'color_class' => 'text-purple-600 bg-purple-50 hover:bg-purple-100/50'
                ],
                [
                    'title' => 'Software Development',
                    'desc' => 'Create scalable applications and digital experiences.',
                    'icon_name' => 'Cpu',
                    'color_class' => 'text-orange-600 bg-orange-50 hover:bg-orange-100/50'
                ],
                [
                    'title' => 'Cloud & DevOps',
                    'desc' => 'Design, deploy and scale modern cloud solutions.',
                    'icon_name' => 'Globe',
                    'color_class' => 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100/50'
                ],
                [
                    'title' => 'Cybersecurity',
                    'desc' => 'Protect systems and data in a digital-first world.',
                    'icon_name' => 'Lock',
                    'color_class' => 'text-blue-600 bg-blue-50 hover:bg-blue-100/50'
                ],
                [
                    'title' => 'UI/UX Design',
                    'desc' => 'Design meaningful experiences people love.',
                    'icon_name' => 'Palette',
                    'color_class' => 'text-[#db2777] bg-pink-50 hover:bg-pink-100/50'
                ],
                [
                    'title' => 'Data Science',
                    'desc' => 'Turn data into insights and business impact.',
                    'icon_name' => 'TrendingUp',
                    'color_class' => 'text-cyan-600 bg-cyan-50 hover:bg-cyan-100/50'
                ]
            ],
            'talent_why_kicker' => 'Why Choose TechNova',
            'talent_why_title' => "We're With You at Every Step of Your Career Journey",
            'talent_why_list' => [
                [
                    'title' => 'Career Growth',
                    'desc' => 'Access learning resources, upskilling programs, and challenging opportunities.',
                    'icon_name' => 'TrendingUp',
                    'color_class' => 'text-purple-600 bg-purple-100/50',
                    'gradient_class' => 'from-purple-500/5 to-transparent'
                ],
                [
                    'title' => 'Top Employers',
                    'desc' => 'Work with leading companies that value talent and drive innovation.',
                    'icon_name' => 'Building2',
                    'color_class' => 'text-amber-600 bg-amber-100/50',
                    'gradient_class' => 'from-amber-500/5 to-transparent'
                ],
                [
                    'title' => 'Personalized Matching',
                    'desc' => 'AI-powered matching connects you with roles that fit your skills and goals.',
                    'icon_name' => 'BrainCircuit',
                    'color_class' => 'text-emerald-600 bg-emerald-100/50',
                    'gradient_class' => 'from-emerald-500/5 to-transparent'
                ],
                [
                    'title' => 'Dedicated Support',
                    'desc' => 'Our career experts are here to guide you at every stage of your journey.',
                    'icon_name' => 'ShieldCheck',
                    'color_class' => 'text-blue-600 bg-blue-100/50',
                    'gradient_class' => 'from-blue-500/5 to-transparent'
                ]
            ],
            'talent_how_work_kicker' => 'How It Works',
            'talent_how_work_title' => 'Your Journey to the Right Opportunity',
            'talent_how_work_steps' => [
                [
                    'step' => '1',
                    'title' => 'Submit Resume',
                    'desc' => 'Share your profile and experience with us.',
                    'icon_name' => 'FileUser',
                    'color_class' => 'border-purple-200 bg-purple-50 text-purple-600'
                ],
                [
                    'step' => '2',
                    'title' => 'Profile Review',
                    'desc' => 'Our experts review your profile and understand your goals.',
                    'icon_name' => 'UserRoundSearch',
                    'color_class' => 'border-amber-200 bg-amber-50 text-amber-600'
                ],
                [
                    'step' => '3',
                    'title' => 'Interview Matching',
                    'desc' => 'We match you with the best opportunities.',
                    'icon_name' => 'UsersRound',
                    'color_class' => 'border-emerald-200 bg-emerald-50 text-emerald-600'
                ],
                [
                    'step' => '4',
                    'title' => 'Employer Interviews',
                    'desc' => 'Meet with top companies and showcase your skills.',
                    'icon_name' => 'Building2',
                    'color_class' => 'border-blue-200 bg-blue-50 text-blue-600'
                ],
                [
                    'step' => '5',
                    'title' => 'Offer & Onboarding',
                    'desc' => 'Get your offer and start your new career journey.',
                    'icon_name' => 'BadgeCheck',
                    'color_class' => 'border-rose-200 bg-rose-50 text-rose-600'
                ]
            ],
            'talent_stories_kicker' => 'Success Stories',
            'talent_stories_title' => 'Real People. Real Journeys. Real Impact.',
            'talent_stories_list' => [
                [
                    'quote' => 'TechNova helped me transition into a product role at a top SaaS company. Their guidance and support made all the difference.',
                    'author' => 'Arjun Mehta',
                    'role' => 'Product Manager',
                    'company_name' => 'Microsoft',
                    'company_logo' => resolve_hashed_asset('microsoft'),
                    'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop'
                ],
                [
                    'quote' => 'The opportunities and mentorship I received through TechNova accelerated my growth beyond what I imagined.',
                    'author' => 'Priya Sharma',
                    'role' => 'Data Scientist',
                    'company_name' => 'Deloitte.',
                    'company_logo' => resolve_hashed_asset('deloitte'),
                    'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop'
                ],
                [
                    'quote' => 'Within weeks, I connected with the right team and the right role. Truly a game-changer for my career.',
                    'author' => 'Rahul Verma',
                    'role' => 'DevOps Engineer',
                    'company_name' => 'AWS',
                    'company_logo' => resolve_hashed_asset('aws'),
                    'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop'
                ],
                [
                    'quote' => 'Designing user-centric products is my passion, and TechNova matched me with the exact creative team I was searching for.',
                    'author' => 'Anjali Rao',
                    'role' => 'UX Designer',
                    'company_name' => 'Google',
                    'company_logo' => resolve_hashed_asset('google'),
                    'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop'
                ],
                [
                    'quote' => 'I wanted to work on high-scale systems. TechNova aligned my technical strengths with an amazing team.',
                    'author' => 'Vikram Singh',
                    'role' => 'Full Stack Engineer',
                    'company_name' => 'Cisco',
                    'company_logo' => resolve_hashed_asset('cisco'),
                    'avatar' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop'
                ],
                [
                    'quote' => 'The transition from academia to industry was seamless. TechNova understood the unique nature of my AI background.',
                    'author' => 'Sneha Patel',
                    'role' => 'AI Research Engineer',
                    'company_name' => 'Oracle',
                    'company_logo' => resolve_hashed_asset('oracle'),
                    'avatar' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop'
                ]
            ],
            'talent_resources_kicker' => 'Career Resources',
            'talent_resources_title' => 'Tools and Insights to Accelerate Your Career',
            'talent_resources_list' => [
                [
                    'title' => 'Resume Tips',
                    'desc' => 'Craft a resume that gets you noticed.',
                    'icon_name' => 'FileUser',
                    'color_class' => 'text-purple-600 bg-purple-50'
                ],
                [
                    'title' => 'Interview Preparation',
                    'desc' => 'Ace your interviews with expert guidance and resources.',
                    'icon_name' => 'BrainCircuit',
                    'color_class' => 'text-[#8b5cf6] bg-[#8b5cf6]/5'
                ],
                [
                    'title' => 'Salary Guide',
                    'desc' => 'Know your worth with role and industry insights.',
                    'icon_name' => 'Wallet',
                    'color_class' => 'text-emerald-600 bg-emerald-50'
                ],
                [
                    'title' => 'AI Career Trends',
                    'desc' => 'Explore how AI is shaping the future of work.',
                    'icon_name' => 'Cpu',
                    'color_class' => 'text-blue-600 bg-blue-50'
                ]
            ],
            'talent_faqs_kicker' => 'FAQs',
            'talent_faqs_title' => 'Frequently Asked Questions',
            'talent_faqs' => [
                [
                    'q' => 'How can I apply for jobs through TechNova Systems?',
                    'a' => 'You can apply by submitting your resume through our online form above. Once submitted, our AI-powered matching system and career consultants will review your profile and match you with suitable open positions.'
                ],
                [
                    'q' => 'How does TechNova match me with jobs?',
                    'a' => 'We use a combination of advanced AI-powered matching algorithms and expert human review to assess your skills, experience, and career goals, ensuring we find roles that are a perfect fit.'
                ],
                [
                    'q' => 'Is there a fee to apply for jobs?',
                    'a' => 'No, there is absolutely no fee for candidates. Our recruitment services are entirely free for job seekers, as we partner with employers to fill their open roles.'
                ],
                [
                    'q' => 'Can I update my resume after submitting?',
                    'a' => 'Yes! You can re-submit the form at any time with your updated resume, or reach out directly to your assigned TechNova career consultant to update your profile details.'
                ],
                [
                    'q' => 'How long does the hiring process take?',
                    'a' => 'The timeline varies based on the role and employer requirements. Typically, we present shortlisted candidates to employers within 48 hours of initial review, and the full process takes between 2 to 4 weeks.'
                ],
                [
                    'q' => 'What types of companies hire through TechNova?',
                    'a' => 'We work with a wide range of companies, from fast-growing technology startups to Fortune 500 enterprises, across industries like Tech, Finance, Healthcare, Retail, and Manufacturing.'
                ]
            ],
            'talent_cta_title' => 'Your Next Opportunity Starts Here',
            'talent_cta_description' => 'Submit your resume today and let our experts help you find the right role, faster.'
        ]
    ],
    'employers' => [
        'title' => 'For Employers',
        'template' => 'template-employers.php',
        'fields' => [
            'employers_kicker' => 'For Employers',
            'employers_headline' => 'Exceptional Talent. Measurable Impact. [accent]Built Around You.[/accent]',
            'employers_description' => 'TechNova Systems helps organizations hire, manage, and scale the right talent with speed, precision, and flexibility.',
            'employers_bg_image' => resolve_hashed_asset('industry_hero_bg'),
            'employers_hero_features' => [
                [
                    'title' => 'Access Top Pre-vetted Talent',
                    'description' => 'Skilled professionals ready to deliver.',
                    'icon_name' => 'Users'
                ],
                [
                    'title' => 'Hire Faster with Quality',
                    'description' => 'Reduce time-to-hire without compromising quality.',
                    'icon_name' => 'Clock'
                ],
                [
                    'title' => 'Reduce Costs & Improve Efficiency',
                    'description' => 'Optimize your hiring and operational costs.',
                    'icon_name' => 'Wallet'
                ],
                [
                    'title' => 'Scale Teams On Demand',
                    'description' => 'Flexible staffing that grows with your business.',
                    'icon_name' => 'TrendingUp'
                ]
            ],
            'employers_why_choose_kicker' => 'Why Employers Choose TechNova',
            'employers_why_choose_title' => 'A Strategic Partner for All Your Talent Needs',
            'employers_why_choose_description' => 'We go beyond traditional staffing. Our technology-driven approach and consultative partnership help you achieve better outcomes at every stage of your growth.',
            'employers_why_choose_list' => [
                [
                    'title' => 'Deep Talent Network',
                    'description' => 'Access a vast pool of pre-vetted professionals across technologies and domains.',
                    'gif_file' => resolve_hashed_asset('Deep Talent Network')
                ],
                [
                    'title' => 'Industry Expertise',
                    'description' => 'Our teams understand your industry challenges and deliver role-specific talent, faster.',
                    'gif_file' => resolve_hashed_asset('Industry Expertise')
                ],
                [
                    'title' => 'Flexible Engagement',
                    'description' => 'From contract staffing to direct hire and managed teams—we offer what fits you best.',
                    'gif_file' => resolve_hashed_asset('Flexible Engagement')
                ],
                [
                    'title' => 'Quality You Can Count On',
                    'description' => 'Rigorous screening, assessment, and validation to ensure the right talent every time.',
                    'gif_file' => resolve_hashed_asset('Quality You Can Count On')
                ]
            ],
            'employers_solutions_kicker' => 'Our Solutions',
            'employers_solutions_title' => 'Flexible Staffing Solutions Built Around Your Business',
            'employers_solutions_list' => [
                [
                    'title' => 'Direct Hire',
                    'description' => 'Full-time talent for long-term roles that drive your business forward.',
                    'video_file' => resolve_hashed_asset('Direct Hire'),
                    'bullets' => [
                        ['text' => 'Permanent placements'],
                        ['text' => 'Leadership hiring'],
                        ['text' => 'Executive search']
                    ]
                ],
                [
                    'title' => 'Contract Staffing',
                    'description' => 'Skilled professionals for short-term or project-based needs.',
                    'video_file' => resolve_hashed_asset('Contract-Staffing'),
                    'bullets' => [
                        ['text' => 'Quick turnaround'],
                        ['text' => 'Specialized skills'],
                        ['text' => 'Flexible engagement']
                    ]
                ],
                [
                    'title' => 'Managed Teams',
                    'description' => 'Dedicated teams that integrate with your operations and scale with you.',
                    'video_file' => resolve_hashed_asset('Managed-Teams'),
                    'bullets' => [
                        ['text' => 'Team of experts'],
                        ['text' => 'Performance managed'],
                        ['text' => 'Scalable delivery']
                    ]
                ],
                [
                    'title' => 'Workforce Consulting',
                    'description' => 'Data-driven insights and strategies to optimize your talent function.',
                    'video_file' => resolve_hashed_asset('Workforce-Consulting'),
                    'bullets' => [
                        ['text' => 'Workforce planning'],
                        ['text' => 'Process optimization'],
                        ['text' => 'Market intelligence']
                    ]
                ]
            ],
            'employers_stats' => [
                [
                    'value' => '500+',
                    'label' => 'Enterprise Clients',
                    'icon_name' => 'Building2'
                ],
                [
                    'value' => '1000+',
                    'label' => 'Successful Placements',
                    'icon_name' => 'Users'
                ],
                [
                    'value' => '48H',
                    'label' => 'Average Time to Shortlist',
                    'icon_name' => 'Clock'
                ],
                [
                    'value' => '95%',
                    'label' => 'Client Retention Rate',
                    'icon_name' => 'ShieldCheck'
                ],
                [
                    'value' => '8+',
                    'label' => 'Industries Served',
                    'icon_name' => 'Globe'
                ]
            ],
            'employers_how_work_kicker' => 'How We Work',
            'employers_how_work_title' => 'A Simple Process. Powerful Results.',
            'employers_how_work_description' => 'We make hiring seamless so you can focus on what matters most—growing your business.',
            'employers_how_work_steps' => [
                [
                    'step' => 'STEP 01',
                    'title' => 'Understand',
                    'desc' => 'We learn your goals, challenges, and hiring needs.',
                    'icon_name' => 'Search'
                ],
                [
                    'step' => 'STEP 02',
                    'title' => 'Source',
                    'desc' => 'We identify and shortlist the best-matched talent.',
                    'icon_name' => 'UserRoundSearch'
                ],
                [
                    'step' => 'STEP 03',
                    'title' => 'Evaluate',
                    'desc' => 'We assess skills, culture fit, and potential.',
                    'icon_name' => 'BadgeCheck'
                ],
                [
                    'step' => 'STEP 04',
                    'title' => 'Deliver',
                    'desc' => 'We present pre-vetted candidates for your final selection.',
                    'icon_name' => 'FileUser'
                ],
                [
                    'step' => 'STEP 05',
                    'title' => 'Onboard & Support',
                    'desc' => 'Smooth onboarding and ongoing support for long-term success.',
                    'icon_name' => 'ShieldCheck'
                ]
            ],
            'employers_industries_kicker' => 'Industries We Serve',
            'employers_industries_title' => 'Industry-Aligned Expertise',
            'employers_industries_list' => [
                [
                    'title' => 'Technology & IT',
                    'desc' => 'Powering innovation with top tech talent and advanced solutions.',
                    'icon_name' => 'Cpu',
                    'color_class' => 'text-purple-500 bg-purple-50',
                    'video_file' => resolve_hashed_asset('Technology')
                ],
                [
                    'title' => 'Banking & Financial',
                    'desc' => 'Delivering expertise that drives growth and ensures compliance.',
                    'icon_name' => 'Landmark',
                    'color_class' => 'text-emerald-500 bg-emerald-50',
                    'video_file' => resolve_hashed_asset('Financial-Services')
                ],
                [
                    'title' => 'Healthcare',
                    'desc' => 'Connecting healthcare organizations with skilled professionals.',
                    'icon_name' => 'Heart',
                    'color_class' => 'text-rose-500 bg-rose-50',
                    'video_file' => resolve_hashed_asset('Healthcare')
                ],
                [
                    'title' => 'Manufacturing',
                    'desc' => 'Empowering manufacturers with talent that drives efficiency.',
                    'icon_name' => 'Factory',
                    'color_class' => 'text-orange-500 bg-orange-50',
                    'video_file' => resolve_hashed_asset('Manufacturing')
                ],
                [
                    'title' => 'Retail & E-commerce',
                    'desc' => 'Building agile teams that enhance customer experience.',
                    'icon_name' => 'ShoppingCart',
                    'color_class' => 'text-amber-500 bg-amber-50',
                    'video_file' => resolve_hashed_asset('Retail-E-Commerce')
                ],
                [
                    'title' => 'Logistics & Supply Chain',
                    'desc' => 'Strengthening supply chains with expert talent and smart solutions.',
                    'icon_name' => 'Truck',
                    'color_class' => 'text-indigo-500 bg-indigo-50',
                    'video_file' => resolve_hashed_asset('Logistics')
                ]
            ],
            'employers_faqs' => [
                [
                    'q' => "What is TechNova Systems' screening and vetting process?",
                    'a' => 'We use a rigorous multi-stage vetting process that includes AI-powered technical assessments, portfolio reviews, and in-depth live engineering interviews to ensure only the top 3% of talent is presented to you.'
                ],
                [
                    'q' => 'How fast can you place a candidate or deploy a managed team?',
                    'a' => 'For individual contractors or direct-hires, we typically share qualified, vetted shortlists within 48 hours. Complete managed teams (squads) can be deployed and integrated within 2 to 3 weeks.'
                ],
                [
                    'q' => 'What pricing or fee structures do you offer?',
                    'a' => 'We offer flexible models tailored to your business: contingency-based direct hire placement fees, hourly contract billing, and fixed-scope monthly rates for dedicated managed engineering teams.'
                ],
                [
                    'q' => 'Is there a warranty or replacement guarantee for direct hires?',
                    'a' => 'Yes, we offer a comprehensive 90-day replacement guarantee on all direct-hire placements. If a candidate leaves or does not meet performance expectations, we will find a replacement at no additional cost.'
                ],
                [
                    'q' => 'How do you handle IP protection and security compliance?',
                    'a' => 'All contract developers and managed teams sign comprehensive NDAs and IP assignment agreements prior to onboarding. We strictly comply with your internal security standards, GDPR, and SOC2 requirements.'
                ],
                [
                    'q' => 'Can we transition a contract developer to a full-time employee?',
                    'a' => 'Absolutely! We offer a flexible contract-to-hire model that allows you to evaluate developers on your projects before converting them to full-time employees under structured transition terms.'
                ]
            ],
            'employers_form_id' => '21'
        ]
    ],
    'insights' => [
        'title' => 'AI & Insights',
        'template' => 'template-insights.php',
        'fields' => [
            'insights_kicker' => 'TechNova Insights',
            'insights_headline' => 'Knowledge to Power Your Digital Transformation',
            'insights_description' => 'Stay ahead of the curve with our latest research, trend reports, and deep-dive technical guides.'
        ]
    ],
    'contact' => [
        'title' => 'Contact Us',
        'template' => 'template-contact.php',
        'fields' => [
            'contact_kicker' => 'Get In Touch',
            'contact_headline' => 'Let\'s Start a Conversation That Moves You [accent]Forward.[/accent]',
            'contact_description' => 'Whether you\'re looking to scale your engineering team, outsource software projects, or submit your resume, we\'re ready to partner with you.',
            'contact_bg_media' => resolve_hashed_asset('contact-usbg'),
            'contact_offices' => [
                [
                    'city' => 'Corporate Office',
                    'address' => "3701 Pender Dr Suite 510\nFairfax, VA, 22030",
                    'phone' => '+1 (571) 651 - 0246',
                    'email' => 'Info@technovasystemsinc.com'
                ]
            ],
            'contact_form_id' => '21',
            'talent_form_id' => '21',
            'subscribe_form_id' => '21',
            'newsletter_form_id' => '21',
            'contact_response_items' => [
                [
                    'label' => 'Response within',
                    'detail' => '1 Business Day',
                    'icon_name' => 'Clock'
                ],
                [
                    'label' => 'Enterprise Staffing',
                    'detail' => '& Consulting',
                    'icon_name' => 'Users'
                ],
                [
                    'label' => 'Dedicated Workforce',
                    'detail' => 'Specialists',
                    'icon_name' => 'ShieldCheck'
                ]
            ],
            'contact_methods' => [
                [
                    'title' => 'Corporate Office',
                    'detail' => "3701 Pender Dr Suite 510\nFairfax, VA, 22030",
                    'icon_name' => 'MapPin'
                ],
                [
                    'title' => 'Email Us',
                    'detail' => 'Info@technovasystemsinc.com',
                    'icon_name' => 'Mail'
                ],
                [
                    'title' => 'Call Us',
                    'detail' => '+1 (571) 651 - 0246',
                    'icon_name' => 'Phone'
                ]
            ],
            'contact_proof_items' => [
                [
                    'title' => 'Free Consultation',
                    'description' => 'No obligation. Just expert advice.',
                    'icon_name' => 'Users'
                ],
                [
                    'title' => 'Confidential',
                    'description' => 'Your information is 100% secure.',
                    'icon_name' => 'ShieldCheck'
                ],
                [
                    'title' => 'Global Reach',
                    'description' => 'Serving clients and talent worldwide.',
                    'icon_name' => 'Building2'
                ],
                [
                    'title' => 'Proven Expertise',
                    'description' => 'AI-led solutions that deliver results.',
                    'icon_name' => 'BadgeCheck'
                ]
            ],
            'contact_find_us_title' => 'Find Us',
            'contact_find_us_description' => 'Our headquarters is located in the heart of the business district, easily accessible by public transport and major highways.',
            'contact_find_us_address' => "TechNova Systems\n3701 Pender Dr Suite 510\nFairfax, VA, 22030",
            'contact_find_us_button_text' => 'Get Directions',
            'contact_find_us_button_link' => 'https://maps.google.com/maps?q=3701+Pender+Dr+Suite+510,+Fairfax,+VA,+22030',
            'contact_faqs' => [
                [
                    'q' => 'How quickly will someone contact me?',
                    'a' => 'Our team typically responds to all inquiries within one business day.'
                ],
                [
                    'q' => 'Is there a consultation fee?',
                    'a' => 'No, all initial consultations are completely free and confidential.'
                ],
                [
                    'q' => 'Do you work with startups as well as enterprises?',
                    'a' => 'Yes, we partner with organizations of all sizes, from fast-growing startups to Fortune 500 enterprises.'
                ],
                [
                    'q' => 'Can I submit my resume through this form?',
                    'a' => 'Yes, candidates can use this form, or they can submit their details on our For Talent page to be added directly to our engineering pool.'
                ],
                [
                    'q' => 'Do you offer remote hiring solutions?',
                    'a' => 'Yes, we specialize in local, hybrid, and fully remote hiring solutions across various technology stacks.'
                ],
                [
                    'q' => 'How is my information protected?',
                    'a' => 'We take data security very seriously. All information is confidential, stored securely, and we are happy to sign NDAs prior to discussion.'
                ]
            ],
            'contact_immediate_title' => 'Need Immediate Assistance?',
            'contact_immediate_description' => 'Our specialists are available to discuss urgent hiring requirements, consulting projects, or career-related questions.',
            'contact_immediate_button_text' => 'Talk to an Expert',
            'contact_immediate_button_link' => '#contact'
        ]
    ],
    'industries' => [
        'title' => 'Industries',
        'template' => 'template-react.php',
        'fields' => [
            'industries_kicker' => 'Industries We Serve',
            'industries_headline' => 'Enabling Every Industry With the Right Talent and [accent]Technology.[/accent]',
            'industries_description' => 'From emerging startups to global enterprises, we deliver talent and solutions tailored to the unique needs of your industry.',
            'industries_bg_video' => resolve_hashed_asset('industiespagebg'),
            'industries_hero_features' => [
                [
                    'title' => 'Industry-Aligned Talent',
                    'description' => 'Specialized professionals who understand your domain.',
                    'icon_name' => 'Users'
                ],
                [
                    'title' => 'Domain Expertise',
                    'description' => 'Deep knowledge of industry challenges and opportunities.',
                    'icon_name' => 'Award'
                ],
                [
                    'title' => 'Measurable Impact',
                    'description' => 'Solutions that drive growth, efficiency and innovation.',
                    'icon_name' => 'TrendingUp'
                ]
            ],
            'industries_grid_kicker' => 'Industries',
            'industries_grid_title' => 'Industry Expertise. Business Impact.',
            'industries_grid_description' => 'We partner with organizations across industries to build high-performing teams and deliver technology solutions that create lasting impact.',
            'industries_list' => [
                [
                    'title' => 'Technology & IT',
                    'description' => 'Powering innovation with top tech talent and advanced solutions across emerging technologies.',
                    'icon_name' => 'Cpu',
                    'color_class' => 'text-purple-500 bg-purple-50 hover:bg-purple-100',
                    'video_file' => resolve_hashed_asset('Technology')
                ],
                [
                    'title' => 'Retail & E-commerce',
                    'description' => 'Building agile teams and digital solutions that enhance customer experiences and drive growth.',
                    'icon_name' => 'ShoppingCart',
                    'color_class' => 'text-amber-500 bg-amber-50 hover:bg-amber-100',
                    'video_file' => resolve_hashed_asset('Retail-E-Commerce')
                ],
                [
                    'title' => 'Banking & Financial Services',
                    'description' => 'Delivering compliance-driven talent and solutions for a secure and future-ready financial sector.',
                    'icon_name' => 'Landmark',
                    'color_class' => 'text-emerald-500 bg-emerald-50 hover:bg-emerald-100',
                    'video_file' => resolve_hashed_asset('Financial-Services')
                ],
                [
                    'title' => 'Healthcare & Life Sciences',
                    'description' => 'Connecting healthcare organizations with skilled professionals and technology that saves lives.',
                    'icon_name' => 'Heart',
                    'color_class' => 'text-rose-500 bg-rose-50 hover:bg-rose-100',
                    'video_file' => resolve_hashed_asset('Healthcare')
                ],
                [
                    'title' => 'Manufacturing',
                    'description' => 'Empowering manufacturing businesses with skilled talent and process-driven solutions.',
                    'icon_name' => 'Factory',
                    'color_class' => 'text-orange-500 bg-orange-50 hover:bg-orange-100',
                    'video_file' => resolve_hashed_asset('Manufacturing')
                ],
                [
                    'title' => 'Logistics & Supply Chain',
                    'description' => 'Strengthening supply chains with expert talent and smart, scalable technology solutions.',
                    'icon_name' => 'Truck',
                    'color_class' => 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100',
                    'video_file' => resolve_hashed_asset('Logistics')
                ],
                [
                    'title' => 'Education & EdTech',
                    'description' => 'Building future-ready education platforms and connecting institutions with the right technology talent.',
                    'icon_name' => 'GraduationCap',
                    'color_class' => 'text-sky-500 bg-sky-50 hover:bg-sky-100',
                    'video_file' => resolve_hashed_asset('Education')
                ],
                [
                    'title' => 'Real Estate & Construction',
                    'description' => 'Delivering on-time projects with specialized talent and solutions that build stronger tomorrow.',
                    'icon_name' => 'Building',
                    'color_class' => 'text-teal-500 bg-teal-50 hover:bg-teal-100',
                    'video_file' => resolve_hashed_asset('Real-Estate')
                ]
            ],
            'industries_stats' => [
                ['value' => '25+', 'label' => 'Industries Served', 'icon_name' => 'Building2'],
                ['value' => '500+', 'label' => 'Enterprise Clients', 'icon_name' => 'Users'],
                ['value' => '1000+', 'label' => 'Successful Placements', 'icon_name' => 'ShieldCheck'],
                ['value' => '20+', 'label' => 'Countries Reached', 'icon_name' => 'Globe'],
                ['value' => '98%', 'label' => 'Client Satisfaction', 'icon_name' => 'Star']
            ],
            'industries_solutions_kicker' => 'How We Help Industries',
            'industries_solutions_title' => 'Solutions Designed Around Your Industry Needs.',
            'industries_solutions_list' => [
                [
                    'title' => 'Specialized Talent Networks',
                    'description' => 'Access to pre-vetted professionals with industry-specific expertise.',
                    'icon_name' => 'Users'
                ],
                [
                    'title' => 'Consulting & Strategy',
                    'description' => 'Advisory and consulting services to solve complex business challenges.',
                    'icon_name' => 'Award'
                ],
                [
                    'title' => 'Technology Solutions',
                    'description' => 'Custom technology solutions that drive efficiency and innovation.',
                    'icon_name' => 'Cpu'
                ],
                [
                    'title' => 'Flexible Engagement Models',
                    'description' => 'Scalable engagement models tailored to your business goals.',
                    'icon_name' => 'ShieldCheck'
                ]
            ],
            'industries_transform_title' => 'We go beyond staffing. We build partnerships that transform industries.',
            'industries_transform_bg' => resolve_hashed_asset('solutions_skyline'),
            'industries_transform_items' => [
                [
                    'title' => 'Understand',
                    'description' => 'We learn your industry and business goals.',
                    'icon_name' => 'Search'
                ],
                [
                    'title' => 'Build',
                    'description' => 'We deliver the right talent and solutions.',
                    'icon_name' => 'Wrench'
                ],
                [
                    'title' => 'Transform',
                    'description' => 'We drive impact and long-term growth.',
                    'icon_name' => 'Rocket'
                ]
            ],
            'industries_cta_title' => 'Let\'s Drive Industry Innovation Together',
            'industries_cta_description' => 'Partner with TechNova Systems to access the right talent and technology solutions for your industry.',
            'industries_cta_button_text' => 'Schedule a Consultation',
            'industries_cta_button_link' => '#contact'
        ]
    ]
];

foreach ($pages as $slug => $data) {
    // Find page by path/slug
    $page = get_page_by_path($slug);
    
    if (!$page) {
        $page_id = wp_insert_post([
            'post_title'     => $data['title'],
            'post_name'      => $slug,
            'post_status'    => 'publish',
            'post_type' => 'page',
            'page_template'  => $data['template']
        ]);
        echo "<p style='color: green;'>Created page: <strong>{$data['title']}</strong> (ID: $page_id)</p>";
    } else {
        $page_id = $page->ID;
        update_post_meta($page_id, '_wp_page_template', $data['template']);
        echo "<p style='color: blue;'>Updated page template for: <strong>{$data['title']}</strong> (ID: $page_id)</p>";
    }
    
    $force_overwrite = isset($_GET['force']) && $_GET['force'] === '1';

    // Seed ACF fields for this page
    if (function_exists('update_field')) {
        foreach ($data['fields'] as $key => $val) {
            $existing_val = get_field($key, $page_id, false);
            if ($force_overwrite || $existing_val === null || $existing_val === false || $existing_val === '' || $existing_val === []) {
                update_field($key, $val, $page_id);
            }
        }
        echo "<p style='color: darkcyan;'>--> Seeded ACF fields for {$data['title']}</p>";
    } else {
        // Fallback to standard WP postmeta if ACF is inactive
        foreach ($data['fields'] as $key => $val) {
            $existing_val = get_post_meta($page_id, $key, true);
            if ($force_overwrite || $existing_val === null || $existing_val === false || $existing_val === '' || $existing_val === []) {
                update_post_meta($page_id, $key, $val);
                update_post_meta($page_id, '_' . $key, 'field_' . $slug . '_' . $key);
            }
        }
        echo "<p style='color: darkorange;'>--> Seeded metadata fields directly (ACF inactive) for {$data['title']}</p>";
    }
}

echo "<h3>Database seeding completed successfully! 🎉</h3>";
echo "<p>Please verify that all page content is editable and pre-filled in your WordPress dashboard.</p>";
?>
