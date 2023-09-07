import { Auth0Provider } from '@auth0/auth0-react';
import { createContext, useContext, useState } from 'react';


// Create a context to hold the authentication-related data
const AuthContext = createContext();


const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'dev-knldvtcgnye3i7gi.us.auth0.com';
  const clientId = '5sPFOnk2kNol2LG4Dk9uJIhT7AbfN9Sr';
  const redirectUri = window.location.origin;

    const [userId, setUserId] = useState(null);


    const contextValue = {
        userId,
      };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
    >
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </Auth0Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an Auth0ProviderWithHistory');
    }
    return context;
  };

  export default Auth0ProviderWithHistory;