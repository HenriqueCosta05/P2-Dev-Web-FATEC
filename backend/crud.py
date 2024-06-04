from database import database
from models import User, Pokemon

async def create_user(user: User):
    await database["users"].insert_one(user.dict())

async def get_pokemon_list():
    pokemons = await database["pokemons"].find().to_list(1000)
    return [Pokemon.parse_obj(pokemon) for pokemon in pokemons]

async def get_pokemon_by_name(name: str):
    return await database["pokemons"].find_one({"name": name}, {"_id": 0})

async def create_pokemon(pokemon: Pokemon):
    await database["pokemons"].insert_one(pokemon.dict())

async def update_pokemon(name: str, pokemon: Pokemon):
    await database["pokemons"].update_one({"name": name}, {"$set": pokemon.dict()})

async def delete_pokemon(name: str):
    await database["pokemons"].delete_one({"name": name})
