#!/bin/sh
set -eu

AUTH_ENABLED="${BASIC_AUTH_ENABLED:-false}"
CONF_TEMPLATE="/etc/nginx/templates/default.conf"
CONF_OUT="/etc/nginx/conf.d/default.conf"
HTPASSWD_FILE="/etc/nginx/.htpasswd"

if [ "$AUTH_ENABLED" = "true" ]; then
  if [ ! -f "$HTPASSWD_FILE" ]; then
    echo "[SimuSat] BASIC_AUTH_ENABLED=true, mas $HTPASSWD_FILE não foi encontrado." >&2
    echo "[SimuSat] Monte um arquivo .htpasswd no container para habilitar autenticação." >&2
    exit 1
  fi

  AUTH_LINES="auth_basic \"SimuSat MVP - acesso privado\";\n        auth_basic_user_file $HTPASSWD_FILE;"
else
  AUTH_LINES="# autenticação básica desabilitada para este ambiente"
fi

awk -v auth="$AUTH_LINES" '{gsub(/__AUTH_DIRECTIVES__/, auth)}1' "$CONF_TEMPLATE" > "$CONF_OUT"

exec nginx -g 'daemon off;'
