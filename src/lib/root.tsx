import React, { useEffect } from "react"

export const Root = (props: any) => {
    useEffect(() => {
        console.log(props)
    }, [])
    return <div className={props?.className ?? ''}>{props?.children}</div>
}