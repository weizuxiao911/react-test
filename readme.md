@imarkjs/remark-editor

# Introduction

a document editor plugin to enable markdown syntax, based on react.

# Dependencies

```json

{
    "dependencies": {
        "@imarkjs/remark-code": "^2.0.0",
        "@monaco-editor/react": "^4.6.0",
        "remark-parse": "^11.0.0",
        "remark-stringify": "^11.0.0",
        "unified": "^11.0.4"
    }
}

```

# Example 

```typescript

import React from "react"
import { createRoot } from 'react-dom/client'
import { RemarkEditor } from '../../src/index'
import './index.scss'

const str = `# title1
## title2
### title3
#### title4
##### title5
###### title6
\`\`\`javascript meta
let s = 'hi'
console.log(s)
\`\`\`{{properties}}
`

const App = () => {
    return (
        <RemarkEditor value={str}></RemarkEditor>
    )
}
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)

```
