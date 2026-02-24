// CloudFront Function: 301 redirects for old WordPress URLs
// Deployed to CloudFront distribution E294PA6BZXYU0R (viewer-request)
// Replaces meta-refresh HTML redirects with proper HTTP 301 responses

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Normalize: strip /index.html suffix
  if (uri.endsWith('/index.html')) {
    uri = uri.slice(0, -10);
  }

  // Normalize: ensure trailing slash for lookup
  var key = uri.endsWith('/') ? uri : uri + '/';

  var r = {
    '/hair-up-or-down-for-headshots/':'/tips-guides/hair-up-or-down/',
    '/the-power-of-a-personalized-email-profile-picture/':'/tips-guides/best-headshot-for-linkedin-and-email/',
    '/how-to-look-thinner-in-your-headshot-5-top-tips-from-the-pros/':'/tips-guides/how-to-look-your-best-in-your-headshot/',
    '/modeling-polaroids-guide-in-phoenix-and-beyond/':'/actor-headshots/',
    '/my-journey-into-the-world-of-professional-headshot-photography/':'/about-marie/',
    '/what-does-your-headshot-smile-says-about-you/':'/tips-guides/',
    '/dos-and-donts-for-business-headshots-and-profile-pictures/':'/tips-guides/',
    '/corporate-vs-dating-headshots/':'/executive-headshots/',
    '/understanding-copyrights-of-a-profile-picture/':'/tips-guides/understanding-copyrights-of-a-profile-picture/',
    '/best-colors-for-headshots-matching-skin-tones-and-personal-branding/':'/tips-guides/',
    '/do-you-need-makeup-for-your-headshot/':'/tips-guides/',
    '/evolution_of_professional_headshots/':'/news/',
    '/how-to-style-your-personal-branding-photoshoot-like-a-wes-anderson-character/':'/personal-branding/',
    '/what-men-should-wear-for-professional-headshots-and-business-portraits/':'/tips-guides/what-men-should-wear-for-professional-headshots/',
    '/what-men-should-wear-for-professional-headshots/':'/tips-guides/what-men-should-wear-for-professional-headshots/',
    '/can-your-headshot-be-a-selfie-unveiling-the-art-of-professional-profile-pictures/':'/tips-guides/',
    '/is-a-selfie-suitable-for-a-professional-headshot/':'/tips-guides/',
    '/open-shade/':'/tips-guides/',
    '/a-weekend-to-remember-my-portrait-photography-workshop-with-michael-schacht-in-chicago/':'/about-marie/',
    '/eras-photo-and-social-media-profile/':'/eras-headshots/',
    '/how-to-prepare-for-your-photoshoot/':'/tips-guides/',
    '/what-happens-when-you-are-late-to-your-photo-session/':'/tips-guides/',
    '/blending-authority-and-approachability-in-your-wardrobe/':'/tips-guides/blending-authority-approachability-wardrobe/',
    '/portrait-photography-with-chris-buck/':'/about-marie/',
    '/personal-branding-lessons-from-heinz-you-are-the-brand/':'/personal-branding/',
    '/from-workbook-to-workshop-how-my-brand-styling-guide-took-shape/':'/personal-branding/',
    '/what-to-wear-for-a-headshot/':'/tips-guides/blending-authority-approachability-wardrobe/',
    '/i-won-the-portraitist-award/':'/about-marie/',
    '/about-marie-feutrier/':'/about-marie/',
    '/corporate-headshots-photographer-phoenix/':'/executive-headshots/',
    '/linkedin-headshots-phoenix/':'/linkedin-headshots/',
    '/category/photography-advice/':'/tips-guides/',
    '/blog/':'/news/',
    '/tag/high-school-portraits/':'/portraits/',
    '/tag/professional-photographer/':'/tips-guides/',
    '/tag/professional-portrait-photographer/':'/tips-guides/',
    '/tag/acting-headshots/':'/actor-headshots/',
    '/tag/magazine-style-photography/':'/news/',
    '/tag/visual-communication/':'/tips-guides/',
    '/tag/photography-workshop/':'/about-marie/',
    '/tag/lighting/':'/tips-guides/',
    '/tag/headshot-trends/':'/news/',
    '/tag/photography-award/':'/about-marie/',
    '/tag/family-portrait/':'/portraits/',
    '/tag/email-profile-pictures/':'/tips-guides/',
    '/tag/photoshoot-makeup/':'/tips-guides/',
    '/linkedin-headshots-audit-phoenix/':'/linkedin-headshots/',
    '/three-mistakes-professionals-make-before-a-photoshoot/':'/tips-guides/',
    '/building-trust-likeability-and-connection-with-your-profile-picture/':'/tips-guides/',
    '/enhance-your-digital-identity-across-platforms-by-tailoring-profile-photos/':'/tips-guides/',
    '/capturing-the-magic-of-senior-memories-a-high-school-tradition-turned-glam-photoshoot/':'/portraits/',
    '/why-great-speakers-invest-in-great-headshots/':'/tips-guides/',
    '/tag/cinematic-photography/':'/news/',
    '/to-smile-or-not-to-smile-the-great-headshot-dilemma/':'/tips-guides/',
    '/envira/alec-fav/':'/portraits/',
    '/acting-hedashots-in-phoenix/':'/actor-headshots/',
    '/c/':'/'
  };

  // Exact match lookup
  var target = r[key];

  // Case-insensitive fallback (handles /Blog/ → /blog/)
  if (!target) {
    var lower = key.toLowerCase();
    if (lower !== key) {
      target = r[lower];
    }
  }

  if (target) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        'location': { value: 'https://headshotsbymarie.com' + target },
        'cache-control': { value: 'max-age=86400' }
      }
    };
  }

  // Fix S3's 302 trailing-slash redirects → 301
  // S3 returns 302 for /pricing → /pricing/ but Google won't index 302s
  var origUri = request.uri;
  if (origUri !== '/' && !origUri.endsWith('/') && origUri.indexOf('.') === -1) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        'location': { value: 'https://headshotsbymarie.com' + origUri + '/' },
        'cache-control': { value: 'max-age=86400' }
      }
    };
  }

  return request;
}
