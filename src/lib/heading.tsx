import React, { createElement, useEffect, useState } from "react"

export const Heading = (props?: any) => {

    const onDataChanged = (e: any) => {
        if (13 === e?.keyCode) {
            e.target.blur()
            return false
        }
    }

    const onBlur = (e: any) => {
        const value = e?.target?.innerText?.trim() ?? ''
        e.target.innerText = value
        props.context.children[0].value = value
        e.stopPropagation()
        e.preventDefault()
        props?.context?.reflush()
        return false
    }

    const create = () => {
        const tag = `h${props?.depth}`
        const h = createElement(tag, {
            suppressContentEditableWarning: true,
            contentEditable: true,
            onKeyDown: onDataChanged,
            onBlur: onBlur
        }, props?.children)
        return h
    }

    return <>{create()}</>
}