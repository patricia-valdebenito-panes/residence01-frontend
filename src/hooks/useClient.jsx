import { useContext } from 'react'
import ClientContext from '../context/ClientContext';

const useClient = () => {
    return useContext(ClientContext);
}

export default useClient;
