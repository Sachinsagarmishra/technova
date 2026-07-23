<?php
/**
 * TechNova SEO metadata and structured data helpers.
 */

function technova_primary_navigation_tree() {
    $locations = get_nav_menu_locations();
    $menu_id = isset($locations['technova_primary']) ? (int) $locations['technova_primary'] : 0;
    if (!$menu_id) return [];

    $items = wp_get_nav_menu_items($menu_id, ['update_post_term_cache' => false]);
    if (!$items || is_wp_error($items)) return [];

    $nodes = [];
    foreach ($items as $item) {
        $nodes[(int) $item->ID] = [
            'id' => (int) $item->ID,
            'title' => html_entity_decode($item->title, ENT_QUOTES, get_bloginfo('charset')),
            'url' => $item->url,
            'description' => wp_strip_all_tags($item->description),
            'target' => $item->target ?: '',
            'classes' => array_values(array_filter((array) $item->classes)),
            'parent' => (int) $item->menu_item_parent,
            'children' => [],
        ];
    }

    $tree = [];
    foreach (array_keys($nodes) as $id) {
        $parent = $nodes[$id]['parent'];
        if ($parent && isset($nodes[$parent])) {
            $nodes[$parent]['children'][] =& $nodes[$id];
        } else {
            $tree[] =& $nodes[$id];
        }
    }
    return array_values($tree);
}

function technova_frontend_data($page_id) {
    $data = function_exists('get_fields') ? get_fields($page_id) : [];
    if (!is_array($data)) $data = [];
    $data['primary_menu'] = technova_primary_navigation_tree();
    return $data;
}

function technova_seo_config($page_id) {
    $slug = get_post_field('post_name', $page_id);
    $parent_id = wp_get_post_parent_id($page_id);
    $parent_slug = $parent_id ? get_post_field('post_name', $parent_id) : '';

    $pages = [
        'home' => [
            'title' => 'IT Staffing & AI Consulting | TechNova Systems',
            'description' => 'Build high-performing technology teams with vetted IT talent, AI consulting, contract staffing, executive search, and managed teams.',
        ],
        'employers' => [
            'title' => 'IT Staffing for Employers | TechNova Systems',
            'description' => 'Hire vetted IT and AI professionals through contract staffing, direct hire, executive search, and managed team solutions from TechNova.',
        ],
        'talent' => [
            'title' => 'Technology Jobs & Careers | TechNova Systems',
            'description' => 'Explore IT, AI, data, cloud, and engineering careers. Submit your resume and let TechNova connect you with the right opportunity.',
        ],
        'industries' => [
            'title' => 'IT Staffing by Industry | TechNova Systems',
            'description' => 'Explore specialized IT staffing and technology consulting for financial services, healthcare, software, retail, logistics, and manufacturing.',
        ],
        'about' => [
            'title' => 'About TechNova Systems | IT Staffing & AI Consulting',
            'description' => 'Learn how TechNova combines specialized technology talent, AI expertise, and human-first partnerships to help organizations grow.',
        ],
        'contact' => [
            'title' => 'Contact TechNova Systems | Staffing & Consulting',
            'description' => 'Contact TechNova Systems for technology staffing, AI consulting, career opportunities, or help building your next high-impact team.',
        ],
        'solutions' => [
            'title' => 'IT Staffing & Technology Solutions | TechNova Systems',
            'description' => 'Explore AI talent, executive search, workforce consulting, digital transformation, contract staffing, and managed team solutions.',
        ],
        'privacy-policy' => [
            'title' => 'Privacy Policy | TechNova Systems',
            'description' => 'Learn how TechNova Systems collects, uses, protects, and shares personal information submitted through our staffing and consulting website.',
        ],
        'terms-of-service' => [
            'title' => 'Terms of Service | TechNova Systems',
            'description' => 'Review the terms governing your use of the TechNova Systems website, content, staffing resources, forms, and related online services.',
        ],
        'cookie-policy' => [
            'title' => 'Cookie Policy | TechNova Systems',
            'description' => 'Learn how TechNova Systems uses necessary, functional, analytics, and related technologies on our website and how to manage them.',
        ],
    ];

    $solutions = [
        'ai-talent-solutions' => [
            'title' => 'AI Talent Solutions | TechNova Systems',
            'description' => 'Hire vetted AI engineers, machine learning specialists, data scientists, and data engineers through flexible talent solutions.',
        ],
        'executive-search' => [
            'title' => 'Technology Executive Search | TechNova Systems',
            'description' => 'Find CTOs, VPs of Engineering, CISOs, and technology leaders through a focused, confidential executive search process.',
        ],
        'workforce-consulting' => [
            'title' => 'Technology Workforce Consulting | TechNova Systems',
            'description' => 'Align workforce planning, organization design, skills, and hiring strategy with your technology roadmap and business goals.',
        ],
        'digital-transformation' => [
            'title' => 'Digital Transformation Consulting | TechNova Systems',
            'description' => 'Modernize platforms, automate workflows, and accelerate delivery with digital transformation consulting and specialized talent.',
        ],
        'contract-staffing' => [
            'title' => 'Contract IT Staffing | TechNova Systems',
            'description' => 'Add vetted IT, engineering, cloud, data, and AI professionals quickly with flexible contract staffing from TechNova Systems.',
        ],
        'managed-teams' => [
            'title' => 'Managed Technology Teams | TechNova Systems',
            'description' => 'Build dedicated, outcome-focused technology teams with the skills, structure, and delivery support needed to execute your roadmap.',
        ],
    ];

    $industries = [
        'financial-services' => [
            'title' => 'Financial Services IT Staffing | TechNova Systems',
            'description' => 'Hire specialized technology, data, AI, security, and compliance talent for banks, fintechs, and financial services organizations.',
        ],
        'healthcare-life-sciences' => [
            'title' => 'Healthcare IT Staffing | TechNova Systems',
            'description' => 'Find healthcare IT, clinical data, interoperability, security, and engineering talent with relevant regulatory knowledge.',
        ],
        'technology-software' => [
            'title' => 'Technology & Software Staffing | TechNova Systems',
            'description' => 'Scale software, product, cloud, data, cybersecurity, and DevOps teams with vetted talent and flexible delivery models.',
        ],
        'retail-ecommerce' => [
            'title' => 'Retail & E-Commerce IT Staffing | TechNova Systems',
            'description' => 'Build retail and e-commerce technology teams for digital platforms, personalization, data, inventory, and omnichannel experiences.',
        ],
        'logistics-supply-chain' => [
            'title' => 'Logistics Technology Staffing | TechNova Systems',
            'description' => 'Access technology talent for supply chain visibility, routing, warehouse automation, data platforms, and connected logistics.',
        ],
        'manufacturing-industrial' => [
            'title' => 'Manufacturing IT Staffing | TechNova Systems',
            'description' => 'Hire IT, OT, automation, data, and engineering talent for manufacturers modernizing plant-floor and enterprise systems.',
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
    add_filter('rank_math/json_ld', function ($data) use ($page_id) {
        $home = home_url('/');
        $slug = get_post_field('post_name', $page_id);
        $parent_id = wp_get_post_parent_id($page_id);
        $parent_slug = $parent_id ? get_post_field('post_name', $parent_id) : '';
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
            if (in_array('WebPage', $types, true)) {
                if ($slug === 'about') $entity['@type'] = 'AboutPage';
                if ($slug === 'contact') $entity['@type'] = 'ContactPage';
                if ($slug === 'solutions' || $slug === 'industries') $entity['@type'] = 'CollectionPage';
            }
        }
        unset($entity);

        $schema_types = [];
        foreach ($data as $entity) {
            $type = $entity['@type'] ?? [];
            $schema_types = array_merge($schema_types, is_array($type) ? $type : [$type]);
        }
        if (!in_array('Organization', $schema_types, true) && !in_array('Corporation', $schema_types, true)) {
            $logo = get_site_icon_url(512) ?: get_stylesheet_directory_uri() . '/react-app/dist/assets/favicon.png';
            $data['technova-organization'] = [
                '@type' => ['Corporation', 'Organization'],
                '@id' => $home . '#organization',
                'name' => 'TechNova Systems Inc.',
                'url' => $home,
                'logo' => ['@type' => 'ImageObject', 'url' => $logo],
                'sameAs' => ['https://www.linkedin.com/company/technovasystemsinc/'],
                'email' => 'Info@technovasystemsinc.com',
                'telephone' => '+1-571-651-0246',
            ];
        }
        if (!in_array('WebSite', $schema_types, true)) {
            $data['technova-website'] = [
                '@type' => 'WebSite',
                '@id' => $home . '#website',
                'url' => $home,
                'name' => 'TechNova Systems',
                'publisher' => ['@id' => $home . '#organization'],
                'inLanguage' => 'en-US',
            ];
        }
        $page_types = ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'];
        if (!array_intersect($page_types, $schema_types)) {
            $page_type = 'WebPage';
            if ($slug === 'about') $page_type = 'AboutPage';
            if ($slug === 'contact') $page_type = 'ContactPage';
            if ($slug === 'solutions' || $slug === 'industries') $page_type = 'CollectionPage';
            $seo = technova_seo_config($page_id);
            $data['technova-webpage'] = [
                '@type' => $page_type,
                '@id' => get_permalink($page_id) . '#webpage',
                'url' => get_permalink($page_id),
                'name' => $seo['title'],
                'description' => $seo['description'],
                'isPartOf' => ['@id' => $home . '#website'],
                'about' => ['@id' => $home . '#organization'],
                'inLanguage' => 'en-US',
            ];
        }

        if ($slug === 'contact') {
            $data['technova-professional-service'] = [
                '@type' => 'ProfessionalService',
                '@id' => $home . '#professional-service',
                'name' => 'TechNova Systems Inc.',
                'url' => get_permalink($page_id),
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
                'parentOrganization' => ['@id' => $home . '#organization'],
            ];
        }

        if ($parent_slug === 'solutions' || $parent_slug === 'industries') {
            $seo = technova_seo_config($page_id);
            $data['technova-service'] = [
                '@type' => 'Service',
                '@id' => get_permalink($page_id) . '#service',
                'name' => $parent_slug === 'industries'
                    ? get_the_title($page_id) . ' IT Staffing and Consulting'
                    : get_the_title($page_id),
                'description' => $seo['description'],
                'url' => get_permalink($page_id),
                'provider' => ['@id' => $home . '#organization'],
                'areaServed' => ['@type' => 'Country', 'name' => 'United States'],
            ];
        }

        $faq_field = ['employers' => 'employers_faqs', 'talent' => 'talent_faqs', 'contact' => 'contact_faqs'][$slug] ?? '';
        $faqs = $faq_field && function_exists('get_field') ? (get_field($faq_field, $page_id) ?: []) : [];
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
        if ($entities) {
            $data['technova-faq'] = [
                '@type' => 'FAQPage',
                '@id' => get_permalink($page_id) . '#faq',
                'mainEntity' => $entities,
            ];
        }
        return $data;
    }, 99);
    return $seo;
}

function technova_prepare_post_schema($post_id) {
    add_filter('rank_math/json_ld', function ($data) use ($post_id) {
        foreach ($data as &$entity) {
            $type = $entity['@type'] ?? '';
            $types = is_array($type) ? $type : [$type];
            if (in_array('Article', $types, true) || in_array('BlogPosting', $types, true)) {
                $entity['@type'] = 'BlogPosting';
                $entity['headline'] = get_the_title($post_id);
                $entity['mainEntityOfPage'] = ['@id' => get_permalink($post_id) . '#webpage'];
            }
        }
        unset($entity);

        $content = get_post_field('post_content', $post_id);
        $faq_start = stripos($content, '<h2>Frequently asked questions</h2>');
        if ($faq_start === false) return $data;
        $faq_html = substr($content, $faq_start + strlen('<h2>Frequently asked questions</h2>'));
        $next_h2 = stripos($faq_html, '<h2>');
        if ($next_h2 !== false) $faq_html = substr($faq_html, 0, $next_h2);

        preg_match_all('/<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/si', $faq_html, $matches, PREG_SET_ORDER);
        $entities = [];
        foreach ($matches as $match) {
            $question = wp_strip_all_tags($match[1]);
            $answer = wp_strip_all_tags($match[2]);
            if (!$question || !$answer) continue;
            $entities[] = [
                '@type' => 'Question',
                'name' => $question,
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $answer],
            ];
        }
        if ($entities) {
            $data['technova-post-faq'] = [
                '@type' => 'FAQPage',
                '@id' => get_permalink($post_id) . '#faq',
                'mainEntity' => $entities,
            ];
        }
        return $data;
    }, 99);
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

    if ($slug === 'contact' && !defined('RANK_MATH_VERSION')) {
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
    if ($faqs && !defined('RANK_MATH_VERSION')) {
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

    if (!defined('RANK_MATH_VERSION') && wp_get_post_parent_id($page_id) && get_post_field('post_name', wp_get_post_parent_id($page_id)) === 'solutions') {
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
    if (!defined('RANK_MATH_VERSION') && wp_get_post_parent_id($page_id) && get_post_field('post_name', wp_get_post_parent_id($page_id)) === 'industries') {
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
