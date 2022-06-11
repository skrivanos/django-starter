from django.http import HttpRequest, HttpResponse
from django.views import View


class IndexView(View):
    """
    Index view.
    """

    def get(self, request: HttpRequest) -> HttpResponse:
        """
        Example route.
        """
        return HttpResponse("Hello World!")
