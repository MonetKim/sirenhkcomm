import { ADD_MENUTOCART, REMOVE_MENUTOCART, INC_CARTQUANT, DEC_CARTQUANT, SHOW_MENUDETAIL } from './type'

export const addMenuToCart = (item) => {
    return {
        type: ADD_MENUTOCART,
        payload: item
    }
}
export const removeMenuToCart = () => {
    return {
        type: REMOVE_MENUTOCART
    }
}
export const incCartQuant = (item) => {
    return {
        type: INC_CARTQUANT,
        payload: item
    }
}
export const decCartQuant = (item) => {
    return {
        type: DEC_CARTQUANT,
        payload: item
    }
}
export const showMenuDetail = (item) => {
    return {
        type: SHOW_MENUDETAIL,
        payload: item
    }
}