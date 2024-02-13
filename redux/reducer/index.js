import {
  POST_REGISTRO_USUARIO,
  GET_ALL_USUARIOS,
  USER_LOGIN_SUCCESS,
  GET_CLIENTES,
  GET_TICKETS,
  GET_CASH,
  POST_CASH,
  GET_CLIENTE_POR_ID,
  CLEAR_CLIENT_DETAIL,
  CHECK_TICKET,
  GET_TICKET_DATE,
  CLEAN_UP_DATA_IN_CHECK,
} from "../actions/index.js";

const initialState = {
  usuarios: [],
  clientes: [],
  tickets: [],
  cash: [],
  check: { error: false, data: null },
  filterCash: [],
  filterTicket: [],
  ClientDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, userInfo: action.payload };

    case POST_REGISTRO_USUARIO:
      return {
        ...state,
        registroUsuario: action.payload,
      };

    case GET_ALL_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
      };

    case GET_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
      };
      
    case GET_CLIENTE_POR_ID:
      return {
        ...state,
        ClientDetail: action.payload,
      };

    case CLEAR_CLIENT_DETAIL:
      return {
        ...state,
        ClientDetail: null,
      };

    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };

    case GET_CASH:
      return {
        ...state,
        cash: action.payload,
      };

    case CHECK_TICKET:
      return {
        ...state,
        check: action.payload,
      };

    case POST_CASH:
      return {
        ...state,
        filterCash: action.payload,
      };

    case GET_TICKET_DATE:
      return {
        ...state,
        filterTicket: action.payload,
      };

      case CLEAN_UP_DATA_IN_CHECK:
      return {
        ...state,
        check: { ...state.check, data: null }, // Limpiar 'data' a null
      };

    // case PUT_USUARIO:
    //   const updatedClientes = state.clientes.map((cliente) => {
    //     if (cliente.clientId === action.payload.clientId) {
    //       return action.payload;
    //     }
    //     return cliente;
    //   });

    //   return {
    //     ...state,
    //     clientes: updatedClientes,
    //   };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
