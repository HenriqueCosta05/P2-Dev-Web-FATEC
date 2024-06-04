from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from crud import get_pokemon_by_name, create_pokemon, update_pokemon, delete_pokemon, get_pokemon_list
from models import AccessToken, Pokemon, User
from aiocache import cached
import aiohttp

router = APIRouter()

@cached(ttl=600)
async def get_pokemon_image(pokemon_name: str):
    url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status != 200:
                raise HTTPException(status_code=404, detail="Pokemon not found")
            pokemon = await response.json()
            return pokemon["sprites"]["front_default"]

@router.post("/pokemons")
async def create_new_pokemon(pokemon: Pokemon, current_user: AccessToken = Depends(get_current_user)):
    db_pokemon = await get_pokemon_by_name(pokemon.name)
    if db_pokemon:
        raise HTTPException(status_code=400, detail="Pokemon already registered")
    pokemon.image = await get_pokemon_image(pokemon.name.lower())
    if not pokemon.image:
        raise HTTPException(status_code=404, detail="Pokemon image not found")
    await create_pokemon(pokemon=pokemon)
    return {"msg": "Pokemon created successfully"}

@router.put("/pokemons/{name}")
async def update_existing_pokemon(name: str, pokemon: Pokemon, current_user: AccessToken = Depends(get_current_user)):
    db_pokemon = await get_pokemon_by_name(name)
    if not db_pokemon:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    pokemon.image = await get_pokemon_image(pokemon.name.lower())
    await update_pokemon(name, pokemon)
    return {"msg": "Pokemon updated successfully"}

@router.delete("/pokemons/{name}")
async def delete_existing_pokemon(name: str, current_user: AccessToken = Depends(get_current_user)):
    db_pokemon = await get_pokemon_by_name(name)
    if not db_pokemon:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    await delete_pokemon(name)
    return {"msg": "Pokemon deleted successfully"}

@router.get("/pokemon/{name}")
async def get_pokemon(name: str, current_user: AccessToken = Depends(get_current_user)):
    db_pokemon = await get_pokemon_by_name(name)
    if not db_pokemon:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return db_pokemon

@router.get("/pokemons")
async def get_all_pokemons(current_user: AccessToken = Depends(get_current_user)):
    pokemons = await get_pokemon_list()
    return pokemons