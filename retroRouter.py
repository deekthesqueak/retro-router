#!/usr/bin/env python3
import serial
import sys
import time
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

hdmiMatrix = serial.Serial('/dev/ttyUSB0', 19200)
eightByOne = serial.Serial('/dev/ttyUSB1', 9600)
extronBox  = serial.Serial('/dev/ttyUSB2', 9600)
plasmaTv   = serial.Serial('/dev/ttyUSB3', 9600)

# HDMI 4x4 Matrix
# https://www.monoprice.com/product?c_id=101&cp_id=10113&cs_id=1011310&p_id=15378
# Make: Monoprice
# Model: 
def matrixInputOutput(input: int, output: int):
    commands = [0xa5, 0x5b, 0x02, 0x03, input, 0x00, output, 0x00, 0x00, 0x00, 0x00, 0x00]
    checksum = 0x100 - 0x05 - input - output
    commands.append(checksum)

    return bytes(commands)

def matrixBeep(beep):
    beepCode =  0x0f if beep else 0xf0
    commands = [0xa5, 0x5b, 0x06, 0x01, beepCode, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
    checksum = 0x100 - 0x07 - beepCode
    commands.append(checksum)

    return bytes(commands)

# HDMI 8x1 Switch
# https://www.monoprice.com/product?c_id=101&cp_id=10110&cs_id=1011002&p_id=4067&seq=1&format=2
# Make: Monoprice
# Model: HRM-2218F
def setSwitchOutput(input: int):
    commands = [0x01, 0x01, 0x01, input]

    return bytes(commands)

# Analog Video Matrix
# Make: Extron
# Model: Crosspoint 450
def extronInputOutput(input: int, output: int):
    commands = "%d*%d!" %(input, output)

    return bytes(commands, 'utf-8')

# TV
# Make: Panasonic
# Model: TC-P65VT30
def tvCommand(cmd: str):
    commands = [0x02]
    commands += cmd.encode('utf-8')
    commands += [0x03]

    return bytes(commands)

@app.route('/tv/<cmd>', methods=['GET'])
def tv(cmd):
    sequence = tvCommand(cmd.upper())
    plasmaTv.write(sequence)

    return jsonify(success = True)

@app.route('/extron/<int:input>/<int:output>', methods=['GET'])
def extron(input, output):
    sequence = extronInputOutput(input, output)
    extronBox.write(sequence)

    return jsonify(success = True)

@app.route('/hdmi/<int:input>', methods=['GET'])
def hdmi(input):
    sequence = setSwitchOutput(input)
    eightByOne.write(sequence)

    return jsonify(success = True)


@app.route('/matrix/<int:input>/<int:output>', methods=['GET'])
def matrix(input, output):
    sequence = matrixInputOutput(input, output)
    hdmiMatrix.write(sequence)

    return jsonify(success = True)

@app.route('/matrix/beep/<state>', methods=['GET'])
def beep(state):
    if (state == 'on'):
        sequence = matrixBeep(True)
    if (state == 'off'):
        sequence = matrixBeep(False)

    hdmiMatrix.write(sequence)

    return jsonify(success = True)

@app.route('/ossc/component', methods=['GET'])
def osscComponent():
    subprocess.call(["irsend", "SEND_ONCE", "ossc", "2"])

    return jsonify(success = True)

@app.route('/ossc/vga', methods=['GET'])
def osscVga():
    subprocess.call(["irsend", "SEND_ONCE", "ossc", "3"])

    return jsonify(success = True)

if __name__  == '__main__':
    app.run()