from django.http import HttpResponse
from django.views import View


class IndexView(View):
    """
    Index view.
    """

    def get(self, request, *args, **kwargs) -> HttpResponse:
        """
        Example route.
        """
        return HttpResponse("Hello World!")
