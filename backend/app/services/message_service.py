from app.database.supabase import supabase

def save_message(session_id, role, content):

    try:

        result = (
            supabase
            .table("messages")
            .insert({
                "session_id": session_id,
                "role": role,
                "content": content
            })
            .execute()
        )

        return result

    except Exception as e:

        print("Database Error:", e)
        
def get_messages(session_id):

    result = (
        supabase
        .table("messages")
        .select("*")
        .eq("session_id", session_id)
        .order("created_at")
        .execute()
    )

    return result.data

def get_messages(session_id):

    result = (
        supabase
        .table("messages")
        .select("*")
        .eq("session_id", session_id)
        .order("id")
        .execute()
    )

    return result.data