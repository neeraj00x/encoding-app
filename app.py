from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def encode_string(s):
    encoded_str = ''  
    for index, char in enumerate(s):
        if index%2 ==0: 
            encoded_char = chr(ord(char) + 2)
        else:
            encoded_char = chr(ord(char) - 3)
            
        encoded_str += encoded_char  
    return encoded_str

def decode_string(s):
    decoded_str = '' 
    for index, char in enumerate(s):
        if index%2 ==0: 
            decoded_char = chr(ord(char) - 2)
        else:
            decoded_char = chr(ord(char) + 3)
        
        decoded_str += decoded_char 
    return decoded_str


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    input_string = request.json['input_string']
    action = request.json['action']
    
    if action == 'encode':
        result = encode_string(input_string.strip())
    elif action == 'decode':
        result = decode_string(input_string.strip())
    else:
        result = "Invalid action."

    return jsonify({'output_string': result})


if __name__ == '__main__':
    app.run()
