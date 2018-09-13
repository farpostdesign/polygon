import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import ActionsMenu from './ActionsMenu';

const listColor = '#7390a2';
const style = {
    listStyle: 'none'
};

const List = ({ items, icon, actionsMenu }) => {
    const actionTrigger = <Icon icon="more" style={{marginRight: '.75rem', transform: 'rotate(90deg)'}} onClick={this.handleClick} />;
    const ListItem = (item, index) => (
        <li key={item.id || index} style={{ marginBottom: '.75rem' }}>
            {actionsMenu && <ActionsMenu target={actionTrigger} />}
            <Icon icon={icon} color={listColor} style={{marginRight: '.75rem'}} />
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
    actionsMenu: PropTypes.bool,
    items: PropTypes.array,
    icon: PropTypes.string
};

export default List;
