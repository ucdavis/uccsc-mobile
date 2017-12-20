export function GroupBy(array, selector) {
    const grouped = array.reduce((prev, item) => {
        const key = selector(item);
        if (key in prev) {
            prev[key].push(item);
        } else {
            prev[key] = [ item ];
        }
        return prev;
    }, {});

    return Object.keys(grouped).map((key) => {
        return {
            key,
            values: grouped[key]
        }
    });
}

export function FindIndexAll(array, selector) {
    return array.reduce((prev, item, index) => {
        if (selector(item)) {
            prev.push(index);
        }
        return prev;
    }, []);
}

export function Sum(array) {
    return array.reduce((prev, item) => {
        return prev + item;
    }, 0)
}