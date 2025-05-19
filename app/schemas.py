from pydantic import BaseModel, Field

class SpyCatBase(BaseModel):
    name: str
    experience_years: int = Field(..., ge=0)
    breed: str
    salary: float = Field(..., ge=0)

class SpyCatCreate(SpyCatBase):
    pass

class SpyCatUpdate(BaseModel):
    salary: float = Field(..., ge=0)

class SpyCatOut(SpyCatBase):
    id: int

    class Config:
        orm_mode = True
