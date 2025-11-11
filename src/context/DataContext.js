'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const DataContext = createContext();

export function DataProvider({ children, table = 'customer' }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = createClient();

    useEffect(() => {
        fetchData();

        // Realtime subscription
        const channel = supabase
            .channel(`lumanest:${table}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'lumanest',
                table: table
            }, (payload) => {
                handleRealtimeChange(payload);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // ✅ Debug data khi nó thay đổi
    useEffect(() => {
        console.log(`🔍 ${table} data updated:`, data);
    }, [data]); // Chạy mỗi khi data thay đổi

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: data, error } = await supabase
                .schema('lumanest') // ✅ Đặt schema trước
                .from(table)
                .select('*');
            // .order('created_at', { ascending: false });

            if (error) {
                console.error('❌ Supabase error:', error);
                throw error;
            }

            setData(data);
            return data;
        } catch (err) {
            console.error('❌ Fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRealtimeChange = (payload) => {
        console.log('🔄 Realtime change:', payload.eventType);
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

    const createItem = async (newItem) => {
        const { data, error } = await supabase
            .schema('lumanest')
            .from(table)
            .insert([newItem])
            .select();
        if (error) throw error;
        return data[0];
    };

    const updateItem = async (id, updates) => {
        const { data, error } = await supabase
            .schema('lumanest')
            .from(table)
            .update(updates)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    };

    const deleteItem = async (id) => {
        const { error } = await supabase
            .schema('lumanest')
            .from(table)
            .delete()
            .eq('id', id);
        if (error) throw error;
    };

    return (
        <DataContext.Provider
            value={{
                fetchData,
                data,
                loading,
                error,
                createItem,
                updateItem,
                deleteItem,
                refetch: fetchData,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);