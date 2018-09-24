const style = {};

const $colorLink = '#6e6eab';
const borderRadius = '2px';

function border(color) {
    return `2px solid ${color}`;
}

style.NOSTYLE = {};

style.SECTION = {
    marginBottom: '2rem'
};

style.SECTION_HEADER = {
    marginBottom: '.5rem'
};

style.BUTTON = {
    display: 'inline-block',
    padding: '.5rem .7rem',
    border: border($colorLink),
    borderRadius,
    textDecoration: 'none',
    color: $colorLink,
    fontSize: '1rem',
    cursor: 'pointer'
};

style.BUTTON_MINIMAL = {
    border: 'none'
};

style.INPUT = {
    padding: '0 10px',
    height: '2.4rem',
    width: '50%',
    maxWidth: '20rem',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    border: border('#888'),
    marginRight: '1rem',
    borderRadius
};

style.INLINE_EDITABLE = {
    fontSize: '2rem',
    lineHeight: '2rem',
    height: '2rem',
    verticalAlign: 'middle',
    marginRight: '1rem'
};

style.DESIGNS = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: '1 1 auto'
};

style.LIST = {
    listStyle: 'none'
};

style.LIST_ITEM = {
    margin: '.25rem 0'
};

style.LIST_ICON = {
    width: '2rem',
    verticalAlign: 'middle'
};

style.LIST_EMPTY = {
    margin: '10px'
};

export default style;
