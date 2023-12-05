import React from "react"
import './_.css'

export const Root = (props: any) => {

    return <div
        key={props?.id? props?.id : '_root'}
        id={props?.id ? props?.id : '_root'}
        className="editor"
        suppressContentEditableWarning={true}
    >{props?.children}</div>

}