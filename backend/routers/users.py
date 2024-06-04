from fastapi import APIRouter, Depends, HTTPException
from auth import get_password_hash, create_access_token, authenticate_user
from schemas import UserCreate, UserLogin
from database import users_collection

router = APIRouter()

@router.post("/register")
async def register(user: UserCreate):
    user_in_db = await users_collection.find_one({"username": user.username})
    if user_in_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["hashed_password"] = hashed_password
    del user_dict["password"]
    await users_collection.insert_one(user_dict)
    return {"detail": "User created successfully"}

@router.post("/login")
async def login(form_data: UserLogin):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    
    return {"access_token": access_token, "token_type": "bearer", "detail": "Login successful"}
