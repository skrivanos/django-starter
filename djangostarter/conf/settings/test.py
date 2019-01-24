# Setting for test performance

from .base import *

DEBUG = False


# Caches
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': ''
    }
}


# Passwords
PASSWORD_HASHERS = ['django.contrib.auth.hashers.MD5PasswordHasher']


# Email
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'


# Templates
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG
TEMPLATES[0]['OPTIONS']['loaders'] = [
    (
        'django.template.loaders.cached.Loader',
        [
            'django.template.loaders.filesystem.Loader',
            'django.template.loaders.app_directories.Loader',
        ],
    )
]
