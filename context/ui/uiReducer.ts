import { UIState } from './UIProvider'

type UiActionType =
    |{type: 'Ui - ToggleMenu'}

export const UiReducer = (state: UIState, action: UiActionType):UIState => {

    switch (action.type) {
        case 'Ui - ToggleMenu':
        return {
           ...state,
           isMenuOpen: !state.isMenuOpen
        }

        default:
            return state
    }
}