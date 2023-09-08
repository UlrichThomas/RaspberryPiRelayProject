import RPi.GPIO as GPIO
import time
import json



Relay = [5, 6, 13, 16, 19, 20, 21, 26] #relay channels
activeRelays = []

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

for i in range(0,8):
    GPIO.setup(Relay[i], GPIO.OUT)
    GPIO.output(Relay[i], GPIO.HIGH)
relayNum = 0
newNum = 0
try:
    while True:
        
        # GPIO.output(Relay[relayNum], GPIO.LOW) #on
        while True:
            f = open('db.json')
            data = json.load(f)

            for i in range(0,8):
                if i in data['myArray']:
                    GPIO.output(Relay[i], GPIO.LOW)
                else:
                    GPIO.output(Relay[i], GPIO.HIGH)
                
            break


            """ time.sleep(0.2)
            GPIO.output(Relay[relayNum],GPIO.HIGH) #old relay off
            time.sleep(0.2)
            GPIO.output(Relay[newNum], GPIO.LOW) #turns on new relay
            relayNum = newNum """
        break
        
        
        
        #time.sleep(0.5)
        #GPIO.output(Relay[1], GPIO.HIGH) #turns off
        #time.sleep(0.5)
        


except:
    GPIO.cleanup()