export const shortenArray = (array, maxCharacters = 15) => 
    array.length > maxCharacters
        ? array.substring(0, maxCharacters) + '...'
        : array;