from django.shortcuts import render
import json
from django.http import JsonResponse, HttpResponse
from chatbot_model.response import chatbot
from conversation.models import User, Conversation

from pathlib import Path
import os
BASE_DIR = Path(__file__).resolve().parent.parent
file_path = BASE_DIR / "chatbot_web/download.txt"

def handle_page_not_found(request, exception):
    return render(request, "404.html")

# Create your views here.
def index(request):
    return render(request, "index.html")

def chat_download(request):
    if not request.user.is_authenticated:
        conversations = Conversation.objects.all()
        if os.path.exists(file_path):
            os.remove(file_path)
        
        with open(file_path, 'w+') as file:
            for con in conversations:
                file.write(f'{con.msg} \n')
        
        content = open(file_path).read()
        return HttpResponse(content, content_type='text/plain')
    return render(request, "no_permission.html")

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