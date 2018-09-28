/**
 * @param collection {Array} - array of object
 * @param resourceName {String} - name of API resource
 * @return {Array}
 *
 */
function payload(collection, resourceName) {
    return collection.map((item) => {
        const id = item.id || item._id.toString();
        item.href = `/${resourceName}?id=${id}`;
        return item;
    });
}

module.exports = payload;
