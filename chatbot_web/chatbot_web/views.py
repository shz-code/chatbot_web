from django.shortcuts import render
import json
from django.http import JsonResponse
from chatbot_model.response import chatbot
from conversation.models import User, Conversation

# Create your views here.
def index(request):
    return render(request, "index.html")


def bot_response(request):
    if request.method == "POST":
        data = json.loads(request.body)
        msg = data['msg']
        username = data['username']
        user , created = User.objects.get_or_create(name=username)
        Conversation.objects.create(
            user = user,
            msg = msg
        )
        res = chatbot(msg)
    return JsonResponse({'msg': res}, safe=False)