# @imarkjs/remark-editor

## Introduction

A document editor plugin to enable markdown syntax, based on react.

## Structure

```bash

| config                        # webpack
 - - | webpack.base.js
 - - | webpack.dev.js
 - - | webpack.build.js
| example                       # to test
 - - | src
 - - - - | index.html
 - - - - | index.scss
 - - - - | index.tsx            # use this
| src                           # resource
 - - | lib                      # lib
 - - - - | *.tsx                
 - - | index.d.ts               # to enable scss syntax
 - - | index.tsx                # entry

```

## Dependencies

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

## Example 

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
