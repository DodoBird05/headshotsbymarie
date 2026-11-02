/**
 * Date (YYYY-MM-DD) of the last COMMIT that touched a file, or null if the
 * file has never been committed (or git is unavailable).
 *
 * Shared by scripts/generate-sitemap.js (<lastmod>) and src/lib/blogPostData.ts
 * (blog dateModified), so the sitemap and the Article schema can never disagree
 * about when a post last changed. Committed dates only, never mtime: the deploy
 * workflow commits before deploy:aws, so the committed date is what ships.
 */
const { execFileSync } = require('child_process');

// `root` is the repo root that `file` is relative to. Callers pass it because
// __dirname is not reliable here: inside the Next build this module is
// bundled, and __dirname no longer points at scripts/lib/.
function lastCommitDate(file, root) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%ad', '--date=short', '--', file], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

module.exports = { lastCommitDate };
