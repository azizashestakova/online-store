export const findIndexItemByName = (arr, item) => arr.findIndex((element) => element.name === item.name);

export const deleteItemByName = (arr, item) => arr.filter((element) => element.name !== item.name);
