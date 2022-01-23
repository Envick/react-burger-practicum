// hooks.ts
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

import {TAppDispatch, TRootState} from "./constants";
import {ThunkAction} from "redux-thunk";
import {TAuthActions} from "../services/actions/auth";
import {TConstructorIngredientsActions} from "../services/actions/constructor-ingredients";
import {TIngredientActions} from "../services/actions/ingredients";
import {TIngredientDetailsActions} from "../services/actions/ingredient-details";
import {TOrderActions} from "../services/actions/order-details";
import {TProfileActions} from "../services/actions/profile";
import {TProfileOrdersActions} from "../services/actions/profile-orders";
import {Action, ActionCreator} from "redux";
import {TFeedActions} from "../services/actions/feed";



export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export type TAppActions =
    TAuthActions |
    TConstructorIngredientsActions |
    TIngredientActions |
    TIngredientDetailsActions |
    TOrderActions |
    TProfileActions |
    TProfileOrdersActions |
    TFeedActions |
    TProfileOrdersActions

export type TAppThunk<ReturnType = void> = ActionCreator<
        ThunkAction<
            ReturnType,
            TRootState,
            unknown,
            TAppActions
        >
    >

export const useDispatch = () => dispatchHook<TAppDispatch>();