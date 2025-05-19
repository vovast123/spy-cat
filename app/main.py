from fastapi import FastAPI
from app.cats import router as cats_router
from app.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Spy Cat API")

app.include_router(cats_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # или ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)