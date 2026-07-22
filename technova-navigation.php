<?php
/**
 * Plugin Name: TechNova Navigation
 * Description: Registers and seeds the WordPress-managed primary navigation used by the React header and mega menus.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

add_action('after_setup_theme', function () {
    register_nav_menus([
        'technova_primary' => __('TechNova Primary Navigation', 'technova'),
    ]);
}, 20);

function technova_navigation_page_id($path) {
    $page = get_page_by_path($path, OBJECT, 'page');
    return $page ? (int) $page->ID : 0;
}

function technova_navigation_add_item($menu_id, $title, $path, $description = '', $parent_id = 0) {
    $page_id = technova_navigation_page_id($path);
    $args = [
        'menu-item-title' => $title,
        'menu-item-description' => $description,
        'menu-item-status' => 'publish',
        'menu-item-parent-id' => $parent_id,
    ];
    if ($page_id) {
        $args += [
            'menu-item-object-id' => $page_id,
            'menu-item-object' => 'page',
            'menu-item-type' => 'post_type',
        ];
    } else {
        $args += [
            'menu-item-url' => home_url('/' . trim($path, '/') . '/'),
            'menu-item-type' => 'custom',
        ];
    }
    return wp_update_nav_menu_item($menu_id, 0, $args);
}

add_action('init', function () {
    if (get_option('technova_primary_navigation_seeded')) return;

    $locations = get_theme_mod('nav_menu_locations', []);
    if (!empty($locations['technova_primary']) && wp_get_nav_menu_object($locations['technova_primary'])) {
        update_option('technova_primary_navigation_seeded', 1, false);
        return;
    }

    $menu = wp_get_nav_menu_object('TechNova Primary Navigation');
    $menu_id = $menu ? (int) $menu->term_id : wp_create_nav_menu('TechNova Primary Navigation');
    if (is_wp_error($menu_id) || !$menu_id) return;

    if (!wp_get_nav_menu_items($menu_id)) {
        $solutions = technova_navigation_add_item($menu_id, 'Solutions', 'solutions', 'Talent, consulting, and delivery solutions built around measurable outcomes.');
        technova_navigation_add_item($menu_id, 'AI Talent Solutions', 'solutions/ai-talent-solutions', 'AI, machine learning, data, and engineering talent.', $solutions);
        technova_navigation_add_item($menu_id, 'Executive Search', 'solutions/executive-search', 'Technology leaders from Director through C-suite.', $solutions);
        technova_navigation_add_item($menu_id, 'Workforce Consulting', 'solutions/workforce-consulting', 'Workforce planning, organization design, and talent strategy.', $solutions);
        technova_navigation_add_item($menu_id, 'Digital Transformation', 'solutions/digital-transformation', 'Modernization, automation, and technology delivery.', $solutions);
        technova_navigation_add_item($menu_id, 'Contract Staffing', 'solutions/contract-staffing', 'Flexible specialists for fast-moving technology needs.', $solutions);
        technova_navigation_add_item($menu_id, 'Managed Teams', 'solutions/managed-teams', 'Dedicated delivery teams structured around outcomes.', $solutions);

        $industries = technova_navigation_add_item($menu_id, 'Industries', 'industries', 'Specialized technology talent and consulting for complex industries.');
        technova_navigation_add_item($menu_id, 'Financial Services', 'industries/financial-services', 'Technology, data, security, and compliance talent.', $industries);
        technova_navigation_add_item($menu_id, 'Healthcare & Life Sciences', 'industries/healthcare-life-sciences', 'Healthcare IT, clinical data, and engineering expertise.', $industries);
        technova_navigation_add_item($menu_id, 'Technology & Software', 'industries/technology-software', 'Software, product, cloud, data, and DevOps teams.', $industries);
        technova_navigation_add_item($menu_id, 'Retail & E-Commerce', 'industries/retail-ecommerce', 'Digital commerce, data, inventory, and customer experience.', $industries);
        technova_navigation_add_item($menu_id, 'Logistics & Supply Chain', 'industries/logistics-supply-chain', 'Connected logistics, routing, data, and automation.', $industries);
        technova_navigation_add_item($menu_id, 'Manufacturing & Industrial', 'industries/manufacturing-industrial', 'IT, OT, automation, data, and engineering talent.', $industries);

        technova_navigation_add_item($menu_id, 'For Employers', 'employers', 'Hire vetted technology talent and build high-performing teams.');
        technova_navigation_add_item($menu_id, 'For Talent', 'talent', 'Explore technology opportunities and submit your resume.');
        technova_navigation_add_item($menu_id, 'About Us', 'about', 'Learn about TechNova Systems.');
    }

    $locations['technova_primary'] = $menu_id;
    set_theme_mod('nav_menu_locations', $locations);
    update_option('technova_primary_navigation_seeded', 1, false);
}, 30);
