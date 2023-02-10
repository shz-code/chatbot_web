from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('' , views.index, name="index"),
    path('bot_response/' , views.bot_response, name="response"),
    path('chat_download/' , views.chat_download, name="download")
]

urlpatterns += static(settings.STATIC_URL , document_root=settings.STATIC_ROOT)

handler404 = views.handle_page_not_found