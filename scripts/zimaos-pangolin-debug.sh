#!/usr/bin/env sh
set -u

DOMAIN="https://sws.guenlab.de"

echo "========================================="
echo " Stickwerk-Studio Pangolin/ZimaOS Debug"
echo "========================================="

echo ""
echo "=== Docker Containers ==="
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}"

echo ""
echo "=== ZimaOS IP ==="
ZIMA_IP=$(hostname -I | awk '{print $1}')
echo "ZimaOS-IP: $ZIMA_IP"

echo ""
echo "=== App local test ==="
curl -I http://127.0.0.1:3034 2>/dev/null || echo "FAILED: App not reachable on localhost"

echo ""
echo "=== App ZimaOS-IP test ==="
curl -I http://$ZIMA_IP:3034 2>/dev/null || echo "FAILED: App not reachable on ZimaOS-IP"

echo ""
echo "=== Healthcheck via ZimaOS-IP ==="
curl -s http://$ZIMA_IP:3034/api/health 2>/dev/null || echo "FAILED: Healthcheck failed"

echo ""
echo "=== App logs (last 50 lines) ==="
docker logs --tail=50 stickwerk-app 2>&1 || echo "No stickwerk-app logs"

echo ""
echo "=== Newt logs (last 50 lines) ==="
docker logs --tail=50 newt 2>&1 || echo "No newt container found"

echo ""
echo "=== Expected Pangolin Target ==="
echo "http://$ZIMA_IP:3034"

echo ""
echo "=== External domain test ==="
curl -I $DOMAIN 2>/dev/null || echo "FAILED: External domain not reachable"
curl -s $DOMAIN/api/health 2>/dev/null || echo "FAILED: External healthcheck failed"

echo ""
echo "========================================="
echo " Debug complete"
echo "========================================="
