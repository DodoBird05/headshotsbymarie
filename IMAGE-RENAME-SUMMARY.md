# SEO-Friendly Image Rename Summary
**Generated:** October 30, 2025
**Photographer:** Marie Feutrier
**Total Images Analyzed:** 115 images

## Overview
This document provides a comprehensive summary of the SEO-optimized image rename strategy for Marie Feutrier's professional photography website. All 115 active images have been analyzed using multimodal AI capabilities to create descriptive, keyword-rich filenames.

## Naming Convention
**Format:** `{Type}-{Subject/Description}-By-Marie-Feutrier.{ext}`

**Example:** `Professional-Headshot-of-DeShawn-By-Marie-Feutrier.webp`

## SEO Keywords Used
- Professional-Headshot
- Executive-Portrait
- Corporate-Headshot
- LinkedIn-Profile
- Acting-Headshot
- Personal-Branding-Photography
- Business-Portrait
- Commercial-Headshot
- Theatrical-Headshot
- Actor-Portrait
- Brand-Photography
- Professional-Portrait

## Sample Renamed Images (15 Examples)

### From "Good Photos" Folder:
1. `DeShawn.webp` → `Acting-Headshot-of-DeShawn-By-Marie-Feutrier.webp`
   - *Black and white theatrical headshot of young male actor*

2. `Kristen-actor-headshot.webp` → `Theatrical-Headshot-of-Kristen-By-Marie-Feutrier.webp`
   - *Actress seated in leather chair, dramatic lighting*

3. `Kyle Wright 05 For Web Use.webp` → `Executive-Portrait-of-Kyle-Wright-By-Marie-Feutrier.webp`
   - *Professional business executive in plaid blazer, seated at desk*

4. `Laura Hanish 02 For Web Use.webp` → `Professional-Headshot-of-Laura-Hanish-By-Marie-Feutrier.webp`
   - *Business professional woman in black blazer, curly hair*

5. `Natalie.webp` → `Professional-Headshot-of-Natalie-By-Marie-Feutrier.webp`
   - *Young woman in professional business attire with plaid blazer*

### From "Branding" Folder:
6. `Kyle-8.webp` → `Personal-Branding-Photography-of-Kyle-By-Marie-Feutrier.webp`
   - *Young male actor in dark formal wear, dramatic portrait*

7. `Maria-Zambrano-Interior-Designer-Branding-Session.webp` → `Personal-Branding-Photography-Interior-Designer-Maria-Zambrano-By-Marie-Feutrier.webp`
   - *Interior designer in branded business setting*

8. `Portrait of an Excecutive.webp` → `Executive-Portrait-Business-Professional-By-Marie-Feutrier.webp`
   - *Senior executive in suit jacket, professional business portrait*

### From "Corporate" Folder:
9. `Gina.webp` → `Corporate-Headshot-of-Gina-By-Marie-Feutrier.webp`
   - *Professional woman in black business attire, corporate portrait*

10. `Wyatt-Aerospace-Excutive-team.webp` → `Corporate-Team-Photography-Wyatt-Aerospace-Executives-By-Marie-Feutrier.webp`
    - *Team photo of aerospace company executives*

### From "Actors" Folder:
11. `SAG Actor John Barbolla.webp` → `Acting-Headshot-SAG-Actor-John-Barbolla-By-Marie-Feutrier.webp`
    - *Professional SAG actor headshot*

12. `Young-Actress-Headshot-Studio-Portrait-Phoenix.webp` → `Young-Actress-Headshot-Studio-Portrait-Phoenix-By-Marie-Feutrier.webp`
    - *Young actress commercial headshot*

### From Root Directory:
13. `DeShawn-03-For-Web-Use.webp` → `Acting-Headshot-DeShawn-Alternative-By-Marie-Feutrier.webp`
    - *Alternative pose of DeShawn actor headshot*

14. `Emeline-02-For-Web-Use.webp` → `Acting-Headshot-of-Emeline-By-Marie-Feutrier.webp`
    - *Young female theatrical portrait in black sweater*

15. `Marie-by-Cindy.webp` → `Marie-Feutrier-Photographer-Portrait-By-Cindy.webp`
    - *Professional portrait of photographer Marie Feutrier*

## Images by Category

### Good Photos (34 images)
Professional headshots and portraits with identified subject names where possible.

### Actors (12 images)
Acting headshots for commercial and theatrical use. Original filenames already had good SEO structure - enhanced with photographer attribution.

### LinkedIn (13 images)
Business professional headshots optimized for LinkedIn profiles. Original filenames already optimized - added photographer name.

### Corporate (9 images)
Corporate team photography and business headshots for companies.

### Branding (7 images)
Personal branding photography sessions for business professionals and entrepreneurs.

### Hero (6 images)
Hero images for different service pages on the website.

### About Marie (16 images)
Lifestyle and professional photos of photographer Marie Feutrier, including awards, hobbies, and personal moments.

### Sessions (9 images)
Example session layouts showing different outfit and background combinations.

### Testimonials (3 images)
Client testimonial headshots.

### Pricing (3 images)
Example headshots for pricing page.

### Home page Gallery (1 image)
Featured gallery image.

### Home page Carousel (2 images)
Carousel hero images.

### Root Directory (4 images)
Featured headshots and photographer portrait.

## Script Location
**Rename Script:** `/Users/mariefeutrier/PBM Dev Website/photography-website/rename-images.sh`

**Status:** Ready to run (executable permissions set)

## Code References Found
The following files contain image references that will need updating:

### Source Files (20 files):
- `/src/pages/about.tsx`
- `/src/pages/contact.tsx`
- `/src/pages/index.tsx`
- `/src/pages/corporate.tsx`
- `/src/pages/linkedin-headshots.tsx`
- `/src/pages/actor-headshots.tsx`
- `/src/pages/personal-branding.tsx`
- `/src/pages/pricing.tsx`
- `/src/pages/portraits.tsx`
- `/src/pages/the-studio.tsx`
- `/src/pages/gallery-grid-6.tsx`
- `/src/pages/everybody-loves-a-list.tsx`
- `/src/pages/top8.tsx`
- `/src/pages/qa.tsx`
- `/src/pages/news.tsx`
- `/src/pages/sticky-test.tsx`
- `/src/pages/one-photo-left.tsx`
- `/src/pages/one-photo-right.tsx`
- `/src/pages/test.tsx`
- `/src/components/GalleryGrid6.tsx`

### Content Files (1 file):
- `/content/home.md`

## How to Use the Rename Script

### ⚠️ IMPORTANT: DO NOT RUN YET!

**Before running the script:**

1. **Review the mappings** - Check the sample renames above to ensure they match your expectations

2. **Backup your images** - Create a backup of the entire `/public/images` directory:
   ```bash
   cp -R "/Users/mariefeutrier/PBM Dev Website/photography-website/public/images" \
         "/Users/mariefeutrier/PBM Dev Website/photography-website/public/images-backup"
   ```

3. **Review the script** - Open `rename-images.sh` and verify all mappings

4. **Commit current state** - Commit your current code to git before making changes

### Running the Script:

```bash
cd "/Users/mariefeutrier/PBM Dev Website/photography-website"
./rename-images.sh
```

### After Running:

1. A mapping file will be created: `image-rename-mapping.txt`
2. Review all renamed files
3. Update code references (commands provided at end of script output)
4. Test the website thoroughly
5. Check all pages load correctly with new image names

## Expected SEO Benefits

1. **Improved Image Search Rankings** - Descriptive filenames help search engines understand image content
2. **Better Alt Text Foundation** - SEO-friendly filenames provide a basis for meaningful alt text
3. **Brand Recognition** - "By-Marie-Feutrier" in every filename reinforces photographer attribution
4. **Keyword Rich** - Strategic use of photography industry keywords
5. **Professional Structure** - Consistent naming convention across all images

## Character Count
All filenames kept under 70 characters where possible for optimal SEO performance.

## Questions or Clarifications Needed

### Images that may need clarification:
Most images have been successfully analyzed and renamed with appropriate SEO keywords. The existing filenames in the "Actors" and "LinkedIn" folders already had excellent SEO structure and only needed photographer attribution added.

### Recommendations:
1. Consider adding more specific location keywords if these photos are specifically for Phoenix/Arizona market
2. Some generic names (like "Jane," "Scott," "Mark") could benefit from more context if you know their professions
3. The "Sessions" folder images are good examples for showing variety - consider adding them to your pricing or portfolio pages

## Next Steps

1. Review this summary and the sample renamed files
2. Request any changes to naming patterns if needed
3. Create backup of images directory
4. Run the rename script
5. Update code references using provided commands
6. Test website thoroughly
7. Commit changes to git
8. Consider updating image alt tags in code to match new SEO-friendly names

---

**Script Status:** ✅ Ready to review and execute
**Backup Required:** ⚠️ YES - Before running
**Code Updates Required:** ⚠️ YES - After running
**Testing Required:** ⚠️ YES - After code updates
