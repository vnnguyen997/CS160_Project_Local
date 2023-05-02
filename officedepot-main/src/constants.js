import chairCollection from "./Images/chairCollection.jpg";
import hammerCollection from "./Images/hammerCollection.jpg";
import tableCollection from "./Images/tableCollection.jpg";
import printerCollection from "./Images/printerCollection.jpg";
import writingCollection from "./Images/writingCollection.jpg";
import notebookCollection from "./Images/notebookCollection.jpg";
import backpackCollection from "./Images/backpackCollection.jpg";
import organizationCollection from "./Images/organizationCollection.jpg";
import shippingCollection from "./Images/shippingCollection.jpg";
import breakroomCollection from "./Images/breakroomCollection.jpg";
import otherCollection from "./Images/otherCollection.jpg";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ API ENDPOINTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// NODE SERVER
export const NODE_SERVER = "http://localhost:3001";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CUSTOMERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const CREATE_CUSTOMER_ENDPOINT = `${NODE_SERVER}/register`;
export const USER_LOGIN_ENDPOINT = `${NODE_SERVER}/login`;
export const GET_ALL_CUSTOMERS_ENDPOINT = `${NODE_SERVER}/displayCustomers`;
// '/updateCustomer/${email}'
export const UPDATE_CUSTOMER_ENDPOINT = `${NODE_SERVER}/updateCustomer/`;
export const DELETE_CUSTOMER_ENDPOINT = `${NODE_SERVER}/removeCustomer/`;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ EMPLOYEES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const CREATE_EMPLOYEE_ENDPOINT = `${NODE_SERVER}/employeeCreate`;
export const EMPLOYEE_LOGIN_ENDPOINT = `${NODE_SERVER}/employeeLogin`;
export const DISPLAY_EMPLOYEE_ENDPOINT = `${NODE_SERVER}/displayEmployees`;
// '/updateEmployee/${email}'
export const UPDATE_EMPLOYEE_ENDPOINT = `${NODE_SERVER}/updateEmployee/`;
export const DELETE_EMPLOYEE_ENDPOINT = `${NODE_SERVER}/removeEmployee`;
export const GET_EMPLOYEE_ID_ENDPOINT = `${NODE_SERVER}/getEmployeeID`;
export const GET_EMPLOYEE_FIRST_NAME_ENDPOINT = `${NODE_SERVER}/getEmployFirstName`;
export const GET_EMPLOYEE_LAST_NAME_ENDPOINT = `${NODE_SERVER}/getEmployLastName`;
export const GET_EMPLOYEE_ADDRESS_ENDPOINT = `${NODE_SERVER}/getEmployAddress`;
export const UPDATE_EMPLOYEE_FIRST_NAME_ENDPOINT = `${NODE_SERVER}/updateEmployFirstName`;
export const UPDATE_EMPLOYEE_LAST_NAME_ENDPOINT = `${NODE_SERVER}/updateEmployLastName`;
export const UPDATE_EMPLOYEE_ADDRESS_ENDPOINT = `${NODE_SERVER}/updateEmployAddress`;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INVENTORY ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const CREATE_INVENTORY_ENDPOINT = `${NODE_SERVER}/createInventory`;
export const FIND_ITEM_BY_ID_ENDPOINT = `${NODE_SERVER}/findItemById/`;
export const UPDATE_INVENTORY_ENDPOINT = `${NODE_SERVER}/updateInventory/`;
export const DELETE_INVENTORY_ENDPOINT = `${NODE_SERVER}/removeInventoryItem`;

export const GET_ALL_INVENTORY_ENDPOINT = `${NODE_SERVER}/displayInventory`;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ORDERS & CART ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const ADD_ITEM_TO_CART_ENDPOINT = `${NODE_SERVER}/addItemToCart`;
export const BULK_ADD_ITEMS_TO_CART_ENDPOINT = `${NODE_SERVER}/bulkAddItemsToCart`;
export const REMOVE_CART_ITEM_ENDPOINT = `${NODE_SERVER}/removeCartItem`;
export const UPDATE_CART_ITEM_QUANTITY_ENDPOINT = `${NODE_SERVER}/updateCartItemQuantity`;
export const GET_ITEMS_BY_CART_ID_ENDPOINT = `${NODE_SERVER}/getItemsByCartId/`;
export const CHECKOUT_ENDPOINT = `${NODE_SERVER}/checkout`;
export const CREATE_ORDER_ENDPOINT = `${NODE_SERVER}/createOrder`;
// '/updateOrder/${order_id}
export const UPDATE_ORDER_ENDPOINT = `${NODE_SERVER}/updateOrder/`;
export const DELETE_ORDER_ENDPOINT = `${NODE_SERVER}/removeOrder`;
export const GET_ORDERS_BY_CUSTOMER_ENDPOINT = `${NODE_SERVER}/getOrdersAndItemsByCustomerId/`;
export const GET_ALL_ORDERS_ENDPOINT = `${NODE_SERVER}/displayOrders`;
export const GET_ORDER_STATUS_ENDPOINT = `${NODE_SERVER}/getOrderStatus`;
export const GET_ORDER_CREATION_DATE_ENDPOINT = `${NODE_SERVER}/getOrderCreationDate`;
export const GET_ORDER_DELIVERY_DATE_ENDPOINT = `${NODE_SERVER}/getOrderDeliveryDate`;

export const UPDATE_ORDER_STATUS_ENDPOINT = `${NODE_SERVER}/updateOrderStatus`;
export const UPDATE_ORDER_DELIVERY_DATE_ENDPOINT = `${NODE_SERVER}/updateOrderDeliveryDate`;

// consider removing outdoor and indoor, add bed (are some of these office depot supplies??)
export const STANDARD_ITEM_GROUPS = [
  {
    itemGroup: "chair",
    imageSrc: chairCollection,
    caption: "Chairs",
  },
  {
    itemGroup: "table",
    imageSrc: tableCollection,
    caption: "Tables and Desks",
  },
  {
    itemGroup: "writing",
    imageSrc: writingCollection,
    caption: "Writing Accessories",
  },
  {
    itemGroup: "paper-notebooks",
    imageSrc: notebookCollection,
    caption: "Paper and Notebooks",
  },
  {
    itemGroup: "backpack",
    imageSrc: backpackCollection,
    caption: "Backpacks",
  },
  {
    itemGroup: "printing",
    imageSrc: printerCollection,
    caption: "Printing",
  },
  {
    itemGroup: "organizing",
    imageSrc: organizationCollection,
    caption: "Organizing",
  },
  {
    itemGroup: "shipping",
    imageSrc: shippingCollection,
    caption: "Shipping Supplies",
  },
  {
    itemGroup: "breakroom",
    imageSrc: breakroomCollection,
    caption: "Breakroom Supplies",
  },
];
