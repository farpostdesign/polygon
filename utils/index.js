function titelize(input) {
    return input.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
}

export {
    titelize
};
