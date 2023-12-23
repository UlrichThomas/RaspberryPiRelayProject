from flask import Flask, render_template, request

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/button_clicked/<button_id>', methods=['POST'])
def button_clicked(button_id):
    print(f'button {button_id} was pressed')
    return {'status':'success'}, 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')