import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const raw = localStorage.getItem('vet_auth');
        if (raw) setUser(JSON.parse(raw));
    }, []);

    const login = async ({ username, password }) => {
        if (username === 'admin' && password === 'admin') {
            const u = { username: 'admin' };
            setUser(u);
            localStorage.setItem('vet_auth', JSON.stringify(u));
            return { ok: true };
        }
        return { ok: false, message: 'Credenciales inválidas' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('vet_auth');
    };

    return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthCtx);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
