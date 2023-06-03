import { toast } from "react-toastify";

export const applyDrag = (arr, dragResult, day) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
    return result;
  }
  console.log("check arr",arr)
  if(arr.some(e => e.doctorId===payload.id))
  {
    console.log("checkkkkkkkkkkkkkk")
    payload.checked=false
    toast.warn('Bác sĩ này đã được đăng ký cho ngày này')
    return arr
  }
  else{
    let object = { ...payload };
    if (addedIndex !== null) {
      payload.checked=true
      result.push(object);
    }
    console.log("drag", day, payload);
  
    return result;
  }

};
export const applyDragForBackend = (
  arr,
  dragResult,
  timeType,
  arrDate,
  date,
  arrDateTimeStamp
) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  if(payload.checked!==true)
  {
    return arr
  }
  else{
    const result = [...arr];
    let object = { ...payload };
    let itemToAdd = payload;
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
      return result;

    }
    if (addedIndex !== null) {
      object.date = arrDateTimeStamp[date];
      object.picked_date = arrDate[date];
      object.timetype = timeType;
      result.unshift(object);
    }
    payload.checked=false
    return result;
  }
};
export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};
export const applyDrag1 = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  console.log("checking", payload);
  if (arr.some((e) => e.id === payload.id)) {
    toast.error("This user is already registered");
    /* vendors contains the element we're looking for */
    return arr;
  } else {
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
  }
};
