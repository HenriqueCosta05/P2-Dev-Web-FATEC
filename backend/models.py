from typing import Optional
from pydantic import BaseModel

class Pokemon(BaseModel):
    name: str
    image: Optional[str] = None
    cep: str
    endereco: str
    bairro: str
    cidade: str
    estado: str
    numero: str
    complemento: str

class User(BaseModel):
    username: str
    hashed_password: str
    
class AccessToken(BaseModel):
    access_token: str
