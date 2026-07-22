<?php
/**
 * TechNova SEO metadata and structured data helpers.
 */

function technova_seo_config($page_id) {
    $slug = get_post_field('post_name', $page_id);
    $parent_id = wp_get_post_parent_id($page_id);
    $parent_slug = $parent_id ? get_post_field('post_name', $parent_id) : '';

    $pages = [
        'home' => [
            'title' => 'TechNova Systems | IT Staffing & AI Consulting - Hire Top Tech Talent, Fast',
            'description' => 'TechNova Systems connects growing companies with vetted IT talent and AI consulting expertise. Direct hire, contract staffing, executive search & managed teams - start today.',
        ],
        'employers' => [
            'title' => 'IT Staffing for Employers | Direct Hire, Contract & Executive Search - TechNova Systems',
            'description' => 'Hire pre-vetted IT and AI talent fast. TechNova Systems offers direct hire, contract staffing, managed teams, and executive search for growing tech teams.',
        ],
        'talent' => [
            'title' => 'IT Jobs & Tech Careers | Submit Your Resume - TechNova Systems',
            'description' => 'Explore IT, AI, and engineering job opportunities with TechNova Systems. Submit your resume and let our recruiters match you with your next career move.',
        ],
        'industries' => [
            'title' => 'Industries We Serve | IT Staffing for Financial Services, Healthcare & More - TechNova Systems',
            'description' => 'TechNova Systems delivers industry-specific IT staffing and AI consulting for financial services, healthcare, retail, manufacturing, and logistics.',
        ],
        'about' => [
            'title' => 'About TechNova Systems | IT Staffing & AI Consulting Company',
            'description' => 'Learn about TechNova Systems - an IT staffing and AI consulting firm helping organizations build high-performance technology teams.',
        ],
        'contact' => [
            'title' => 'Contact TechNova Systems | IT Staffing & AI Consulting',
            'description' => 'Get in touch with TechNova Systems. Whether you are hiring or looking for your next opportunity, our team is ready to help.',
        ],
        'solutions' => [
            'title' => 'IT Staffing & Technology Solutions - TechNova Systems',
            'description' => 'Explore TechNova Systems solutions for AI talent, executive search, workforce consulting, digital transformation, contract staffing, and managed teams.',
        ],
    ];

    $solutions = [
        'ai-talent-solutions' => [
            'title' => 'AI Talent Solutions | AI, ML & Data Engineering Recruiting - TechNova Systems',
            'description' => 'TechNova Systems places AI/ML engineers, data scientists, and data engineers for companies building real AI products. Contract, direct hire & managed teams.',
        ],
        'executive-search' => [
            'title' => 'Technology Executive Search | C-Suite & Director-Level Hiring - TechNova Systems',
            'description' => 'TechNova Systems executive search practice places CTOs, VPs of Engineering, and other technology leaders who can execute, not just advise.',
        ],
        'workforce-consulting' => [
            'title' => 'Workforce Consulting for Technology Teams - TechNova Systems',
            'description' => 'Strategic workforce planning and org design from TechNova Systems - build the right team structure before you start hiring.',
        ],
        'digital-transformation' => [
            'title' => 'Digital Transformation Consulting & Talent - TechNova Systems',
            'description' => 'TechNova Systems pairs digital transformation consulting with the technical talent to execute it - modernization, automation, and delivery.',
        ],
        'contract-staffing' => [
            'title' => 'Contract IT Staffing | Flexible Technical Teams - TechNova Systems',
            'description' => 'Need technical talent fast? TechNova Systems contract staffing gets pre-vetted IT and engineering professionals onboarded in days, not months.',
        ],
        'managed-teams' => [
            'title' => 'Managed Teams | Dedicated Delivery Pods - TechNova Systems',
            'description' => 'TechNova Systems builds and manages dedicated technical delivery teams so you get outcomes, not just headcount.',
        ],
    ];

    $industries = [
        'financial-services' => [
            'title' => 'Financial Services IT Staffing & Technology Consulting - TechNova Systems',
            'description' => 'Specialized IT staffing and AI consulting for banks, fintechs, and financial services teams modernizing secure, regulated technology platforms.',
        ],
        'healthcare-life-sciences' => [
            'title' => 'Healthcare IT Staffing & Life Sciences Technology Talent - TechNova Systems',
            'description' => 'Find healthcare IT, clinical data, interoperability, and engineering talent with the technical and regulatory knowledge your organization needs.',
        ],
        'technology-software' => [
            'title' => 'Technology & Software IT Staffing - TechNova Systems',
            'description' => 'Scale software, product, cloud, data, and DevOps teams with pre-vetted technology talent and flexible delivery models from TechNova Systems.',
        ],
        'retail-ecommerce' => [
            'title' => 'Retail & E-Commerce IT Staffing - TechNova Systems',
            'description' => 'Build retail and e-commerce technology teams for personalization, inventory, data, and omnichannel customer experiences.',
        ],
        'logistics-supply-chain' => [
            'title' => 'Logistics & Supply Chain Technology Staffing - TechNova Systems',
            'description' => 'Access technology talent for supply chain visibility, routing optimization, warehouse automation, data, and connected logistics operations.',
        ],
        'manufacturing-industrial' => [
            'title' => 'Manufacturing IT Staffing & Digital Transformation - TechNova Systems',
            'description' => 'Specialized IT, OT, automation, data, and engineering talent for manufacturers modernizing plant-floor and enterprise systems.',
        ],
    ];

    if ($parent_slug === 'solutions' && isset($solutions[$slug])) {
        return $solutions[$slug];
    }
    if ($parent_slug === 'industries' && isset($industries[$slug])) {
        return $industries[$slug];
    }
    return $pages[$slug] ?? [
        'title' => get_the_title($page_id) . ' | TechNova Systems',
        'description' => 'TechNova Systems provides IT staffing, AI consulting, executive search, and technology workforce solutions.',
    ];
}

function technova_prepare_seo($page_id) {
    $seo = technova_seo_config($page_id);
    add_filter('pre_get_document_title', function () use ($seo) { return $seo['title']; }, 999);
    add_filter('rank_math/frontend/title', function () use ($seo) { return $seo['title']; }, 999);
    add_filter('rank_math/frontend/description', function () use ($seo) { return $seo['description']; }, 999);
    add_filter('rank_math/frontend/canonical', function () use ($page_id) { return get_permalink($page_id); }, 999);
    add_filter('rank_math/json_ld', function ($data) {
        $home = home_url('/');
        foreach ($data as $key => &$entity) {
            $type = $entity['@type'] ?? '';
            $types = is_array($type) ? $type : [$type];
            if (in_array('Article', $types, true) || in_array('Person', $types, true)) {
                unset($data[$key]);
                continue;
            }
            if (in_array('Organization', $types, true)) {
                $logo = get_site_icon_url(512) ?: get_stylesheet_directory_uri() . '/react-app/dist/assets/favicon.png';
                $entity['name'] = 'TechNova Systems Inc.';
                $entity['url'] = $home;
                $entity['logo'] = ['@type' => 'ImageObject', 'url' => $logo];
                $entity['sameAs'] = ['https://www.linkedin.com/company/technovasystemsinc/'];
                $entity['email'] = 'Info@technovasystemsinc.com';
                $entity['telephone'] = '+1-571-651-0246';
                $entity['address'] = [
                    '@type' => 'PostalAddress',
                    'streetAddress' => '3701 Pender Dr Suite 510',
                    'addressLocality' => 'Fairfax',
                    'addressRegion' => 'VA',
                    'postalCode' => '22030',
                    'addressCountry' => 'US',
                ];
            }
        }
        unset($entity);
        return $data;
    }, 99);
    return $seo;
}

function technova_output_meta_fallback($seo, $page_id) {
    if (defined('RANK_MATH_VERSION')) return;
    echo '<meta name="description" content="' . esc_attr($seo['description']) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url(get_permalink($page_id)) . '">' . "\n";
}

function technova_output_structured_data($page_id, $acf_data = []) {
    $home = home_url('/');
    $slug = get_post_field('post_name', $page_id);
    $logo = get_site_icon_url(512);
    if (!$logo) $logo = get_stylesheet_directory_uri() . '/react-app/dist/assets/favicon.png';
    $same_as = ['https://www.linkedin.com/company/technovasystemsinc/'];

    $schemas = [];

    if (!defined('RANK_MATH_VERSION')) {
        $schemas[] = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            '@id' => $home . '#organization',
            'name' => 'TechNova Systems Inc.',
            'url' => $home,
            'logo' => ['@type' => 'ImageObject', 'url' => $logo],
            'sameAs' => $same_as,
            'email' => 'Info@technovasystemsinc.com',
            'telephone' => '+1-571-651-0246',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '3701 Pender Dr Suite 510',
                'addressLocality' => 'Fairfax',
                'addressRegion' => 'VA',
                'postalCode' => '22030',
                'addressCountry' => 'US',
            ],
        ];
    }

    if ($slug === 'home' && !defined('RANK_MATH_VERSION')) {
        $schemas[] = [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            '@id' => $home . '#website',
            'url' => $home,
            'name' => 'TechNova Systems',
            'publisher' => ['@id' => $home . '#organization'],
        ];
    }

    if ($slug === 'contact') {
        $schemas[] = [
            '@context' => 'https://schema.org',
            '@type' => 'ProfessionalService',
            '@id' => $home . '#localbusiness',
            'name' => 'TechNova Systems Inc.',
            'url' => $home,
            'image' => $logo,
            'telephone' => '+1-571-651-0246',
            'email' => 'Info@technovasystemsinc.com',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '3701 Pender Dr Suite 510',
                'addressLocality' => 'Fairfax',
                'addressRegion' => 'VA',
                'postalCode' => '22030',
                'addressCountry' => 'US',
            ],
        ];
    }

    $faq_field = ['employers' => 'employers_faqs', 'talent' => 'talent_faqs', 'contact' => 'contact_faqs'][$slug] ?? '';
    $faqs = $faq_field && !empty($acf_data[$faq_field]) ? $acf_data[$faq_field] : [];
    if ($faqs) {
        $entities = [];
        foreach ($faqs as $faq) {
            $question = wp_strip_all_tags($faq['q'] ?? '');
            $answer = wp_strip_all_tags($faq['a'] ?? '');
            if (!$question || !$answer) continue;
            $entities[] = [
                '@type' => 'Question',
                'name' => $question,
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $answer],
            ];
        }
        if ($entities) $schemas[] = ['@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => $entities];
    }

    if (wp_get_post_parent_id($page_id) && get_post_field('post_name', wp_get_post_parent_id($page_id)) === 'solutions') {
        $seo = technova_seo_config($page_id);
        $schemas[] = [
            '@context' => 'https://schema.org',
            '@type' => 'Service',
            'name' => get_the_title($page_id),
            'description' => $seo['description'],
            'url' => get_permalink($page_id),
            'provider' => ['@id' => $home . '#organization'],
            'areaServed' => ['@type' => 'Country', 'name' => 'United States'],
        ];
    }
    if (wp_get_post_parent_id($page_id) && get_post_field('post_name', wp_get_post_parent_id($page_id)) === 'industries') {
        $seo = technova_seo_config($page_id);
        $schemas[] = [
            '@context' => 'https://schema.org',
            '@type' => 'Service',
            'name' => get_the_title($page_id) . ' IT Staffing and Consulting',
            'description' => $seo['description'],
            'url' => get_permalink($page_id),
            'provider' => ['@id' => $home . '#organization'],
            'areaServed' => ['@type' => 'Country', 'name' => 'United States'],
        ];
    }

    foreach ($schemas as $schema) {
        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
    }
}
