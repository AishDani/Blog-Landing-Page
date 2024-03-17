import * as contentstack from 'contentstack';

const Stack = contentstack.Stack({
  api_key: 'bltbca7e4bbe50b9dcf',
  delivery_token: 'cs8d412b838326dc635584e301',
  environment: 'local',
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