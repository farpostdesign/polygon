import PropTypes from 'prop-types';

const style = {
    listStyle: 'none'
};

const ListItem = (item) => (
    <li style={{ marginBottom: '.75rem' }}>{item.title}</li>
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
