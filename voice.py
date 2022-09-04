import pyttsx3

engine = pyttsx3.init()
engine.setProperty('rate', 180)

def speaker(text):
    engine.save_to_file(text, "python.mp3")
    engine.runAndWait()