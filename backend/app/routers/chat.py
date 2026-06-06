from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import get_ai_response
from app.services.message_service import save_message

router = APIRouter()

@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest):

    response = get_ai_response(
        request.message
    )
    
    save_message(
    request.session_id,
    "user",
    request.message
)

    save_message(
    request.session_id,
    "assistant",
    response
)

    return ChatResponse(
        response=response
    )
    
 