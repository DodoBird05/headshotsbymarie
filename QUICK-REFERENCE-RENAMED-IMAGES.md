# Quick Reference: Most Commonly Referenced Images

This is a quick lookup guide for the most frequently used images in your codebase.

## Root Directory Images (`/public/images/`)

| Original Name | New SEO-Friendly Name |
|--------------|----------------------|
| `DeShawn.webp` | `Acting-Headshot-of-DeShawn-By-Marie-Feutrier.webp` |
| `DeShawn-03-For-Web-Use.webp` | `Acting-Headshot-DeShawn-Alternative-By-Marie-Feutrier.webp` |
| `Emeline-02-For-Web-Use.webp` | `Acting-Headshot-of-Emeline-By-Marie-Feutrier.webp` |
| `Marie-by-Cindy.webp` | `Marie-Feutrier-Photographer-Portrait-By-Cindy.webp` |

## Good Photos Directory (`/public/images/Good Photos/`)

| Original Name | New SEO-Friendly Name |
|--------------|----------------------|
| `DeShawn.webp` | `Acting-Headshot-of-DeShawn-By-Marie-Feutrier.webp` |
| `Kristen-actor-headshot.webp` | `Theatrical-Headshot-of-Kristen-By-Marie-Feutrier.webp` |
| `Kyle Wright 05 For Web Use.webp` | `Executive-Portrait-of-Kyle-Wright-By-Marie-Feutrier.webp` |
| `Laura Hanish 02 For Web Use.webp` | `Professional-Headshot-of-Laura-Hanish-By-Marie-Feutrier.webp` |
| `Natalie.webp` | `Professional-Headshot-of-Natalie-By-Marie-Feutrier.webp` |
| `Jaime-800.webp` | `Personal-Branding-Photography-of-Jaime-By-Marie-Feutrier.webp` |
| `Martha.webp` | `Acting-Headshot-of-Martha-By-Marie-Feutrier.webp` |
| `Suzanne 2-800.webp` | `Professional-Headshot-of-Suzanne-By-Marie-Feutrier.webp` |

## Home Page Gallery (`/public/images/Home page Gallery/`)

| Original Name | New SEO-Friendly Name |
|--------------|----------------------|
| `James.jpg` | `Professional-Headshot-of-James-By-Marie-Feutrier.jpg` |

## Hero Images (`/public/images/Hero/`)

| Original Name | New SEO-Friendly Name |
|--------------|----------------------|
| `Acting-headshots-hero.webp` | `Acting-Headshots-Phoenix-Hero-By-Marie-Feutrier.webp` |
| `Corporate-team-photography-Hero.webp` | `Corporate-Team-Photography-Phoenix-Hero-By-Marie-Feutrier.webp` |
| `LinkedIn-Profile-Photography-Hero.webp` | `LinkedIn-Profile-Photography-Phoenix-Hero-By-Marie-Feutrier.webp` |
| `Personal-Brand-Photography-Hero.webp` | `Personal-Brand-Photography-Phoenix-Hero-By-Marie-Feutrier.webp` |
| `Portraits-by-Marie-Hero.webp` | `Professional-Portraits-Phoenix-Hero-By-Marie-Feutrier.webp` |

## About Marie Images (`/public/images/About Marie/`)

| Original Name | New SEO-Friendly Name |
|--------------|----------------------|
| `About Marie.webp` | `Marie-Feutrier-Professional-Photographer-About-Photo.webp` |
| `Marie et Penny 01 For Web Use.jpg` | `Marie-Feutrier-With-Dog-Penny-Lifestyle.jpg` |
| `Portraitist.webp` | `Marie-Feutrier-Professional-Portraitist-At-Work.webp` |

## Find and Replace Patterns for Code

### Common patterns to update in your TypeScript/React files:

```typescript
// Before
src="/images/Good Photos/DeShawn.webp"
// After
src="/images/Good Photos/Acting-Headshot-of-DeShawn-By-Marie-Feutrier.webp"

// Before
src="/images/Good Photos/Kyle Wright 05 For Web Use.webp"
// After
src="/images/Good Photos/Executive-Portrait-of-Kyle-Wright-By-Marie-Feutrier.webp"

// Before
src="/images/Home page Gallery/James.jpg"
// After
src="/images/Home page Gallery/Professional-Headshot-of-James-By-Marie-Feutrier.jpg"

// Before
src="/images/Hero/Acting-headshots-hero.webp"
// After
src="/images/Hero/Acting-Headshots-Phoenix-Hero-By-Marie-Feutrier.webp"
```

## Sed Commands for Bulk Updates

```bash
# Update common Good Photos references
find ./src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e 's|Good Photos/DeShawn\.webp|Good Photos/Acting-Headshot-of-DeShawn-By-Marie-Feutrier.webp|g' \
  -e 's|Good Photos/Kyle Wright 05 For Web Use\.webp|Good Photos/Executive-Portrait-of-Kyle-Wright-By-Marie-Feutrier.webp|g' \
  -e 's|Good Photos/Laura Hanish 02 For Web Use\.webp|Good Photos/Professional-Headshot-of-Laura-Hanish-By-Marie-Feutrier.webp|g' \
  -e 's|Good Photos/Kristen-actor-headshot\.webp|Good Photos/Theatrical-Headshot-of-Kristen-By-Marie-Feutrier.webp|g' \
  -e 's|Good Photos/Natalie\.webp|Good Photos/Professional-Headshot-of-Natalie-By-Marie-Feutrier.webp|g' \
  {} +

# Update Home page Gallery references
find ./src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e 's|Home page Gallery/James\.jpg|Home page Gallery/Professional-Headshot-of-James-By-Marie-Feutrier.jpg|g' \
  {} +

# Update Hero image references
find ./src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e 's|Hero/Acting-headshots-hero\.webp|Hero/Acting-Headshots-Phoenix-Hero-By-Marie-Feutrier.webp|g' \
  -e 's|Hero/Corporate-team-photography-Hero\.webp|Hero/Corporate-Team-Photography-Phoenix-Hero-By-Marie-Feutrier.webp|g' \
  -e 's|Hero/LinkedIn-Profile-Photography-Hero\.webp|Hero/LinkedIn-Profile-Photography-Phoenix-Hero-By-Marie-Feutrier.webp|g' \
  {} +

# Update About Marie references
find ./src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e 's|About Marie/About Marie\.webp|About Marie/Marie-Feutrier-Professional-Photographer-About-Photo.webp|g' \
  -e 's|About Marie/Portraitist\.webp|About Marie/Marie-Feutrier-Professional-Portraitist-At-Work.webp|g' \
  {} +
```

## Testing Checklist

After running the rename script and code updates:

- [ ] Homepage loads correctly
- [ ] About page shows Marie's photos
- [ ] Corporate headshots page displays properly
- [ ] LinkedIn headshots page works
- [ ] Actor headshots page loads
- [ ] Personal branding page functions
- [ ] Pricing page shows example images
- [ ] All hero images display
- [ ] Gallery/portfolio pages work
- [ ] No broken image links (check browser console)

## Notes

- All filenames now include "By-Marie-Feutrier" for brand recognition
- SEO keywords strategically placed at the beginning of filenames
- Hyphens used instead of spaces for web compatibility
- Original folder structure maintained for easier code updates
- Extensions preserved (.webp, .jpg, .png, .JPEG)

---

**Last Updated:** October 30, 2025
