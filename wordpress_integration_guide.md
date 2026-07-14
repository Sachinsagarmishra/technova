# WordPress Integration & SEO Optimization Guide
### Hybrid React + WordPress Setup (No DNS Changes Required)

This guide details how to integrate your custom-coded **React/Vite App** into your existing **GoDaddy WordPress hosting** using a hybrid, dynamic, and SEO-friendly approach.

> [!NOTE]
> **No DNS or SSL changes are required.** Your domain remains pointed to GoDaddy, SSL remains active, and your current WordPress files, database, and admin dashboard remain 100% untouched.

---

## 🏗️ Architecture Overview

* **Homepage (`/`)**: Served by your React/Vite production build, loaded inside a custom WordPress Page Template.
* **WordPress Dashboard (`/wp-admin`)**: Your client logs in normally to write blogs and edit homepage text/videos using **Advanced Custom Fields (ACF)**.
* **Dynamic Data (State Hydration)**: The WordPress PHP template fetches homepage edits from the database and injects them directly into the browser's `window` object before React mounts. This prevents loading delays, keeps the site lightning fast, and ensures Yoast/RankMath SEO meta tags are fully indexed by Google.
* **Blogs Section (`/blog/*`)**: Rendered using standard WordPress PHP templates (`single.php`, `archive.php`) styled to match your React theme, ensuring perfect SEO for articles.

---

## 🛠️ Step-by-Step Integration

### Step 1: Install & Configure Advanced Custom Fields (ACF)
1. Go to your WordPress Dashboard -> **Plugins** -> **Add New**.
2. Search and install the free **Advanced Custom Fields (ACF)** plugin, then activate it.
3. Go to **ACF** (Custom Fields) -> **Field Groups** -> **Add New**.
4. Create your fields matching your homepage layout:
   * **Hero Slides (Repeater Field)** (Field name: `hero_slides`):
     * `bg_type` (Select: "video" or "image")
     * `video_file` (File: Returns File URL)
     * `image_file` (Image: Returns Image URL)
     * `headline_accent` (Text)
     * `description` (Textarea)
   * **Industries Grid (Repeater Field)** (Field name: `industries_list`):
     * `title` (Text)
     * `description` (Textarea)
     * `video_file` (File: Returns File URL for loopable 3D animations)
     * `icon_name` (Text: Fallback Lucide icon name, e.g. "Cpu", "Truck")
     * `color_class` (Text: Style color class, e.g., "text-purple-500 bg-purple-50")
5. Under **Settings (Rules)**, set: *Show this field group if **Page Template** is equal to **React App Wrapper***.
6. Save the Field Group.

---

### Step 2: Create the Custom Page Template in your WordPress Theme
1. Access your GoDaddy hosting files via FTP/SFTP, or install the **File Manager** plugin in your WordPress dashboard.
2. Navigate to your active WordPress theme directory: `/wp-content/themes/[your-active-theme]/` (e.g., `astra` or `twentytwentyfour`).
3. Create a new file named `template-react.php` and paste the following code:

```php
<?php
/* Template Name: React App Wrapper */

// Fetch all ACF values saved for this page
$acf_data = get_fields(get_the_ID());
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- This tag outputs Yoast SEO / RankMath meta tags automatically -->
    <?php wp_head(); ?> 
    
    <!-- Link the React production CSS bundle -->
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/react-app/index.css">
    
    <script>
        // Inject WordPress data directly into the window object for React
        window.wpData = <?php echo $acf_data ? json_encode($acf_data) : 'null'; ?>;
    </script>
</head>
<body class="bg-[#f2f5f9]">
    <!-- React Mount Root -->
    <div id="root"></div>

    <!-- Link the React production JS bundle -->
    <script type="module" src="<?php echo get_stylesheet_directory_uri(); ?>/react-app/index.js"></script>
    
    <?php wp_footer(); ?>
</body>
</html>
```

---

### Step 3: Update React Code to use Dynamic WordPress Data
Modify your React component (e.g., App.tsx) to read from the global `window.wpData` object, falling back to your default static data if WordPress variables are empty.

1. **Declare Types** (Optional, put at the top of `App.tsx`):
   ```typescript
   declare global {
     interface Window {
       wpData: any;
     }
   }
   ```

2. **Load Dynamic Slides**:
   ```typescript
   const defaultSlides = [
     {
       bgType: "video",
       bgUrl: firstSlideVideo,
       headlineParts: [ { text: "We Build ", accent: false }, ... ],
       description: "...",
       ctaButtons: [...]
     },
     // ... rest of your hardcoded fallback slides
   ];

   // Read ACF slides, fallback to hardcoded if empty
   const slides = window.wpData && window.wpData.hero_slides 
     ? window.wpData.hero_slides 
     : defaultSlides;
   ```

3. **Load Dynamic Industries Grid**:
   ```typescript
   const defaultIndustries = [
     { title: "Technology & IT", description: "...", icon: Cpu, color: "text-purple-500 bg-purple-50", video: technologyVideo },
     // ... rest of your fallback industries
   ];

   // Read ACF industries list, fallback to hardcoded if empty
   const industries = window.wpData && window.wpData.industries_list 
     ? window.wpData.industries_list 
     : defaultIndustries;
   ```

---

### Step 4: Build & Upload the React App to GoDaddy
1. In your local terminal, run the build command:
   ```bash
   npm run build
   ```
2. Navigate to your local `dist/assets/` folder:
   * Rename `index-xxxx.css` to `index.css`
   * Rename `index-xxxx.js` to `index.js`
3. In your GoDaddy theme folder (`/wp-content/themes/[your-theme]/`), create a new folder named `react-app`.
4. Upload `index.js`, `index.css`, and your `imges/` folder containing loopable videos and GIFs inside this `/react-app/` folder.

---

### Step 5: Publish & Set Homepage in WordPress
1. Log in to your WordPress dashboard.
2. Go to **Pages** -> **Add New**. Title it "Home".
3. Under **Page Attributes** (right sidebar), change the **Template** to `React App Wrapper`.
4. Fill in the ACF fields (upload your slides, videos, and texts) and click **Publish**.
5. Go to **Settings** -> **Reading**:
   * Under **Your homepage displays**, select **A static page**.
   * Set **Homepage** to "Home".
   * Click **Save Changes**.

---

### Step 6: Dynamic Blogs & SEO Setup (Method A: Custom PHP Styling)
For a secure, virus-free, and lightweight experience, **deactivate the heavy Bridge Theme** and install a clean, reputable theme from the official WordPress directory:
* **Recommended Theme**: **Astra** (or **GeneratePress**).
* **Why it is secure**: These themes are verified by the official WordPress core team, contain zero malicious files (no nulled or cracked templates), and are optimized for speed. Switching to Astra immediately removes all theme-cluttering menus (like Qode Options) from your sidebar.

#### Implementing Method A (Custom Styled Blog Templates)
To make your blog index (`archive.php`) and blog post details (`single.php`) look exactly like your React website:

1. **Create Child Theme files** or override files in your theme:
   * Copy `single.php` and `archive.php` to your theme folder.
2. **Include React Styles**:
   At the very top of `single.php` and `archive.php`, modify the HTML structure to include your React index.css styling and Google Fonts:
   ```php
   <!DOCTYPE html>
   <html <?php language_attributes(); ?>>
   <head>
       <meta charset="<?php bloginfo( 'charset' ); ?>">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <?php wp_head(); ?> <!-- Yields Yoast / RankMath SEO automatically -->
       
       <!-- Link same index.css as React homepage -->
       <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/react-app/index.css">
   </head>
   ```
3. **Build the Custom Clean Blog Layout in PHP**:
   Inside `single.php`, strip down the sidebars and use simple Tailwind/Vanilla CSS classes that match your React styling to render the article content:
   ```php
   <body class="bg-[#f2f5f9] text-[#0b132b]">
       <!-- Static React Header Copy (HTML wrapper) -->
       <header class="mx-auto max-w-7xl px-8 py-6 flex justify-between items-center">
           <a href="/"><img src="<?php echo get_stylesheet_directory_uri(); ?>/react-app/assets/technovalogo-DmQnVF-N.svg" class="h-12" alt="Logo"></a>
           <!-- Add same links matching React header -->
       </header>

       <main class="max-w-4xl mx-auto px-4 py-16 bg-white rounded-xl shadow-sm border border-slate-100 my-8">
           <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
               <span class="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider"><?php the_category(', '); ?></span>
               <h1 class="text-4xl font-display font-semibold mt-4 mb-6 leading-tight"><?php the_title(); ?></h1>
               
               <div class="flex items-center gap-3 text-slate-400 text-xs mb-8">
                   <span>By <?php the_author(); ?></span>
                   <span>•</span>
                   <span><?php the_date(); ?></span>
               </div>

               <?php if (has_post_thumbnail()) : ?>
                   <div class="rounded-xl overflow-hidden mb-8 max-h-[400px]">
                       <?php the_post_thumbnail('large', ['class' => 'w-full h-full object-cover']); ?>
                   </div>
               <?php endif; ?>

               <article class="prose max-w-none text-slate-600 leading-relaxed text-sm">
                   <?php the_content(); ?>
               </article>
           <?php endwhile; endif; ?>
       </main>
       
       <!-- Static React Footer Copy -->
       <?php wp_footer(); ?>
   </body>
   ```
4. **Instantly Dynamic**:
   * Google reads these PHP-compiled blog pages instantly with 100% Yoast SEO meta tags.
   * Whenever your client publishes a new article inside `/wp-admin`, it renders instantly using this clean template at its slug (e.g., `yourdomain.com/blog/my-article/`) without needing a React rebuild.

---

### Step 7: Dynamic Contact Forms (WordPress Lead Management)
You can link your React homepage contact form to a WordPress plugin (like **Contact Form 7** or **WPForms**) via the WordPress REST API. This sends email notifications and saves leads directly inside the WordPress dashboard.

1. **Install Plugins in WordPress**:
   * Install **Contact Form 7** (or WPForms).
   * Install **Flamingo** (to store form submissions in the WordPress database so the client can view/export them).
2. **Create a Contact Form**:
   * Create a new contact form in WordPress and copy its ID (e.g., `123`).
3. **React Form Submission Code**:
   In your React app, intercept form submission and POST the fields to the WordPress REST API endpoint:
   ```typescript
   const handleFormSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     
     const formData = new FormData();
     formData.append("your-name", nameState); // Must match CF7 form field names
     formData.append("your-email", emailState);
     formData.append("your-subject", "Lead from Technova Web");
     formData.append("your-message", messageState);

     try {
       const response = await fetch(
         "https://yourdomain.com/wp-json/contact-form-7/v1/contact-forms/123/feedback",
         {
           method: "POST",
           body: formData,
         }
       );
       const result = await response.json();
       
       if (result.status === "mail_sent") {
         alert("Message sent successfully!");
       } else {
         alert("Failed to send message: " + result.message);
       }
     } catch (error) {
       console.error("Error submitting form:", error);
     }
   };
   ```
4. **Dashboard Lead Management**:
   Whenever a user submits a form on the React page, the client receives email notifications, and the submission is stored inside **Flamingo** (WordPress Dashboard -> **Flamingo** -> **Inbound Messages**) for easy client access.

---

## 🔑 GoDaddy Production SFTP Connection Details

Use these details to configure your FTP client (like FileZilla, Cyberduck) or for setting up GitHub Actions automated deployment.

* **Protocol**: `SFTP` (SSH File Transfer Protocol)
* **Host / Server**: `1164622.us17.ssh.myftpupload.com`
* **Port**: `22`
* **Username**: `client_b65cfd3dae_1164622`
* **Password**: `CRfS8Sgvyp33MJ`

> [!WARNING]
> Keep these credentials private and add them as secrets in GitHub if you set up CI/CD automation. Do not commit them directly into your git repository!
