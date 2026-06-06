from app.database.supabase import supabase

def create_session(title="New Chat"):

    result = (
        supabase
        .table("chat_sessions")
        .insert({
            "title": title
        })
        .execute()
    )

    return result.data[0]


def get_sessions():

    result = (
        supabase
        .table("chat_sessions")
        .select("*")
        .order("id")
        .execute()
    )

    return result.data