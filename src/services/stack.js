import * as contentstack from 'contentstack';


const { REACT_APP_API_KEY, REACT_APP_DELIVERY_TOKEN, REACT_APP_ENVIRONMENT } = process.env;

const Stack = contentstack.Stack({
  api_key: REACT_APP_API_KEY,
  delivery_token: REACT_APP_DELIVERY_TOKEN,
  environment: REACT_APP_ENVIRONMENT,
});


export const getEntries = async ( contentType) => {
    try {
      const Query = Stack.ContentType(contentType).Query();

      const result = await Query.includeFallback()
        .toJSON()
        .includeEmbeddedItems()
        .addParam('include_metadata', 'true')
        .find();
  
      if (result && result.length > 0 && result[0].length <= 1) {
        //for entry type = single
        // (env  === 'preview' || env === 'staging-preview' || env === 'development') ? Contentstack.Utils.addEditableTags(result[0][0], contentType, true, locale) : ''
        return result[0][0];
      }
  
      // for entry type = multiple
      // (env  === 'preview' || env  === 'staging-preview' || env === 'development') ? Contentstack.Utils.addEditableTags(result[0][0], contentType, true, locale) : ''
      // console.log('result',result)
      if (result) return result;
    } catch (error) {
      // console.log('getEntries error',error)
      throw new Error(error);
    }
  };