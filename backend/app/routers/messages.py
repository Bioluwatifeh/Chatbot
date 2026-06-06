from fastapi import APIRouter
from app.services.message_service import get_messages

router = APIRouter()

@router.get("/{session_id}")
def fetch_messages(session_id: int):

    return get_messages(session_id)