import httpx
import os

THE_CAT_API_URL = "https://api.thecatapi.com/v1/breeds"
API_KEY = os.getenv("CAT_API_KEY")  # если нужен ключ

async def is_valid_breed(breed_name: str) -> bool:
    headers = {}
    if API_KEY:
        headers["x-api-key"] = API_KEY

    async with httpx.AsyncClient() as client:
        response = await client.get(THE_CAT_API_URL, headers=headers)
        response.raise_for_status()

        breeds = response.json()
        breed_names = [b["name"].lower() for b in breeds]
        return breed_name.lower() in breed_names


