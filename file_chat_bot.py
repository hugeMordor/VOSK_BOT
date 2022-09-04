from vosk import Model, KaldiRecognizer
import sys
import json
import os
import app
import voice

TRIGGERS = {'бот', 'крендель'}

def recognize(data):
    trg = TRIGGERS.intersection(data.split())
    if not trg:
        return
    data = data.replace(list(trg)[0] + ' ', '', 1)
    print(data)
    answer = app.bot(data)
    print(answer)
    voice.speaker(answer)

os.system("sox -t raw -r 16000 -b 16 -c 1 -L -e signed-integer output.raw output.wav speed 2")

model = Model("model_small")

# Large vocabulary free form recognition
rec = KaldiRecognizer(model, 16000)

# You can also specify the possible word list
#rec = KaldiRecognizer(model, 16000, "zero oh one two three four five six seven eight nine")

wf = open("output.wav", "rb")
wf.read(44) # skip header

while True:
    data = wf.read(4000)
    if len(data) == 0:
        break
    if rec.AcceptWaveform(data):
        res = json.loads(rec.Result())['text']
        recognize(res)

