export const normalizeName = name => name.replace(/_/g, " ");

export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

// todo: rewrite with regexp
export const isLink = str => String(str).indexOf('http') !== -1;

export const getIndexesOfBest = (values, isMinBest = false) => {
    let best = isMinBest ? +Infinity : -Infinity;

    return values.reduce((acc, value, i) => {
        if (isNumeric(value)) {
            const isBest = isMinBest ? value < best : value > best;
            if (isBest) {
                best = value;
                acc = [value];
            }
            if (value === best) {
                acc = [...acc, i];
            }
        }

        return acc;
    }, []);
};
