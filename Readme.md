```markdown
# Project Name

This project is a demonstration of creating a random database for a website, downloading profile pictures, and running a Flask app to display the data.

## Installation

To install the necessary libraries and dependencies, run the following commands:

```python
import subprocess

def install_dependencies(requirements_file):
    try:
        # Run pip command to install dependencies from requirements file
        subprocess.check_call(['pip', 'install', '-r', requirements_file])
        print("Dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print("Error occurred while installing dependencies:", e)

# Specify the path to your requirements.txt file
requirements_file = 'requirements.txt'

# Call the function to install dependencies
install_dependencies(requirements_file)
```

## Usage

1. **Download Profile Pictures**: The script downloads profile pictures of random people. You can run this script by executing the following code:

```python
# Download men images
download_images(m_url_prefix, "m")

# Download women images
download_images(w_url_prefix, "w")
```

2. **Create Random Database**: This script creates a SQLite database with random sample data. You can run this script by executing the following code:

```python
# Connect to SQLite database (creates a new database if not exists)
conn = sqlite3.connect('person_data.db', detect_types=sqlite3.PARSE_DECLTYPES|sqlite3.PARSE_COLNAMES)

# Insert sample data
for _ in range(198):  # Inserting 10 sample records
    ...
    
# Commit changes and close the connection
conn.commit()
conn.close()

print("Database created!")
```

3. **Run Flask App**: Run the Flask app by executing `app.py` in your module.

4. **Open HTML Files**: Open `index.html` located in the `html` folder.

5. **Coffee Break**: Take a well-deserved break!

## Credits

This project was created by Lukas Zetterberg.

