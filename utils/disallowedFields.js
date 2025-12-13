
export const removeDisallowedFields = (sourceData, disallowedFields = []) => {
    const filteredData = {};

    Object.keys(sourceData).forEach((key) => {
        if (
            !disallowedFields.includes(key) &&
            sourceData[key] !== undefined
        ) {
            filteredData[key] = sourceData[key];
        }
    });

    return filteredData;
};
