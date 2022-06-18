from typing import final

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


@final
class User(AbstractUser):
    """
    Custom user model.
    """

    example = models.CharField(_("Example"), blank=True, max_length=255)
