from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
import os

MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.pokemondb

users_collection = database.get_collection("users")
pokemon_collection = database.get_collection("pokemons")

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "password": user["password"],
    }

def pokemon_helper(pokemon) -> dict:
    return {
        "id": str(pokemon["_id"]),
        "name": pokemon["name"],
        "type": pokemon["type"],
        "height": pokemon["height"],
        "weight": pokemon["weight"],
        "address": pokemon["address"],
    }
