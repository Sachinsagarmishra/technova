<?php
/**
 * Idempotently publishes TechNova's first three SEO blog posts.
 * Run with: wp eval-file /path/to/publish-seo-blogs.php
 */

if (!defined('ABSPATH')) {
    fwrite(STDERR, "Run this file through WP-CLI.\n");
    exit(1);
}

require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

function technova_term_id(string $name, string $taxonomy): int {
    $term = term_exists($name, $taxonomy);
    if (!$term) {
        $term = wp_insert_term($name, $taxonomy);
    }
    if (is_wp_error($term)) {
        throw new RuntimeException($term->get_error_message());
    }
    return (int) (is_array($term) ? $term['term_id'] : $term);
}

function technova_import_blog_image(string $path, string $title, string $alt): int {
    global $wpdb;
    $filename = basename($path);
    $source_key = 'technova-blog-asset:' . $filename;
    $existing = $wpdb->get_var($wpdb->prepare(
        "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_technova_source_asset' AND meta_value = %s LIMIT 1",
        $source_key
    ));
    if (!$existing) {
        $existing = $wpdb->get_var($wpdb->prepare(
            "SELECT ID FROM {$wpdb->posts} WHERE post_type = 'attachment' AND post_title = %s ORDER BY ID DESC LIMIT 1",
            $title
        ));
    }
    if ($existing) {
        update_post_meta((int) $existing, '_technova_source_asset', $source_key);
        update_post_meta((int) $existing, '_wp_attachment_image_alt', $alt);
        return (int) $existing;
    }
    $existing = $wpdb->get_var($wpdb->prepare(
        "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_wp_attached_file' AND meta_value LIKE %s LIMIT 1",
        '%' . $wpdb->esc_like('/' . $filename)
    ));
    if ($existing) {
        update_post_meta((int) $existing, '_wp_attachment_image_alt', $alt);
        return (int) $existing;
    }

    if (!is_readable($path)) {
        throw new RuntimeException("Image not readable: {$path}");
    }
    $tmp = wp_tempnam($filename);
    if (!$tmp || !copy($path, $tmp)) {
        throw new RuntimeException("Could not prepare image: {$filename}");
    }
    $attachment_id = media_handle_sideload(['name' => $filename, 'tmp_name' => $tmp], 0, $title);
    if (is_wp_error($attachment_id)) {
        @unlink($tmp);
        throw new RuntimeException($attachment_id->get_error_message());
    }
    update_post_meta((int) $attachment_id, '_wp_attachment_image_alt', $alt);
    update_post_meta((int) $attachment_id, '_technova_source_asset', $source_key);
    return (int) $attachment_id;
}

$posts = [
    [
        'title' => 'The Future of Work in the Age of AI',
        'slug' => 'future-of-work-age-of-ai',
        'date' => '2026-07-22 09:00:00',
        'excerpt' => 'AI is changing how work is designed, how teams hire and how technology professionals build their careers. Here is a practical guide to preparing for what comes next.',
        'category' => 'AI & Technology',
        'tags' => ['Future of Work', 'Artificial Intelligence', 'Workforce Strategy', 'Technology Careers', 'AI Talent'],
        'focus_keyword' => 'future of work in the age of AI',
        'seo_title' => 'Future of Work in the Age of AI | TechNova Systems',
        'seo_description' => 'Explore how AI is reshaping jobs, skills, hiring and workforce strategy—and what employers and technology professionals should do next.',
        'image' => 'future-of-work-ai.png',
        'image_alt' => 'Digital human profile illustrating the future of work in the age of AI',
        'content' => <<<'HTML'
<p>Artificial intelligence is no longer a separate technology initiative. It is becoming part of everyday work: helping teams analyze information, write code, serve customers, identify candidates and make faster decisions. That does not mean people are disappearing from the workplace. It means the most valuable work is being redesigned around a stronger partnership between human judgment and intelligent tools.</p>
<p>For employers, the challenge is to adopt AI without losing trust, quality or accountability. For technology professionals, the opportunity is to combine durable human strengths with practical AI fluency. This guide explains what the <strong>future of work in the age of AI</strong> is likely to demand from both groups.</p>

<h2>What the future of work in the age of AI really means</h2>
<p>The conversation is often framed as “people versus machines.” In practice, most organizations are deciding which tasks can be accelerated, which decisions require human oversight and which new capabilities their teams must develop. Roles will continue to evolve, but the more immediate shift is at the task level.</p>
<p>Routine research, first drafts, basic classification and repetitive administration can increasingly be assisted by AI. Context, empathy, risk ownership, creativity and complex stakeholder decisions remain deeply human. High-performing organizations will connect the two instead of treating them as alternatives.</p>

<h2>Five shifts shaping AI-powered work</h2>
<h3>1. Jobs are being redesigned around outcomes</h3>
<p>When AI reduces time spent on repetitive work, leaders can define roles around the result a person owns rather than the volume of tasks they complete. A recruiter can spend less time organizing applications and more time assessing fit. An engineer can accelerate boilerplate work and focus more attention on architecture, reliability and customer impact.</p>

<h3>2. AI fluency is becoming a cross-functional skill</h3>
<p>AI fluency does not require every employee to become a machine-learning engineer. It means knowing where an AI tool helps, how to give it useful context, how to verify its output and when not to use it. That capability matters across product, operations, finance, recruiting, sales and leadership.</p>

<h3>3. Skills-based hiring is becoming more useful</h3>
<p>Job titles alone do not always reveal what a candidate can deliver. Employers are paying closer attention to demonstrable skills, adjacent experience, learning agility and project outcomes. A well-designed skills-based process can expand the talent pool while keeping quality standards clear. TechNova’s <a href="/solutions/ai-talent-solutions/">AI talent solutions</a> combine technology-enabled matching with human assessment for this reason.</p>

<h3>4. Human skills are gaining value, not losing it</h3>
<p>Communication, critical thinking, curiosity, negotiation and leadership become more important when information is abundant and automated output is easy to produce. Teams need people who can ask better questions, recognize weak assumptions and translate technical possibilities into business decisions.</p>

<h3>5. Responsible adoption is becoming an operating requirement</h3>
<p>Organizations need clear rules for data privacy, security, bias evaluation, intellectual property and human review. Responsible AI should not live only in a policy document. It should appear in tool selection, workflow design, employee training and ongoing measurement.</p>

<h2>What employers should do now</h2>
<ul>
<li><strong>Map work before buying tools.</strong> Identify high-friction tasks, critical decisions and measurable outcomes before choosing a platform.</li>
<li><strong>Create role-based learning paths.</strong> An engineer, recruiter and executive need different levels of AI depth.</li>
<li><strong>Keep humans accountable.</strong> Establish who reviews AI-supported decisions, especially when they affect people, security or customers.</li>
<li><strong>Hire for adaptable capability.</strong> Evaluate how candidates solve unfamiliar problems, learn new systems and communicate tradeoffs.</li>
<li><strong>Use flexible talent models.</strong> Specialized contractors, direct hires and managed teams can fill different gaps as the roadmap changes. Explore TechNova’s <a href="/employers/">employer talent solutions</a> to compare options.</li>
</ul>

<h2>How technology professionals can prepare</h2>
<p>Start by applying AI to a real workflow in your current discipline. Learn how to protect confidential information, validate outputs and document the decisions you make. Build a portfolio that shows the problem, your approach, the result and what you learned—not just a list of tools.</p>
<p>It is also wise to strengthen one deep technical capability and several complementary skills. A cloud engineer might add automation and security. A data analyst might add business storytelling and AI-assisted analysis. A product manager might learn model limitations, experimentation and governance. Candidates can explore TechNova’s <a href="/talent/">technology career opportunities</a> and submit a profile for roles aligned with their experience.</p>

<h2>A practical 90-day AI workforce plan</h2>
<ol>
<li><strong>Days 1–30: Discover.</strong> Select two or three workflows, document their current cost or delay and identify the risks.</li>
<li><strong>Days 31–60: Pilot.</strong> Test with a small team, approved data and explicit human review. Track quality as well as speed.</li>
<li><strong>Days 61–90: Scale intentionally.</strong> Improve training, controls and ownership before expanding adoption.</li>
</ol>
<p>This sequence helps leaders learn quickly without turning an experiment into an unmanaged enterprise dependency. If the roadmap requires new expertise, TechNova’s <a href="/solutions/workforce-consulting/">workforce consulting</a> team can help connect strategy, skills and delivery capacity.</p>

<h2>Frequently asked questions</h2>
<h3>Will AI replace technology jobs?</h3>
<p>AI is more likely to change the task mix inside many roles than remove every role in a category. Professionals who can use AI responsibly, verify results and connect technical work to business outcomes will remain valuable.</p>
<h3>What is the most important AI skill for non-technical employees?</h3>
<p>The most useful starting point is practical AI literacy: understanding appropriate use cases, providing good context, checking accuracy and protecting sensitive data.</p>
<h3>How should employers measure AI adoption?</h3>
<p>Measure outcome quality, cycle time, user adoption, risk events and customer or employee impact. Efficiency alone is not enough if accuracy or trust declines.</p>

<h2>Build a workforce ready for what comes next</h2>
<p>The future of work will belong to organizations that combine useful technology with capable, trusted people. <a href="/contact/">Talk with TechNova Systems</a> about building an AI-ready team, filling specialized roles or designing a flexible workforce strategy.</p>
HTML,
    ],
    [
        'title' => 'Top 10 In-Demand Tech Skills in 2026',
        'slug' => 'top-in-demand-tech-skills-2026',
        'date' => '2026-07-21 09:00:00',
        'excerpt' => 'From AI engineering and data platforms to cloud, cybersecurity and product leadership, these are the technology skills employers need to execute in 2026.',
        'category' => 'Career Resources',
        'tags' => ['Tech Skills 2026', 'AI Careers', 'Cloud Computing', 'Cybersecurity', 'Data Engineering', 'Career Development'],
        'focus_keyword' => 'in-demand tech skills 2026',
        'seo_title' => 'Top 10 In-Demand Tech Skills in 2026 | TechNova',
        'seo_description' => 'Discover the 10 most in-demand tech skills for 2026, from AI and data engineering to cloud, cybersecurity, DevOps and product leadership.',
        'image' => 'tech-skills-2026.png',
        'image_alt' => 'Technology dashboard representing the top in-demand tech skills for 2026',
        'content' => <<<'HTML'
<p>Technology priorities are moving quickly, but hiring demand is not based on novelty alone. Employers need professionals who can turn AI, data, cloud and security investments into reliable business outcomes. For candidates, that means the best career strategy is a combination of technical depth, practical delivery experience and the ability to communicate impact.</p>
<p>This guide covers the <strong>top in-demand tech skills for 2026</strong> and explains how professionals can demonstrate them—and how employers can hire for them more effectively.</p>

<h2>The 10 most in-demand tech skills in 2026</h2>
<h3>1. Applied AI and machine learning engineering</h3>
<p>Organizations need engineers who can move beyond experiments to production systems. Valuable capabilities include model evaluation, retrieval-augmented generation, prompt and context design, observability, cost management, data privacy and human-in-the-loop workflows. A strong portfolio should explain the business problem and how quality was measured.</p>

<h3>2. Data engineering and modern data platforms</h3>
<p>AI and analytics are only as dependable as the underlying data. Data engineers who can design pipelines, improve data quality, manage lineage and support real-time or batch workloads remain essential. Experience with governance and stakeholder requirements makes technical platform skills more useful.</p>

<h3>3. Cloud architecture and FinOps</h3>
<p>Cloud expertise now includes architecture, resilience, security and financial discipline. Employers value professionals who can choose the right managed services, design for failure, automate environments and make cost visible to engineering teams.</p>

<h3>4. Cybersecurity engineering</h3>
<p>Security skills are needed across identity, cloud, applications, infrastructure and incident response. Secure-by-design thinking is especially valuable because it brings security into architecture and delivery instead of treating it as a final checkpoint.</p>

<h3>5. DevOps, platform engineering and automation</h3>
<p>Teams need repeatable ways to build, test, release and operate software. Skills in infrastructure as code, continuous delivery, developer platforms, monitoring and reliability help reduce friction while improving control.</p>

<h3>6. Full-stack product engineering</h3>
<p>Strong full-stack engineers connect usable interfaces to secure, scalable services. Employers look for more than framework familiarity: accessibility, performance, testing, API design and product judgment distinguish candidates who can own meaningful outcomes.</p>

<h3>7. AI governance, risk and compliance</h3>
<p>As AI becomes part of core workflows, organizations need people who can translate policy into practical controls. Relevant skills include model inventory, risk classification, privacy, bias assessment, documentation, vendor evaluation and monitoring.</p>

<h3>8. Enterprise integration and API architecture</h3>
<p>New tools create value only when they connect safely with existing systems. Integration engineers and architects who understand APIs, events, identity, data contracts and legacy modernization help businesses move without destabilizing critical operations.</p>

<h3>9. Product management for technical and AI products</h3>
<p>Technical product leaders define outcomes, prioritize investment and coordinate engineering, design, data, legal and business stakeholders. For AI products, they must also plan for uncertain outputs, evaluation and ongoing feedback.</p>

<h3>10. Technical leadership and stakeholder communication</h3>
<p>The ability to explain tradeoffs, lead through ambiguity and align diverse teams remains highly valuable. Senior professionals stand out when they can connect architecture and delivery decisions to customer value, risk and financial impact.</p>

<h2>How candidates can prove these skills</h2>
<ul>
<li><strong>Show outcomes, not tool lists.</strong> Explain what improved, what you owned and how you measured success.</li>
<li><strong>Document tradeoffs.</strong> A credible case study includes constraints, rejected options and lessons learned.</li>
<li><strong>Build a focused portfolio.</strong> Two thoughtful projects are more useful than many unfinished demos.</li>
<li><strong>Prepare concise stories.</strong> Use examples that demonstrate collaboration, problem solving and technical judgment.</li>
<li><strong>Keep learning applied.</strong> Pair courses and certifications with a practical implementation.</li>
</ul>
<p>Professionals looking for their next role can browse TechNova’s <a href="/talent/">talent opportunities</a> and submit a resume for consideration across technology and AI positions.</p>

<h2>How employers should hire for technology skills</h2>
<p>Begin with the outcome the role must own. Separate essential skills from those that can be learned after joining. Use interviews or work samples that resemble the real job, and avoid overloading the description with every platform in the current stack.</p>
<p>For urgent or specialized needs, the employment model matters too. <a href="/solutions/contract-staffing/">Contract staffing</a> can add targeted capacity, while <a href="/solutions/direct-hire/">direct hire</a> supports long-term ownership. A <a href="/solutions/managed-teams/">managed team</a> can be useful when an initiative needs coordinated delivery rather than individual contributors.</p>

<h2>How to choose what to learn next</h2>
<p>Choose one skill that deepens your current value and one that broadens it. A backend engineer might deepen distributed systems and broaden into cloud cost optimization. A security analyst might deepen identity and broaden into automation. A data professional might deepen platform engineering and broaden into AI evaluation.</p>
<p>The strongest learning plan starts with a role or business problem, not a random tool. Review job descriptions, speak with practitioners and build something that demonstrates the work you want to do.</p>

<h2>Frequently asked questions</h2>
<h3>Which tech skill should a beginner learn first in 2026?</h3>
<p>Start with foundations: programming logic, data literacy, version control and cloud basics. Then select a path—software, data, security, infrastructure or product—and build practical projects.</p>
<h3>Are certifications enough to get a technology job?</h3>
<p>Certifications can show structured learning, but employers usually also want evidence that you can apply the knowledge. Projects, internships, work samples and clear interview stories strengthen the signal.</p>
<h3>Do employers still need specialists?</h3>
<p>Yes. Broad awareness helps collaboration, but complex systems still require deep specialists. The most effective specialists can also explain how their work affects the broader product and business.</p>

<h2>Connect the right skills to the right opportunity</h2>
<p>Whether you are planning a career move or building a future-ready team, the goal is the same: connect credible capability with meaningful work. <a href="/contact/">Contact TechNova Systems</a> to discuss your hiring roadmap or explore your next technology opportunity.</p>
HTML,
    ],
    [
        'title' => 'AI in Staffing: Trends Shaping the Industry',
        'slug' => 'ai-in-staffing-trends',
        'date' => '2026-07-20 09:00:00',
        'excerpt' => 'AI is improving talent sourcing, matching and recruiting operations, but the strongest staffing strategies keep people accountable for high-impact decisions.',
        'category' => 'Staffing Insights',
        'tags' => ['AI in Staffing', 'Recruitment Technology', 'Talent Acquisition', 'Skills-Based Hiring', 'Responsible AI'],
        'focus_keyword' => 'AI in staffing',
        'seo_title' => 'AI in Staffing: 2026 Recruitment Trends | TechNova',
        'seo_description' => 'Learn how AI is changing staffing through smarter sourcing, matching, screening, analytics and candidate engagement—without replacing human judgment.',
        'image' => 'ai-staffing-trends.png',
        'image_alt' => 'Connected professional network illustrating AI trends in the staffing industry',
        'content' => <<<'HTML'
<p>Recruiting teams manage a difficult balance: move quickly, find specialized skills, create a strong candidate experience and make fair, well-supported decisions. Artificial intelligence can help with parts of that work, but it is not a substitute for context, trust or accountable human judgment.</p>
<p>The most useful applications of <strong>AI in staffing</strong> improve how information is organized and how people discover relevant opportunities. The strongest strategies pair that efficiency with experienced recruiters who understand the role, the market and the people involved.</p>

<h2>How AI is changing the staffing lifecycle</h2>
<p>AI can support multiple stages of recruiting: drafting job content, searching talent pools, matching skills, summarizing information, coordinating communication and identifying process bottlenecks. Its value depends on the quality of the data and the design of the workflow.</p>
<p>A useful principle is simple: automate repetitive assistance, not accountability. Recruiters and hiring managers should remain responsible for job requirements, candidate evaluation, communication and final decisions.</p>

<h2>Six AI staffing trends shaping recruitment</h2>
<h3>1. Skills-based talent matching</h3>
<p>Modern matching tools can look beyond an exact job title to identify relevant skills, project experience and adjacent capabilities. This can help uncover qualified people whose backgrounds use different language. Human review is still needed to understand depth, context and career goals.</p>

<h3>2. Faster talent rediscovery</h3>
<p>Staffing organizations often have strong candidates already in their networks. AI-assisted search can help recruiters rediscover people based on current requirements, recent experience and availability, reducing the need to begin every search from zero.</p>

<h3>3. Better recruiter productivity</h3>
<p>Summaries, notes, scheduling support and draft communications can reduce administrative load. That gives recruiters more time for conversations, market guidance, candidate preparation and relationship building—the work that most directly affects experience and trust.</p>

<h3>4. More personalized candidate engagement</h3>
<p>Relevant content and timely updates can make a recruiting process easier to navigate. Personalization should be transparent and respectful, with simple ways for candidates to reach a real person. Automation that creates volume without relevance can damage the employer brand.</p>

<h3>5. Predictive workforce planning</h3>
<p>When used carefully, hiring and workforce data can help leaders identify recurring skill gaps, demand patterns and delivery risks. These insights can inform whether a business should build capability internally, hire permanently, use contract talent or create a managed team.</p>

<h3>6. Greater focus on AI governance</h3>
<p>Recruiting decisions affect people’s livelihoods, so AI use requires particular care. Employers and staffing partners need defined data practices, access controls, bias monitoring, vendor review and human escalation. Candidates should understand how their information is used.</p>

<h2>Where human recruiters add the most value</h2>
<ul>
<li><strong>Clarifying the real need.</strong> An experienced recruiter can challenge an unrealistic job description and separate required skills from preferences.</li>
<li><strong>Assessing context.</strong> Resumes and models cannot fully explain motivation, team dynamics, leadership style or the conditions behind an achievement.</li>
<li><strong>Building trust.</strong> Candidates need honest information about the role, process, expectations and tradeoffs.</li>
<li><strong>Advising the market.</strong> Recruiters connect compensation, supply, location and timing data to a practical search strategy.</li>
<li><strong>Owning decisions.</strong> People—not algorithms—must remain accountable for consequential hiring choices.</li>
</ul>
<p>This human-led model is central to TechNova’s <a href="/solutions/ai-talent-solutions/">AI-enabled talent approach</a>: technology improves discovery and speed while experienced professionals evaluate alignment and guide the process.</p>

<h2>A responsible framework for adopting AI in staffing</h2>
<ol>
<li><strong>Define the use case.</strong> State the recruiting problem, intended benefit and decisions the tool will or will not influence.</li>
<li><strong>Evaluate the data.</strong> Confirm relevance, permissions, security and retention requirements.</li>
<li><strong>Assign human ownership.</strong> Name who validates output and handles exceptions.</li>
<li><strong>Test for quality and fairness.</strong> Review results across different roles and candidate groups before scaling.</li>
<li><strong>Monitor continuously.</strong> Track accuracy, candidate experience, recruiter adoption and unexpected effects.</li>
</ol>

<h2>What candidates should know</h2>
<p>Candidates can improve discoverability by describing skills and outcomes clearly, using common terminology where it is accurate and keeping profiles current. Avoid keyword stuffing; a precise explanation of what you built, changed or delivered is more useful to both search systems and recruiters.</p>
<p>Applicants should also feel comfortable asking how a staffing partner uses their data and whether automated tools influence decisions. TechNova candidates can visit the <a href="/talent/">For Talent page</a> to learn about opportunities and submit a resume.</p>

<h2>Choosing an AI-enabled staffing partner</h2>
<p>Look for evidence of both technical capability and recruiting discipline. Ask how the partner validates matches, protects candidate information, handles bias concerns and measures quality after placement. Technology should make a partner more responsive and informed—not less personal.</p>
<p>Employers can explore TechNova’s <a href="/employers/">staffing solutions for employers</a>, including <a href="/solutions/contract-staffing/">contract staffing</a>, <a href="/solutions/direct-hire/">direct hire</a> and flexible delivery models.</p>

<h2>Frequently asked questions</h2>
<h3>Does AI make hiring decisions?</h3>
<p>It should not make final hiring decisions on its own. AI can support search, organization and analysis, while accountable people review context and make consequential choices.</p>
<h3>Can AI reduce bias in recruitment?</h3>
<p>AI may help standardize some processes, but it can also reproduce problems in data or workflow design. Bias risk must be actively tested, monitored and addressed with human oversight.</p>
<h3>Will AI replace staffing recruiters?</h3>
<p>AI can reduce administrative effort, but recruiting still depends on consultation, judgment, relationships and trust. It is more useful as a recruiter-assistance tool than a replacement for experienced professionals.</p>

<h2>Combine intelligent tools with human expertise</h2>
<p>AI can make staffing faster and more informed when it is implemented responsibly. The goal is not automation for its own sake—it is better alignment between people, skills and business needs. <a href="/contact/">Talk with TechNova Systems</a> about an AI-enabled, human-led talent strategy.</p>
HTML,
    ],
];

$base_dir = dirname(__FILE__);
$results = [];
foreach ($posts as $item) {
    $category_id = technova_term_id($item['category'], 'category');
    $tag_ids = array_map(static fn($tag) => technova_term_id($tag, 'post_tag'), $item['tags']);
    $existing = get_page_by_path($item['slug'], OBJECT, 'post');
    $postarr = [
        'ID' => $existing ? $existing->ID : 0,
        'post_type' => 'post',
        'post_author' => 3,
        'post_status' => 'publish',
        'post_title' => $item['title'],
        'post_name' => $item['slug'],
        'post_excerpt' => $item['excerpt'],
        'post_content' => $item['content'],
        'post_date' => $item['date'],
        'post_date_gmt' => get_gmt_from_date($item['date']),
        'post_category' => [$category_id],
        'tags_input' => $item['tags'],
        'comment_status' => 'closed',
    ];
    $post_id = wp_insert_post(wp_slash($postarr), true);
    if (is_wp_error($post_id)) {
        throw new RuntimeException($post_id->get_error_message());
    }
    wp_set_object_terms($post_id, $tag_ids, 'post_tag', false);

    $image_id = technova_import_blog_image($base_dir . '/' . $item['image'], $item['title'], $item['image_alt']);
    set_post_thumbnail($post_id, $image_id);
    $image_url = wp_get_attachment_image_url($image_id, 'full');

    $meta = [
        'rank_math_focus_keyword' => $item['focus_keyword'],
        'rank_math_title' => $item['seo_title'],
        'rank_math_description' => $item['seo_description'],
        'rank_math_robots' => ['index', 'follow'],
        'rank_math_facebook_title' => $item['seo_title'],
        'rank_math_facebook_description' => $item['seo_description'],
        'rank_math_facebook_image' => $image_url,
        'rank_math_twitter_title' => $item['seo_title'],
        'rank_math_twitter_description' => $item['seo_description'],
        'rank_math_twitter_image' => $image_url,
        'rank_math_twitter_use_facebook' => 'on',
    ];
    foreach ($meta as $key => $value) {
        update_post_meta($post_id, $key, $value);
    }
    clean_post_cache($post_id);
    $results[] = ['id' => $post_id, 'slug' => $item['slug'], 'image_id' => $image_id];
}

if (defined('WP_CLI') && WP_CLI) {
    WP_CLI::success(wp_json_encode($results));
}
