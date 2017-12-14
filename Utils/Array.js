export function GroupBy(array, selector) {
    return array.reduce((prev, item) => {
        const key = selector(item);
        if (key in prev) {
            prev[key].push(item);
        } else {
            prev[key] = [ item ];
        }
        return prev;
    }, {})
}

export function FindIndexAll(array, selector) {
    return array.reduce((prev, item, index) => {
        if (selector(item)) {
            prev.push(index);
        }
        return prev;
    }, []);
}