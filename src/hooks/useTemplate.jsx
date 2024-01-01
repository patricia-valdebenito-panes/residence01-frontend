import { useContext } from 'react'
import TemplateContext from '../context/TemplateContext';

const useTemplate = () => {
    return useContext(TemplateContext);
}

export default useTemplate;
