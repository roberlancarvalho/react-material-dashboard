export const TOKEN_KEY = "@user-Token";
// export const KEY_USERNAME = "@username-Token";
// export const KEY_PASSWORD = "@password-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);


export const login = (token) => {
      localStorage.setItem(TOKEN_KEY, token);
      
      // localStorage.setItem(KEY_USERNAME, usernametk);
      // localStorage.setItem(KEY_PASSWORD, passwordtk);
};

export const logout = () => {
      localStorage.removeItem(TOKEN_KEY);
    };
    

     // export const isAuthenticated = () => true;