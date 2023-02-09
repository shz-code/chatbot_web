from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('' , views.index),
    path('bot_response/' , views.bot_response)
]

urlpatterns += static(settings.STATIC_URL , document_root=settings.STATIC_ROOT)