
// getOrderSubtotal tallies up the prices of all the non-voided ordered 
// items and returns a floating point number representing the subtotal.
// To get the total you'll still need to add tax and tip once the check
// is closed out.
export function getOrderSubtotal(orderedItems, menu) {
    let totPrice = 0.0;
    const menuItems = orderedItems
        .filter( (itm) => { return !itm.voided; })
        .map((itm) => { return itm.itemId })
        .map(mid => menu.find(i => i.id === mid));
    const addstuff = (acc, v) => acc + v.price;
    totPrice = menuItems.reduce(addstuff, totPrice);
    return totPrice;
}