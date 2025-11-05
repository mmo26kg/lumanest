// Login
import { createClient } from "@/utils/supabase/client";

export default function LoginButton() {

    const handleLogin = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email: 'hongducmmo@gmail.com',
            password: 'Spiderman97@',
        });

        if (!error) {
            alert('Successfully logged in');
        } else {
            console.error('Error logging in:', error.message);
        }
    };

    return (
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
            Login
        </button>
    );
}