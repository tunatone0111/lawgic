from app import create_app
from flask_cors import CORS

app = create_app()


if __name__ == "__main__":
    app.config['JSON_AS_ASCII'] = False
    CORS(app)
    app.run()
