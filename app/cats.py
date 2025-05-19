from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete

from app.database import SessionLocal
from app.models import SpyCat
from app.schemas import SpyCatCreate, SpyCatOut, SpyCatUpdate
from app.cat_api import is_valid_breed

router = APIRouter(prefix="/cats", tags=["Spy Cats"])

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.post("/", response_model=SpyCatOut)
async def create_cat(cat: SpyCatCreate, db: AsyncSession = Depends(get_db)):
    if not await is_valid_breed(cat.breed):
        raise HTTPException(status_code=400, detail="Invalid breed")

    new_cat = SpyCat(**cat.dict())
    db.add(new_cat)
    await db.commit()
    await db.refresh(new_cat)
    return new_cat

@router.get("/", response_model=list[SpyCatOut])
async def list_cats(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SpyCat))
    return result.scalars().all()

@router.get("/{cat_id}", response_model=SpyCatOut)
async def get_cat(cat_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.get(SpyCat, cat_id)
    if not result:
        raise HTTPException(status_code=404, detail="Cat not found")
    return result

@router.patch("/{cat_id}", response_model=SpyCatOut)
async def update_cat_salary(cat_id: int, data: SpyCatUpdate, db: AsyncSession = Depends(get_db)):
    cat = await db.get(SpyCat, cat_id)
    if not cat:
        raise HTTPException(status_code=404, detail="Cat not found")

    cat.salary = data.salary
    await db.commit()
    await db.refresh(cat)
    return cat

@router.delete("/{cat_id}")
async def delete_cat(cat_id: int, db: AsyncSession = Depends(get_db)):
    cat = await db.get(SpyCat, cat_id)
    if not cat:
        raise HTTPException(status_code=404, detail="Cat not found")

    await db.delete(cat)
    await db.commit()
    return {"detail": "Cat deleted"}
