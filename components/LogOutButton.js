import Router from 'next/router';
import store from '../services/store';

const LogOutButton = () => (
    <button className="p-button"
        onClick={() => {
            store.dispatch({ type: 'logout' })
                .then((res) => {
                    if (res.errors) {
                        alert(res.errors);
                    }
                    Router.push('/login');
                });
        }}>
        Выйти
    </button>
);

export default LogOutButton;
