from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    Custom user model.
    """

    example = models.CharField(_("Example"), blank=True, max_length=255)
