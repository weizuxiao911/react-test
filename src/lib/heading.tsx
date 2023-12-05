import React, { createElement, useEffect, useRef, useState } from "react"
import { placeCaretAtEnd } from "../utils"

export const Heading = (props: any) => {

    const isEnterRef = useRef<boolean>(false)
    const isInputRef = useRef<boolean>(false)
    const elementRef = useRef<any>()

    const [element, setElement] = useState<any>()

    const onKeyDown = (event: any) => {
        if (13 === event.keyCode) {
            isEnterRef.current = true
            props?.context?.insertAfterNode({
                id: props?.id,
                type: 'paragraph',
                children: [
                    {
                        type: 'text',
                        value: ' '
                    }
                ]
            })
            event.stopPropagation()
            event.preventDefault()
            return false
        }
        // 处理中文输入
        if (229 === event?.keyCode) {
            isInputRef.current = true
            event.stopPropagation()
            event.preventDefault()
            return false
        }
        isEnterRef.current = false
        isInputRef.current = false
    }

    const onKeyUp = (event: any) => {
        if (isEnterRef.current
            || isInputRef.current
            || 'ArrowLeft' === event?.key
            || 'ArrowRight' === event?.key) {
            event.stopPropagation();
            event.preventDefault();
            return false
        }
        const _text = event?.target.innerText
        const _node = props?.node
        _node.children = [{
            type: 'text',
            value: _text
        }]
        props?.context?.updateNode(_node)
        event.stopPropagation();
        event.preventDefault();
    }

    useEffect(() => {
        if (element && props?.focusId === props?.id) {
            placeCaretAtEnd(elementRef.current)
        }
    }, [element])

    useEffect(() => {
        if (props) {
            const _tag = `h${props?.depth ?? 1}`
            const _element = createElement(_tag, {
                key: props?.id,
                id: props?.id,
                ref: elementRef,
                contentEditable: true,
                suppressContentEditableWarning: true,
                onKeyDown,
                onKeyUp
            }, props?.children ?? [])
            setElement(_element)
        }
    }, [props])

    return element
}