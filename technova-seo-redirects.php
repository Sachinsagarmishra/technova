<?php
/**
 * Plugin Name: TechNova SEO Redirects
 * Description: Permanent redirects for retired placeholder content.
 */

add_action('template_redirect', function () {
    $path = untrailingslashit((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH));
    if (in_array($path, ['/hello-world', '/hello-world-2'], true)) {
        wp_safe_redirect(home_url('/'), 301);
        exit;
    }
});
