export const formatedPicker = (items, isFormated = false) => {
    if (isFormated && Array.isArray(items)) {
        items = items.map((item) => ({ ...item, value: item.id, label: item.title }));
    }
    return items;
}