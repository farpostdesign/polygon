import PropTypes from 'prop-types';

const style = {
    listStyle: 'none'
};

const itemStyle = {
    marginBottom: '.5rem',
    display: 'flex',
    alignItems: 'center'
};

const icons = {
    // https://www.iconfinder.com/icons/2044275/folder_interface_user_icon
    'folder-close': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTJweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PHBvbHlnb24gZmlsbD0ibm9uZSIgcG9pbnRzPSIgICAyMzUsMTkxLjMgMTk1LDE2NC44IDEzMywxNjQuOCAxMzMsMzQ3LjIgMzc5LDM0Ny4yIDM3OSwxOTEuMyAgIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEwIi8+PC9nPjwvc3ZnPg==',
    // https://www.iconfinder.com/icons/2044255/image_interface_picture_user_icon
    'media': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTJweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGc+PHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIxOTAuMyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIxMCIgd2lkdGg9IjE5OS41IiB4PSIxNTYuMyIgeT0iMTYwLjkiLz48cG9seWxpbmUgZmlsbD0ibm9uZSIgcG9pbnRzPSIgICAxNTYuMywzMTUuNyAyMTkuNywyNTYgMjc1LjcsMzE1LjcgMzA0LjcsMjg1LjggMzU1LjcsMzUxLjEgICIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxjaXJjbGUgY3g9IjMwMy45IiBjeT0iMjIyLjYiIGZpbGw9Im5vbmUiIHI9IjI2LjIiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMTAiLz48L2c+PC9zdmc+'
};

const List = ({ items, icon }) => {
    const iconSrc = icons[icon];
    const ListItem = (item, index) => (
        <li key={item.id || index}>
            <a href={item.href} style={itemStyle}>
                {icon && <img src={iconSrc} style={{ width: '2rem' }}/>}
                {item.title}
            </a>
        </li>
    );

    return (
        <ul style={style}>
            {items.map(ListItem)}
        </ul>
    );
};

List.propTypes = {
    items: PropTypes.array,
    icon: PropTypes.string
};

export default List;
