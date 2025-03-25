#!/bin/bash
REPOROOT="lionel38190"
ARCHS=("amd64:linux/amd64" "arm64:linux/arm64/v8")
for arch in "${ARCHS[@]}"; do
  IFS=':' read -r arch_name platform <<< "$arch"
  
  # per-arch repos
  VERSION_TAG="$1"
  JARVISWEB="$REPOROOT/jarvisweb-$arch_name"
  JARVISAPI="$REPOROOT/jarvisapi-$arch_name"

  docker build -t "$JARVISWEB:$VERSION_TAG" -t "$JARVISWEB:latest" --platform $platform -f packages/web/Dockerfile  .
  docker build -t "$JARVISAPI:$VERSION_TAG" -t "$JARVISAPI:latest" --platform $platform -f packages/api/Dockerfile  .
  docker push "$JARVISWEB:$VERSION_TAG"
  docker push "$JARVISWEB:latest"
  docker push "$JARVISAPI:$VERSION_TAG"
  docker push "$JARVISAPI:latest"
  
done