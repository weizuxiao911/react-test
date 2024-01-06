import React, { createElement, forwardRef, useEffect, useRef, useState } from 'react'
import './index.css'

/** remark editor */
export const RemarkEditor = () => {

    const placeholder = `press '/' for commands...`

    const ref = useRef<any>()

    const observer = new MutationObserver((mutations) => {
        console.log('editor...')
        console.log(mutations)
        if (!ref.current.childNodes?.length) {
            createParagraph()
            return false
        }
        const selection = document.getSelection()
        // console.log(selection)
    })

    const createParagraph = () => {
        const menu = document.createElement('span')
        menu.setAttribute('class', 'menu')
        menu.setAttribute('contentEditable', 'false')
        menu.textContent = ''
        const content = document.createElement('span')
        content.setAttribute('class', 'content')
        content.setAttribute('placeholder', placeholder)
        const paragraph = document.createElement('div')
        paragraph.setAttribute('class', 'paragraph')
        paragraph.setAttribute('draggable', 'true')
        paragraph.appendChild(menu)
        paragraph.appendChild(content)
        ref.current.appendChild(paragraph)
        paragraph.focus()

        const _observer = new MutationObserver((mutations) => {
            console.log('paragraph...')
            console.log(mutations)
            mutations.filter(it => it.addedNodes && it.addedNodes[0]?.nodeName === '#text').forEach(it => content.appendChild(it.addedNodes[0]))

        })

        _observer.observe(paragraph, {
            childList: true
        })

        return paragraph
    }

    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current, {
                childList: true
            })
            // console.log(ref.current.childNodes)
            if (!ref.current.childNodes?.length) {
                createParagraph()
            }
        }
    }, [])

    return <>
        <div ref={ref} className='editor' contentEditable='true'>
        <h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
        </div>
    </>
}