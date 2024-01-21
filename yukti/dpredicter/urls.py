from django.urls import path,include
from dpredicter import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.indre,name='peer'),
    path('about', views.about,name='index'),
]
