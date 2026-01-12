import { create } from 'zustand';
import type { Usuario } from '@/interfaces/usuario.interface';
import { loginAction } from '../actions/login.action';
import type { Menu } from '../interfaces/auth.response';
import { checkAuthAction } from '../actions/refresh-token.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    // Properties
    usuario: Usuario | null;
    menu: Menu[] | null;
    token: string | null;
    authStatus: AuthStatus;

    // Getters


    // Actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set) => ({
    
    // Implementación del store
    usuario: null,
    token: null,
    menu: null,
    authStatus: 'checking',


    // Actions
    login: async(email: string, password: string) => {

        try {
            const response = await loginAction(email, password);
            localStorage.setItem('token', response.data.token);

            set({ 
                usuario: response.data.usuario, 
                token: response.data.token,
                menu: response.data.menus,
                authStatus: 'authenticated'
            })
            
            return true;

        } catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            set({ 
                usuario: null, 
                token: null,
                menu: [],
                authStatus: 'not-authenticated'
            })
            return false;
        }

    },
    logout: () => {
        localStorage.removeItem('token');
        set({ 
            usuario: null, 
            token: null,
            authStatus: 'not-authenticated'
        })
    },
    checkAuthStatus: async () => {
        try {
        const { data } = await checkAuthAction();
        set({
            usuario: data.usuario,
            token: data.token,
            menu: data.menus,
            authStatus: 'authenticated',
        });
        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
        set({
            usuario: null,
            token: null,
            authStatus: 'not-authenticated',
        });

        return false;
        }
    },

}))