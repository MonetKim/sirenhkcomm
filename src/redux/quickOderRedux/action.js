import { ADD_QUICKMENU, REMOVE_QUICKMENU,} from './type'

export const addQuickMenu = (item) => {
    return {
        type: ADD_QUICKMENU,
        payload: item
    }
}
export const removeQuickMenu = () => {
    return {
        type: REMOVE_QUICKMENU
    }
}