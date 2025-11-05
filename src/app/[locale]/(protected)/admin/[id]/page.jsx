import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const DetailAdminPage = async ({ params }) => {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { data: { session } } = await supabase.auth.getSession();
    // console.log('Debug :', session);

    const { id } = await params;
    console.log('Debug params :', await params);

    return (
        <div>
            <h1>Detail Admin Page</h1>
            <p>Admin ID: {id}</p>
        </div>
    );
};
export default DetailAdminPage;