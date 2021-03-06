import React, { createContext, useContext } from 'react'

const CartContext = createContext()

const actionTypes = {
  ADDTOCART: 'ADDTOCART',
  CHANGEQUANTITY: 'CHANGEQUANTITY',
  EMPTYCART: 'EMPTYCART'
}

const initialState = {
  cartContent: []
}

const CartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADDTOCART:
      return {
        ...initialState, cartContent: [...state.cartContent, action.data]
      }
    case actionTypes.CHANGEQUANTITY:
      return {
        ...initialState,
        cartContent: [
          ...state.cartContent.filter((i) => i.id !== action.data.id),
          {
            id: action.data.id,
            nom: state.cartContent.find((i) => i.id === action.data.id).nom,
            quantite: state.cartContent.find((i) => i.id === action.data.id).quantite + action.data.howMuch
          }
        ]
      }
    case actionTypes.EMPTYCART:
      return initialState

    default: throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const CartProvider = ({ children }) => {
  // Similaire au useState() : On retourne l'état global et la méthode permettant sa mise à jour
  const [state, dispatch] = React.useReducer(CartReducer, initialState)
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside a CartProvider')
  return context
}

export {
  actionTypes,
  CartProvider,
  useCart
}
