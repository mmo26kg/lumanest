'use client';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();

        // Kiểm tra session trước khi logout
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            alert('Bạn chưa đăng nhập');
            return;
        }

        const { error } = await supabase.auth.signOut();

        if (!error) {
            alert('Đăng xuất thành công');
            router.push('/'); // Redirect về trang chủ
            router.refresh(); // Refresh để cập nhật UI
        } else {
            console.error('Lỗi đăng xuất:', error.message);
            alert('Có lỗi xảy ra khi đăng xuất');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Đăng xuất
        </button>
    );
}