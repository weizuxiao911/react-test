import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { types } from './lib/_'
import { parse, format } from './utils'

export type RemarkEditorProps = {
    /**  */
    value?: string
}

/** remark editor */
export const RemarkEditor = forwardRef((props: RemarkEditorProps, ref: any) => {

    const observer = new MutationObserver((mutations) => {
        // console.log(mutations)
        mutations.forEach((mutation) => {
            console.log(mutation)
        })
    })

    const focusIdRef = useRef<string>()
    const contextRef = useRef<string>()
    const [root, setRoot] = useState<any>()

    /** 更新节点 */
    const updateNode = (_node: any) => {
        const _ast = parse(contextRef.current)
        const _index = _node?.id?.match(/\d{1,3}/g)?.map((it: string) => Number(it))
        let _n = _ast
        for (let i = 0; i < _index?.length; i++) {
            _n && _n?.children && (_n = _n?.children[_index[i]])
        }
        Object.assign(_n, _node) // 指针
        focusIdRef.current = _node?.id
        contextRef.current = format(_ast)
        const __ast = parse(contextRef.current)
        const _root = render(__ast)
        setRoot(_root)
    }

    /** 在节点前插入 */
    const insertBeforeNode = (_node: any) => {
        const _ast = parse(contextRef.current)
        const _index = _node?.id?.match(/\d{1,3}/g)?.map((it: string) => Number(it))
        let _n = _ast
        for (let i = 0; i < _index?.length - 1; i++) {
            _n && _n?.children && (_n = _n?.children[_index[i]])
        }
        const _currentIndex = _index.pop()
        _n.children.splice(_currentIndex, 0, _node)
        const _current = [..._index, _currentIndex].map(it => it?.toString()?.padStart(3, '0')).join('')
        focusIdRef.current = _current
        console.log(_current)
        contextRef.current = format(_ast)
        const __ast = parse(contextRef.current)
        const _root = render(__ast)
        setRoot(_root)
    }

    /** 在节点后插入 */
    const insertAfterNode = (_node: any) => {
        const _ast = parse(contextRef.current)
        const _index = _node?.id?.match(/\d{1,3}/g)?.map((it: string) => Number(it))
        let _n = _ast
        for (let i = 0; i < _index?.length - 1; i++) {
            _n && _n?.children && (_n = _n?.children[_index[i]])
        }
        const _currentIndex = _index.pop() + 1
        _n.children.splice(_currentIndex, 0, _node)
        const _current = [..._index, _currentIndex].map(it => it?.toString()?.padStart(3, '0')).join('')
        focusIdRef.current = _current
        console.log(_current)
        contextRef.current = format(_ast)
        const __ast = parse(contextRef.current)
        const _root = render(__ast)
        setRoot(_root)
    }

    /** 渲染元素 */
    const render = (_node: any, _parent?: any) => {
        const _type = types[_node?.type ?? ''] ?? null
        if (_type) {
            let _childrenElement = []
            if (_node?.children?.length) {
                _childrenElement = _node?.children?.map((child: any) => {
                    return render(child, _node)
                })
            }
            return React.createElement(_type, {
                key: _node?.id ? _node?.id : '_editor',
                ..._node,
                node: _node,
                parent: _parent,
                focusId: focusIdRef?.current,
                context: {
                    updateNode,
                    insertBeforeNode,
                    insertAfterNode,
                },
            }, _childrenElement?.length ? _childrenElement : _node?.value ?? '')
        }
        return <></>
    }

    /** 监听元素 */
    useEffect(() => {
        // console.log(contextRef.current)
        // if (root) {
        //     const config = {
        //         attributes: true,      // 监听目标节点的属性变化
        //         childList: true,       // 监听目标节点的子节点增加或删除变化
        //         characterData: false,   // 监听目标节点的文本内容或字符数据变化
        //         subtree: true          // 监听目标节点以及所有后代的变化
        //     }
        //     observer.observe(document.body, config)
        
        // }
    }, [root])

    /** 监听数据 */
    useEffect(() => {
        if (!(/---\n[\s\S]*?\n---\n/g.test((props?.value ?? '')?.trim()))) {
            contextRef.current = `---\n---\n\n${(props?.value ?? '')?.trim()}`
        } else {
            contextRef.current = `${(props?.value ?? '').trim()}`
        }
        const _ast = parse(contextRef.current)
        const _root = render(_ast)
        setRoot(_root)
    }, [props?.value])

    return root
})