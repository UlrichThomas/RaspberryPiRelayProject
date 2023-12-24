from flask import Flask, render_template, request
import RPi.GPIO as GPIO

app = Flask(__name__, static_url_path='/static')

Relay = [5, 6, 13, 16, 19, 20, 21, 26] #relay channels
activeRelays = []
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

for i in range(0,8):
    GPIO.setup(Relay[i], GPIO.OUT)
    GPIO.output(Relay[i], GPIO.HIGH)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/button_clicked/<button_id>', methods=['POST'])
def button_clicked(button_id):
    print(f'button {button_id} was pressed')

    #on/off logic
    if button_id in activeRelays:
        GPIO.output(Relay[button_id-1], GPIO.LOW)
        activeRelays.remove(button_id)
    else:
        GPIO.output(Relay[i], GPIO.HIGH)
        activeRelays.append(button_id)

    return {'status':'success'}, 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')