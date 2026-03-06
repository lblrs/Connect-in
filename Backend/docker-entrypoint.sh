#!/bin/bash

composer install --no-interaction
php artisan key:generate --force

until php artisan migrate --force 2>/dev/null; do
    echo "En attente de MySQL..."
    sleep 3
done

php artisan storage:link --force
php artisan l5-swagger:generate
php artisan db:seed --force 2>/dev/null || true

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
