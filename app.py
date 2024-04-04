
from flask import Flask, jsonify, render_template, send_file
from flask_cors import CORS  # Import CORS from flask_cors
import os

import sqlite3
import datetime

app = Flask(__name__)
CORS(app)

PICTURE_FOLDER = r'profile_pictures'

def calculate_age(birth_date):
    today = datetime.date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age

@app.route('/people', methods=['GET'])
def get_people():
    try:
        conn = sqlite3.connect('person_data.db')
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM person")
        rows = cursor.fetchall()
        conn.close()

        people = []
        for row in rows:
            birth_date = datetime.date(row['birth_date'], 1, 1)  # Assuming only year is stored
            age = calculate_age(birth_date)
            profile_pic_path = ""
            if row['male']:
                profile_pic_path = f"/profile_picture/m_{row['profile_pic']}.jpg"  # Male profile picture path
            else:
                profile_pic_path = f"/profile_picture/w_{row['profile_pic']}.jpg"  # Female profile picture path
            person_data = {
                'id': row['id'],
                'name': row['name'],
                'lastname': row['lastname'],
                'male': bool(row['male']),
                'yrke': row['yrke'],
                'profile_pic': profile_pic_path,
                'age': age,
                'birth_date': row['birth_date'],
                'telephone': row['telephone']
            }
            people.append(person_data)
        
        return jsonify(people)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/person')
def person():
    return render_template('person.html')

@app.route('/profile_picture/<path:filename>')
def get_profile_picture(filename):
    return send_file(os.path.join(PICTURE_FOLDER, filename))

if __name__ == '__main__':
    app.run(debug=True)
