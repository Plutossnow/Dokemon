from fastapi import APIRouter
from model.json import JsonSelect

router = APIRouter()
js_map = JsonSelect('map')
js_npc = JsonSelect('npc')
js_dokemon = JsonSelect('dokemon')


@router.get('/map')
def get_map(mid: int):
    m = js_map.get_map(mid)
    m['npc_name'] = js_npc.get_npc(int(m['npc']))['name']
    return m


@router.get('/npc')
def get_npc(nid: int):
    return js_npc.get_npc(nid)


@router.get('/dokemon')
def get_dokemon(did: int):
    return js_dokemon.get_dokemon(did)
