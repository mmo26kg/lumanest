// Login Button
'use client';
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton() {

    const handleLogout = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();

        if (!error) {
            alert('Successfully logged out');
        } else {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
            Logout
        </button>
    );
}