import React from "react"
import './_.css'

export const Root = (props: any) => {

    const onBeforeInput = (e: any) => {
    
    }

    return <div
        className="editor"
        contentEditable='true'
        suppressContentEditableWarning={true}
        onBeforeInput={onBeforeInput}
    >{props?.children}</div>

}