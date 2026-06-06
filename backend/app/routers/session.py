from fastapi import APIRouter
from app.services.session_service import (
    create_session,
    get_sessions
)

router = APIRouter()

@router.post("/")
def new_session():
    return create_session()

@router.get("/")
def fetch_sessions():
    return get_sessions()