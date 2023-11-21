import React, { Fragment, createElement, forwardRef, useEffect, useRef, useState } from 'react'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkCode from '@imarkjs/remark-code'
import { unified } from 'unified'
import { types } from './lib/types'

/** remark editor props */
export type RemarkEditorProps = {
    value?: string
}

/** remark editor */
export const RemarkEditor = forwardRef((props: RemarkEditorProps, ref: any) => {

    /** Parser */
    const parser = unified()
        .use(remarkParse)
        .use(remarkCode)

    /** Stringifier */
    const stringifier = unified()
        .use(remarkParse)
        .use(remarkCode)
        .use(remarkStringify)

    /** Tree */
    const [tree, setTree] = useState<any>()
    const [child, setChild] = useState<any>()

    const print = () => {
        console.log(tree)
        setTree(tree)
    }

    /** create node element */
    const createNodeElement = (node: any, parent?: any) => {
        if (!node || !node?.type) {
            return createElement(Fragment, null)
        }
        const children: any[] = []
        if (node?.children?.length) {
            for (let i = 0; i < node.children.length; i++) {
                const child = createNodeElement(node.children[i], node)
                children.push(child)
            }
        }
        const props = {
            ...node,
            context: {
                node: node,
                parent: parent,
                children: node?.children ?? [],
                print: print
            }
        }
        const target = types[node?.type]
        if (!children.length) {
            return createElement(target, props)
        }
        return createElement(target, props, ...children)
    }

    /**  */
    useEffect(() => {
        const _tree = parser.parse(props?.value ?? '')
        setTree(_tree)
    }, [props?.value])

    useEffect(() => {
        const _root = createNodeElement(tree)
        setChild(_root)
    }, [tree])

    /**  */
    return <>{child}</>
})