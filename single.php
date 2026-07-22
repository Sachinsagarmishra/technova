<?php
/**
 * React-powered single blog post template for TechNova Systems.
 */
require_once __DIR__ . '/technova-seo.php';
$post_id = get_queried_object_id();
technova_prepare_post_schema($post_id);
$featured_id = get_post_thumbnail_id($post_id);
$featured_url = $featured_id ? wp_get_attachment_image_url($featured_id, 'full') : '';
$featured_alt = $featured_id ? get_post_meta($featured_id, '_wp_attachment_image_alt', true) : '';
$categories = wp_get_post_terms($post_id, 'category', ['fields' => 'names']);
$tags = wp_get_post_terms($post_id, 'post_tag', ['fields' => 'names']);

$post_data = [
    'contentType' => 'post',
    'primary_menu' => technova_primary_navigation_tree(),
    'header_logo' => function_exists('get_field') ? get_field('header_logo', get_option('page_on_front')) : '',
    'footer_logo' => function_exists('get_field') ? get_field('footer_logo', get_option('page_on_front')) : '',
    'post' => [
        'title' => get_the_title($post_id),
        'content' => apply_filters('the_content', get_post_field('post_content', $post_id)),
        'excerpt' => get_the_excerpt($post_id),
        'featuredImage' => $featured_url,
        'featuredAlt' => $featured_alt ?: get_the_title($post_id),
        'date' => get_the_date('F j, Y', $post_id),
        'author' => get_the_author_meta('display_name', (int) get_post_field('post_author', $post_id)),
        'categories' => is_wp_error($categories) ? [] : $categories,
        'tags' => is_wp_error($tags) ? [] : $tags,
    ],
];
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/react-app/dist/assets/index.css?v=<?php echo esc_attr(filemtime(get_stylesheet_directory() . '/react-app/dist/assets/index.css')); ?>">
    <script>window.wpData = <?php echo wp_json_encode($post_data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?>;</script>
</head>
<body class="bg-[#f2f5f9]">
    <div id="root"></div>
    <script type="module" src="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/react-app/dist/assets/index.js?v=<?php echo esc_attr(filemtime(get_stylesheet_directory() . '/react-app/dist/assets/index.js')); ?>"></script>
    <?php wp_footer(); ?>
</body>
</html>
