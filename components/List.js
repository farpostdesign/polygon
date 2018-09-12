import { Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';

const style = {
    listStyle: 'none'
};

const List = ({ items, icon }) => {
    const ListItem = (item, index) => (
        <li key={item.id || index} style={{ marginBottom: '.75rem' }}>
            <Icon icon={icon} color='#7390a2' style={{marginRight: '.75rem'}} />
            <a href={item.href}>{item.title}</a>
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
