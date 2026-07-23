<?php
require_once __DIR__ . '/technova-seo.php';

status_header(404);
nocache_headers();

$front_id = (int) get_option('page_on_front');
$not_found_data = [
    'contentType' => '404',
    'primary_menu' => technova_primary_navigation_tree(),
    'header_logo' => function_exists('get_field') ? get_field('header_logo', $front_id) : '',
    'footer_logo' => function_exists('get_field') ? get_field('footer_logo', $front_id) : '',
];

add_filter('pre_get_document_title', function () {
    return 'Page Not Found | TechNova Systems';
}, 999);
add_filter('rank_math/frontend/title', function () {
    return 'Page Not Found | TechNova Systems';
}, 999);
add_filter('rank_math/frontend/description', function () {
    return 'The page you requested could not be found. Search TechNova Systems or explore our technology staffing and consulting solutions.';
}, 999);
add_filter('rank_math/frontend/robots', function () {
    return [
        'index' => 'noindex',
        'follow' => 'follow',
    ];
}, 999);
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <meta name="robots" content="noindex, follow">
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/react-app/dist/assets/index.css?v=' . filemtime(get_stylesheet_directory() . '/react-app/dist/assets/index.css')); ?>">
    <script>window.wpData = <?php echo wp_json_encode($not_found_data); ?>;</script>
</head>
<body class="bg-[#020d1f]">
    <div id="root"></div>
    <script type="module" src="<?php echo esc_url(get_stylesheet_directory_uri() . '/react-app/dist/assets/index.js?v=' . filemtime(get_stylesheet_directory() . '/react-app/dist/assets/index.js')); ?>"></script>
    <?php wp_footer(); ?>
</body>
</html>
