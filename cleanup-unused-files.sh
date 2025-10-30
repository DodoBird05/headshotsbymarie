#!/bin/bash

# Cleanup Script - Move Unused Files to Unused Folder
# This script safely moves unused files from public/ to public/Unused/

# Change to project directory
cd "/Users/mariefeutrier/PBM Dev Website/photography-website"

# Create Unused folder with subdirectories
mkdir -p "public/Unused/root-level"
mkdir -p "public/Unused/About Marie"
mkdir -p "public/Unused/Actors"
mkdir -p "public/Unused/Branding"
mkdir -p "public/Unused/Corporate"
mkdir -p "public/Unused/Good Photos"
mkdir -p "public/Unused/Home page Carousel"
mkdir -p "public/Unused/Home page Gallery"
mkdir -p "public/Unused/LinkedIn"
mkdir -p "public/Unused/Hero"
mkdir -p "public/Unused/Sessions"

echo "=========================================="
echo "CLEANUP SCRIPT - MOVING UNUSED FILES"
echo "=========================================="
echo ""

# Counter
moved=0

# Function to safely move a file
move_file() {
    local src="$1"
    local dest="$2"
    if [ -f "$src" ]; then
        mv "$src" "$dest"
        echo "✓ Moved: $(basename "$src")"
        ((moved++))
    fi
}

echo "1. Moving loose files from public root..."
echo "------------------------------------------"

# Loose JPG/WebP files in public root that aren't used
move_file "public/Alegna 02 For Web Use.jpg" "public/Unused/root-level/"
move_file "public/dentist professional Portrait.webp" "public/Unused/root-level/"
move_file "public/Lawyer Headshot.webp" "public/Unused/root-level/"
move_file "public/Medical Headshots.webp" "public/Unused/root-level/"
move_file "public/Peter 1-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/Pierina 03 For Web Use.jpg" "public/Unused/root-level/"
move_file "public/Pink Background Portrait.webp" "public/Unused/root-level/"
move_file "public/Ron 02 For Web Use.jpg" "public/Unused/root-level/"
move_file "public/Serghei-15-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/Smiling woman headshot.webp" "public/Unused/root-level/"
move_file "public/Trevor-09-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/TV-Commercial-Child-Actor-Headshot-Phoenix.webp" "public/Unused/root-level/"

echo ""
echo "2. Moving duplicate JPG originals (WebP versions exist)..."
echo "------------------------------------------"

# About Marie - JPG originals where WebP exists
move_file "public/images/About Marie/Cappuccino.jpg" "public/Unused/About Marie/"
move_file "public/images/About Marie/Grand Canyon.jpg" "public/Unused/About Marie/"
move_file "public/images/About Marie/Marie Mars 23 01 For Web Use.jpg" "public/Unused/About Marie/"
move_file "public/images/About Marie/Marie Mars 23 02 For Web Use.jpg" "public/Unused/About Marie/"
move_file "public/images/About Marie/Marie-Best Speaker.jpeg" "public/Unused/About Marie/"
move_file "public/images/About Marie/Marie-hiking.jpg" "public/Unused/About Marie/"
move_file "public/images/About Marie/PRM-Badge.jpg" "public/Unused/About Marie/"
move_file "public/images/About Marie/Watercolor-painting.jpg" "public/Unused/About Marie/"

# Keep Copper.jpg as it's referenced in code, but move unused badges
move_file "public/images/About Marie/2019 Image Awards Logo - BRONZE.png" "public/Unused/About Marie/"
move_file "public/images/About Marie/PPA.png" "public/Unused/About Marie/"
move_file "public/images/About Marie/Proud+Member+2021_LFA+Proud+Member+Badge+Red.png.webp" "public/Unused/About Marie/"

echo ""
echo "3. Moving unused actor headshots..."
echo "------------------------------------------"

# Actors - unused images
move_file "public/images/Actors/Actress-Headshot-Professional-Studio-Phoenix-Arizona.webp" "public/Unused/Actors/"
move_file "public/images/Actors/Commercial-Actress-Headshot-Professional-Phoenix-Arizona.webp" "public/Unused/Actors/"
move_file "public/images/Actors/Female-Actor-Headshot-Theatrical-Phoenix-Photographer.webp" "public/Unused/Actors/"
move_file "public/images/Actors/Professional-Female-Acting-Headshot-Phoenix.webp" "public/Unused/Actors/"

echo ""
echo "4. Moving unused branding photos..."
echo "------------------------------------------"

# Branding - unused images
move_file "public/images/Branding/Anne au Telephone37.webp" "public/Unused/Branding/"
move_file "public/images/Branding/Carissa at the desk.webp" "public/Unused/Branding/"
move_file "public/images/Branding/Kyle.webp" "public/Unused/Branding/"
move_file "public/images/Branding/Rob.webp" "public/Unused/Branding/"
move_file "public/images/Branding/Sara-Branding.webp" "public/Unused/Branding/"
move_file "public/images/Branding/Yoga Instructorjpg.webp" "public/Unused/Branding/"

echo ""
echo "5. Moving unused corporate photos..."
echo "------------------------------------------"

# Corporate - JPG originals and unused files
move_file "public/images/Corporate/Email-Signature.webp" "public/Unused/Corporate/"
move_file "public/images/Corporate/Meet-the-team.webp" "public/Unused/Corporate/"
move_file "public/images/Corporate/On-site headshots.webp" "public/Unused/Corporate/"
move_file "public/images/Corporate/Gina-1600.jpg" "public/Unused/Corporate/"
move_file "public/images/Corporate/Wyatt-Aerospace-Excutive-team.jpg" "public/Unused/Corporate/"

echo ""
echo "6. Moving duplicate files from root images folder..."
echo "------------------------------------------"

# Loose image files
move_file "public/images/Anna-04-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/images/Ashley.webp" "public/Unused/root-level/"
move_file "public/images/Client-selecting-Portraits.webp" "public/Unused/root-level/"
move_file "public/images/DeShawn-03-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/images/Elena 3 1-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/images/Elena 4 1-For-Web-Use.webp" "public/Unused/root-level/"
move_file "public/images/Emeline-02-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/images/Erich.webp" "public/Unused/root-level/"
move_file "public/images/Gerry-2.webp" "public/Unused/root-level/"
move_file "public/images/Kasia 05 For Web Use.jpg" "public/Unused/root-level/"
move_file "public/images/Kasia.webp" "public/Unused/root-level/"
move_file "public/images/Kyle Wright 05 For Web Use.webp" "public/Unused/root-level/"
move_file "public/images/Laura Hanish 02 For Web Use.webp" "public/Unused/root-level/"
move_file "public/images/LinkedIn-Profile.webp" "public/Unused/root-level/"
move_file "public/images/Mallory.webp" "public/Unused/root-level/"
move_file "public/images/Mark - 2-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/images/Natalie .webp" "public/Unused/root-level/"
move_file "public/images/Natalie-800.webp" "public/Unused/root-level/"
move_file "public/images/Natalie.webp" "public/Unused/root-level/"
move_file "public/images/Renee Christina 05 For Web Use.jpg" "public/Unused/root-level/"
move_file "public/images/Sarah-06-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/images/Shannon-1600.jpg" "public/Unused/root-level/"
move_file "public/images/Sien-Short Depth of field.webp" "public/Unused/root-level/"
move_file "public/images/Suzanne400.webp" "public/Unused/root-level/"
move_file "public/images/Tommy 03-500.webp" "public/Unused/root-level/"
move_file "public/images/Wade.webp" "public/Unused/root-level/"

echo ""
echo "7. Moving unused Good Photos JPG originals..."
echo "------------------------------------------"

# Good Photos - JPG originals where WebP exists
move_file "public/images/Good Photos/Alegna 08 For Web Use.jpg" "public/Unused/Good Photos/"
move_file "public/images/Good Photos/Anne au Telephone36.jpg" "public/Unused/Good Photos/"
move_file "public/images/Good Photos/Carissa 04 For Web Use.jpg" "public/Unused/Good Photos/"
move_file "public/images/Good Photos/Jackson 07 For Web Use.jpg" "public/Unused/Good Photos/"
move_file "public/images/Good Photos/Jane.jpg" "public/Unused/Good Photos/"
move_file "public/images/Good Photos/Janine  11 For Social Sharing.jpg" "public/Unused/Good Photos/"
move_file "public/images/Good Photos/Scott -5-For-Web-Use.jpg" "public/Unused/Good Photos/"
move_file "public/images/Good Photos/Wade.jpg" "public/Unused/Good Photos/"

echo ""
echo "8. Moving unused Home page Carousel images..."
echo "------------------------------------------"

# Home page Carousel - unused images
move_file "public/images/Home page Carousel/Acting-headshot.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/Brand-Photography.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/Business-Portraits.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/Content-creator-portrait.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/Corporate-Headshots.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/Creative-Portraits.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/ERAS-Photo.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/Executive-Portraits.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/Lifestyle-Photography.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/LinkedIn-Profile.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/Personal-Brand-Photography.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/Professional-Headshots.webp" "public/Unused/Home page Carousel/"
move_file "public/images/Home page Carousel/Website-Photography.webp" "public/Unused/Home page Carousel/"

echo ""
echo "9. Moving unused Home page Gallery images..."
echo "------------------------------------------"

# Home page Gallery - unused images and JPG originals
move_file "public/images/Home page Gallery/Aamari 04 For Web Use.jpg" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Actress headshot.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Alegna.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Business Portrait.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/CEO-Portrait.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/designer Profile Pidc.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Exceutive portrait.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Financial Advisor Headshot.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Natalie.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Professional business LinkedIn picture.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Profile Picture for emails.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Researcher Portrait.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Tamika.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Vincent.webp" "public/Unused/Home page Gallery/"
move_file "public/images/Home page Gallery/Voice actor headshot.webp" "public/Unused/Home page Gallery/"

# Move entire Jepg folder
if [ -d "public/images/Home page Gallery/Jepg" ]; then
    mv "public/images/Home page Gallery/Jepg" "public/Unused/Home page Gallery/"
    echo "✓ Moved: Jepg folder (15 JPG files)"
    ((moved+=15))
fi

echo ""
echo "10. Moving unused LinkedIn photos..."
echo "------------------------------------------"

# Move entire jpg folder
if [ -d "public/images/LinkedIn/jpg" ]; then
    mv "public/images/LinkedIn/jpg" "public/Unused/LinkedIn/"
    echo "✓ Moved: jpg folder (11 JPG files)"
    ((moved+=11))
fi

echo ""
echo "11. Moving unused pricing photos..."
echo "------------------------------------------"

# Pricing - JPG originals
move_file "public/images/pricing/Mark - 1-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/images/pricing/Mark - 4-For-Web-Use.jpg" "public/Unused/root-level/"
move_file "public/images/pricing/Mark - 5-For-Print.jpg" "public/Unused/root-level/"

echo ""
echo "12. Moving unused Hero images..."
echo "------------------------------------------"

# Hero - unused images
move_file "public/images/Hero/LinkedIn-Profile-Picture-Photographer-Hero.webp" "public/Unused/Hero/"

echo ""
echo "13. Moving unused testimonial images..."
echo "------------------------------------------"

# Testimonials - unused images
move_file "public/images/testimonials/Jonathan-LinkedIN-Profile-Testimonial.webp" "public/Unused/root-level/"

echo ""
echo "=========================================="
echo "CLEANUP COMPLETE!"
echo "=========================================="
echo ""
echo "Total files moved: $moved"
echo "All unused files are safely stored in: public/Unused/"
echo ""
echo "Next steps:"
echo "1. Test your website to make sure everything works"
echo "2. Review the Unused folder contents"
echo "3. If everything is fine, you can delete the Unused folder before deployment"
echo ""
