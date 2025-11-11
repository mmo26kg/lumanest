'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const DataContext = createContext();

export default function DataProvider({ children }) {
    const [data, setData] = useState([]); // Ví dụ: danh sách items
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = createClient();

    // Load dữ liệu một lần khi app khởi động
    useEffect(() => {
        fetchData();
        console.log('Debug product data :', data);

        // Realtime subscription (tự động cập nhật khi có thay đổi)
        const channel = supabase
            .channel('lumanest:product')
            .on('postgres_changes', { event: '*', schema: 'lumanest', table: 'product' }, (payload) => {
                handleRealtimeChange(payload);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('product')
                .select('*')
                .schema('lumanest');
            // .order('created_at', { ascending: false });


            if (error) throw error;
            setData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Xử lý realtime: insert, update, delete
    const handleRealtimeChange = (payload) => {
        setData((current) => {
            switch (payload.eventType) {
                case 'INSERT':
                    return [payload.new, ...current];
                case 'UPDATE':
                    return current.map((item) =>
                        item.id === payload.new.id ? payload.new : item
                    );
                case 'DELETE':
                    return current.filter((item) => item.id !== payload.old.id);
                default:
                    return current;
            }
        });
    };

    // CRUD operations (gọi từ component)
    const createItem = async (newItem) => {
        const { data, error } = await supabase
            .from('product')
            .insert([newItem])
            .select();
        if (error) throw error;
        return data[0];
    };

    const updateItem = async (id, updates) => {
        const { data, error } = await supabase
            .from('product')
            .update(updates)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    };

    const deleteItem = async (id) => {
        const { error } = await supabase.from('product').delete().eq('id', id);
        if (error) throw error;
    };

    const value = {
        data,
        loading,
        error,
        createItem,
        updateItem,
        deleteItem,
        refetch: fetchData,
    };

    return (
        <DataContext.Provider
            value={value}
        >
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);