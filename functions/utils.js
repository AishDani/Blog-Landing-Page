
const { REACT_APP_API_KEY, REACT_APP_MANAGEMENT_TOKEN } = process.env;

export  default  async function createEntry(data) {

    const createData = data;
    console.log("request body : ",createData);
    const response = await fetch('https://api.contentstack.io/v3/content_types/comments/entries?locale=en-us', {
      method: 'POST',
      headers: {
        'api_key': REACT_APP_MANAGEMENT_TOKEN,
        'authorization': REACT_APP_MANAGEMENT_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorInfo = await response.json();
      console.error("Error in createEntry:", errorInfo);
      throw new Error('Failed to create entry');
    }
  
    return response.json(); 
  }
  

// export default function createEntry(name) {
//     return name.slice(0, 3);
//  }