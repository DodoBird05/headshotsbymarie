# AWS S3 + CloudFront Deployment Guide
**Portraits By Marie - Static Website Deployment**

## Cost Estimate: $1-5/month
- S3 Storage: ~$0.50/month
- CloudFront CDN: ~$1-3/month (first 1TB free)
- Route 53 DNS: ~$0.50/month

---

## Prerequisites

1. **AWS Account** - Sign up at https://aws.amazon.com
2. **AWS CLI** - Install from https://aws.amazon.com/cli/
3. **Your Domain Name** (e.g., portraitsbymarie.com)

---

## Step 1: Install & Configure AWS CLI

### Install AWS CLI (macOS)
```bash
# Using Homebrew
brew install awscli

# OR download from: https://aws.amazon.com/cli/
```

### Configure AWS Credentials
```bash
aws configure
```

You'll need:
- **AWS Access Key ID**: Get from AWS Console > IAM > Security Credentials
- **AWS Secret Access Key**: From the same place
- **Default region**: `us-east-1` (recommended for best CloudFront integration)
- **Default output format**: `json`

---

## Step 2: Create S3 Bucket

1. Go to AWS Console > S3
2. Click **Create bucket**
3. **Bucket name**: `portraitsbymarie.com` (must match your domain)
4. **Region**: US East (N. Virginia) us-east-1
5. **Block all public access**: UNCHECK (we need public access for website)
6. Click **Create bucket**

### Enable Static Website Hosting

1. Go to your bucket > **Properties** tab
2. Scroll to **Static website hosting**
3. Click **Edit**
4. Select **Enable**
5. **Index document**: `index.html`
6. **Error document**: `404.html`
7. Click **Save changes**
8. Note the **Bucket website endpoint** URL

### Add Bucket Policy

1. Go to **Permissions** tab
2. Click **Bucket Policy**
3. Add this policy (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

---

## Step 3: Set Up CloudFront (CDN)

1. Go to AWS Console > CloudFront
2. Click **Create Distribution**
3. **Origin domain**: Select your S3 bucket website endpoint (NOT the bucket itself)
   - It should look like: `portraitsbymarie.com.s3-website-us-east-1.amazonaws.com`
4. **Protocol**: HTTP only (S3 website endpoints don't support HTTPS)
5. **Viewer protocol policy**: Redirect HTTP to HTTPS
6. **Allowed HTTP methods**: GET, HEAD
7. **Cache policy**: CachingOptimized
8. **Price class**: Use all edge locations (or choose based on budget)
9. **Alternate domain names (CNAMEs)**: Add your domain (e.g., `portraitsbymarie.com`, `www.portraitsbymarie.com`)
10. **SSL Certificate**: Request a new certificate through AWS Certificate Manager
11. **Default root object**: `index.html`
12. Click **Create Distribution**

**Note**: CloudFront distribution takes 15-30 minutes to deploy globally.

---

## Step 4: Deploy Your Website

### Option A: Automated Deployment (Recommended)

1. Edit `scripts/deploy-aws.js` and update:
   ```javascript
   const S3_BUCKET = 'portraitsbymarie.com';  // Your bucket name
   const CLOUDFRONT_ID = 'E1234567890ABC';    // Your CloudFront ID (optional)
   ```

2. Run deployment:
   ```bash
   pnpm run deploy:aws
   ```

### Option B: Manual Deployment

```bash
# Build the site
pnpm run build

# Upload to S3
aws s3 sync out/ s3://portraitsbymarie.com/ --delete

# Invalidate CloudFront cache (optional, if configured)
aws cloudfront create-invalidation --distribution-id YOUR_CLOUDFRONT_ID --paths "/*"
```

---

## Step 5: Configure Your Domain (Route 53)

1. Go to AWS Console > Route 53
2. Click **Create hosted zone**
3. **Domain name**: `portraitsbymarie.com`
4. Click **Create hosted zone**
5. Note the **Name Servers** (you'll need these)

### Create DNS Records

Create two A records:

**Record 1: Root domain**
- **Record name**: (leave blank)
- **Record type**: A
- **Alias**: Yes
- **Route traffic to**: CloudFront distribution
- **Select your CloudFront distribution**
- Click **Create records**

**Record 2: www subdomain**
- **Record name**: www
- **Record type**: A
- **Alias**: Yes
- **Route traffic to**: CloudFront distribution
- **Select your CloudFront distribution**
- Click **Create records**

### Update Your Domain Registrar

Go to your domain registrar (GoDaddy, Namecheap, etc.) and update the nameservers to the Route 53 nameservers you noted earlier.

**DNS propagation takes 24-48 hours** but usually completes in 1-2 hours.

---

## Step 6: Request SSL Certificate (HTTPS)

1. Go to AWS Console > Certificate Manager
2. **IMPORTANT**: Make sure you're in **US East (N. Virginia)** region
3. Click **Request certificate**
4. Choose **Request a public certificate**
5. **Domain names**:
   - `portraitsbymarie.com`
   - `*.portraitsbymarie.com` (wildcard for subdomains)
6. **Validation method**: DNS validation
7. Click **Request**
8. Click **Create records in Route 53** (this auto-validates)
9. Wait 5-10 minutes for validation
10. Go back to CloudFront > Your distribution > **Edit**
11. **SSL Certificate**: Select your new certificate
12. Click **Save changes**

---

## Step 7: Verify Deployment

After DNS propagates (1-48 hours):

1. Visit `https://portraitsbymarie.com`
2. Verify SSL certificate is valid (padlock icon)
3. Test all pages work
4. Check images load properly
5. Test on mobile devices

---

## Updating Your Site

After making changes to your website:

```bash
# 1. Rebuild the site
pnpm run build

# 2. Deploy to AWS
pnpm run deploy:aws
```

That's it! Changes will be live in 1-2 minutes (plus CloudFront cache time).

---

## Troubleshooting

### Website shows 403 Forbidden
- Check S3 bucket policy is set correctly
- Verify bucket website hosting is enabled
- Make sure "Block all public access" is OFF

### Images don't load
- Check that images are in the `out/images/` folder after build
- Verify S3 sync uploaded the images folder
- Check browser console for errors

### Changes don't appear
- CloudFront caches content for 24 hours by default
- Run cache invalidation: `aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"`
- Or wait for cache to expire

### SSL Certificate Pending
- Make sure you created the certificate in **US East (N. Virginia)** region
- Verify DNS validation records were created in Route 53
- Wait 5-30 minutes for validation

---

## Monthly Costs Breakdown

**Free Tier (First 12 Months):**
- S3: 5GB storage free
- CloudFront: 1TB data transfer free
- Route 53: Not included in free tier

**After Free Tier:**
- S3 Storage (5GB): ~$0.50/month
- CloudFront (10GB/month): ~$1-2/month
- Route 53 Hosted Zone: $0.50/month
- **Total: $2-3/month**

---

## Need Help?

- AWS Support: https://console.aws.amazon.com/support
- AWS Documentation: https://docs.aws.amazon.com
- This guide: Ask me (Claude Code) for clarification!

---

**Your site is configured and ready to deploy! 🚀**
