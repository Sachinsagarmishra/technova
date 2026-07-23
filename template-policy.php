<?php
/* Template Name: TechNova Policy Page */
require_once __DIR__ . '/technova-seo.php';

$page_id = get_the_ID();
$front_id = (int) get_option('page_on_front');
$policy_data = technova_frontend_data($page_id);
$policy_data['contentType'] = 'policy';
$policy_data['header_logo'] = function_exists('get_field') ? get_field('header_logo', $front_id) : '';
$policy_data['footer_logo'] = function_exists('get_field') ? get_field('footer_logo', $front_id) : '';
$policy_data['policy'] = [
    'title' => get_the_title($page_id),
    'content' => apply_filters('the_content', get_post_field('post_content', $page_id)),
    'modified' => get_the_modified_date('F j, Y', $page_id),
];
$seo = technova_prepare_seo($page_id);
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <?php technova_output_meta_fallback($seo, $page_id); ?>
    <?php technova_output_structured_data($page_id, $policy_data); ?>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri() . '/react-app/dist/assets/index.css?v=' . filemtime(get_stylesheet_directory() . '/react-app/dist/assets/index.css')); ?>">
    <script>window.wpData = <?php echo wp_json_encode($policy_data); ?>;</script>
</head>
<body class="bg-[#f5f7fb]">
    <div id="root"></div>
    <script type="module" src="<?php echo esc_url(get_stylesheet_directory_uri() . '/react-app/dist/assets/index.js?v=' . filemtime(get_stylesheet_directory() . '/react-app/dist/assets/index.js')); ?>"></script>
    <?php wp_footer(); ?>
</body>
</html>
