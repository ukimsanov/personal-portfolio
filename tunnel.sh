#!/bin/bash

# Cloudflare Quick Tunnel for Next.js Dev Server
# Usage: ./tunnel.sh

echo "🚇 Starting Cloudflare Quick Tunnel..."
echo "Make sure your dev server is running on http://localhost:3000"
echo ""
echo "Starting tunnel..."
echo ""

cloudflared tunnel --url http://localhost:3000
