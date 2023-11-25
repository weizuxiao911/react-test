import MonacoEditor from '@monaco-editor/react'

import React, { useEffect, useRef } from "react"

export const Code = (props?: any) => {

    const container = useRef(null)

    useEffect(() => {
        
    }, [])

    const onDataChanged = (value: string | undefined) => {
        props.context.node.value = value
        props?.context?.reflush()
    }

    return <MonacoEditor
        language={props?.lang ?? ''}
        theme="vs-dark"
        width="100%"
        height={300}
        value={props?.value ?? ''}
        onChange={onDataChanged}
        options={{
            folding: true, // 是否折叠
            foldingHighlight: true, // 折叠等高线
            foldingStrategy: 'indentation', // 折叠方式  auto | indentation
            showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
            disableLayerHinting: true, // 等宽优化
            emptySelectionClipboard: false, // 空选择剪切板
            selectionClipboard: false, // 选择剪切板
            automaticLayout: true, // 自动布局
            codeLens: false, // 代码镜头
            scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
            colorDecorators: true, // 颜色装饰器
            accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
            lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
            lineNumbersMinChars: 5, // 行号最小字符   number
            readOnly: false, //是否只读  取值 true | false
        }}
    />

}