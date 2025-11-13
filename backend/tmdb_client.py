API_KEY = "19f7be89c64787879e83cc5f17232862"

import requests

url = "https://api.themoviedb.org/3/authentication"

headers = {"accept": "application/json"}

response = requests.get(url, headers=headers)

print(response.text)