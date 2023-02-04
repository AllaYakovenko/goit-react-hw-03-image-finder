import { ColorRing } from  'react-loader-spinner'
import css from 'components/Loader/Loader.module.css';

export function Loader() { 
    return (
        <div className={css.Loader}>
            <ColorRing
                visible={true}
                height="240"
                width="240"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
    );
};
