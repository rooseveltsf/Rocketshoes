export function addToCardRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}
export function addToCardSucess(product) {
  return {
    type: '@cart/ADD_SUCESS',
    product,
  };
}

export function RemoveToCard(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

export function UpdateAmount(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT',
    id,
    amount,
  };
}
