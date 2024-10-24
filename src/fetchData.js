export const fetchData = async ({ URL = '', queryParams = {} } = {}) => {
    try {
      const attributes = Object.keys(queryParams);
  
      for (let i = 0; i < attributes.length; i++) {
        if (i == 0) URL += `?`;
        else URL += '&';
  
        URL += attributes[i] + `=${queryParams[attributes[i]]}`;
      }
  
      const res = await fetch(URL);
      const data = await res.json();
      return data; 
    } catch (error) {
      console.error(error);
    }
  };