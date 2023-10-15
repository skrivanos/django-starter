# Setting for test performance

from .base import *


DEBUG = False


# Caches
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "",
    },
}


# Passwords
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]


# Email
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"
