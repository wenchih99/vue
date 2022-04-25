var xss = require('xss')

const options = {
    css: false,
    whiteList:{
        a:["href","title","target"],
        input:["type"],
        code:[""],
        strong:[""],
        img:["src"],
        pre:[""],
        li:["data-checked","data-type"],
        ul:["data-type"],
        ol:[""],
        div:[""],
        span:[""],
        p:[""],
        h1:["style"],
        h2:["style"],
        h3:["style"],
        h4:["style"],
        h5:["style"],
        h6:["style"],
        label:[""],
        em:[""],
        s:[""],
        mark:[""],
        blockquote:[""],
        br:[""]
    },
    // onTag(tag, html, options) {
    //     console.log(options)
    //     if(tag==='label'){return html}
    //     if(tag === 'iframe') {return html.replace(/javascript:?/, '')}
    // },
    // 避免把页面样式过滤掉
    onIgnoreTagAttr(tag, name, value, isWhiteAttr) {
    // 过滤掉标签上的事件
        console.log(tag+isWhiteAttr)
        if (/^[^on]/.test(name)) {return name + '="' + xss.escapeAttrValue(value) + '"'}
    },
}
const filter = new xss.FilterXSS(options)

export default filter
