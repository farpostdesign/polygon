import PropTypes from 'prop-types';
import Link from 'next/link';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const LettersFilter = ({ current }) => (
    <div className="p-letters-filter">
        {
            alphabet.map((char) =>
                <Link key={char} href={`?char=${char}`}>
                    <a className={current === char ? 'p-letters-filter--char p-letters-filter--char__active' : 'p-letters-filter--char'}>
                        {char}
                    </a>
                </Link>
            )
        }
    </div>
);

LettersFilter.propTypes = {
    current: PropTypes.string
};

export default LettersFilter;
