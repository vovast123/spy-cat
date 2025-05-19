Spy Cats — Spy Cat Agency

**Spy Cats** is a simple web application where you can add, view, delete, and update **spy cats**. It was developed as part of a technical task and uses `Next.js`, `React`, `TypeScript`, and an external API for validating cat breeds.

---

## Features

-  Add a new spy cat (name, experience, breed, salary)
-  Breed validation via [TheCatAPI](https://thecatapi.com/)
-  Error message if breed does not exist
-  Display all added cats
-  Delete a cat
-  Update **only the salary** (as per the requirements)

---
---

## Tech Stack

### Frontend:
- **Next.js** — server-side rendering and routing
- **React** — component-based UI
- **TypeScript** — type safety
- **Axios** — API requests

### Backend:
- **FastAPI** — modern, fast Python API
- **Pydantic** — data validation
- **TheCatAPI** — external breed validation

---

##  Frontend Setup


git clone https://github.com/USERNAME/spy-cats.git

npm install

npm run dev

Frontend will be available at: http://localhost:3000

##  Backend  Setup (FastAPI)

Create and activate a virtual environment


python -m venv venv
source venv/bin/activate  
or  
venv\Scripts\activate
if use windows


pip install -r requirements.txt

uvicorn main:app --reload


API will be available at: http://localhost:8000
Swagger UI (API docs): http://localhost:8000/docs

Example API Request

POST /cats
{
  "name": "Whiskers",
  "experience_years": 5,
  "breed": "siberian",
  "salary": 1500
}


API Endpoints

Base URL: http://localhost:8000


POST /cats
Create a new spy cat.
Requires valid breed (checked via TheCatAPI).

Request Body:
{
  "name": "Whiskers",
  "experience_years": 5,
  "breed": "siberian",
  "salary": 1200
}

Response:
{
  "id": 1,
  "name": "Whiskers",
  "experience_years": 5,
  "breed": "siberian",
  "salary": 1200
}

If the breed is invalid:
{
  "detail": "Breed not found"
}


Get All Cats
GET /cats

Returns a list of all added spy cats.
[
  {
    "id": 1,
    "name": "Whiskers",
    "experience_years": 5,
    "breed": "siberian",
    "salary": 1200
  },
  ...
]

Delete a Cat
DELETE /cats/{cat_id}
Deletes the cat with the given ID.

DELETE /cats/1
{
  "detail": "Cat deleted"
}


Update Salary Only
PATCH /cats/{cat_id}/salary
Updates only the salary of a cat.

PATCH /cats/1/salary
{
  "salary": 1800
}

Response:
{
  "id": 1,
  "name": "Whiskers",
  "experience_years": 5,
  "breed": "siberian",
  "salary": 1800
}

API Docs (Swagger UI)
GET /docs
Interactive API documentation provided by FastAPI.