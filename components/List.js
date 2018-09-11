import PropTypes from 'prop-types';

const style = {
    listStyle: 'none'
};

const ListItem = (item) => (
    <li style={{ marginBottom: '.75rem' }}>
        <a href={item.href}>{item.title}</a>
    </li>
);

const List = ({ items }) => (
    <ul style={style}>
        {items.map(ListItem)}
    </ul>
);

List.propTypes = {
    items: PropTypes.array
};

export default List;
