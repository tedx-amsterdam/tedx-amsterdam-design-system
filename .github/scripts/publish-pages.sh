#!/usr/bin/env bash
# Replaces one folder on the GitHub Pages branch with new files, or removes
# it when no source is given. The branch always holds a single commit: each
# run writes a fresh commit with the current folders and force pushes it,
# so old Storybook builds leave no history behind.
#
# Usage: publish-pages.sh <folder> [<source dir>]
# Runs inside a checkout whose origin can be pushed to.

set -euo pipefail

folder="$1"
source="${2:-}"
branch=gh-pages
work="$(mktemp -d)"

# The full ref: a bare name would also match branches ending in it.
git fetch --quiet --depth 1 origin "refs/heads/$branch"
git worktree add --quiet --detach "$work" FETCH_HEAD

rm -rf "${work:?}/${folder}"
if [[ -n "$source" ]]; then
  mkdir -p "$work/$folder"
  cp -R "$source"/. "$work/$folder/"
fi

git -C "$work" add --all
tree="$(git -C "$work" write-tree)"
commit="$(git -C "$work" \
  -c user.name="github-actions[bot]" \
  -c user.email="41898282+github-actions[bot]@users.noreply.github.com" \
  commit-tree "$tree" -m "Storybook previews")"
git push --quiet --force origin "$commit:refs/heads/$branch"
git worktree remove --force "$work"
