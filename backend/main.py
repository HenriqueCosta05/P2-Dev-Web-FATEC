from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, cep, pokemon
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(pokemon.router)
app.include_router(cep.router)
