import json 
from channels.generic.websocket import WebsocketConsumer
class chat(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send(text_data=json.dumps({
            'type':'conexion establecida',
            'message':'conectado'
        }))