import React, { createElement, useEffect, useState } from "react"

export const Heading = (props?: any) => {

    const onDataChanged = (e: any) => {
        if (13 === e?.keyCode) {
            e.target.blur()
        }
    }

    const onBlur = (e: any) => {
        const value = e?.target?.innerText?.trim() ?? ''
        e.target.innerText = value
        props.context.children[0].value = value
        e.stopPropagation()
        e.preventDefault()
        props.context.print()
        return false
    }

    const create = () => {
        const tag = `h${props?.depth}`
        const h = createElement(tag, { contentEditable: true, onKeyUp: onDataChanged, onBlur:onBlur }, props?.children)
        return h
    }

    return <>{create()}</>
}