from django.db import models
from django.utils.translation import gettext_lazy as _

class User(models.Model):
    name = models.CharField(_("Name"),max_length=100)

    class Meta:
        verbose_name_plural = "Users"
    
    def __str__(self):
        return f'{self.name}'
    

class Conversation(models.Model):
    user = models.ForeignKey(User,verbose_name=_("User"),on_delete=models.SET_NULL,null=True,blank=True)
    msg = models.TextField()

    class Meta:
        verbose_name_plural = "Conversations"
    
    def __str__(self):
        return f'{self.user} - {self.msg}'