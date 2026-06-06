from fastapi import FastAPI
from app.routers import health
from app.routers import health, chat
from fastapi.middleware.cors import CORSMiddleware
from app.routers import (
    health,
    chat,
    session
)

from app.routers import (
    health,
    chat,
    session,
    messages
)

app = FastAPI(
    title="AI Chatbot API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    health.router,
    prefix="/health",
    tags=["Health"]
)

app.include_router(
    chat.router,
    prefix="/chat",
    tags=["Chat"]
)

app.include_router(
    session.router,
    prefix="/sessions",
    tags=["Sessions"]
)

app.include_router(
    messages.router,
    prefix="/messages",
    tags=["Messages"]
)