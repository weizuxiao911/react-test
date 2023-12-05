import remarkCode from '@imarkjs/remark-codes'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

/**
   * 移动光标到设置contentEditable='true'的容器的最后
   * @param {*} el - 容器的实例
   */
const placeCaretAtEnd = (el: any) => {
    el.focus()
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
        let range = document.createRange() // 返回一个Range对象(包含节点与文本节点的一部分的文档片段)
        range.selectNodeContents(el)
        range.collapse(false)
        let sel: any = window.getSelection() // 表示用户选择的文本范围或光标的当前位置
        sel.removeAllRanges()
        sel.addRange(range)
    } else if (typeof document.body['createTextRange'] !== "undefined") {
        let textRange = document.body['createTextRange']()
        textRange.moveToElementText(el)
        textRange.collapse(false)
        textRange.select()
    }
}

/** 解析 */
const parse = (content: any) => {
    const _ast = unified()
        .use(remarkParse)
        .use(remarkCode)
        .use(remarkFrontmatter)
        .parse(content)
    return mark(_ast)
}

/** 格式化 */
const format = (ast: any) => {
    return unified()
        .use(remarkParse)
        .use(remarkCode)
        .use(remarkFrontmatter)
        .use(remarkStringify)
        .stringify(ast)
}

/** 标记 */
const mark = (_node: any, _parent?: any) => {
    _node.id = _parent ? `${_parent?.id ?? ''}${(_node?.index ?? 0).toString().padStart(3, '0')}` : ''
    if (_node?.children && _node?.children?.length) {
        _node.children = _node?.children?.map((_child: any, _index: number) => {
            _child.index = _index
            return mark(_child, _node)
        })
    }
    return _node
}

export {
    placeCaretAtEnd,
    parse,
    format,
}
