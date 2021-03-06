__ =
{
    name: "",
    remark: "path: fly.mini \r \n \n \n \nemail: flyui & hotmail.com",
    title: "Lightweight front-end framework",
    version: "1.0",
    site: "http://mini.flyui.net",
    source: "",
    copy: "Copyright (c) 2010-2011 KuiyouLi",
    classes: [{
        name: "mini",
        remark: "",
        path: "fly.mini",
        properties: [{
            name: "emptyImg",
            remark: "empty picture address",
            type: "String"
        },
        {
            name: "isIE6",
            remark: "whether the IE6 browser.",
            type: "Boolean"
        }],
        methods: [{
            name: "extendIf",
            remark: "extension,before the extension detect if exists",
            args: [{
                name: "target",
                remark: "Be expanded object .",
                type: ""
            },
            {
                name: "overrides",
                remark: "contains the extended members of any number of parameters.",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: "@ target"
            }
        },
        {
            name: "$",
            remark: "get dom by element's id",
            args: [{
                name: "id",
                remark: "dom object id",
                type: "String / Dom"
            }],
            ret:
            {
                name: "",
                remark: "Dom object",
                type: "Dom"
            }
        },
        {
            name: "extend",
            remark: "expansion",
            args: [{
                name: "target",
                remark: "Be expanded object .",
                type: ""
            },
            {
                name: "overrides",
                remark: "contains the extended members of any number of parameters.",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: "@ target"
            }
        },
        {
            name: "isArray",
            remark: "test object is an array.",
            args: [{
                name: "obj",
                remark: "the object to be detected.",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: "Boolean"
            }
        },
        {
            name: "isStr",
            remark: "test object is a string.",
            args: [{
                name: "obj",
                remark: "the object to be detected.",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: "Boolean"
            }
        },
        {
            name: "isFun",
            remark: "test object is a function.",
            args: [{
                name: "obj",
                remark: "the object to be detected.",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: "Boolean"
            }
        },
        {
            name: "ifFun",
            remark: "If the object is a function, it returns to execute the function return value, otherwise return the object itself.",
            args: [{
                name: "obj",
                remark: "the object to be detected.",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: "Boolean"
            }
        },
        {
            name: "isObj",
            remark: "test object is Object",
            args: [{
                name: "obj",
                remark: "the object to be detected.",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: "Boolean"
            }
        },
        {
            name: "falseFun",
            remark: "a function that returns false.",
            args: [],
            ret:
            {
                name: "",
                remark: "",
                type: "Boolean"
            }
        },
        {
            name: "ajax",
            remark: "the implementation of the Ajax request method, fly.mini does not provide, for the implementation of an Ajax request, please implement this method on yourself.",
            args: [{
                name: "option",
                remark: "the implementation of the Ajax request option",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "format",
            remark: 'format \r \n call example: \r \n var str = fly.mini.format ("a{0}c{1}", "b", "d") \r \n call the result of str is equal to "abcd"\r \n \r \n var obj = {f1: 1, f2: 2} \r \n var str = fly.mini.format ("{f1} + {f2} = {0}", 3, obj) \r \n call the result of str is equal to "1 +2 = 3"',
            args: [{
                name: "data",
                remark: "If the object to format, currently supports only the string",
                type: "String"
            },
            {
                name: "objs",
                remark: "variable parameters",
                type: "Object"
            }],
            ret:
            {
                name: "",
                remark: "format to get the string",
                type: "String"
            }
        },
        {
            name: "insertElement",
            remark: "intsert the dom object into the specified location.",
            args: [{
                name: "parent",
                remark: "the dom into the container.",
                type: "Dom"
            },
            {
                name: "ref",
                remark: "into the position reference object",
                type: "Dom / null"
            },
            {
                name: "dom",
                remark: "To insert an object",
                type: "Dom"
            },
            {
                name: "where",
                remark: "beforeBegin, afterEnd, beforeEnd, afterBegin position to insert",
                type: "String"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "insertBefore",
            remark: "insert the dom object before the specified object",
            args: [{
                name: "parent",
                remark: "the dom into the container.",
                type: "Dom"
            },
            {
                name: "ref",
                remark: "into the position reference object",
                type: "Dom / null"
            },
            {
                name: "dom",
                remark: "To insert an object",
                type: "Dom"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "insertAfter",
            remark: "insert the object after the specified object",
            args: [{
                name: "parent",
                remark: "the dom into the container.",
                type: "Dom"
            },
            {
                name: "ref",
                remark: "into the position reference object",
                type: "Dom / null"
            },
            {
                name: "dom",
                remark: "To insert an object",
                type: "Dom"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "attachEvent",
            remark: "bind events for the dom object",
            args: [{
                name: "dom",
                remark: "the object to bind the event",
                type: "Dom"
            },
            {
                name: "e",
                remark: "to bind the event",
                type: "String"
            },
            {
                name: "fn",
                remark: "to bind a callback function for the event.",
                type: "Function"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "bindEvents",
            remark: 'To bind multiple members of event object \r \n call example: \r \n \r \n var obj = {body: document.body, form: document.forms [0]}; \r \n function callback () {\r \n alert ("callback") \r \n} \r \n \r \n fly.mini.bindEvents (obj, {body:"click", form: "keydown"}, callback); \r \n the above code to bind the click event for the document.body, for the first form bound keydown event',
            args: [{
                name: "obj",
                remark: "include members of the dom object",
                type: ""
            },
            {
                name: "events",
                remark: "key: member name, value binding for the member name of the event.",
                type: "KeyValue"
            },
            {
                name: "fn",
                remark: "to bind a callback function for the event.",
                type: "Function"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "ie6aHover",
            remark: "set up mouse event for a label in IE6",
            args: [{
                name: "a",
                remark: "a label",
                type: "Dom"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "changeCss",
            remark: 'to change the CSS style \r \n call example: \r \n var cls = fly.mini.changeCss (document.body, "css-blue css-red", "css-yellow") \r \n to document.body remove css-blue and css-red style, the additional css-yellow style \r \n \r \n var oldCls = "css-gray css-blue css-red"\r \n var cls = fly.mini.changeCss (oldCls, "css-blue css-red","css-yellow") \r \n to oldCls remove css-blue and css-red style, the additional css-yellow style \r \n cls call the result is equal to "css-gray css-yellow"\r \n \r \n Note: \r \n is the first implementation of the method after removal of an additional, if the same style at the same time in removeCss and addCss parameters, the style was eventually added, such as: \r \n var oldCls = "css-gray ab"\r \n var cls = fly.mini.changeCss (oldCls,"ab","b") \r \n to remove the a and b oldCls style, the additional b style \r \n cls call the result is equal to "css-gray b"',
            args: [{
                name: "dom",
                remark: "To change the style of the dom object or a string.",
                type: "Dom / String"
            },
            {
                name: "removeCss",
                remark: "To remove a style, a number of styles separated by a space.",
                type: "String"
            },
            {
                name: "addCss",
                remark: "To append the style, a number of styles separated by a space.",
                type: "String"
            }],
            ret:
            {
                name: "",
                remark: "changed the style.",
                type: "String"
            }
        },
        {
            name: "addCss",
            remark: "add CSS style",
            args: [{
                name: "dom",
                remark: "style to the dom object or append the string",
                type: "Dom / String"
            },
            {
                name: "css",
                remark: "To append the style, a number of styles separated by spaces.",
                type: "String"
            }],
            ret:
            {
                name: "",
                remark: "After an additional style",
                type: "String"
            }
        },
        {
            name: "removeCss",
            remark: "remove the CSS style",
            args: [{
                name: "dom",
                remark: "To remove the style of the dom object or a string.",
                type: "Dom / String"
            },
            {
                name: "css",
                remark: "To remove a style, a number of styles separated by spaces.",
                type: "String"
            }],
            ret:
            {
                name: "",
                remark: "After removing the style.",
                type: "String"
            }
        },
        {
            name: "destory",
            remark: "destroy dom object",
            args: [{
                name: "dom",
                remark: "To remove the dom object",
                type: "Dom"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "remove",
            remark: "Remove the dom object",
            args: [{
                name: "dom",
                remark: "To remove the dom object",
                type: "Dom"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "remove",
            remark: "Remove the dom object",
            args: [{
                name: "dom",
                remark: "To remove the dom object",
                type: "Dom"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "append",
            remark: "append the dom object",
            args: [{
                name: "dom",
                remark: "The new dom object",
                type: "Dom"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "scope",
            remark: "change the value of this that function call.",
            args: [{
                name: "fn",
                remark: "the function to be changed.",
                type: "Function"
            },
            {
                name: "scope",
                remark: "value",
                type: "this"
            }],
            ret:
            {
                name: "",
                remark: "After the function to be wrapped in a function.",
                type: ""
            }
        },
        {
            name: "inherit",
            remark: "the class inherits from another class.",
            args: [{
                name: "sun",
                remark: "subclass",
                type: "Class"
            },
            {
                name: "base",
                remark: "base class",
                type: "Class / Object"
            },
            {
                name: "extand",
                remark: "At the same time expanding the new members",
                type: "KeyValue (optional)"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "each",
            remark: "loop each member of array or object.",
            args: [{
                name: "obj",
                remark: "been through the array or the key",
                type: "Array / KeyValue"
            },
            {
                name: "fn",
                remark: "deal with each function returns false will stop the loop.",
                type: "Function"
            },
            {
                name: "scope",
                remark: "domain",
                type: "Object (optional)"
            }],
            ret:
            {
                name: "",
                remark: "If you stop halfway through the process, then return to lead through the process to stop the entry, otherwise there is no return value.",
                type: "Object / undefined"
            }
        },
        {
            name: "eachAll",
            remark: "loop of the items, often used to loop the tree structure",
            args: [{
                name: "items",
                remark: "The array is traversed or a single node.",
                type: "Array / Object"
            },
            {
                name: "children",
                remark: "Get the child node function or point to the attribute name of child nodes.",
                type: "String / Function"
            },
            {
                name: "fn",
                remark: "deal with each function returns false will stop the traversal.",
                type: "Function"
            },
            {
                name: "level",
                remark: "the level need to loop.",
                type: "Int (optional)"
            },
            {
                name: "childBefore",
                remark: "direction, true that from the inside out, or from outside to inside.",
                type: "Boolean (optional)"
            }],
            ret:
            {
                name: "",
                remark: "If you stop halfway through the process, then return to lead through the process to stop the node, otherwise there is no return value.",
                type: "Object / undefined"
            }
        },
        {
            name: "queryAll",
            remark: "Find all the items, often used to find the tree structure",
            args: [{
                name: "items",
                remark: "an array or a single node that need to be query.",
                type: "Array / Object"
            },
            {
                name: "children",
                remark: "Get the child node function or point to the attribute name of child nodes.",
                type: "String / Function"
            },
            {
                name: "filter",
                remark: "to determine whether the requirements of each function or value, return false will stop the traversal.",
                type: "Function / Object"
            },
            {
                name: "level",
                remark: "the level need to loop",
                type: "Int (optional)"
            },
            {
                name: "take",
                remark: "access nodes",
                type: "Int (optional)"
            }],
            ret:
            {
                name: "",
                remark: "Find an array of nodes",
                type: "Array"
            }
        },
        {
            name: "eachParent",
            remark: "traverse all nodes in the tree structure of parent nodes",
            args: [{
                name: "item",
                remark: "the current node.",
                type: ""
            },
            {
                name: "fn",
                remark: "processing nodes function, returns false will stop the traversal.",
                type: "Function"
            },
            {
                name: "level",
                remark: "been through the level",
                type: "Int (optional)"
            },
            {
                name: "parent",
                remark: 'Get higher points higher node node function or attribute names, default "parent property".',
                type: "String / Function (optional)"
            },
            {
                name: "includeSelf",
                remark: "contains its own, the default does not contain",
                type: "Boolean (optional)"
            }],
            ret:
            {
                name: "",
                remark: "If you stop halfway through the process, then return to lead through the process to stop the node, otherwise there is no return value.",
                type: "Object / undefined"
            }
        },
        {
            name: "indexOf",
            remark: "Find the location of element in the array.",
            args: [{
                name: "obj",
                remark: "element",
                type: ""
            },
            {
                name: "arr",
                remark: "array in the array to find",
                type: "Array"
            }],
            ret:
            {
                name: "",
                remark: "If found, return the element in the array starting from 0 index, or -1",
                type: "Int"
            }
        }],
        events: []
    },
    {
        name: "ajaxOption",
        remark: "Ajax request options structure",
        path: "fly.mini.ajaxOption",
        properties: [{
            name: "url",
            remark: "request url",
            type: "Ajax"
        }],
        methods: [{
            name: "callback",
            remark: "Ajax request url",
            args: [{
                name: "result",
                remark: "Ajax request the return value",
                type: "String"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        }],
        events: []
    },
    {
        name: "selectionMode",
        remark: "element selection mode",
        path: "fly.mini.selectionMode",
        properties: [{
            name: "none",
            remark: "Prohibition of choice",
            type: "String"
        },
        {
            name: "multi",
            remark: "multiple choice",
            type: "String"
        },
        {
            name: "single",
            remark: "radio",
            type: "String"
        },
        {
            name: "singleByLevel",
            remark: "the same level within the radio.",
            type: "String"
        }],
        methods: [],
        events: []
    },
    {
        name: "checkStyle",
        remark: "Checkbox element of style.",
        path: "fly.mini.checkStyle",
        properties: [{
            name: "auto",
            remark: "Auto",
            type: "String"
        },
        {
            name: "check",
            remark: "checkbox",
            type: "String"
        },
        {
            name: "radio",
            remark: "single box",
            type: "String"
        }],
        methods: [],
        events: []
    },
    {
        name: "checkMode",
        remark: "Checkbox selected element model",
        path: "fly.mini.checkMode",
        properties: [{
            name: "none",
            remark: "Prohibition of choice",
            type: "String"
        },
        {
            name: "multi",
            remark: "multiple choice",
            type: "String"
        },
        {
            name: "single",
            remark: "radio",
            type: "String"
        },
        {
            name: "singleByLevel",
            remark: "the same level within the radio.",
            type: "String"
        }],
        methods: [],
        events: []
    },
    {
        name: "BaseItem",
        remark: "Node base class.",
        path: "fly.mini.BaseItem",
        properties: [{
            name: "owner",
            remark: "node belongs to the List control.",
            type: "fly.mini.BaseList"
        },
        {
            name: "isRoot",
            remark: "whether the root node.",
            type: "Boolean"
        },
        {
            name: "leaf",
            remark: "node is a leaf node.",
            type: "Boolean"
        },
        {
            name: "selected",
            remark: "node is selected.",
            type: "Boolean"
        },
        {
            name: "handler",
            remark: "node when clicked handler",
            type: "Function"
        },
        {
            name: "domCreated",
            remark: "Node dom object has been created.",
            type: "Boolean"
        },
        {
            name: "icon",
            remark: "node icon",
            type: ""
        },
        {
            name: "iconCss",
            remark: "node icon style.",
            type: ""
        },
        {
            name: "items",
            remark: "child nodes",
            type: "Array"
        },
        {
            name: "itemsLayout",
            remark: "sub-node layout.",
            type: "String"
        },
        {
            name: "rendered",
            remark: "whether the present",
            type: "Boolean"
        },
        {
            name: "expanded",
            remark: "whether to proceed",
            type: "Boolean"
        },
        {
            name: "hidden",
            remark: "it has been hidden.",
            type: ""
        }],
        methods: [{
            name: "load",
            remark: "Loading child nodes",
            args: [{
                name: "data",
                remark: "array or an Ajax request url",
                type: "Array / String"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "add",
            remark: "Add a child node",
            args: [{
                name: "items",
                remark: "you want to add any number of nodes.",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "insert",
            remark: "insert the child node to the specified location.",
            args: [{
                name: "index",
                remark: "insert the child node position",
                type: ""
            },
            {
                name: "items",
                remark: "to insert any number of nodes.",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "remove",
            remark: "Remove child nodes",
            args: [{
                name: "items",
                remark: "To remove any number of nodes",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "createPad",
            remark: "create a child node container",
            args: [],
            ret:
            {
                name: "",
                remark: "",
                type: "void"
            }
        },
        {
            name: "syncItems",
            remark: "synchronous node",
            args: [],
            ret:
            {
                name: "",
                remark: "",
                type: "void"
            }
        },
        {
            name: "setText",
            remark: "Set the node text",
            args: [{
                name: "text",
                remark: "text properties",
                type: "String"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "render",
            remark: "show node",
            args: [{
                name: "owner",
                remark: "node belongs to control",
                type: "fly.mini.BaseList"
            },
            {
                name: "container",
                remark: "container, the container node to the present.",
                type: "Dom"
            },
            {
                name: "index",
                remark: "position",
                type: "Int"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "toggle",
            remark: "show node",
            args: [],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "collapseAll",
            remark: "collapse all nodes.",
            args: [{
                name: "ids",
                remark: "node array or node id array,",
                type: "Array"
            }],
            ret:
            {
                name: "",
                remark: "Collapse all return true, otherwise returns false",
                type: "Boolean"
            }
        },
        {
            name: "collapse",
            remark: "folded nodes",
            args: [],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "expandAll",
            remark: "expand all nodes",
            args: [{
                name: "ids",
                remark: "node array or node id array.",
                type: "Array"
            }],
            ret:
            {
                name: "",
                remark: "Expand returns true, otherwise returns false",
                type: "Boolean"
            }
        },
        {
            name: "expand",
            remark: "start node",
            args: [{
                name: "expandParent",
                remark: "At the same time expand the higher node, said the start of the layers for the Int",
                type: "Boolean / Int"
            },
            {
                name: "callback",
                remark: "All nodes show the completed callback function, did not enable delayed processing invalid",
                type: "Function"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "queryItems",
            remark: "query node",
            args: [{
                name: "prop",
                remark: "to filter by property name",
                type: "String"
            },
            {
                name: "value",
                remark: "The property values ​​used to filter",
                type: "Object"
            },
            {
                name: "take",
                remark: "Get the number of nodes, default unlimited.",
                type: "Int (optional)"
            },
            {
                name: "level",
                remark: "variable level, the default for all.",
                type: "Int (optional)"
            },
            {
                name: "includeSelf",
                remark: "contains the current node itself, the default does not contain",
                type: "Boolean (optional)"
            }],
            ret:
            {
                name: "",
                remark: "Complex condition node array",
                type: "Array"
            }
        },
        {
            name: "getSelectItems",
            remark: "for all selected nodes.",
            args: [{
                name: "selected",
                remark: "select the state, true for all the selected nodes, false for all nodes is not selected, the default true",
                type: "Boolean"
            },
            {
                name: "take",
                remark: "Get the number of nodes, default unlimited.",
                type: "Int (optional)"
            },
            {
                name: "level",
                remark: "variable level, the default for all.",
                type: "Int (optional)"
            },
            {
                name: "includeSelf",
                remark: "contains the current node itself, the default does not contain",
                type: "Boolean (optional)"
            }],
            ret:
            {
                name: "",
                remark: "Complex condition node array",
                type: "Array"
            }
        },
        {
            name: "select",
            remark: "select the node",
            args: [{
                name: "selected",
                remark: "Select Status",
                type: "Boolean"
            },
            {
                name: "expandParent",
                remark: "At the same time expand the higher node, said the start of the layers for the Int",
                type: "Boolean / Int"
            },
            {
                name: "allow",
                remark: "Get the number of nodes, default unlimited.",
                type: "Int (optional)"
            }],
            ret:
            {
                name: "",
                remark: "did not perform the selected returns false, otherwise it does not return value",
                type: "Boolean / Null"
            }
        },
        {
            name: "selectAll",
            remark: "select all nodes",
            args: [{
                name: "selected",
                remark: "Select Status",
                type: "Boolean (optional)"
            }],
            ret:
            {
                name: "",
                remark: "All change for the specified state returns true, otherwise returns false",
                type: "Boolean"
            }
        },
        {
            name: "bindEvents",
            remark: "binding event",
            args: [],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "eachAll",
            remark: "loop all the items.",
            args: [{
                name: "fn",
                remark: "processing key function \r \n ids: Array <BaseItem> / Array <String> / String / Boolean (Optional) By default, all nodes, including the current node, the node can be a list, can be node id list can be based on separated node id string, false through all child nodes, true that contains the node itself. ",
                type: "Function"
            },
            {
                name: "level",
                remark: "Default All",
                type: "Int (optional)"
            },
            {
                name: "childBefore",
                remark: "direction, true that from the inside out, or from outside to inside.",
                type: "Boolean (optional)"
            }],
            ret:
            {
                name: "",
                remark: "If you stop halfway through the process, then return to lead through the process to stop the node, otherwise there is no return value.",
                type: "Object / undefined"
            }
        },
        {
            name: "eachItems",
            remark: "traverse the child nodes do not contain child nodes of the lower node",
            args: [{
                name: "fn",
                remark: "entry processing function",
                type: "Function"
            },
            {
                name: "ids",
                remark: "By default, all nodes",
                type: "Array (optional)"
            }],
            ret:
            {
                name: "",
                remark: "If you stop halfway through the process, then return to lead through the process to stop the node, otherwise there is no return value.",
                type: "Object / undefined"
            }
        },
        {
            name: "",
            remark: "hidden node",
            args: [],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "hide",
            remark: "hidden node",
            args: [{
                name: "hideParent",
                remark: "At the same time hide the parent node, said layers of Int.",
                type: "Boolean / Int"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "show",
            remark: "display node",
            args: [{
                name: "showParent",
                remark: "also shows the higher node, said layers of Int.",
                type: "Boolean / Int"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "showAll",
            remark: "Display all node",
            args: [{
                name: "ids",
                remark: "node array or node id array,",
                type: "Array"
            }],
            ret:
            {
                name: "",
                remark: "Show all return true, otherwise returns false",
                type: "Boolean"
            }
        },
        {
            name: "hideAll",
            remark: "hidden nodes",
            args: [{
                name: "ids",
                remark: "node array or node id array,",
                type: "Array"
            }],
            ret:
            {
                name: "",
                remark: "Hide All returns true, otherwise returns false",
                type: "Boolean"
            }
        }],
        events: []
    },
    {
        name: "BaseList",
        remark: "list control base class.",
        path: "fly.mini.BaseList",
        properties: [{
            name: "selectedItems",
            remark: "All the selected nodes.",
            type: "Array <fly.mini.BaseItem>"
        },
        {
            name: "itemType",
            remark: "element type",
            type: ""
        },
        {
            name: "defaults",
            remark: "default configuration",
            type: ""
        },
        {
            name: "rootVisible",
            remark: 'whether to display the root node, the default "auto"',
            type: "Boolean / String"
        },
        {
            name: "rendered",
            remark: "is present",
            type: "Boolean"
        },
        {
            name: "quickly",
            remark: "quick processing",
            type: "Boolean"
        },
        {
            name: "itemKey",
            remark: 'The key attribute node, the default "id"',
            type: "String"
        },
        {
            name: "itemMap",
            remark: "the key nodes in the node list for the key.",
            type: "KeyValue"
        },
        {
            name: "allItems",
            remark: "all nodes",
            type: "Array"
        },
        {
            name: "panelNarrow",
            remark: "node hot zone is narrow, default false",
            type: "Boolean"
        },
        {
            name: "showBorder",
            remark: 'whether a border, the default "auto", if you define the width and height of the display',
            type: "Boolean / String"
        },
        {
            name: "autoScroll",
            remark: 'whether to automatically display scroll bars, the default "auto", if you define the width and height of the display',
            type: "Boolean"
        },
        {
            name: "iconDomFormat",
            remark: "Creating node icons Html templates",
            type: "String"
        },
        {
            name: "textDomFormat",
            remark: "Text to Html templates to create node",
            type: "String"
        },
        {
            name: "checkboxHtml",
            remark: "create node checkbox of Html",
            type: "String"
        },
        {
            name: "toggleButtonHtml",
            remark: "create node is expanded, collapse buttons Html",
            type: "String"
        },
        {
            name: "checkboxPostion",
            remark: 'checkbox position, currently only supports "left" and "right"',
            type: "String"
        },
        {
            name: "checkStyle",
            remark: "checkbox style, the default under the checkMode automatic identification",
            type: "fly.mini.checkStyle"
        },
        {
            name: "checkMode",
            remark: "node check mode is not enabled by default.",
            type: "fly.mini.checkMode"
        },
        {
            name: "checkCascade",
            remark: "Check the associated node configuration \r \n example: \r \n 1. that is not associated with the following configuration \r \n checkCascade = 0 \r \n or \r \n checkCascade = fallse \r \n or \r \n checkCascade = {\r \n check: {parent: 0, children: 0}, \r \n uncheck: {parent: 0, children: 0} \r \n} \r \n \r \n \r \n 2. The following configuration means, check the time synchronization nodes and lower nodes higher \r \n checkCascade = true \r \n or \r \n checkCascade = {\r \n check: {parent: true, children : true}, \r \n uncheck: {parent: true, children: true} \r \n} \r \n \r \n 3. the following configuration that selected simultaneously two lower nodes parent node and all , uncheck the parent node does not affect, the first layer of the lower node synchronization \r \n checkCascade = {\r \n check: {parent: 2, children: true}, \r \n uncheck: {parent: false, children: 1} \r \n} ",
            type: ""
        },
        {
            name: "useCheckHalf",
            remark: "half-selected state is enabled.",
            type: "Boolean"
        },
        {
            name: "selectionMode",
            remark: "node selection mode, the default radio.",
            type: "fly.mini.selectionMode"
        },
        {
            name: "leastSelectionOne",
            remark: "At least select a default under the selectionMode automatic identification.",
            type: "Boolean / String"
        },
        {
            name: "selectEvents",
            remark: "trigger node selection events, key: node dom properties, value type of event.",
            type: "KeyValue"
        },
        {
            name: "checkEvents",
            remark: "trigger node checked event, key: node dom properties, value type of event.",
            type: "KeyValue"
        },
        {
            name: "toggleEvents",
            remark: "the trigger nodes expand and collapse events, key: node dom properties, value type of event.",
            type: "KeyValue"
        },
        {
            name: "keepCheckAndSelectSync",
            remark: "check and choose to save the state the same node.",
            type: "Boolean"
        },
        {
            name: "toggleStyleCssPart",
            remark: "node collapse button front styling parts.",
            type: "String"
        },
        {
            name: "selectedCss",
            remark: "node, select the style.",
            type: "String"
        },
        {
            name: "expandCss",
            remark: "node is expanded style.",
            type: "String"
        },
        {
            name: "collapseCss",
            remark: "node folding style",
            type: "String"
        },
        {
            name: "itemCss",
            remark: "node style",
            type: "String"
        },
        {
            name: "parentItemCss",
            remark: "child nodes of node style.",
            type: "String"
        },
        {
            name: "leafItemCss",
            remark: "does not contain child nodes style.",
            type: "String"
        },
        {
            name: "wrapCss",
            remark: "node in the outermost container style.",
            type: "String"
        },
        {
            name: "padCss",
            remark: "child nodes container style.",
            type: "String"
        },
        {
            name: "effectCss",
            remark: "Enable effect of the style.",
            type: "String"
        },
        {
            name: "checkedCss",
            remark: "Check the node status is checked style",
            type: "String"
        },
        {
            name: "checkStylePart",
            remark: "Node Checkbox button front styling parts",
            type: "String"
        },
        {
            name: "firstItemCssPart",
            remark: "the first child node of the style",
            type: "String"
        },
        {
            name: "lastItemCssPart",
            remark: "the last child node of the style.",
            type: "String"
        },
        {
            name: "iconSizeCss",
            remark: "custom icon size style.",
            type: "String"
        },
        {
            name: "useEffect",
            remark: "the effect is enabled.",
            type: "Boolean"
        },
        {
            name: "navTarget",
            remark: "When href connection to the node configuration, the target window to open the connection, the default new window",
            type: "String"
        },
        {
            name: "showToggle",
            remark: "whether to show collapse button",
            type: "Boolean"
        },
        {
            name: "toggleStyle",
            remark: "collapse button style",
            type: "String"
        },
        {
            name: "showLine",
            remark: "whether to display the level lines.",
            type: "Boolean"
        },
        {
            name: "lineCss",
            remark: "node line style",
            type: "String"
        },
        {
            name: "css",
            remark: "CSS Styles",
            type: "String"
        },
        {
            name: "handlerEvent",
            remark: "trigger event callback node type",
            type: "String"
        },
        {
            name: "itemHandler",
            remark: "a common node callback function",
            type: "Function"
        },
        {
            name: "height",
            remark: "high",
            type: "String"
        },
        {
            name: "width",
            remark: "width",
            type: "String"
        }],
        methods: [{
            name: "applyEffect",
            remark: "application effect",
            args: [{
                name: "isPlay",
                remark: "whether to play.",
                type: "Boolean"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "remove",
            remark: "Remove",
            args: [{
                name: "destroy",
                remark: "is destroyed",
                type: ""
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "render",
            remark: "show",
            args: [{
                name: "container",
                remark: "container",
                type: "Dom"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "join",
            remark: "associate the node",
            args: [{
                name: "item",
                remark: "node objects",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "load",
            remark: "Load node data",
            args: [{
                name: "data",
                remark: "array or an Ajax request url",
                type: "Array / String"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "eachAll",
            remark: "traverse all nodes",
            args: [{
                name: "item",
                remark: "node to traverse the object, the default root node",
                type: "fly.mini.BaseItem (optional)"
            },
            {
                name: "fn",
                remark: "processing nodes function returns false stop traversal",
                type: "Function"
            },
            {
                name: "level",
                remark: "to traverse the layer, the default for all.",
                type: "Int (optional)"
            },
            {
                name: "childBefore",
                remark: "direction, false that from the inside out, or from outside to inside.",
                type: "Boolean"
            }],
            ret:
            {
                name: "",
                remark: "If you stop halfway through the process, then return to lead through the process to stop the node, otherwise there is no return value.",
                type: "fly.mini.BaseItem / undefined"
            }
        },
        {
            name: "getSelectItems",
            remark: "for all selected nodes.",
            args: [{
                name: "item",
                remark: "node, the default root",
                type: "fly.mini.BaseItem (optional)"
            },
            {
                name: "selected",
                remark: "select the state, true for all the selected nodes, false node is not selected for all",
                type: "Boolean"
            },
            {
                name: "take",
                remark: "Get the number of nodes, default unlimited.",
                type: "Int (optional)"
            },
            {
                name: "level",
                remark: "variable level, the default for all.",
                type: "Int (optional)"
            }],
            ret:
            {
                name: "",
                remark: "Complex condition node array.",
                type: "Array"
            }
        },
        {
            name: "collapseAll",
            remark: "collapse all nodes.",
            args: [{
                name: "item",
                remark: "node, the default root",
                type: "fly.mini.BaseItem (optional)"
            }],
            ret:
            {
                name: "",
                remark: "Collapse all return true, otherwise returns false",
                type: "Boolean"
            }
        },
        {
            name: "expandAll",
            remark: "expand all nodes",
            args: [{
                name: "item",
                remark: "node, the default root",
                type: "fly.mini.BaseItem (optional)"
            }],
            ret:
            {
                name: "",
                remark: "Expand returns true, otherwise returns false",
                type: "Boolean"
            }
        },
        {
            name: "showAll",
            remark: "Display all node",
            args: [{
                name: "item",
                remark: "node, the default root",
                type: "fly.mini.BaseItem (optional)"
            }],
            ret:
            {
                name: "",
                remark: "Show all return true, otherwise returns false",
                type: "Boolean"
            }
        },
        {
            name: "hideAll",
            remark: "hidden nodes",
            args: [{
                name: "item",
                remark: "node, the default root",
                type: "fly.mini.BaseItem (optional)"
            }],
            ret:
            {
                name: "",
                remark: "Hide All returns true, otherwise returns false",
                type: "Boolean"
            }
        }],
        events: [{
            name: "onBeforeItemRender",
            remark: "In the present node occurred before.",
            args: [{
                name: "item",
                remark: "node object being rendered.",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "return false will not render the node",
                type: "Boolean"
            }
        },
        {
            name: "onItemRender",
            remark: "after showing the nodes",
            args: [{
                name: "item",
                remark: "node object being rendered.",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "return false will not render the node",
                type: "Boolean"
            }
        },
        {
            name: "onBeforeRender",
            remark: "occurred before the present",
            args: [],
            ret:
            {
                name: "",
                remark: "return false will not render the node",
                type: "Boolean"
            }
        },
        {
            name: "onRender",
            remark: "after the show.",
            args: [],
            ret:
            {
                name: "",
                remark: "return false will not render the node",
                type: "Boolean"
            }
        },
        {
            name: "onBeforeToggle",
            remark: "In the switching node expand / collapse occurred before.",
            args: [{
                name: "item",
                remark: "to expand or collapse the node object.",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "return false to cancel the current operation.",
                type: "Boolean"
            }
        },
        {
            name: "onToggle",
            remark: "In the switching node is expanded / collapsed after",
            args: [{
                name: "item",
                remark: "to expand or collapse the node object.",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "onBeforeCollapse",
            remark: "occurred before the collapse nodes",
            args: [{
                name: "item",
                remark: "Folding of the node object.",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "return false to cancel the current operation.",
                type: "Boolean"
            }
        },
        {
            name: "onCollapse",
            remark: "after the collapse nodes.",
            args: [{
                name: "item",
                remark: "Folding of the node object.",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "onBeforeExpand",
            remark: "occurred before the commencement of nodes",
            args: [{
                name: "item",
                remark: "Expand the node object.",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "return false to cancel the current operation.",
                type: "Boolean"
            }
        },
        {
            name: "onExpand",
            remark: "after the commencement of nodes",
            args: [{
                name: "item",
                remark: "Expand the node object.",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "onBeforeSelect",
            remark: "occurred before the selected node.",
            args: [{
                name: "item",
                remark: "The selected node object.",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "return false to cancel the current operation.",
                type: "Boolean"
            }
        },
        {
            name: "onSelect",
            remark: "after the selected node.",
            args: [{
                name: "item",
                remark: "The selected node object.",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        },
        {
            name: "onJoin",
            remark: "In the list of associated nodes and when the place",
            args: [{
                name: "item",
                remark: "node objects",
                type: "fly.mini.BaseItem"
            }],
            ret:
            {
                name: "",
                remark: "",
                type: ""
            }
        }]
    },
    {
        name: "Tree",
        remark: "tree control",
        path: "fly.mini.Tree",
        properties: [{
            name: "root",
            remark: "root",
            type: "fly.mini.Tree.Node"
        },
        {
            name: "itemType",
            remark: "node type, default: fly.mini.Tree.Node",
            type: "Function"
        }],
        methods: [{
            name: "getCheckItems",
            remark: "Get all the check nodes.",
            args: [{
                name: "item",
                remark: "node, the default root",
                type: "fly.mini.Tree.Node (optional)"
            },
            {
                name: "checked",
                remark: "Check the state, true for all nodes is checked, false for all nodes are not checked.",
                type: "Boolean"
            },
            {
                name: "take",
                remark: "Get the number of nodes, default unlimited.",
                type: "Int (optional)"
            },
            {
                name: "level",
                remark: "variable level, the default for all.",
                type: "Int (optional)"
            }],
            ret:
            {
                name: "",
                remark: "Complex condition node array",
                type: "Array"
            }
        },
        {
            name: "checkAll",
            remark: "Set the check state of all nodes.",
            args: [{
                name: "item",
                remark: "node, the default root",
                type: "fly.mini.Tree.Node (optional)"
            },
            {
                name: "checked",
                remark: "Check the status, true: select, false is not selected.",
                type: "Boolean"
            }],
            ret:
            {
                name: "",
                remark: "All set to the specified condition returns true, otherwise returns false",
                type: "Boolean"
            }
        }],
        events: [],
        base: 'fly.mini.BaseList'
    },
    {
        name: "Node",
        remark: "tree node object",
        path: "fly.mini.Tree.Node",
        properties: [],
        methods: [{
            name: "checkAll",
            remark: "Set the check state of all nodes.",
            args: [{
                name: "checked",
                remark: "Check the status, true: select, false is not selected",
                type: "Boolean"
            },
            {
                name: "ids",
                remark: "node array or node id array.",
                type: "Array"
            }],
            ret:
            {
                name: "",
                remark: "All set to the specified condition returns true, otherwise returns false",
                type: "Boolean"
            }
        },
        {
            name: "check",
            remark: "Set the check state of the node",
            args: [{
                name: "checked",
                remark: "Check the status, true: select, false is not selected.",
                type: "Boolean"
            }],
            ret:
            {
                name: "",
                remark: "setting is canceled if returns false, otherwise there is no return value.",
                type: "Boolean / Null"
            }
        },
        {
            name: "getCheckItems",
            remark: "Get all the check nodes.",
            args: [{
                name: "checked",
                remark: "Check the state, true for all the selected nodes, false for all nodes is not selected, the default true",
                type: "Boolean"
            },
            {
                name: "take",
                remark: "Get the number of nodes, default unlimited.",
                type: "Int (optional)"
            },
            {
                name: "level",
                remark: "variable level, the default for all.",
                type: "Int (optional)"
            },
            {
                name: "includeSelf",
                remark: "contains the current node itself, the default does not contain",
                type: "Boolean (optional)"
            }],
            ret:
            {
                name: "",
                remark: "Complex condition node array",
                type: "Array"
            }
        }],
        events: [],
        base: 'fly.mini.BaseItem'
    }]
}