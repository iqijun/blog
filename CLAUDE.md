# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Hexo (v8.1.1), a fast, simple and powerful static site generator. The blog uses the Next theme (Pisces scheme) and is published at https://blog.full-stacker.com.

## Architecture

- **Static Site Generator**: Hexo converts Markdown posts into static HTML
- **Theme**: Next theme v8 (located in `themes/next/`)
- **Content**: Blog posts in `source/_posts/` (123+ posts), primarily in Chinese
- **Deployment**: CI/CD via GitHub Actions to external repo `iqijun/iqijun.github.io`
- **Configuration Split**:
  - `_config.yml`: Main Hexo configuration (site metadata, directories, deployment)
  - `_config.next.yml`: Next theme configuration (appearance, features, plugins)

## Common Commands

```bash
# Development server (runs on port 4000)
hexo server
# or: hexo s

# Generate static files to public/
hexo generate
# or: hexo g

# Create new post
hexo new "Post Title"
# Creates file in source/_posts/ with front matter from scaffolds/post.md

# Create new draft
hexo new draft "Draft Title"

# Clean generated files and cache
hexo clean

# Deploy (configured for git deployment)
hexo deploy
# or: hexo d

# Generate and deploy
hexo g -d
```

## Content Structure

Posts use YAML front matter:
```yaml
---
title: Post Title
date: YYYY-MM-DD HH:mm:ss
updated: YYYY-MM-DD HH:mm:ss  # optional
url: /archives/XXX  # optional custom URL
categories: Category Name
tags: tag1 | tag2 | tag3
---
```

Categories and tags are pipe-separated (`|`) in existing posts.

## Deployment

The blog auto-deploys on pushes to `main` or `master`:
1. GitHub Actions runs `npm install` and `hexo generate`
2. Generated `public/` directory is pushed to `iqijun/iqijun.github.io` (master branch)
3. Requires `DEPLOY_KEY` secret configured in GitHub

To deploy manually: `hexo generate && hexo deploy`

## Theme Customization

The Next theme is checked in as a regular directory (not a git submodule) at `themes/next/`. Theme configuration lives in `_config.next.yml` at the root, not in the theme directory itself.

Current theme settings:
- Scheme: Pisces
- Dark mode: enabled
- Search: hexo-generator-searchdb
- Word counter: enabled

## Key Plugins

- `hexo-deployer-git`: Git-based deployment
- `hexo-generator-searchdb`: Local search functionality
- `hexo-word-counter`: Post word count and reading time
- `hexo-renderer-marked`: Markdown rendering
- `hexo-server`: Local development server
