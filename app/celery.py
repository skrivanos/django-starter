import os

from typing import TYPE_CHECKING, Any

from celery import Celery, Task


# Monkey-patching for celery-types
# https://github.com/sbdchd/celery-types
Task.__class_getitem__ = classmethod(lambda cls, *args, **kwargs: cls)  # type: ignore[attr-defined]

if TYPE_CHECKING:
    AnyTask = Task[Any, Any]  # type: ignore
else:
    AnyTask = Task

# set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings.local")

app = Celery("proj")

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object("django.conf:settings", namespace="CELERY")

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self: AnyTask) -> None:  # type: ignore[misc]
    """
    Example task that prints the request.
    """
    print("Request: {0!r}".format(self.request))  # noqa: WPS421
