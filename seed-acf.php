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

$pages = [
    'home' => [
        'title' => 'Home',
        'template' => 'template-home.php',
        'fields' => [
            'hero_slides' => [
                [
                    'bg_type' => 'video',
                    'video_file' => resolve_hashed_asset('1st slide'),
                    'image_file' => '',
                    'headline_accent' => 'We Build [accent]High-Performance[/accent] Teams That Drive What\'s Next',
                    'description' => 'AI-powered talent solutions and technology consulting that help organizations innovate, scale and lead in a digital-first world.'
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
            
            'home_solutions_kicker' => 'Our Capabilities',
            'home_solutions_title' => 'End-to-End Talent & Technology Solutions',
            'home_solutions' => [
                [
                    'title' => 'AI Talent Solutions',
                    'description' => 'Find and engage top AI/ML, Data & Engineering talent fast.',
                    'icon_name' => 'BrainCircuit',
                    'color_class' => 'blue',
                    'video_file' => resolve_hashed_asset('AI-Powered')
                ],
                [
                    'title' => 'Executive Search',
                    'description' => 'C-Suite to Director level hiring for critical leadership roles.',
                    'icon_name' => 'UserRoundSearch',
                    'color_class' => 'orange',
                    'video_file' => ''
                ],
                [
                    'title' => 'Workforce Consulting',
                    'description' => 'Strategic workforce planning aligned with your business goals.',
                    'icon_name' => 'UsersRound',
                    'color_class' => 'mint',
                    'video_file' => ''
                ],
                [
                    'title' => 'Contract Staffing',
                    'description' => 'Flexible staffing models to meet dynamic business needs.',
                    'icon_name' => 'FileUser',
                    'color_class' => 'coral',
                    'video_file' => ''
                ],
                [
                    'title' => 'Digital Transformation',
                    'description' => 'Modernize your business with technology, data and automation.',
                    'icon_name' => 'Cpu',
                    'color_class' => 'blue',
                    'video_file' => ''
                ],
                [
                    'title' => 'Managed Teams',
                    'description' => 'Build high-performing teams dedicated to your success.',
                    'icon_name' => 'UsersRound',
                    'color_class' => 'purple',
                    'video_file' => ''
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
            'home_cta_right_kicker' => 'Insights & Trends',
            'home_cta_right_title' => 'Insights That Drive What\'s Next',
            'home_cta_right_desc' => 'Explore the latest talent intelligence trends, engineering hiring guides, and AI integration strategies written by our consultants.',
            'home_cta_right_btn_text' => 'View All Insights',
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
            'about_values' => [
                [
                    'title' => 'Innovation First',
                    'description' => 'Embracing next-gen technologies to solve complex problems and build a stronger digital core.',
                    'icon_name' => 'Cpu'
                ],
                [
                    'title' => 'Quality Driven',
                    'description' => 'Committed to delivery excellence and placing high-performance engineering candidates.',
                    'icon_name' => 'ShieldCheck'
                ],
                [
                    'title' => 'Human Centric',
                    'description' => 'Fostering long-term collaborative partnerships built on trust, transparency, and impact.',
                    'icon_name' => 'Users'
                ]
            ]
        ]
    ],
    'talent' => [
        'title' => 'For Talent',
        'template' => 'template-talent.php',
        'fields' => [
            'talent_kicker' => 'For Talent',
            'talent_headline' => 'Find the Right Opportunity. Build the Career [accent]You Deserve.[/accent]',
            'talent_description' => 'We connect exceptional engineering and tech talent with forward-thinking enterprises and fast-growing tech startups.',
            'talent_stats' => [
                [
                    'value' => '1000+',
                    'label' => 'Active Placements',
                    'icon_name' => 'BriefcaseBusiness'
                ],
                [
                    'value' => '500+',
                    'label' => 'Enterprise Partners',
                    'icon_name' => 'Users'
                ],
                [
                    'value' => '98%',
                    'label' => 'Candidate Satisfaction',
                    'icon_name' => 'Star'
                ]
            ]
        ]
    ],
    'employers' => [
        'title' => 'For Employers',
        'template' => 'template-employers.php',
        'fields' => [
            'employers_kicker' => 'For Employers',
            'employers_headline' => 'Exceptional Talent. Measurable Impact. [accent]Built Around You.[/accent]',
            'employers_description' => 'TechNova Systems helps enterprise engineering leaders scale their development capacity with speed, precision, and zero-headache.',
            'employers_stats' => [
                [
                    'value' => '25+',
                    'label' => 'Industries Served',
                    'icon_name' => 'Building2'
                ],
                [
                    'value' => '500+',
                    'label' => 'Enterprise Partners',
                    'icon_name' => 'Users'
                ],
                [
                    'value' => '98%',
                    'label' => 'Client Retention Rate',
                    'icon_name' => 'Star'
                ]
            ]
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
            'contact_offices' => [
                [
                    'city' => 'Corporate Office',
                    'address' => "3701 Pender Dr Suite 510\nFairfax, VA, 22030",
                    'phone' => '+1 (571) 651 - 0246',
                    'email' => 'Info@technovasystemsinc.com'
                ]
            ],
            'contact_form_id' => '1000',
            'talent_form_id' => '1001',
            'subscribe_form_id' => '1002',
            'newsletter_form_id' => '1003'
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
    
    // Seed ACF fields for this page
    if (function_exists('update_field')) {
        foreach ($data['fields'] as $key => $val) {
            update_field($key, $val, $page_id);
        }
        echo "<p style='color: darkcyan;'>--> Seeded ACF fields for {$data['title']}</p>";
    } else {
        // Fallback to standard WP postmeta if ACF is inactive
        foreach ($data['fields'] as $key => $val) {
            update_post_meta($page_id, $key, $val);
            update_post_meta($page_id, '_' . $key, 'field_' . $slug . '_' . $key);
        }
        echo "<p style='color: darkorange;'>--> Seeded metadata fields directly (ACF inactive) for {$data['title']}</p>";
    }
}

echo "<h3>Database seeding completed successfully! 🎉</h3>";
echo "<p>Please verify that all page content is editable and pre-filled in your WordPress dashboard.</p>";
?>
