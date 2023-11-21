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