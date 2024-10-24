from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom user model extending Django's built-in user model
class CustomUser(AbstractUser):
    pass

# Model for uploaded files with tags and related files
class File(models.Model):
    FILE_TAGS = [
        ('character', 'Character'),
        ('location', 'Location'),
        ('item', 'Item'),
        ('event', 'Event'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # Use CustomUser here
    tag = models.CharField(max_length=20, choices=FILE_TAGS)
    name = models.CharField(max_length=100)
    description = models.TextField()
    related_files = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='relations')

    def __str__(self):
        return self.name

# Model specifically for file uploads with media handling
class FileUpload(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # Use CustomUser here
    file = models.FileField(upload_to='uploads/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.file.name}"
