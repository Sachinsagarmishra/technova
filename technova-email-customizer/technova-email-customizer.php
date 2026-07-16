<?php
/**
 * Plugin Name: TechNova Email Customizer
 * Description: Premium HTML Email Customizer for Contact Form 7 leads.
 * Version: 1.0.0
 * Author: Antigravity
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

add_filter( 'wpcf7_mail_components', 'technova_custom_wpcf7_mail_components', 10, 3 );
function technova_custom_wpcf7_mail_components( $components, $form, $mail ) {
    // Get the submission instance
    $submission = WPCF7_Submission::get_instance();
    if ( ! $submission ) {
        return $components;
    }

    $posted_data = $submission->get_posted_data();

    // Map fields
    $field_labels = [
        'your-name' => 'Name',
        'your-email' => 'Email',
        'your-phone' => 'Phone',
        'your-company' => 'Company',
        'your-subject' => 'Subject',
        'form-source' => 'Form Source',
        'your-role' => 'Job Role / Title',
        'your-hiring-for' => 'Hiring For',
        'your-hires-count' => 'Number of Hires',
        'your-timeline' => 'Timeline',
        'your-interests' => 'Interests',
        'your-location' => 'Location',
        'your-title' => 'Current Title',
        'your-experience' => 'Years of Experience',
        'your-skill' => 'Primary Skill',
        'your-jobtype' => 'Job Type',
        'your-worklocation' => 'Preferred Work Location',
        'your-salary' => 'Expected Salary',
        'your-linkedin' => 'LinkedIn Profile',
        'your-portfolio' => 'Portfolio Link',
    ];

    // Get submission page URL
    $page_url = $submission->get_meta( 'url' );
    if (empty($page_url) && isset($_SERVER['HTTP_REFERER'])) {
        $page_url = $_SERVER['HTTP_REFERER'];
    }

    // Build the grid rows of only filled fields
    $grid_html = '';
    foreach ( $field_labels as $key => $label ) {
        if ( ! empty( $posted_data[$key] ) ) {
            $value = esc_html( $posted_data[$key] );
            // Format arrays if interests is array
            if ( is_array( $posted_data[$key] ) ) {
                $value = implode( ', ', array_map( 'esc_html', $posted_data[$key] ) );
            }
            $grid_html .= "
            <tr>
                <td style='padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #64748b; width: 40%;'>{$label}</td>
                <td style='padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0b132b; font-weight: 500;'>{$value}</td>
            </tr>";
        }
    }

    // Capture message box if present
    $message_html = '';
    if ( ! empty( $posted_data['your-message'] ) ) {
        $msg_val = nl2br( esc_html( $posted_data['your-message'] ) );
        $message_html = "
        <div style='background-color: #f8fafc; border-left: 4px solid #8B5CF6; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-top: 20px;'>
            <h3 style='margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;'>Message / Requirements</h3>
            <p style='margin: 0; font-size: 14px; color: #334155; line-height: 1.6;'>{$msg_val}</p>
        </div>";
    }

    // Set colors based on form source
    $accent_color = '#8B5CF6'; // Purple default
    $form_src_lower = strtolower($posted_data['form-source'] ?? '');
    if (strpos($form_src_lower, 'employers') !== false) {
        $accent_color = '#8B5CF6'; // Purple
    } elseif (strpos($form_src_lower, 'talent') !== false) {
        $accent_color = '#f59e0c'; // Amber/Orange
    } elseif (strpos($form_src_lower, 'contact') !== false) {
        $accent_color = '#0b132b'; // Slate
    }

    // Build Email HTML Template
    $html_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <title>New Lead Captured</title>
    </head>
    <body style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #0b132b;'>
        <div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;'>
            
            <div style='background-color: #0b132b; padding: 30px; text-align: center; border-bottom: 3px solid {$accent_color};'>
                <h1 style='color: #ffffff; font-size: 24px; font-weight: 600; margin: 0; letter-spacing: -0.5px;'>New Lead Submission</h1>
                <p style='color: #94a3b8; font-size: 14px; margin: 5px 0 0 0;'>Captured from Technova Systems website</p>
            </div>
            
            <div style='padding: 30px;'>
                <table style='width: 100%; border-collapse: collapse; margin-bottom: 20px;'>
                    {$grid_html}
                </table>
                
                {$message_html}
            </div>
            
            <div style='background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; line-height: 1.5;'>
                Lead Source Page: <a href='{$page_url}' style='color: #8B5CF6; text-decoration: none; font-weight: 600;'>Visit Page Link</a><br>
                <span style='display: block; margin-top: 6px; font-size: 11px; color: #94a3b8;'>This email was sent dynamically from TechNova Systems.</span>
            </div>
            
        </div>
    </body>
    </html>";

    $components['body'] = $html_body;
    $components['headers'] .= "\r\nContent-Type: text/html; charset=UTF-8";

    // Set custom subject line based on lead name & source
    if ( ! empty( $posted_data['your-name'] ) ) {
        $lead_name = esc_html( $posted_data['your-name'] );
        $lead_src = esc_html( $posted_data['form-source'] ?? 'Website Form' );
        $components['subject'] = "New Lead: {$lead_name} ({$lead_src})";
    }

    return $components;
}
