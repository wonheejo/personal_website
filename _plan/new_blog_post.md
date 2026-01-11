# Adding a New Blog Post

## 1. Create a new `.mdx` file

Create a new file in `content/posts/`:

```
content/posts/my-new-post.mdx
```

## 2. Write your post

Use this format:

```mdx
---
title: "Your Post Title"
date: "2025-01-12"
description: "Brief description for previews"
---

Your content here in Markdown...

## Headings work

- Lists work
- **Bold** and *italic* too

```code blocks too```
```

## 3. Push to GitHub

```bash
git add .
git commit -m "Add new post: Your Post Title"
git push
```

## 4. Done!

Vercel auto-deploys - your site updates in ~30 seconds.

---

## Quick Reference

| Action | Command |
|--------|---------|
| New post | Create `.mdx` file in `content/posts/` |
| Edit site | Modify files in `app/` or `components/` |
| Deploy | `git add . && git commit -m "message" && git push` |

No manual deployment needed. Push to GitHub and Vercel handles the rest.
