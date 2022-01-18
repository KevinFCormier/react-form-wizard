import { createContext, ReactNode, useContext, useState } from 'react'

/*
Show validation is used to indicate is that controls shoud show validation.
Initially it is false, but on a wizard step upon clicking next validation should show for that step.
When a wizard gets to the review step, validation errors for the whole wizard should show.
*/

const SetShowValidationContext = createContext<(show: boolean) => void>(() => null)
export function useSetShowValidation() {
    return useContext(SetShowValidationContext)
}

const ShowValidationContext = createContext(false)
export function useShowValidation() {
    return useContext(ShowValidationContext)
}

export function ShowValidationProvider(props: { children?: ReactNode }) {
    const [showValidation, setShowValidation] = useState(false)
    const parentShowValidationContext = useContext(ShowValidationContext)
    const activeShowValidation = showValidation || parentShowValidationContext
    return (
        <SetShowValidationContext.Provider value={setShowValidation}>
            <ShowValidationContext.Provider value={activeShowValidation}>{props.children}</ShowValidationContext.Provider>
        </SetShowValidationContext.Provider>
    )
}