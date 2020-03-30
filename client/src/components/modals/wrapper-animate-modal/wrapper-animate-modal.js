import React, {useRef, useEffect, useState, useCallback} from 'react'

import {Modal} from "carbon-components-react"

import noop from 'lodash/noop'
import cond from 'lodash/cond'
import isFunction from 'lodash/isFunction'
import stubTrue from 'lodash/stubTrue'
import identity from 'lodash/identity'

export const ANIMATION_TIMER = 360

const call = (f, ...arg) => f(arg)

const render = cond([
    [isFunction, call],
    [stubTrue, identity]
])

const WrapperAnimateModal = (
    {
        onRequestClose,
        onRequestSubmit,
        onClose,
        children,
        component: ModalComponent,
        ...props
    }) => {
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
            {render(children, delayRequestClose)}
        </ModalComponent>
    )
}


WrapperAnimateModal.defaultProps = {
    component: Modal,
    onRequestClose: noop,
    onRequestSubmit: noop,
    onClose: noop,
}

export default WrapperAnimateModal