
export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;

    if (removedIndex === null && addedIndex === null) return arr;
  
    const result = [...arr];
    let itemToAdd = payload;
  
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
    return result;
  };
  export const applyDragForBackend = (arr, dragResult,timeType,arrDate,date,arrDateTimeStamp) => {
    const { removedIndex, addedIndex, payload } = dragResult;

    if (removedIndex === null && addedIndex === null) return arr;
  
    const result = [...arr];
    let object={...payload}
    let itemToAdd = payload;
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
    // let itemToAdd = payload;
    console.log('checkpayload',payload)
    if (addedIndex !== null) {
      console.log('log1',arrDateTimeStamp[date],'log2',arrDate[date])
      object.date = arrDateTimeStamp[date];
      object.picked_date = arrDate[date];
      object.timetype=timeType
      // result.splice(addedIndex, 0, itemToAdd);  
      result.unshift(object);
      console.log(result)
    }
    return result;
  };
  export const generateItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(creator(i));
    }
    return result;
  };