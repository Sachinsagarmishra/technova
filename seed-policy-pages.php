<?php
/**
 * Idempotently creates or updates TechNova's website policy pages.
 * Run from WordPress root with: wp eval-file seed-policy-pages.php
 */

if (!defined('ABSPATH')) exit;

$policies = [
    [
        'slug' => 'privacy-policy',
        'title' => 'Privacy Policy',
        'file' => 'policy-privacy.html.stage',
        'seo_title' => 'Privacy Policy | TechNova Systems',
        'seo_description' => 'Learn how TechNova Systems collects, uses, protects, and shares personal information submitted through our staffing and consulting website.',
        'keyword' => 'TechNova privacy policy',
    ],
    [
        'slug' => 'terms-of-service',
        'title' => 'Terms of Service',
        'file' => 'policy-terms.html.stage',
        'seo_title' => 'Terms of Service | TechNova Systems',
        'seo_description' => 'Review the terms governing your use of the TechNova Systems website, content, staffing resources, forms, and related online services.',
        'keyword' => 'TechNova terms of service',
    ],
    [
        'slug' => 'cookie-policy',
        'title' => 'Cookie Policy',
        'file' => 'policy-cookies.html.stage',
        'seo_title' => 'Cookie Policy | TechNova Systems',
        'seo_description' => 'Learn how TechNova Systems uses necessary, functional, analytics, and related technologies on our website and how to manage them.',
        'keyword' => 'TechNova cookie policy',
    ],
];

foreach ($policies as $policy) {
    $content_path = __DIR__ . '/' . $policy['file'];
    if (!is_readable($content_path)) {
        WP_CLI::warning('Missing content file: ' . $content_path);
        continue;
    }

    $existing = get_page_by_path($policy['slug'], OBJECT, 'page');
    $post_data = [
        'post_type' => 'page',
        'post_title' => $policy['title'],
        'post_name' => $policy['slug'],
        'post_status' => 'publish',
        'post_content' => wp_slash(file_get_contents($content_path)),
        'page_template' => 'template-policy.php',
    ];

    if ($existing) {
        $post_data['ID'] = (int) $existing->ID;
        $page_id = wp_update_post($post_data, true);
    } else {
        $page_id = wp_insert_post($post_data, true);
    }

    if (is_wp_error($page_id)) {
        WP_CLI::warning($policy['slug'] . ': ' . $page_id->get_error_message());
        continue;
    }

    update_post_meta($page_id, '_wp_page_template', 'template-policy.php');
    update_post_meta($page_id, 'rank_math_title', $policy['seo_title']);
    update_post_meta($page_id, 'rank_math_description', $policy['seo_description']);
    update_post_meta($page_id, 'rank_math_focus_keyword', $policy['keyword']);
    clean_post_cache($page_id);
    WP_CLI::log($policy['slug'] . ':' . $page_id);
}

WP_CLI::success('TechNova policy pages are published.');
