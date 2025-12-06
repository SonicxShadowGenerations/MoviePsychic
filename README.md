Movie Psychic

Movie Psychic is a full-stack movie discovery and recommendation project built with a React/Vite frontend and a Django REST API backend. It integrates with the TMDB API to retrieve movie data, generate randomized card sets, and provide real movie recommendations based on user selections.

Features
Card Selection Interface

Displays five randomly selected movies using real TMDB data.

Cards can be hovered to flip and show more details.

Clicking a card adds it to the user’s “hand.”

Search and Swap

Search bar allows searching for specific movies.

Search results replace one randomly chosen card in the card arc.

Recommendation Cycle

After selecting five cards, the system fetches recommendations using TMDB’s official recommendation endpoint.

Recommended movies appear in a separate panel.

Clicking a recommendation accepts it and starts a new cycle.

Accepted History

Accepted recommendations are saved to a persistent history panel on the right side of the interface.
Backend Setup (Django)

Navigate to the backend folder:

cd APILayer


Create and activate a virtual environment:

python -m venv venv
venv\Scripts\activate


Install dependencies:

pip install -r requirements.txt


Set the TMDB API key in PowerShell:

setx TMDB_API_KEY "YOUR_API_KEY_HERE"


Verify:

echo $Env:TMDB_API_KEY


Run migrations:

python manage.py migrate


Start the backend server:

python manage.py runserver


Backend will be available at:

http://127.0.0.1:8000/api/

Frontend Setup (React + Vite)

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the Vite development server:

npm run dev


Frontend will be available at:

http://localhost:5173/

API Endpoints
Random Movies
GET /api/random/

Movie Search
GET /api/search/?q=<query>

Store Movie
POST /api/store/<tmdb_id>/

Rank Movies
POST /api/rank/
Body:
{ "ids": [id1, id2, ...] }

Recommendations
POST /api/recommend/
Body:
{ "ids": [id1, id2, ...] }

Running the Full Application

Start the backend:

python manage.py runserver


Start the frontend:

npm run dev


Open the browser:

http://localhost:5173/


A functioning interface should appear, showing:

the orb

hands

card arc

selected hand

recommendation panel

accepted history

Environment Variables

Required:

TMDB_API_KEY=<your TMDB key>


Ensure it is set before running the backend.
