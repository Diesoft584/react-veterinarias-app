import React, { createContext, useContext, useReducer } from 'react';

const Ctx = createContext(null);

const initialState = { list: [], loading: false, error: null };

const TYPES = {
    SET: 'SET',
    ADD: 'ADD',
    UPDATE: 'UPDATE',
    REMOVE: 'REMOVE',
    LOADING: 'LOADING',
    ERROR: 'ERROR',
};

function reducer(state, action) {
    switch (action.type) {
        case TYPES.LOADING:
            return { ...state, loading: true, error: null };
        case TYPES.ERROR:
            return { ...state, loading: false, error: action.payload };
        case TYPES.SET:
            return { ...state, list: action.payload || [], loading: false, error: null };
        case TYPES.ADD:
            return { ...state, list: [...state.list, action.payload], loading: false };
        case TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(c => (c._id === action.payload._id ? action.payload : c)),
                loading: false,
            };
        case TYPES.REMOVE:
            return { ...state, list: state.list.filter(c => c._id !== action.payload), loading: false };
        default:
            return state;
    }
}

export function ClientesProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = {
        clientes: state.list,
        loading: state.loading,
        error: state.error,
        _dispatch: dispatch,
        TYPES,
    };

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useClientesContext() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error('useClientesContext must be used within ClientesProvider');
    return ctx;
}
