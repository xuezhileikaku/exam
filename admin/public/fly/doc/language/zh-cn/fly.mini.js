__ = 
{
    name : "",
    remark : "path:fly.mini \r\n\n\n\nemail:flyui&hotmail.com",
    title : "Lightweight front-end framework",
    version : "1.0",
    site : "http://mini.flyui.net",
    source : "",
    copy : "Copyright (c) 2010-2011 KuiyouLi",
    classes : [
    {
        name : "mini",
        remark : "",
        path : "fly.mini",
        properties : [{
            name : "emptyImg",
            remark : "空图片地址",
            type : "String"
        }, 
        {
            name : "isIE6",
            remark : "是否IE6浏览器",
            type : "Boolean"
        }],
        methods : [{
            name : "extendIf",
            remark : "扩展,扩展前检测是否存在",
            args : [{
                name : "target",
                remark : "被扩展的对象",
                type : ""
            }, 
            {
                name : "overrides",
                remark : "包含扩展成员的任意多个参数",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : "@target"
            }
        }, 
        {
            name : "$",
            remark : "通过id获取dom对象",
            args : [{
                name : "id",
                remark : "dom对象id",
                type : "String/Dom"
            }],
            ret : 
            {
                name : "",
                remark : "Dom对象",
                type : "Dom"
            }
        }, 
        {
            name : "extend",
            remark : "扩展",
            args : [{
                name : "target",
                remark : "被扩展的对象",
                type : ""
            }, 
            {
                name : "overrides",
                remark : "包含扩展成员的任意多个参数",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : "@target"
            }
        }, 
        {
            name : "isArray",
            remark : "检测对象是否是数组",
            args : [{
                name : "obj",
                remark : "要检测的对象",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : "Boolean"
            }
        }, 
        {
            name : "isStr",
            remark : "检测对象是否是字符串",
            args : [{
                name : "obj",
                remark : "要检测的对象",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : "Boolean"
            }
        }, 
        {
            name : "isFun",
            remark : "检测对象是否是函数",
            args : [{
                name : "obj",
                remark : "要检测的对象",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : "Boolean"
            }
        }, 
        {
            name : "ifFun",
            remark : "假如对象是函数，则返回执行函数的返回值，否则返回对象本身",
            args : [{
                name : "obj",
                remark : "要检测的对象",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : "Boolean"
            }
        }, 
        {
            name : "isObj",
            remark : "检测对象是否是Object",
            args : [{
                name : "obj",
                remark : "要检测的对象",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : "Boolean"
            }
        }, 
        {
            name : "falseFun",
            remark : "一个返回false的函数",
            args : [],
            ret : 
            {
                name : "",
                remark : "",
                type : "Boolean"
            }
        }, 
        {
            name : "ajax",
            remark : "执行Ajax请求的方法，fly.mini不提供，如需执行Ajax请求，请自行实现该方法",
            args : [{
                name : "option",
                remark : "执行Ajax请求的选项",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "format",
            remark : "格式化\r\n    调用示例：\r\n    var str=fly.mini.format(\"a{0}c{1}\",\"b\",\"d\")\r\n    调用结果 str 等于“abcd”\r\n\r\n    var obj={f1:1,f2:2}\r\n    var str=fly.mini.format(\"{f1}+{f2}={0}\",3,obj)\r\n    调用结果 str 等于“1+2=3”",
            args : [{
                name : "data",
                remark : "要格式话的对象，目前仅支持字符串",
                type : "String"
            }, 
            {
                name : "objs",
                remark : "可变参数",
                type : "Object"
            }],
            ret : 
            {
                name : "",
                remark : "格式化得到的字符串",
                type : "String"
            }
        }, 
        {
            name : "insertElement",
            remark : "将dom对象插入指定位置",
            args : [{
                name : "parent",
                remark : "将dom插入该容器",
                type : "Dom"
            }, 
            {
                name : "ref",
                remark : "插入位置参考对象",
                type : "Dom/null"
            }, 
            {
                name : "dom",
                remark : "要插入的对象",
                type : "Dom"
            }, 
            {
                name : "where",
                remark : "beforeBegin、afterEnd、beforeEnd、afterBegin 要插入的位置",
                type : "String"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "insertBefore",
            remark : "将dom对象插入指定对象前面",
            args : [{
                name : "parent",
                remark : "将dom插入该容器",
                type : "Dom"
            }, 
            {
                name : "ref",
                remark : "插入位置参考对象",
                type : "Dom/null"
            }, 
            {
                name : "dom",
                remark : "要插入的对象",
                type : "Dom"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "insertAfter",
            remark : "将dom对象插入指定对象后面",
            args : [{
                name : "parent",
                remark : "将dom插入该容器",
                type : "Dom"
            }, 
            {
                name : "ref",
                remark : "插入位置参考对象",
                type : "Dom/null"
            }, 
            {
                name : "dom",
                remark : "要插入的对象",
                type : "Dom"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "attachEvent",
            remark : "为dom对象绑定事件",
            args : [{
                name : "dom",
                remark : "要绑定事件的对象",
                type : "Dom"
            }, 
            {
                name : "e",
                remark : "要绑定的事件",
                type : "String"
            }, 
            {
                name : "fn",
                remark : "为事件绑定的回调函数",
                type : "Function"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "bindEvents",
            remark : "为对象多个成员绑定事件\r\n    调用示例：\r\n            \r\n    var obj={body:document.body,form:document.forms[0]};\r\n    function callback(){\r\n        alert(\'回调\')\r\n    }\r\n\r\n    fly.mini.bindEvents(obj,{body:\"click\",form:\"keydown\"},callback);\r\n    以上代码为document.body绑定click事件，为第一个form绑定 keydown事件",
            args : [{
                name : "obj",
                remark : "包含dom成员的对象",
                type : ""
            }, 
            {
                name : "events",
                remark : "key：成员名称，value为成员绑定的事件名称",
                type : "KeyValue"
            }, 
            {
                name : "fn",
                remark : "为事件绑定的回调函数",
                type : "Function"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "ie6aHover",
            remark : "为a标签在IE6下设置鼠标事件",
            args : [{
                name : "a",
                remark : "a标签",
                type : "Dom"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "changeCss",
            remark : "改变CSS样式\r\n    调用示例：\r\n    var cls=fly.mini.changeCss(document.body,\"css-blue css-red\",\"css-yellow\")\r\n    给 document.body 移除 css-blue 和 css-red 样式后，追加 css-yellow 样式\r\n        \r\n    var oldCls=\"css-gray css-blue css-red\"\r\n    var cls=fly.mini.changeCss(oldCls,\"css-blue css-red\",\"css-yellow\")\r\n    给 oldCls 移除 css-blue 和 css-red 样式后，追加 css-yellow 样式\r\n    调用结果 cls 等于“css-gray css-yellow”\r\n\r\n    注意：\r\n    该方法执行是先移除后追加，如果同一个样式同时出现在 removeCss 和 addCss 参数中时，该样式最终被追加，如：\r\n    var oldCls=\"css-gray a b\"\r\n    var cls=fly.mini.changeCss(oldCls,\"a b\",\"b\")\r\n    给 oldCls 移除 a 和 b 样式后，追加 b 样式\r\n    调用结果 cls 等于 “css-gray b”",
            args : [{
                name : "dom",
                remark : "要改变样式的dom对象或字符串",
                type : "Dom/String"
            }, 
            {
                name : "removeCss",
                remark : "要移除的样式,多个样式用空格隔开",
                type : "String"
            }, 
            {
                name : "addCss",
                remark : "要追加的样式,多个样式用空格隔开",
                type : "String"
            }],
            ret : 
            {
                name : "",
                remark : "改变后的样式",
                type : "String"
            }
        }, 
        {
            name : "addCss",
            remark : "追加CSS样式",
            args : [{
                name : "dom",
                remark : "要追加样式的dom对象或字符串",
                type : "Dom/String"
            }, 
            {
                name : "css",
                remark : "要追加的样式,多个样式用空格隔",
                type : "String"
            }],
            ret : 
            {
                name : "",
                remark : "追加后的样式",
                type : "String"
            }
        }, 
        {
            name : "removeCss",
            remark : "移除CSS样式",
            args : [{
                name : "dom",
                remark : "要移除样式的dom对象或字符串",
                type : "Dom/String"
            }, 
            {
                name : "css",
                remark : "要移除的样式,多个样式用空格隔",
                type : "String"
            }],
            ret : 
            {
                name : "",
                remark : "移除后的样式",
                type : "String"
            }
        }, 
        {
            name : "destory",
            remark : "销毁dom对象,",
            args : [{
                name : "dom",
                remark : "要移除的dom对象",
                type : "Dom"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "remove",
            remark : "移除dom对象,",
            args : [{
                name : "dom",
                remark : "要移除的dom对象",
                type : "Dom"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "remove",
            remark : "移除dom对象,\r\n    //",
            args : [{
                name : "dom",
                remark : "要移除的dom对象\r\n    //",
                type : "Dom"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "append",
            remark : "移除dom对象,\r\n    //",
            args : [{
                name : "dom",
                remark : "附加被移除的 dom 对象\r\n    //",
                type : "Dom"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "scope",
            remark : "改变函数调用中 this 的值",
            args : [{
                name : "fn",
                remark : "被改变的函数",
                type : "Function"
            }, 
            {
                name : "scope",
                remark : "的值",
                type : "this"
            }],
            ret : 
            {
                name : "",
                remark : "将函数包裹后得到的函数",
                type : ""
            }
        }, 
        {
            name : "inherit",
            remark : "将类从另一个类继承",
            args : [{
                name : "sun",
                remark : "子类",
                type : "Class"
            }, 
            {
                name : "base",
                remark : "基类",
                type : "Class/Object"
            }, 
            {
                name : "extand",
                remark : "同时扩展的新成员",
                type : "KeyValue(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "each",
            remark : "遍历数组每一项或对象每一个成员",
            args : [{
                name : "obj",
                remark : "被遍历的数组或键值对",
                type : "Array/KeyValue"
            }, 
            {
                name : "fn",
                remark : "处理每一项的函数，返回 false 将停止遍历",
                type : "Function"
            }, 
            {
                name : "scope",
                remark : "域",
                type : "Object(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "如果遍历过程中途停止，则返回导致遍历过程停止的项，否则没有返回值",
                type : "Object/undefined"
            }
        }, 
        {
            name : "eachAll",
            remark : "遍历所有项，通常用来遍历树形结构",
            args : [{
                name : "items",
                remark : "被遍历的数组或单个节点",
                type : "Array/Object"
            }, 
            {
                name : "children",
                remark : "获取子节点函数或指向子级节点的属性名",
                type : "String/Function"
            }, 
            {
                name : "fn",
                remark : "处理每一项的函数，返回 false 将停止遍历",
                type : "Function"
            }, 
            {
                name : "level",
                remark : "被遍历的层次",
                type : "Int(可选)"
            }, 
            {
                name : "childBefore",
                remark : "方向,true 表示从内到外,否则从外到内",
                type : "Boolean(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "如果遍历过程中途停止，则返回导致遍历过程停止的节点，否则没有返回值",
                type : "Object/undefined"
            }
        }, 
        {
            name : "queryAll",
            remark : "查找所有项，通常用来查找树形结构",
            args : [{
                name : "items",
                remark : "被查找的数组或单个节点",
                type : "Array/Object"
            }, 
            {
                name : "children",
                remark : "获取子节点函数或指向子级节点的属性名",
                type : "String/Function"
            }, 
            {
                name : "filter",
                remark : "判断每一项是否符合要求的函数或值，返回 false 将停止遍历",
                type : "Function/Object"
            }, 
            {
                name : "level",
                remark : "被遍历的层次，",
                type : "Int(可选)"
            }, 
            {
                name : "take",
                remark : "获取的节点数",
                type : "Int(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "查找的节点数组",
                type : "Array"
            }
        }, 
        {
            name : "eachParent",
            remark : "遍历树形结构中节点的所有上级节点",
            args : [{
                name : "item",
                remark : "当前节点",
                type : ""
            }, 
            {
                name : "fn",
                remark : "处理节点的函数，返回 false 将停止遍历",
                type : "Function"
            }, 
            {
                name : "level",
                remark : "被遍历的层次，",
                type : "Int(可选)"
            }, 
            {
                name : "parent",
                remark : "获取上级节点函数或指向上级节点的属性名,默认“parent属性”",
                type : "String/Function(可选)"
            }, 
            {
                name : "includeSelf",
                remark : "是否包含自身，默认不包含",
                type : "Boolean(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "如果遍历过程中途停止，则返回导致遍历过程停止的节点，否则没有返回值",
                type : "Object/undefined"
            }
        }, 
        {
            name : "indexOf",
            remark : "查找元素在数组中的位置",
            args : [{
                name : "obj",
                remark : "元素",
                type : ""
            }, 
            {
                name : "arr",
                remark : "数组，在该数组中查找",
                type : "Array"
            }],
            ret : 
            {
                name : "",
                remark : "如果找到，则返回元素在数组中从0开始的索引，否则返回 -1",
                type : "Int"
            }
        }],
        events : []
    }, 
    {
        name : "ajaxOption",
        remark : "构造Ajax请求选项",
        path : "fly.mini.ajaxOption",
        properties : [{
            name : "url",
            remark : "请求的 url",
            type : "Ajax"
        }],
        methods : [{
            name : "callback",
            remark : "Ajax请求的 url",
            args : [{
                name : "result",
                remark : "Ajax请求的返回值",
                type : "String"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }],
        events : []
    }, 
    {
        name : "selectionMode",
        remark : "元素选择模式",
        path : "fly.mini.selectionMode",
        properties : [{
            name : "none",
            remark : "禁止选择",
            type : "String"
        }, 
        {
            name : "multi",
            remark : "多选",
            type : "String"
        }, 
        {
            name : "single",
            remark : "单选",
            type : "String"
        }, 
        {
            name : "singleByLevel",
            remark : "同一层内单选",
            type : "String"
        }],
        methods : [],
        events : []
    }, 
    {
        name : "checkStyle",
        remark : "元素Checkbox样式",
        path : "fly.mini.checkStyle",
        properties : [{
            name : "auto",
            remark : "自动",
            type : "String"
        }, 
        {
            name : "check",
            remark : "复选框",
            type : "String"
        }, 
        {
            name : "radio",
            remark : "单选框",
            type : "String"
        }],
        methods : [],
        events : []
    }, 
    {
        name : "checkMode",
        remark : "元素Checkbox选中模式",
        path : "fly.mini.checkMode",
        properties : [{
            name : "none",
            remark : "禁止选择",
            type : "String"
        }, 
        {
            name : "multi",
            remark : "多选",
            type : "String"
        }, 
        {
            name : "single",
            remark : "单选",
            type : "String"
        }, 
        {
            name : "singleByLevel",
            remark : "同一层内单选",
            type : "String"
        }],
        methods : [],
        events : []
    }, 
    {
        name : "BaseItem",
        remark : "节点基类",
        path : "fly.mini.BaseItem",
        properties : [{
            name : "owner",
            remark : "节点所属 List 控件",
            type : "fly.mini.BaseList"
        }, 
        {
            name : "isRoot",
            remark : "节点是否根节点",
            type : "Boolean"
        }, 
        {
            name : "leaf",
            remark : "节点是否叶节点",
            type : "Boolean"
        }, 
        {
            name : "selected",
            remark : "节点是否选中",
            type : "Boolean"
        }, 
        {
            name : "handler",
            remark : "节点单击时的处理函数",
            type : "Function"
        }, 
        {
            name : "domCreated",
            remark : "节点dom对象是否已创建",
            type : "Boolean"
        }, 
        {
            name : "icon",
            remark : "节点图标",
            type : ""
        }, 
        {
            name : "iconCss",
            remark : "节点图标样式",
            type : ""
        }, 
        {
            name : "items",
            remark : "子节点",
            type : "Array"
        }, 
        {
            name : "itemsLayout",
            remark : "子节点布局方式",
            type : "String"
        }, 
        {
            name : "rendered",
            remark : "是否已呈现",
            type : "Boolean"
        }, 
        {
            name : "expanded",
            remark : "是否展开",
            type : "Boolean"
        }, 
        {
            name : "hidden",
            remark : "是否已隐藏",
            type : ""
        }],
        methods : [{
            name : "load",
            remark : "加载子节点",
            args : [{
                name : "data",
                remark : "数组或通过Ajax请求的url",
                type : "Array/String"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "add",
            remark : "添加子节点",
            args : [{
                name : "items",
                remark : "要添加的任意多个节点",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "insert",
            remark : "插入子节点到指定位置",
            args : [{
                name : "index",
                remark : "插入子节点的位置",
                type : ""
            }, 
            {
                name : "items",
                remark : "要插入的任意多个节点",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "remove",
            remark : "移除子节点",
            args : [{
                name : "items",
                remark : "要移除的任意多个节点",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "createPad",
            remark : "创建子节点容器",
            args : [],
            ret : 
            {
                name : "",
                remark : "",
                type : "void"
            }
        }, 
        {
            name : "syncItems",
            remark : "同步节点",
            args : [],
            ret : 
            {
                name : "",
                remark : "",
                type : "void"
            }
        }, 
        {
            name : "setText",
            remark : "设置节点 text",
            args : [{
                name : "text",
                remark : "text属性",
                type : "String"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "render",
            remark : "呈现节点",
            args : [{
                name : "owner",
                remark : "节点所属控件",
                type : "fly.mini.BaseList"
            }, 
            {
                name : "container",
                remark : "容器，将节点呈现到该容器内",
                type : "Dom"
            }, 
            {
                name : "index",
                remark : "位置",
                type : "Int"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "toggle",
            remark : "呈现节点",
            args : [],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "collapseAll",
            remark : "折叠所有节点",
            args : [{
                name : "ids",
                remark : "节点数组或节点id数组",
                type : "Array"
            }],
            ret : 
            {
                name : "",
                remark : "全部折叠返回 true,否则返回 false",
                type : "Boolean"
            }
        }, 
        {
            name : "collapse",
            remark : "折叠节点",
            args : [],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "expandAll",
            remark : "展开所有节点",
            args : [{
                name : "ids",
                remark : "节点数组或节点id数组",
                type : "Array"
            }],
            ret : 
            {
                name : "",
                remark : "全部展开返回 true,否则返回 false",
                type : "Boolean"
            }
        }, 
        {
            name : "expand",
            remark : "展开节点",
            args : [{
                name : "expandParent",
                remark : "同时展开上级节点 ,为Int表示展开的层数",
                type : "Boolean/Int"
            }, 
            {
                name : "callback",
                remark : "所有节点显示完毕的回调函数,没启用延迟处理时无效",
                type : "Function"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "queryItems",
            remark : "查询节点",
            args : [{
                name : "prop",
                remark : "用来筛选的属性名称",
                type : "String"
            }, 
            {
                name : "value",
                remark : "用来筛选的属性值",
                type : "Object"
            }, 
            {
                name : "take",
                remark : "获取的节点数,默认无限制",
                type : "Int(可选)"
            }, 
            {
                name : "level",
                remark : "变量的层次,默认所有",
                type : "Int(可选)"
            }, 
            {
                name : "includeSelf",
                remark : "包含当前节点自身,默认不包含",
                type : "Boolean(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "复合条件的节点数组",
                type : "Array"
            }
        }, 
        {
            name : "getSelectItems",
            remark : "获取所有选择节点",
            args : [{
                name : "selected",
                remark : "选择状态,true获取所有选中节点,false获取所有未选中节点，默认true",
                type : "Boolean"
            }, 
            {
                name : "take",
                remark : "获取的节点数,默认无限制",
                type : "Int(可选)"
            }, 
            {
                name : "level",
                remark : "变量的层次,默认所有",
                type : "Int(可选)"
            }, 
            {
                name : "includeSelf",
                remark : "包含当前节点自身,默认不包含",
                type : "Boolean(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "复合条件的节点数组",
                type : "Array"
            }
        }, 
        {
            name : "select",
            remark : "选择节点",
            args : [{
                name : "selected",
                remark : "选择状态",
                type : "Boolean"
            }, 
            {
                name : "expandParent",
                remark : "同时展开上级节点 ,为Int表示展开的层数",
                type : "Boolean/Int"
            }, 
            {
                name : "allow",
                remark : "获取的节点数,默认无限制",
                type : "Int(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "未执行选择返回 false, 否则不返回值",
                type : "Boolean/Null"
            }
        }, 
        {
            name : "selectAll",
            remark : "选择所有节点",
            args : [{
                name : "selected",
                remark : "选择状态",
                type : "Boolean(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "全部更改为指定状态返回 true,否则返回 false",
                type : "Boolean"
            }
        }, 
        {
            name : "bindEvents",
            remark : "绑定事件",
            args : [],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "eachAll",
            remark : "遍历所有项",
            args : [{
                name : "fn",
                remark : "处理项的函数\r\n            ids  :Array<BaseItem>/Array<String>/String/Boolean(可选) 默认所有节点,包含当前节点,可以是节点列表,可以是节点的id列表，可以是以“,”分隔的节点id字符串，false 遍历所有子节点,true 表示包含节点本身",
                type : "Function"
            }, 
            {
                name : "level",
                remark : "默认所有",
                type : "Int(可选)"
            }, 
            {
                name : "childBefore",
                remark : "方向,true 表示从内到外,否则从外到内",
                type : "Boolean(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "如果遍历过程中途停止，则返回导致遍历过程停止的节点，否则没有返回值",
                type : "Object/undefined"
            }
        }, 
        {
            name : "eachItems",
            remark : "遍历子节点,不包含子节点的下级节点",
            args : [{
                name : "fn",
                remark : "处理项的函数",
                type : "Function"
            }, 
            {
                name : "ids",
                remark : "默认所有节点",
                type : "Array(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "如果遍历过程中途停止，则返回导致遍历过程停止的节点，否则没有返回值",
                type : "Object/undefined"
            }
        }, 
        {
            name : "",
            remark : "隐藏节点",
            args : [],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "hide",
            remark : "隐藏节点",
            args : [{
                name : "hideParent",
                remark : "同时隐藏上级节点 ,为Int表示层数",
                type : "Boolean/Int"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "show",
            remark : "显示节点",
            args : [{
                name : "showParent",
                remark : "同时显示上级节点 ,为Int表示层数",
                type : "Boolean/Int"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "showAll",
            remark : "显示所有节点",
            args : [{
                name : "ids",
                remark : "节点数组或节点id数组",
                type : "Array"
            }],
            ret : 
            {
                name : "",
                remark : "全部显示返回 true,否则返回 false",
                type : "Boolean"
            }
        }, 
        {
            name : "hideAll",
            remark : "隐藏所有节点",
            args : [{
                name : "ids",
                remark : "节点数组或节点id数组",
                type : "Array"
            }],
            ret : 
            {
                name : "",
                remark : "全部隐藏返回 true,否则返回 false",
                type : "Boolean"
            }
        }],
        events : []
    }, 
    {
        name : "BaseList",
        remark : "列表控件基类",
        path : "fly.mini.BaseList",
        properties : [{
            name : "selectedItems",
            remark : "所有选中的节点",
            type : "Array<fly.mini.BaseItem>"
        }, 
        {
            name : "itemType",
            remark : "元素类型",
            type : ""
        }, 
        {
            name : "defaults",
            remark : "默认配置",
            type : ""
        }, 
        {
            name : "rootVisible",
            remark : "是否显示根节点，默认“auto”",
            type : "Boolean/String"
        }, 
        {
            name : "rendered",
            remark : "是否呈现",
            type : "Boolean"
        }, 
        {
            name : "quickly",
            remark : "快速处理",
            type : "Boolean"
        }, 
        {
            name : "itemKey",
            remark : "节点的key属性，默认“id”",
            type : "String"
        }, 
        {
            name : "itemMap",
            remark : "以节点key为键的节点列表",
            type : "KeyValue"
        }, 
        {
            name : "allItems",
            remark : "所有节点",
            type : "Array"
        }, 
        {
            name : "panelNarrow",
            remark : "节点热区较窄，默认false",
            type : "Boolean"
        }, 
        {
            name : "showBorder",
            remark : "是否显示边框，默认\"auto\",如果定义了width和height则显示",
            type : "Boolean/String"
        }, 
        {
            name : "autoScroll",
            remark : "是否自动显示滚动条,默认\"auto\",如果定义了width和height则显示",
            type : "Boolean"
        }, 
        {
            name : "iconDomFormat",
            remark : "创建节点图标的Html模板",
            type : "String"
        }, 
        {
            name : "textDomFormat",
            remark : "创建节点Text的Html模板",
            type : "String"
        }, 
        {
            name : "checkboxHtml",
            remark : "创建节点checkbox的Html",
            type : "String"
        }, 
        {
            name : "toggleButtonHtml",
            remark : "创建节点展开、折叠按钮的Html",
            type : "String"
        }, 
        {
            name : "checkboxPostion",
            remark : "checkbox位置,目前仅支持\"left\"和\"right\"",
            type : "String"
        }, 
        {
            name : "checkStyle",
            remark : "checkbox风格,默认根据checkMode自动识别",
            type : "fly.mini.checkStyle"
        }, 
        {
            name : "checkMode",
            remark : "节点勾选模式,默认不启用",
            type : "fly.mini.checkMode"
        }, 
        {
            name : "checkCascade",
            remark : "节点勾选关联配置\r\n            示例:\r\n            1. 以下配置表示不关联\r\n            checkCascade=0\r\n            或\r\n            checkCascade=fallse\r\n            或\r\n            checkCascade={\r\n            check: { parent: 0, children: 0 },\r\n            uncheck: { parent: 0, children: 0 }\r\n            }\r\n        \r\n\r\n            2. 以下配置表示,勾选时同步上级节点和下级节点\r\n            checkCascade=true\r\n            或\r\n            checkCascade={\r\n            check: { parent: true, children: true },\r\n            uncheck: { parent: true, children: true }\r\n            }\r\n\r\n            3. 以下配置表示,选中时同步2级上级节点和所有下级节点,取消选中时不影响上级节点,同步第一层下级节点\r\n            checkCascade={\r\n            check: { parent: 2, children: true },\r\n            uncheck: { parent: false, children: 1 }\r\n            }",
            type : ""
        }, 
        {
            name : "useCheckHalf",
            remark : "是否启用半选状态",
            type : "Boolean"
        }, 
        {
            name : "selectionMode",
            remark : "节点选择模式,默认单选",
            type : "fly.mini.selectionMode"
        }, 
        {
            name : "leastSelectionOne",
            remark : "至少选中一项,默认根据 selectionMode 自动识别",
            type : "Boolean/String"
        }, 
        {
            name : "selectEvents",
            remark : "触发节点选择的事件,key:节点的dom属性,value事件类型",
            type : "KeyValue"
        }, 
        {
            name : "checkEvents",
            remark : "触发节点勾选的事件,key:节点的dom属性,value事件类型",
            type : "KeyValue"
        }, 
        {
            name : "toggleEvents",
            remark : "触发节点展开和折叠的事件,key:节点的dom属性,value事件类型",
            type : "KeyValue"
        }, 
        {
            name : "keepCheckAndSelectSync",
            remark : "保存节点勾选和选择状态一致",
            type : "Boolean"
        }, 
        {
            name : "toggleStyleCssPart",
            remark : "节点折叠按钮风格样式的前面部分",
            type : "String"
        }, 
        {
            name : "selectedCss",
            remark : "节点选中样式",
            type : "String"
        }, 
        {
            name : "expandCss",
            remark : "节点展开样式",
            type : "String"
        }, 
        {
            name : "collapseCss",
            remark : "节点折叠样式",
            type : "String"
        }, 
        {
            name : "itemCss",
            remark : "节点样式",
            type : "String"
        }, 
        {
            name : "parentItemCss",
            remark : "包含子节点的节点样式",
            type : "String"
        }, 
        {
            name : "leafItemCss",
            remark : "不包含子节点的节点样式",
            type : "String"
        }, 
        {
            name : "wrapCss",
            remark : "节点最外层容器样式",
            type : "String"
        }, 
        {
            name : "padCss",
            remark : "子节点容器样式",
            type : "String"
        }, 
        {
            name : "effectCss",
            remark : "启用效果的样式",
            type : "String"
        }, 
        {
            name : "checkedCss",
            remark : "节点Check状态为勾选的样式",
            type : "String"
        }, 
        {
            name : "checkStylePart",
            remark : "节点Checkbox按钮风格样式的前面部分",
            type : "String"
        }, 
        {
            name : "firstItemCssPart",
            remark : "第一个子节点的样式",
            type : "String"
        }, 
        {
            name : "lastItemCssPart",
            remark : "最后个子节点的样式",
            type : "String"
        }, 
        {
            name : "iconSizeCss",
            remark : "定义图标大小的样式",
            type : "String"
        }, 
        {
            name : "useEffect",
            remark : "是否启用效果",
            type : "Boolean"
        }, 
        {
            name : "navTarget",
            remark : "当给节点配置 href 连接时,打开连接的目标窗口,默认新窗口",
            type : "String"
        }, 
        {
            name : "showToggle",
            remark : "是否显示折叠按钮",
            type : "Boolean"
        }, 
        {
            name : "toggleStyle",
            remark : "折叠按钮风格",
            type : "String"
        }, 
        {
            name : "showLine",
            remark : "是否显示层次线条",
            type : "Boolean"
        }, 
        {
            name : "lineCss",
            remark : "节点线条的样式",
            type : "String"
        }, 
        {
            name : "css",
            remark : "CSS样式",
            type : "String"
        }, 
        {
            name : "handlerEvent",
            remark : "触发节点回调函数的事件类型",
            type : "String"
        }, 
        {
            name : "itemHandler",
            remark : "通用的节点回调函数",
            type : "Function"
        }, 
        {
            name : "height",
            remark : "高",
            type : "String"
        }, 
        {
            name : "width",
            remark : "宽",
            type : "String"
        }],
        methods : [{
            name : "applyEffect",
            remark : "应用效果",
            args : [{
                name : "isPlay",
                remark : "是否播放",
                type : "Boolean"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "remove",
            remark : "移除",
            args : [{
                name : "destroy",
                remark : "是否销毁",
                type : ""
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "render",
            remark : "呈现",
            args : [{
                name : "container",
                remark : "容器",
                type : "Dom"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "join",
            remark : "将节点关联起来",
            args : [{
                name : "item",
                remark : "节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "load",
            remark : "加载节点数据",
            args : [{
                name : "data",
                remark : "数组或通过Ajax请求的url",
                type : "Array/String"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "eachAll",
            remark : "遍历所有节点",
            args : [{
                name : "item",
                remark : "要遍历的节点对象,默认根节点",
                type : "fly.mini.BaseItem(可选)"
            }, 
            {
                name : "fn",
                remark : "处理节点的函数,返回false 停止遍历",
                type : "Function"
            }, 
            {
                name : "level",
                remark : "要遍历的层,默认所有",
                type : "Int(可选)"
            }, 
            {
                name : "childBefore",
                remark : "方向,false 表示从内到外,否则从外到内",
                type : "Boolean"
            }],
            ret : 
            {
                name : "",
                remark : "如果遍历过程中途停止，则返回导致遍历过程停止的节点，否则没有返回值",
                type : "fly.mini.BaseItem/undefined"
            }
        }, 
        {
            name : "getSelectItems",
            remark : "获取所有选择节点",
            args : [{
                name : "item",
                remark : "节点,默认根节点",
                type : "fly.mini.BaseItem(可选)"
            }, 
            {
                name : "selected",
                remark : "选择状态,true获取所有选中节点,false获取所有未选中节点",
                type : "Boolean"
            }, 
            {
                name : "take",
                remark : "获取的节点数,默认无限制",
                type : "Int(可选)"
            }, 
            {
                name : "level",
                remark : "变量的层次,默认所有",
                type : "Int(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "复合条件的节点数组",
                type : "Array"
            }
        }, 
        {
            name : "collapseAll",
            remark : "折叠所有节点",
            args : [{
                name : "item",
                remark : "节点,默认根节点",
                type : "fly.mini.BaseItem(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "全部折叠返回 true,否则返回 false",
                type : "Boolean"
            }
        }, 
        {
            name : "expandAll",
            remark : "展开所有节点",
            args : [{
                name : "item",
                remark : "节点,默认根节点",
                type : "fly.mini.BaseItem(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "全部展开返回 true,否则返回 false",
                type : "Boolean"
            }
        }, 
        {
            name : "showAll",
            remark : "显示所有节点",
            args : [{
                name : "item",
                remark : "节点,默认根节点",
                type : "fly.mini.BaseItem(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "全部显示返回 true,否则返回 false",
                type : "Boolean"
            }
        }, 
        {
            name : "hideAll",
            remark : "隐藏所有节点",
            args : [{
                name : "item",
                remark : "节点,默认根节点",
                type : "fly.mini.BaseItem(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "全部隐藏返回 true,否则返回 false",
                type : "Boolean"
            }
        }],
        events : [{
            name : "onBeforeItemRender",
            remark : "在节点呈现前发生",
            args : [{
                name : "item",
                remark : "被呈现的节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "返回 false 将不再呈现该节点",
                type : "Boolean"
            }
        }, 
        {
            name : "onItemRender",
            remark : "在节点呈现后发生",
            args : [{
                name : "item",
                remark : "被呈现的节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "返回 false 将不再呈现该节点",
                type : "Boolean"
            }
        }, 
        {
            name : "onBeforeRender",
            remark : "在呈现前发生",
            args : [],
            ret : 
            {
                name : "",
                remark : "返回 false 将不再呈现该节点",
                type : "Boolean"
            }
        }, 
        {
            name : "onRender",
            remark : "在呈现后发生",
            args : [],
            ret : 
            {
                name : "",
                remark : "返回 false 将不再呈现该节点",
                type : "Boolean"
            }
        }, 
        {
            name : "onBeforeToggle",
            remark : "在切换节点展开/折叠前发生",
            args : [{
                name : "item",
                remark : "展开或折叠的节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "返回 false 将取消当前的操作",
                type : "Boolean"
            }
        }, 
        {
            name : "onToggle",
            remark : "在切换节点展开/折叠后发生",
            args : [{
                name : "item",
                remark : "展开或折叠的节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "onBeforeCollapse",
            remark : "在折叠节点前发生",
            args : [{
                name : "item",
                remark : "折叠的节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "返回 false 将取消当前的操作",
                type : "Boolean"
            }
        }, 
        {
            name : "onCollapse",
            remark : "在折叠节点后发生",
            args : [{
                name : "item",
                remark : "折叠的节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "onBeforeExpand",
            remark : "在展开节点前发生",
            args : [{
                name : "item",
                remark : "展开的节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "返回 false 将取消当前的操作",
                type : "Boolean"
            }
        }, 
        {
            name : "onExpand",
            remark : "在展开节点后发生",
            args : [{
                name : "item",
                remark : "展开的节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "onBeforeSelect",
            remark : "在选中节点前发生",
            args : [{
                name : "item",
                remark : "选中的节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "返回 false 将取消当前的操作",
                type : "Boolean"
            }
        }, 
        {
            name : "onSelect",
            remark : "在选中节点后发生",
            args : [{
                name : "item",
                remark : "选中的节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }, 
        {
            name : "onJoin",
            remark : "在节点和列表关联的时候发生",
            args : [{
                name : "item",
                remark : "节点对象",
                type : "fly.mini.BaseItem"
            }],
            ret : 
            {
                name : "",
                remark : "",
                type : ""
            }
        }]
    }, 
    {
        name : "Tree",
        remark : "树控件",
        path : "fly.mini.Tree",
        properties : [{
            name : "root",
            remark : "根节点",
            type : "fly.mini.Tree.Node"
        }, 
        {
            name : "itemType",
            remark : "节点类型,默认:fly.mini.Tree.Node",
            type : "Function"
        }],
        methods : [{
            name : "getCheckItems",
            remark : "获取所有勾选节点",
            args : [{
                name : "item",
                remark : "节点,默认根节点",
                type : "fly.mini.Tree.Node(可选)"
            }, 
            {
                name : "checked",
                remark : "勾选状态,true获取所有已勾选节点,false获取所有未勾选节点",
                type : "Boolean"
            }, 
            {
                name : "take",
                remark : "获取的节点数,默认无限制",
                type : "Int(可选)"
            }, 
            {
                name : "level",
                remark : "变量的层次,默认所有",
                type : "Int(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "复合条件的节点数组",
                type : "Array"
            }
        }, 
        {
            name : "checkAll",
            remark : "设置所有节点的勾选状态",
            args : [{
                name : "item",
                remark : "节点,默认根节点",
                type : "fly.mini.Tree.Node(可选)"
            }, 
            {
                name : "checked",
                remark : "勾选状态,true:选中,false未选中",
                type : "Boolean"
            }],
            ret : 
            {
                name : "",
                remark : "全部设置为指定状态返回 true,否则返回 false",
                type : "Boolean"
            }
        }],
        events : [],
        base : 'fly.mini.BaseList'
    }, 
    {
        name : "Node",
        remark : "树节点对象",
        path : "fly.mini.Tree.Node",
        properties : [],
        methods : [{
            name : "checkAll",
            remark : "设置所有节点的勾选状态",
            args : [{
                name : "checked",
                remark : "勾选状态,true:选中,false未选中",
                type : "Boolean"
            }, 
            {
                name : "ids",
                remark : "节点数组或节点id数组",
                type : "Array"
            }],
            ret : 
            {
                name : "",
                remark : "全部设置为指定状态返回 true,否则返回 false",
                type : "Boolean"
            }
        }, 
        {
            name : "check",
            remark : "设置节点的勾选状态",
            args : [{
                name : "checked",
                remark : "勾选状态,true:选中,false未选中",
                type : "Boolean"
            }],
            ret : 
            {
                name : "",
                remark : "设置被取消则返回false,否则没有返回值",
                type : "Boolean/Null"
            }
        }, 
        {
            name : "getCheckItems",
            remark : "获取所有勾选节点",
            args : [{
                name : "checked",
                remark : "勾选状态,true获取所有选中节点,false获取所有未选中节点，默认true",
                type : "Boolean"
            }, 
            {
                name : "take",
                remark : "获取的节点数,默认无限制",
                type : "Int(可选)"
            }, 
            {
                name : "level",
                remark : "变量的层次,默认所有",
                type : "Int(可选)"
            }, 
            {
                name : "includeSelf",
                remark : "包含当前节点自身,默认不包含",
                type : "Boolean(可选)"
            }],
            ret : 
            {
                name : "",
                remark : "复合条件的节点数组",
                type : "Array"
            }
        }],
        events : [],
        base : 'fly.mini.BaseItem'
    }]
}