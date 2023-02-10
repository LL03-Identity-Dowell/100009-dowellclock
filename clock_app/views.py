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
        t2 = datetime.now(timezonename)
        unixtime= time.time()
        dowellstarttime = "1609459200"
        t1= int(unixtime)-int(dowellstarttime)
        return Response({'t1':t1, 'unixtime':unixtime,'t2':t2},status=status.HTTP_200_OK)
