import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, H2, FormGroup, MenuItem, Button, Classes } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import fakeProjects from '../../fakeProjects';

/**
 * Helpers
 *
 */

function findAncestors(descendant, list) {
    if (typeof(descendant.parent) === 'undefined') {
        return [];
    }
    return list.reduce((ancestors, item) => {
        if (item.id === descendant.parent) {
            ancestors.push(item);
            return findAncestors(item, list).concat(ancestors);
        }
        return ancestors;
    }, []);
}

function addAncestorsPath(list) {
    return list.map((item) => {
        const ancestors = findAncestors(item, list);
        const path = [...ancestors, item].map(({ title }) => title).join(' / ');
        item.ancestorsPath = path;
        return item;
    });
}

function buildSelectOption(item, { handleClick, index, modifiers }) {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            key={index}
            onClick={handleClick}
            text={item.ancestorsPath}
        />
    );
}

function filterPredicate(query, item) {
    return item.ancestorsPath.toLowerCase().indexOf(query.toLowerCase()) >= 0;
}

/**
 * Component
 *
 */

class MoveCommon extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: null };
        this.handleItemSelected = this.handleItemSelected.bind(this);
    }

    render() {
        const items = addAncestorsPath(fakeProjects);
        return (
            <Dialog isOpen={this.props.isOpen} onClose={this.props.onClose} enforceFocus={false}>
                <div className={Classes.DIALOG_BODY}>
                    <H2>Move into</H2>
                    <FormGroup labelFor="parent">
                        <Select
                            items={items}
                            itemPredicate={filterPredicate}
                            itemRenderer={buildSelectOption}
                            onItemSelect={this.handleItemSelected}
                        >
                            <Button text={this.state.selected ? this.state.selected.title : 'Select from the list'} />
                        </Select>
                    </FormGroup>
                    <Button text="Move item" type="submit" intent="success" />
                </div>
            </Dialog>
        );
    }

    handleItemSelected(selected) {
        this.setState({ selected });
    }
}

/**
 * Meta
 *
 */

MoveCommon.defaultProps = {
    isOpen: false
};

MoveCommon.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};

/**
 * Expose
 *
 */

export default MoveCommon;
