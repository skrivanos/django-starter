# Import all models. Not using an automatic import here since we want IDE
# auto-completion etc. to work properly.

from .user import User

__all__ = [  # noqa: WPS410
    "User",
]
