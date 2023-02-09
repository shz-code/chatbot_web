from django.shortcuts import render
import json
from django.http import JsonResponse
from chatbot_model.response import chatbot

# Create your views here.
def index(request):
    return render(request, "index.html")


def bot_response(request):
    if request.method == "POST":
        data = json.loads(request.body)
        msg = data['msg']
        res = chatbot(msg)
    return JsonResponse({'msg': res}, safe=False)