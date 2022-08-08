export const exerciseOptions = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': "3c5a11d66bmsh65e83ecaec2e36ap1cec7djsn9c8049b07f5c",
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };

export const fetchData = async (url, options) =>{
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}