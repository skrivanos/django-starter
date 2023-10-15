from iptools import IpRangeList

from .base import *


DEBUG = True

ALLOWED_HOSTS = (
    "localhost",
    "127.0.0.1",
    "0.0.0.0",  # noqa: S104
    "[::1]",
)


# Caches
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "",
    },
}

# Debug toolbar
INSTALLED_APPS += ["debug_toolbar", "extra_checks"]
MIDDLEWARE = [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "querycount.middleware.QueryCountMiddleware",
    *MIDDLEWARE,
]
DEBUG_TOOLBAR_CONFIG = {
    "DISABLE_PANELS": [
        "debug_toolbar.panels.redirects.RedirectsPanel",
    ],
    "SHOW_TEMPLATE_CONTEXT": True,
}
INTERNAL_IPS = IpRangeList(
    "127.0.0.1",
    "10.0.2.2",
    "192.168/16",
)


# Celery
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True


# Django-extensions
RUNSERVERPLUS_SERVER_ADDRESS_PORT = "0.0.0.0:8000"
