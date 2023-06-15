import { useContext } from 'react';
import { AuthContext } from '../contexts/JWTContext.js';

// ----------------------------------------------------------------------

const useAuth = () => useContext(AuthContext);

export default useAuth;
