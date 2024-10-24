from django.db import models
from django.contrib.auth.models import User

class File(models.Model):
    FILE_TAGS = [
        ('character', 'Character'),
        ('location', 'Location'),
        ('item', 'Item'),
        ('event', 'Event'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tag = models.CharField(max_length=20, choices=FILE_TAGS)
    name = models.CharField(max_length=100)
    description = models.TextField()
    related_files = models.ManyToManyField('self', blank=True, related_name='relations')
