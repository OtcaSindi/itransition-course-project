import React, {useRef, useEffect, useState, useCallback} from 'react'

export const ANIMATION_TIMER = 720

export function WrapperLaunchModal(
    {
        onRequestClose,
        onRequestSubmit,
        onClose,
        children,
        component: ModalComponent,
        ...props
    }) {
    const [open, setOpen] = useState(false)
    const timer = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            setOpen(true)
        })

        return () => {
            clearTimeout(timer.current)
        }
    }, [])

    const delayRequestClose = useCallback(() => {
        setOpen(false)

        // If modal had onTransitionEnd prop we could resolve this w/o timeout
        timer.current = setTimeout(onClose, ANIMATION_TIMER)
    }, [onClose])

    const handleRequestSubmit = useCallback(
        (...args) => {
            onRequestSubmit(...args, delayRequestClose)
        },
        [onRequestSubmit, delayRequestClose],
    )

    const handleRequestClose = useCallback(
        (...args) => {
            onRequestClose(...args, delayRequestClose)
        },
        [onRequestClose, delayRequestClose],
    )

    return (
        <ModalComponent
            onRequestClose={handleRequestClose}
            onRequestSubmit={handleRequestSubmit}
            onSubmit={handleRequestSubmit}
            open={open}
            {...props}
        >
            {children(delayRequestClose)}
        </ModalComponent>
    )
}

export default WrapperLaunchModal