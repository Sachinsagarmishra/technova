<?php
/**
 * TechNova Theme Functions and Definitions
 */

if ( ! function_exists( 'technova_setup' ) ) {
    function technova_setup() {
        // Add support for document title tag
        add_theme_support( 'title-tag' );
        
        // Enable support for Post Thumbnails
        add_theme_support( 'post-thumbnails' );
        
        // Register Navigation Menus
        register_nav_menus( array(
            'primary-menu' => esc_html__( 'Primary Menu', 'technova-theme' ),
        ) );
    }
}
add_action( 'after_setup_theme', 'technova_setup' );

/**
 * Enqueue scripts and styles.
 */
function technova_scripts() {
    // Theme compiled stylesheet (containing Tailwind and custom CSS)
    wp_enqueue_style( 'technova-compiled-styles', get_template_directory_uri() . '/assets/css/index.css', array(), '1.0.0' );
    
    // Main theme Javascript
    wp_enqueue_script( 'technova-main-script', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true );

    // Enqueue Cloudflare Turnstile API script
    wp_enqueue_script( 'cloudflare-turnstile', 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit', array(), null, true );
}
add_action( 'wp_enqueue_scripts', 'technova_scripts' );

// ACF local JSON loading
add_filter('acf/settings/save_json', 'technova_acf_json_save_point');
function technova_acf_json_save_point( $path ) {
    return get_stylesheet_directory() . '/acf-json';
}

add_filter('acf/settings/load_json', 'technova_acf_json_load_point');
function technova_acf_json_load_point( $paths ) {
    unset($paths[0]);
    $paths[] = get_stylesheet_directory() . '/acf-json';
    return $paths;
}
