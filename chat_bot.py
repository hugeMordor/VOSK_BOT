# -*- coding: windows-1251 -*-
import voice
import app
import queue
import sounddevice as sd
import vosk
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

TRIGGERS = {'бот', 'крендель'}

q = queue.Queue()

model = vosk.Model('model_small')
device = sd.default.device = 1, 5
samplerate = int(sd.query_devices(device[0], 'input')['default_samplerate'])
print('Start:')

def callback(indata, frames, time, status):
    q.put(bytes(indata))

def recognize(data):
    trg = TRIGGERS.intersection(data.split())
    if not trg:
        return
    data = data.replace(list(trg)[0] + ' ', '', 1)
    print(data)
    answer = app.bot(data)
    print(answer)
    voice.speaker(answer)
    

def main():

    with sd.RawInputStream(samplerate=samplerate, blocksize = 16000, device=device[0], dtype='int16',
                                channels=1, callback=callback):
    
        rec = vosk.KaldiRecognizer(model, samplerate)
        while True:
            data = q.get()
            if rec.AcceptWaveform(data):
                data = json.loads(rec.Result())['text']
                recognize(data)

if __name__ == '__main__':
    main()
