import json
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import pytz
from datetime import datetime
import time

@method_decorator(csrf_exempt, name='dispatch')
class dowellclock(APIView):
    def post(self, request):
        timezone = request.data.get('timezone')
        timezonename = pytz.timezone(timezone)
        current_time = datetime.now(timezonename)
        time_only = current_time.strftime("%H:%M:%S")
        unixtime= int(time.mktime(current_time.timetuple()))
        dowellstarttime = "1609459200"
        dowelltime= int(unixtime)-int(dowellstarttime)
        return Response({'dowelltime':dowelltime, 'currenttime':time_only},status=status.HTTP_200_OK)
