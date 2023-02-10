from django.urls import path
from clock_app.views import *

urlpatterns = [
    path('dowellclock/',dowellclock.as_view()),
]