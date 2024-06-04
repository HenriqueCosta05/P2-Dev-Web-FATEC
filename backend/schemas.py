from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class PokemonCreate(BaseModel):
    name: str
    type: str
    height: int
    weight: int
    address: str
