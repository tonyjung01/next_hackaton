# game/views.py

from django.shortcuts import render

def index(request):
    return render(request, 'App/index.html')
