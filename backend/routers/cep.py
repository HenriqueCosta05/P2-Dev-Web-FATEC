from fastapi import APIRouter, HTTPException
from aiocache import cached
import aiohttp

router = APIRouter()

@cached(ttl=600)
async def get_address_from_api(cep: str):
    url = f"https://viacep.com.br/ws/{cep}/json/"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status != 200:
                raise HTTPException(status_code=404, detail="CEP not found")
            return await response.json()


@router.get("/cep/{cep}")
async def get_address(cep: str):
    return await get_address_from_api(cep)


