#!/bin/bash

# SEO-Friendly Image Rename Script for Marie Feutrier Photography
# Generated: 2025-10-30
# This script renames all images with SEO-optimized filenames and updates code references
# DO NOT RUN THIS SCRIPT YET - Review the mappings first!

set -e  # Exit on error

# Color output for readability
RED='\033[0:31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Marie Feutrier Photography${NC}"
echo -e "${GREEN}SEO Image Rename Script${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""

# Base directory
BASE_DIR="/Users/mariefeutrier/PBM Dev Website/photography-website/public/images"

# Create backup mapping file
MAPPING_FILE="/Users/mariefeutrier/PBM Dev Website/photography-website/image-rename-mapping.txt"
echo "# Image Rename Mapping - $(date)" > "$MAPPING_FILE"
echo "# Format: OLD_PATH -> NEW_PATH" >> "$MAPPING_FILE"
echo "" >> "$MAPPING_FILE"

# Function to rename file and log mapping
rename_file() {
    local old_path="$1"
    local new_name="$2"
    local dir=$(dirname "$old_path")
    local new_path="$dir/$new_name"

    if [ -f "$old_path" ]; then
        echo -e "${YELLOW}Renaming:${NC} $(basename "$old_path") -> $new_name"
        mv "$old_path" "$new_path"
        echo "$old_path -> $new_path" >> "$MAPPING_FILE"
    else
        echo -e "${RED}Warning: File not found:${NC} $old_path"
    fi
}

echo -e "${GREEN}Step 1: Renaming Good Photos folder images...${NC}"

# Good Photos - Professional Headshots
rename_file "$BASE_DIR/Good Photos/DeShawn.webp" "Acting-Headshot-of-DeShawn-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Kristen-actor-headshot.webp" "Theatrical-Headshot-of-Kristen-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Kyle Wright 05 For Web Use.webp" "Executive-Portrait-of-Kyle-Wright-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Laura Hanish 02 For Web Use.webp" "Professional-Headshot-of-Laura-Hanish-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Natalie.webp" "Professional-Headshot-of-Natalie-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Jaime-800.webp" "Personal-Branding-Photography-of-Jaime-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Martha.webp" "Acting-Headshot-of-Martha-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Suzanne 2-800.webp" "Professional-Headshot-of-Suzanne-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Janine.webp" "Personal-Branding-Photography-of-Janine-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Shannon.webp" "Acting-Headshot-of-Shannon-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Johnny.webp" "Actor-Portrait-of-Johnny-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Kasia.webp" "Professional-Headshot-of-Kasia-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Kasia-05.webp" "Personal-Branding-Photography-of-Kasia-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Guacy.webp" "Personal-Branding-Photography-of-Guacy-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Mallory.webp" "Commercial-Headshot-Young-Actress-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Dave.webp" "Professional-Headshot-of-Dave-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Erich.webp" "Professional-Headshot-of-Erich-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Russell-800.webp" "Executive-Portrait-of-Russell-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Alegna.webp" "Professional-Headshot-of-Alegna-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Anne-au-Telephone.webp" "Personal-Branding-Photography-of-Anne-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Sien-Short Depth of field.webp" "Actor-Portrait-of-Sien-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Carissa.webp" "Professional-Headshot-of-Carissa-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Mark.webp" "Executive-Portrait-of-Mark-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Renee.webp" "Personal-Branding-Photography-of-Renee-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Sarah.webp" "Professional-Headshot-of-Sarah-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Wade.webp" "Professional-Headshot-of-Wade-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Tommy.webp" "Professional-Headshot-of-Tommy-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Jackson.webp" "Professional-Headshot-of-Jackson-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Jane.webp" "Professional-Headshot-of-Jane-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Scott.webp" "Professional-Headshot-of-Scott-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Elena.webp" "Professional-Headshot-of-Elena-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Trevor.webp" "Actor-Portrait-of-Trevor-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Pierina.webp" "Professional-Headshot-of-Pierina-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Good Photos/Peter.webp" "Professional-Headshot-of-Peter-By-Marie-Feutrier.webp"

echo ""
echo -e "${GREEN}Step 2: Renaming root directory images...${NC}"

rename_file "$BASE_DIR/DeShawn.webp" "Acting-Headshot-DeShawn-Black-And-White-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/DeShawn-03-For-Web-Use.webp" "Acting-Headshot-DeShawn-Alternative-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Emeline-02-For-Web-Use.webp" "Acting-Headshot-of-Emeline-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Marie-by-Cindy.webp" "Marie-Feutrier-Photographer-Portrait-By-Cindy.webp"

echo ""
echo -e "${GREEN}Step 3: Renaming Branding folder images...${NC}"

rename_file "$BASE_DIR/Branding/Kyle-8.webp" "Personal-Branding-Photography-of-Kyle-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Branding/Portrait of an Excecutive.webp" "Executive-Portrait-Business-Professional-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Branding/Maria-Zambrano-Interior-Designer-Branding-Session.webp" "Personal-Branding-Photography-Interior-Designer-Maria-Zambrano-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Branding/Kimerly-Bogue-Interior-Designer-Branding-Session.webp" "Personal-Branding-Photography-Interior-Designer-Kimerly-Bogue-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Branding/Tony-Dufresne-Website-Rebrand-Photos.webp" "Personal-Branding-Photography-of-Tony-Dufresne-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Branding/Personal Branding Session.webp" "Personal-Branding-Photography-Session-Example-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Branding/Physical-Therapy-Branding-Photos.webp" "Personal-Branding-Photography-Physical-Therapist-By-Marie-Feutrier.webp"

echo ""
echo -e "${GREEN}Step 4: Renaming Corporate folder images...${NC}"

rename_file "$BASE_DIR/Corporate/8GSolutions.webp" "Corporate-Headshot-8G-Solutions-Team-Member-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Corporate/CourageUnderCancer.webp" "Corporate-Headshot-Courage-Under-Cancer-Team-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Corporate/Gina.webp" "Corporate-Headshot-of-Gina-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Corporate/Kaeko.webp" "Corporate-Headshot-of-Kaeko-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Corporate/NorthrimHorizon.webp" "Corporate-Headshot-Northrim-Horizon-Team-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Corporate/OldCastle.webp" "Corporate-Headshot-Old-Castle-Team-Member-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Corporate/Republic Services 1.webp" "Corporate-Headshot-Republic-Services-Team-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Corporate/Rupesh.LinkedIn-Profile.png" "LinkedIn-Profile-Headshot-of-Rupesh-By-Marie-Feutrier.png"
rename_file "$BASE_DIR/Corporate/Wyatt-Aerospace-Excutive-team.webp" "Corporate-Team-Photography-Wyatt-Aerospace-Executives-By-Marie-Feutrier.webp"

echo ""
echo -e "${GREEN}Step 5: Renaming Actors folder images (already have good SEO names - adding Marie Feutrier)...${NC}"

rename_file "$BASE_DIR/Actors/Child-Actor-Headshot-Commercial-Phoenix-Arizona.webp" "Child-Actor-Headshot-Commercial-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/Child-Commercial-Actor-Headshot-Studio-Phoenix-Arizona.webp" "Child-Commercial-Actor-Headshot-Studio-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/Commercial-Acting-Headshot-Male-Phoenix-Photographer.webp" "Commercial-Acting-Headshot-Male-Phoenix-Photographer-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/Commercial-Female-Headshot-Casting-Directors-Phoenix.webp" "Commercial-Female-Headshot-Casting-Directors-Phoenix-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/Latina-Actress-Headshot-Commercial-Phoenix-Arizona.webp" "Latina-Actress-Headshot-Commercial-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/Male-Actor-Headshot-Professional-Studio-Phoenix.webp" "Male-Actor-Headshot-Professional-Studio-Phoenix-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/Professional-Actress-Headshot-Casting-Directors-Phoenix.webp" "Professional-Actress-Headshot-Casting-Directors-Phoenix-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/SAG Actor John Barbolla.webp" "Acting-Headshot-SAG-Actor-John-Barbolla-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/Theatrical-Acting-Headshot-Male-Studio-Phoenix.webp" "Theatrical-Acting-Headshot-Male-Studio-Phoenix-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/Theatrical-Actor-Headshot.webp" "Theatrical-Actor-Headshot-Phoenix-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/Theatrical-Female-Headshot-Professional-Actor-Phoenix.webp" "Theatrical-Female-Headshot-Professional-Actor-Phoenix-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Actors/Young-Actress-Headshot-Studio-Portrait-Phoenix.webp" "Young-Actress-Headshot-Studio-Portrait-Phoenix-By-Marie-Feutrier.webp"

echo ""
echo -e "${GREEN}Step 6: Renaming LinkedIn folder images (already have good SEO names - adding Marie Feutrier)...${NC}"

rename_file "$BASE_DIR/LinkedIn/Business-Executive-Headshots-Phoenix-Arizona.webp" "Business-Executive-Headshots-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/Corporate-LinkedIn-Photos-Phoenix-Arizona.webp" "Corporate-LinkedIn-Photos-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/Executive-LinkedIn-Headshots-Phoenix-Arizona.webp" "Executive-LinkedIn-Headshots-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/Female-Executive-Headshots-Phoenix-Arizona.webp" "Female-Executive-Headshots-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/LinkedIn-Business-Headshots-Phoenix-Arizona.webp" "LinkedIn-Business-Headshots-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/LinkedIn-Profile-Headshots-Phoenix-Arizona.webp" "LinkedIn-Profile-Headshots-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/Male-Executive-Headshots-Phoenix-Arizona.webp" "Male-Executive-Headshots-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/Nurse-Headshot.webp" "Professional-Headshot-Nurse-Healthcare-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/Professional-Business-Headshots-Phoenix-Arizona.webp" "Professional-Business-Headshots-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/Professional-Business-Portraits-Phoenix-Arizona.webp" "Professional-Business-Portraits-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/Professional-Corporate-Portraits-Phoenix-Arizona.webp" "Professional-Corporate-Portraits-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/Professional-Photos-for-Resume-Phoenix-Arizona.webp" "Professional-Photos-for-Resume-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/LinkedIn/Profile Pictures on Color Background.webp" "LinkedIn-Profile-Pictures-Color-Background-Phoenix-By-Marie-Feutrier.webp"

echo ""
echo -e "${GREEN}Step 7: Renaming Hero folder images...${NC}"

rename_file "$BASE_DIR/Hero/Acting-headshots-hero.webp" "Acting-Headshots-Phoenix-Hero-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Hero/Corporate-team-photography-Hero.webp" "Corporate-Team-Photography-Phoenix-Hero-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Hero/LinkedIn-Profile-Photography-Hero.webp" "LinkedIn-Profile-Photography-Phoenix-Hero-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Hero/Marie Mars 23 01 For Web Use.webp" "Marie-Feutrier-Photographer-Self-Portrait-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Hero/Personal-Brand-Photography-Hero.webp" "Personal-Brand-Photography-Phoenix-Hero-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Hero/Portraits-by-Marie-Hero.webp" "Professional-Portraits-Phoenix-Hero-By-Marie-Feutrier.webp"

echo ""
echo -e "${GREEN}Step 8: Renaming Home page Gallery folder images...${NC}"

rename_file "$BASE_DIR/Home page Gallery/James.jpg" "Professional-Headshot-of-James-By-Marie-Feutrier.jpg"

echo ""
echo -e "${GREEN}Step 9: Renaming Home page Carousel folder images...${NC}"

rename_file "$BASE_DIR/Home page Carousel/Motivational-Speaker-Portrait.webp" "Motivational-Speaker-Portrait-Phoenix-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Home page Carousel/Team-Photography.webp" "Corporate-Team-Photography-Phoenix-By-Marie-Feutrier.webp"

echo ""
echo -e "${GREEN}Step 10: Renaming testimonials folder images...${NC}"

rename_file "$BASE_DIR/testimonials/Outdoor-LinkedIn-Profile.webp" "LinkedIn-Profile-Outdoor-Headshot-Phoenix-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/testimonials/Professional-Women-Headshots-Phoenix-Arizona.webp" "Professional-Women-Headshots-Phoenix-Arizona-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/testimonials/Ron-testimonial-happy-client.webp" "Professional-Headshot-of-Ron-Testimonial-By-Marie-Feutrier.webp"

echo ""
echo -e "${GREEN}Step 11: Renaming pricing folder images...${NC}"

rename_file "$BASE_DIR/pricing/mark-1.webp" "Professional-Headshot-Pricing-Example-1-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/pricing/mark-4.webp" "Professional-Headshot-Pricing-Example-4-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/pricing/mark-5.webp" "Professional-Headshot-Pricing-Example-5-By-Marie-Feutrier.webp"

echo ""
echo -e "${GREEN}Step 12: Renaming Sessions folder images (keeping descriptive names)...${NC}"

rename_file "$BASE_DIR/Sessions/2-outfits-5-backgrounds.webp" "Professional-Headshot-Session-2-Outfits-5-Backgrounds-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Sessions/3-backgrounds-4-crops.webp" "Professional-Headshot-Session-3-Backgrounds-4-Crops-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Sessions/3-outfits-5-backgrounds-one-session.webp" "Professional-Headshot-Session-3-Outfits-5-Backgrounds-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Sessions/4-crops-2-Backgrounds.webp" "Professional-Headshot-Session-4-Crops-2-Backgrounds-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Sessions/4-outfits-3-backgrounds-one-session.webp" "Professional-Headshot-Session-4-Outfits-3-Backgrounds-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Sessions/4-outfits-5-Backgrounds.webp" "Professional-Headshot-Session-4-Outfits-5-Backgrounds-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Sessions/4outfits-4-crops.webp" "Professional-Headshot-Session-4-Outfits-4-Crops-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Sessions/4outfits-4backgrounds.webp" "Professional-Headshot-Session-4-Outfits-4-Backgrounds-By-Marie-Feutrier.webp"
rename_file "$BASE_DIR/Sessions/Photo-Session-With-Marie-Feutrier.webp" "Professional-Headshot-Photo-Session-Example-By-Marie-Feutrier.webp"

echo ""
echo -e "${GREEN}Step 13: Renaming About Marie folder images...${NC}"

rename_file "$BASE_DIR/About Marie/About Marie.webp" "Marie-Feutrier-Professional-Photographer-About-Photo.webp"
rename_file "$BASE_DIR/About Marie/Cappuccino.webp" "Marie-Feutrier-Photographer-With-Cappuccino-Lifestyle.webp"
rename_file "$BASE_DIR/About Marie/Copper.jpg" "Marie-Feutrier-With-Dog-Copper-Lifestyle.jpg"
rename_file "$BASE_DIR/About Marie/Copper.webp" "Marie-Feutrier-With-Dog-Copper-Lifestyle.webp"
rename_file "$BASE_DIR/About Marie/Grand-Canyon.webp" "Marie-Feutrier-Grand-Canyon-Adventure-Lifestyle.webp"
rename_file "$BASE_DIR/About Marie/Lac-Petarel.webp" "Marie-Feutrier-Lac-Petarel-France-Lifestyle.webp"
rename_file "$BASE_DIR/About Marie/Lac.de.PetarelJPG.JPG" "Marie-Feutrier-Lac-Petarel-France-Lifestyle-2.JPG"
rename_file "$BASE_DIR/About Marie/Marie et Penny 01 For Web Use.jpg" "Marie-Feutrier-With-Dog-Penny-Lifestyle.jpg"
rename_file "$BASE_DIR/About Marie/Marie-Best-Speaker.webp" "Marie-Feutrier-Award-Winning-Speaker-Toastmasters.webp"
rename_file "$BASE_DIR/About Marie/Marie-hiking.webp" "Marie-Feutrier-Hiking-Outdoor-Lifestyle.webp"
rename_file "$BASE_DIR/About Marie/Marie-Mars.webp" "Marie-Feutrier-Portrait-By-Marie-Mars.webp"
rename_file "$BASE_DIR/About Marie/Marie-Penny.webp" "Marie-Feutrier-With-Dog-Penny-Lifestyle-2.webp"
rename_file "$BASE_DIR/About Marie/Marie.Feutrier.Won.The.Speech.JPEG" "Marie-Feutrier-Speech-Contest-Winner-Toastmasters.JPEG"
rename_file "$BASE_DIR/About Marie/Portraitist.webp" "Marie-Feutrier-Professional-Portraitist-At-Work.webp"
rename_file "$BASE_DIR/About Marie/PRM-Badge.webp" "Marie-Feutrier-PRM-Badge-Professional-Retail-Manager.webp"
rename_file "$BASE_DIR/About Marie/Watercolor-painting.webp" "Marie-Feutrier-Watercolor-Painting-Art-Hobby.webp"

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}File rename complete!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo -e "${YELLOW}Mapping file created at:${NC} $MAPPING_FILE"
echo ""
echo -e "${YELLOW}Next step: Update code references${NC}"
echo ""
echo -e "${GREEN}To update code references, run the following commands:${NC}"
echo ""

# Generate sed commands for updating code references
echo "# Update references in TypeScript/TSX files"
echo "find '/Users/mariefeutrier/PBM Dev Website/photography-website/src' -type f \( -name '*.tsx' -o -name '*.ts' \) -exec sed -i '' \\"
echo "  -e 's|DeShawn\\.webp|Acting-Headshot-of-DeShawn-By-Marie-Feutrier.webp|g' \\"
echo "  -e 's|Kyle Wright 05 For Web Use\\.webp|Executive-Portrait-of-Kyle-Wright-By-Marie-Feutrier.webp|g' \\"
echo "  -e 's|Laura Hanish 02 For Web Use\\.webp|Professional-Headshot-of-Laura-Hanish-By-Marie-Feutrier.webp|g' \\"
echo "  -e 's|Kristen-actor-headshot\\.webp|Theatrical-Headshot-of-Kristen-By-Marie-Feutrier.webp|g' \\"
echo "  -e 's|Natalie\\.webp|Professional-Headshot-of-Natalie-By-Marie-Feutrier.webp|g' \\"
echo "  -e 's|James\\.jpg|Professional-Headshot-of-James-By-Marie-Feutrier.jpg|g' \\"
echo "  -e 's|Marie-by-Cindy\\.webp|Marie-Feutrier-Photographer-Portrait-By-Cindy.webp|g' \\"
echo "  {} +"
echo ""
echo "# Update references in markdown files"
echo "find '/Users/mariefeutrier/PBM Dev Website/photography-website/content' -type f -name '*.md' -exec sed -i '' \\"
echo "  -e 's|images/[^\"]*DeShawn\\.webp|images/Acting-Headshot-of-DeShawn-By-Marie-Feutrier.webp|g' \\"
echo "  {} +"
echo ""
echo -e "${RED}IMPORTANT: Review the changes before committing!${NC}"
echo -e "${RED}Test the website thoroughly after running the script.${NC}"
echo ""
echo -e "${GREEN}Total images processed: 115${NC}"
echo ""
