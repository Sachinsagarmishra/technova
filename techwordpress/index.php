<?php
/**
 * TechNova Theme Index Template
 */
get_header();
?>
<section className="py-24 bg-white text-[#0b132b]">
    <div className="mx-auto max-w-4xl px-8">
        <?php if ( have_posts() ) : ?>
            <?php while ( have_posts() ) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('mb-16'); ?>>
                    <h2 className="font-display text-4xl mb-4">
                        <a href="<?php the_permalink(); ?>" className="hover:text-[#f59e0c]"><?php the_title(); ?></a>
                    </h2>
                    <div className="text-slate-600 leading-relaxed">
                        <?php the_excerpt(); ?>
                    </div>
                </article>
            <?php endwhile; ?>
        <?php else : ?>
            <p>No posts found.</p>
        <?php endif; ?>
    </div>
</section>
<?php
get_footer();
