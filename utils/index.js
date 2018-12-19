/**
 * Uppercase first char of string
 *
 * @param {String} input - string to change
 * @return {String}
 */
function titelize(input) {
    return input.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
}

/**
 * Convert array of elemnts to array of options for select
 *
 * @param {Array} collection - elements to convert to options
 * @param {Object} opts - convert options
 * @param {Object[]} opts.valueKey - key of an object property to covert to value, default to `_id`
 * @param {Object[]} opts.labelKey - key of an object property to covert to label, default to `name`
 * @return {Array} of object with label value objects
 */
function optionsForSelect(collection, opts = {}) {
    const valueKey = opts.valueKey || '_id';
    const labelKey = opts.labelKey || 'name';

    return collection.map((el) => ({
        value: el[valueKey],
        label: el[labelKey]
    }));
}

/**
 * Pick properties from object
 *
 * @param {Object} object - object to pick keys
 * @param {String[]} props - properties to pick from object
 * @return {Object} object with picked properties
 */
function pickProps(object, ...props) {
    return props.reduce((res, key) => {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            res[key] = object[key];
        }
        return res;
    }, {});
}

module.exports = {
    titelize,
    optionsForSelect,
    pickProps
};
