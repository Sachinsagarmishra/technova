<?php
/* Template Name: Insights Page Wrapper */
$acf_data = get_fields(get_the_ID());
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?> 
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/react-app/dist/assets/index.css">
    <script>
        window.wpData = <?php echo $acf_data ? json_encode($acf_data) : 'null'; ?>;
    </script>
</head>
<body class="bg-[#f2f5f9]">
    <div id="root"></div>
    <script type="module" src="<?php echo get_stylesheet_directory_uri(); ?>/react-app/dist/assets/index.js"></script>
    <?php wp_footer(); ?>
</body>
</html>
