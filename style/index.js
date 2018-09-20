const style = {};

const $colorLink = '#6e6eab';
const borderRadius = '2px';

function border(color) {
    return `2px solid ${color}`;
}

style.BUTTON = {
    display: 'inline-block',
    padding: '.5rem .7rem',
    border: border($colorLink),
    borderRadius,
    textDecoration: 'none',
    margin: '0 0 2rem 0',
    color: $colorLink,
    fontSize: '1rem',
    cursor: 'pointer'
};

style.BUTTON_MINIMAL = {
    border: 'none'
};

style.INPUT = {
    padding: '0 10px',
    height: '2rem',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    border: border('#888'),
    borderRadius
};

style.DESIGNS = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: '1 1 auto'
};


export default style;
