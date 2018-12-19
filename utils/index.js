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

module.exports = {
    titelize,
    optionsForSelect
};
