import { ActionCreatorProps, createAction, NotAllowedCheck, props } from '@ngrx/store';
import { Action, ActionCreator } from '@ngrx/store/src/models';

type SuccessType<T extends string> = `${T} Success`;
type FailureType<T extends string> = `${T} Failure`;

// @ts-ignore
export function createSuccessAction<T extends string, P extends Record<string, any> = undefined>(
    action: Action<T>,
    config?: ActionCreatorProps<P> & NotAllowedCheck<P>
) {
    // @ts-ignore
    return createAction(`${action.type} Success` as SuccessType<T>, config) as P extends undefined
        ? ActionCreator<SuccessType<T>, () => Action<SuccessType<T>>>
        : ActionCreator<SuccessType<T>, (props: P & NotAllowedCheck<P>) => P & Action<SuccessType<T>>>;
}

export function createFailureAction<T extends string>(action: Action<T>) {
    return createAction(`${action.type} Failure` as FailureType<T>, props<{ error: any }>());
}
