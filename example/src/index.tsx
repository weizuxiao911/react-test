import React, { useEffect, useState } from "react"
import { createRoot } from 'react-dom/client'
import { RemarkEditor } from '../../src/index'
import './index.scss'

const str2 = `
---
title:  测试
---

hello

# title

12345
67890

## title2

`

const App = () => {

    const [text, setText] = useState<string>()

    useEffect(() => {

        const file = 'https://statics.oscollege.net/1b16262f-5cdb-463f-9187-d85a64fcae12.pdf'

        // fetch(file).then(data => {
        //     console.log(data)
        // }).catch(error => {
        //     console.error(error)
        // })

    }, [])


    return (
        <RemarkEditor value={text?.trim()}></RemarkEditor>
    )
}
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)