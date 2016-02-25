/* #L 
name:Fly 
title:Lightweight front-end framework
version:1.1 
site:http://www.flyui.net
source:http://code.google.com/p/flyjs
copy:© 2011 Kuiyou Li
*/


(function () {
    var win = window, doc = win.document, docE = doc.documentElement

    function destroy(obj) {
        if (arguments.length == 1) {
            if (!obj) return
            if (obj.destroy && obj.destroy != arguments.callee)
                obj.destroy()
        }
        else if (arguments.length == 0) {
            this.destroy = null;
            arguments.callee.call(false, this)
        }
        else {
            for (var i = 0; i < arguments.length; i++)
                arguments.callee.call(false, arguments[i])
        }

        if (this != false)
            win.CollectGarbage && CollectGarbage()
    }

    /*	#C path:fly fly javacript library
    查询Dom对象
    调用方式：
    fly.$("a","div")
    fly.$("a,div")
    fly("a,div")
    fly("a","div")
    $("a","div")
    $("a,div")
    [document].$("a,div")
    [div1,div2].$("a,div")
		
    @selectors:String/Dom 可变参数，任意多个选择器字符串或对象
    @return :Array 符合条件的多个Dom对象数组
    */
    function fly(selectors) {
        var a = arguments, c = null;
        if (this._$isWindow || this == $) {
            if (selectors) {
                if (a.length == 1) {
                    if (selectors.isIList)
                        return selectors;
                    if ($.isFun(selectors))
                        return $.ready(selectors)
                    else if (!$.isStr(selectors))
                        return $.toArray(selectors)
                } else if (a.length == 2 && a[1] && $.isStr(a[0])) {
                    if ($.isDom(a[1])) {
                        c = [a[1]]
                        a = [a[0]]
                    }
                    else (a[1].find)
                    {
                        c = a[1]
                        a = [a[0]]
                    }
                }
            }
        }
        else
            c = $.isArray(this) ? this : ($.likeArray(this) ? $.toArray(this) : [doc])
        var r = (new ui.selector.DomQuery(c, a, this.isIList)).find();
        return r;
    }

    var config = win.flyConfig || {}
    fly.version = '1.1';

    /*	path:flyConfig.addAlias
    给fly库命别名
    fly库默认别名 $，如果 给fly库指定其它别名，默认别名 $ 将被取消
    可以在 fly 库加载前用如下代码定义别名
    var flyConfig={
    alias:["myFly","jimo"]
    }
    也可以直接调用该函数定义别名
    fly.addAlias("myFly","jimo")
    经过以上定义后，便可以用别名访问fly库
    如：
    myFly.$("a,div")
    myFly("a","div")
    jimo.$("a","div")
    jimo("a,div")
			
    @alias :String 可变参数，任意多个别名
    @return :fly fly库
    */
    config.alias && (window[config.alias] = fly);

    /* #M	path:flyConfig.onLoad
    fly加载完成时执行回调函数
    可以在 fly 库加载前用如下代码定义加载完成是的回调函数
    var flyConfig={
    alias:["myFly","jimo"],
    onLoad:function(){
    alert('fly已经加载完成')
    }
    }
    */


    if (win.fly) {
        for (var k in win.fly)
            fly[k] = win.fly[k]
    }

    fly.destroy = function () {
        //$.destroy = null;
        destroy.apply($, arguments)
        if (arguments.length == 0) {
            try {
                destroy(Array.prototype, String.prototype, Function.prototype)
            } catch (e) { }
            window.$ == $ && (window.$ = null)
            window.fly = $ && (window.fly = null)
            docE = doc = destroy = null
        }
    }

    /* #C path:$=fly */
    var $ = win.fly = fly;
    win.$ || (win.$ = fly)

    fly.context = {
        plugins: []
    }

    win._$isWindow = true



    /*	创建命名空间
    @namespace:String 要创建的命名空间，如 fly.ui
    @return	:Namespace 创建的命名空间
    */
    $.ns = function (namespace) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++)
                $.ns(arguments[i])
            return
        }
        var nss = namespace.split('.')
        var root = win
        for (var i = 0; i < nss.length; i++)
            root = root[nss[i]] || (root[nss[i]] = { destroy: destroy })
        return root
    }

    /*	创建类
    @options: 选项
    @return	:Class 创建的类
    */
    $.Class = function (options) {
        var base = options.base
        var _class = options.constructor
        if (_class == Object || _class == null)
            _class = $.isFun(base) ? function () { base.apply(this, arguments) } : function () { }

        var _base = $.isFun(base) ? base.prototype : ($.isObject(base) ? base : Object.prototype)
        function f() { }
        f.prototype = _base
        var cp = _class.prototype = new f()
        cp.$base = _base;

        if ($.isFun(base)) {
            for (var p in base) {
                if (!(p in _class))
                    _class[p] = base[p]
            }
        }

        if (options.overrides) {
            var os = $.isArray(options.overrides) ? options.overrides : [options.overrides]
            $.each(os, function (o) {
                $.extend(cp, o)
            })
            delete options.overrides
        }

        delete options.constructor
        delete options.base
        for (var k in options)
            cp[k] = options[k]

        _class.$base = $.isFun(base) ? base : Object
        cp.constructor = _class;
        fly.Event && fly.Event.eventAble(_class);
        return _class
    }

    $.ns("fly.data", "fly.plugins")

    var ui = $.ns("fly.ui"), collection = $.ns("fly.collection"), browser = $.browser || ($.browser = {})
    var arrP = Array.prototype
    var slice = arrP.slice
    var toStr = Object.prototype.toString
    var lp = null, dh, toFun;
    var camelCase = function (str) {
        str = str.replace(/\-\w/g, function ($1) {
            return $1.charAt(1).toUpperCase()
        })
        return str.charAt(0).toLowerCase() + str.substr(1)
    }
    //CreateList
    var CL = function (r, o) {
        return o && o.$create ? o.$create(r) : r;
    }
    //GetListMember
    var GLM = function (l, m) {
        return l[m] == null ? lp[m] : l[m]
    }
    //CallListMember
    var CLM = function (l, m, a) {
        return GLM(l, m).apply(l, a);
    }

    with (browser) {
        var b = browser, ua = b.userAgent = navigator.userAgent.toLowerCase();
        function c(r) {
            return r.test(ua);
        }

        b.doc = doc
        b.isStrict = doc.compatMode == "CSS1Compat";
        b.isFirefox = c(/firefox/)
        b.isOpera = c(/opera/)
        b.isChrome = c(/chrome/)
        b.isWebKit = c(/webkit/)
        b.isSafari = !isChrome && c(/safari/)
        b.isIE = !isOpera && c(/msie/)

        if (b.isIE) {
            b.ieVersion = Number(ua.match(/msie (\d+)/)[1])
            b["isIE" + b.ieVersion] = true;
            b.isIE67 = b.isIE6 || b.isIE7
        }
        b.isGecko = !isWebKit && c(/gecko/)
        b.isMoz = c(/mozilla/) && !b.isOpera && !b.isIE

        b.diffAttrs =
		{
		    styleRemoveMethod: docE.style.removeProperty ? 'removeProperty' : 'removeAttribute'
		}

        b.name = isIE ? "IE" + b.ieVersion : isFirefox ? "FF" : isOpera ? "Opera" : isChrome ? "Chrome" : isSafari ? "Safari" : ""

        if (b.isMoz) {
            win.Event.prototype.__defineGetter__("x", function () {
                return this.clientX + 2
            })
            win.Event.prototype.__defineGetter__("y", function () {
                return this.clientY + 2
            })
            var htmlProp = HTMLElement.prototype
            htmlProp.__defineGetter__("innerText", function () {
                return this.textContent;
            });

            htmlProp.__defineSetter__("innerText", function (text) {
                return this.textContent = text;
            });


            htmlProp.__defineGetter__("outerHTML", function () {
                var a = this.attributes, str = "<" + this.tagName, i = 0; for (; i < a.length; i++)
                    if (a[i].specified)
                        str += " " + a[i].name + '="' + a[i].value + '"';
                if (!this.canHaveChildren)
                    return str + " />";
                return str + ">" + this.innerHTML + "</" + this.tagName + ">";
            });
            htmlProp.__defineSetter__("outerHTML", function (s) {
                var r = this.ownerDocument.createRange();
                r.setStartBefore(this);
                var df = r.createContextualFragment(s);
                this.parentNode.replaceChild(df, this);
                return s;
            });
            htmlProp.__defineGetter__("canHaveChildren", function () {
                return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/.test(this.tagName.toLowerCase());
            });

        }
    }


    /*	扩展
    @target	:被扩展的对象
    @overrides:包含扩展成员的任意多个参数
    @return :target
    */
    $.extend = function (target, overrides) {
        if (arguments === 1)
            return $.extend($, target);
        target || (target = {})
        var isSafety = $.isStr(this), ignore = isSafety && this.charAt(0) == '@', pre = ignore ? this.substr(1) : this;
        var prefixLength = isSafety ? pre.length : -1
        for (var i = 1; i < arguments.length; i++) {
            var o = arguments[i]
            if (o) {
                for (var key in o) {
                    if (ignore && key.substr(0, prefixLength) == pre)
                        continue;
                    if (isSafety && !ignore) {
                        if (pre != "" && key.substr(0, prefixLength) != pre)
                            target[pre + key] = o[key]
                        if (!(key in target))
                            target[key] = o[key]
                    }
                    else if (this != false || target[key] == undefined)
                        target[key] = o[key];
                }
            }
        }
        return target;
    }


    var fSetup = arguments.callee;

    $.extend($, {
        /*  注册插件
        @name   :String 插件名称
        @fn     :Function 创建插件的函数
        */
        regPlugin: function (name, fn) {
            var p = { name: fn ? name : "", fn: fn || name };
            p.fn($);
            $.context.plugins.push(p);
            return this;
        },
        /*  将fly安装到其他窗口
        @window :Window 要安装的窗口对象
        @match  :匹配要安装的插件，为空是安装所有插件
        */
        setup: function (w, m) {
            w.eval("(" + fSetup + ")()");
            $.context.plugins.each(function (p) {
                if (!m || m.test(p.name))
                    w.eval("fly.regPlugin(" + p.fn + ")")
            })
        },
        /*  停止标识，在用each遍历某对象时，返回fly.BREAK将停止遍历 */
        BREAK: {},
        /*  取消标识，在事件处理函数中返回fly.CANCEL，将停止事件 */
        CANCEL: {},
        /*	扩展时检测
        @prefix	:String 前缀
        @target	:Object 被扩展的对象
        @overrides	:Object 包含扩展成员的任意多个参数
        @return	:target
        */
        safeExtend: function (prefix, target, overrides) {
            return $.extend.apply(prefix, slice.call(arguments, 1))
        },


        /*	扩展,扩展前检测是否存在
        @target	:被扩展的对象
        @overrides:包含扩展成员的任意多个参数
        @return	:target
        */
        extendIf: function (target, overrides) {
            return $.extend.apply(false, arguments);
        },
        /*  克隆一个对象
        @obj    :Object 要克隆的对象
        @deep   :Boolean/Int(可选) 克隆深度
        @return :@obj   的副本
        */
        clone: function (obj, deep, cache) {
            var buf, isR = cache == null, cache = cache || {};
            if (deep === 0)
                return obj;
            deep = deep === true ? 10000000 : deep == false || deep == null ? 1 : deep;
            var isA = $.isArray(obj), isO = !isA && $.isObject(obj)
            if (isA || isO) {
                var id = obj && UID(obj);
                if (id in cache)
                    return cache[id]
                if (isA) {
                    buf = cache[id] = [];
                    var i = obj.length;
                    while (i--)
                        buf[i] = this.clone(obj[i], deep - 1, cache);
                }
                else if (isO) {
                    buf = cache[id] = {};
                    for (var k in obj) {
                        buf[k] = this.clone(obj[k], deep - 1, cache);
                    }
                }
                if (isR) {
                    for (var k in cache)
                        delete cache[k].uniqueNumber
                }
                return buf;
            } else
                return obj;
        },

        foucsableTypeRegs: /(BUTTON|INPUT|OBJECT|SELECT|TEXTAREA)/,
        clickableTypeRegs: /^(A|AREA)$/,
        attrGeters: {},
        /*  获取或设置某对象的属性
        @obj    :Object 被操作对象
        @prop   :String/JSON    要获取或设置的属性名，或者包含属性名和属性值的JSON对象
        @value  :Object(可选) 对象的属性值
        @return :Object/fly    当获取是返回属性值，设置时返回 fly
        */
        attr: function (obj, prop, value) {
            var isObj = $.isObject(prop)
            if (arguments.length < 3 && !isObj) {
                var lProp = prop.toLowerCase()
                if (this.isDom(obj) && this.attrGeters[lProp])
                    return this.attrGeters[lProp](obj)
                return obj.getAttribute && !(prop in obj) ? obj.getAttribute(prop) : obj[prop];
            }
            if (isObj) {
                for (var k in prop)
                    obj.setAttribute && !(k in obj) ? obj.setAttribute(k, prop[k]) : obj[k] = prop[k]
            }
            else
                obj.setAttribute && !(prop in obj) ? obj.setAttribute(prop, value) : obj[prop] = value;
            return this;
        },
        valueGeters: {
            option: function (box) {
                return (box.attributes.value || {}).specified ? box.value : box.text
            },
            select: function (box) {
                if (box.type === "select-one")
                    return box.selectedIndex > -1 ? $.valueGeters.option(box.options[box.selectedIndex]) : null
                var vs = new Array
                for (var i = 0; i < box.options.length; i++)
                    if (box.options[i].selected)
                        vs.push($.valueGeters.option(box.options[i]))
                return vs
            },
            input: function (box) {
                var t = box.type
                if (t == "radio" || t == "checkbox")
                    return box.value == null ? "on" : box.value
                else return box.value
            }
        },
        valueSeters: {
            select: function (box, value) {
                var isOne = box.type === "select-one"
                var isArray = $.likeArray(value)
                for (var i = 0; i < box.options.length; i++) {
                    var o = box.options[i], v = $.valueGeters.option(o)
                    if ((o.selected = v == value || (isArray && $.inArray(v, value))) && isOne) return
                }
            }
        },
        /*  获取或设置元素的值
        @el    :Element 被操作对象
        @value  :Object(可选) 元素的值
        @return :Object/fly    当获取是返回元素值，设置时返回 fly
        */
        value: function (el, value) {
            if (arguments.length == 1) {
                var nodeName = el.nodeName.toLowerCase()
                var f = $.valueGeters[nodeName]
                return f ? f(el) : el.value
            }
            else {
                var nodeName = el.nodeName.toLowerCase()
                var f = $.valueSeters[nodeName]
                var val = $.ifFun.call(el, value, el)
                f ? f(el, val) : (el.value = val)
                return this
            }
        },


        /*  检测对象是否某类的实例或者是否等于某值
        @obj    :要检测的对象
        @type   :Function/String/Object 类或者类名称或者用于比较的值
        @return :Boolean    如果obj是type的实例或者obj==type则返回true，否则返回false
        */
        is: function () {
            var is = function (obj, type) {
                return typeof (typeName) == 'string' ?
                        toStr.call(obj) == "[object " + type + "]" :
                        (obj == type ||
                            (obj == null || type == null ? false :
                                $.isFun(type) &&
                                    (obj instanceof type ||
                                        (obj.constructor == type || String(obj.constructor) == String(type))
                                    )
                                ))
            }

            var types = ["Date", "Number", "Boolean", "String", "Array", "Function", "Object"]
            for (var i = 0; i < types.length; i++) {
                (function (t) {
                    var st = "[object " + t + "]", ty = window[t]
                    $["is" + t] = function (obj) {
                        return obj != null && (obj.constructor === ty || toStr.call(obj) === st)
                    }
                } (types[i]))
            }

            /*	检测一个值是否函数
            @obj	:要检测的对象
            @return	:Boolean
            */
            $.isFun = $.isFunction

            /* #M	path:fly.isFunction 检测一个值是否函数
            @obj	:要检测的对象
            @return	:Boolean
            */

            /* #M	path:fly.isDate 检测一个值是否日期
            @obj	:要检测的对象
            @return	:Boolean
            */

            /* #M	path:fly.isNumber 检测一个值是否数字
            @obj	:要检测的对象
            @return	:Boolean
            */

            /* #M	path:fly.isBoolean 检测一个值是否布尔型
            @obj	:要检测的对象
            @return	:Boolean
            */

            /* #M	path:fly.isArray 检测一个值是否数组
            @obj	:要检测的对象
            @return	:Boolean
            */

            /* #M	path:fly.isObject 检测一个值是否Object
            @obj	:要检测的对象
            @return	:Boolean
            */

            /* #M	path:fly.isString 检测一个值是否字符串
            @obj	:要检测的对象
            @return	:Boolean
            */

            /*	检测一个值是否字符串
            @obj	:要检测的对象
            @return	:Boolean
            */
            $.isStr = $.isString
            return is;
        } (),
        /*  检测字符串是否html
        @str    :String 要检测的字符串
        @return :Boolean    str是html返回true，否则返回false
        */
        isHtml: function () {
            var htmlExp = /<[\w]+[\s\S]+>/
            return function (str) {
                return $.isStr(str) && htmlExp.test(str)
            }
        } (),

        /*	检测对象是否类似于数组，如 arguments、document.all
        @obj:要检测的对象
        @return	:Boolean 类似与数组返回true，否则返回false
        */
        likeArray: function (obj) {
            return obj && (obj instanceof Array || (typeof (obj.length) == 'number' && !$.isFun(obj) && !$.isStr(obj) && !obj._$isWindow && (!obj.nodeName || !obj.ownerDocument)))
        },


        /*	是否Dom对象
        @obj:要检测的对象
        @return	:Boolean
        */
        isDom: function (obj) {
            return obj && obj.nodeType === 1 && obj.ownerDocument
        },


        /*  将对象转换为数组
        @obj   :要转换的对象
        @return	:Array
        */
        toArray: function (obj) {
            if ($.isArray(obj))
                return obj
            if (!$.likeArray(obj))
                return [obj]
            if ($.isFun(obj.callee))
                return slice.call(obj, 0)
            var arr = new Array, i = obj.length
            while (--i != -1)
                arr[i] = obj[i]
            return arr
        },


        /*  获取集合的一部分
        @obj		:集合对象
        @start	:Int 开始位置
        @end	:Int(可选) 结束为置
        @return	:Array
        */
        slice: function (obj, start, end) {
            return slice.call($.toArray(obj), start, end == undefined ? 100000000 : end)
        },


        /*	遍历一个对象
        @obj	:Array 被遍历对象
        @fn		:Function 处理函数
        @scope	:Object(可选) 域
        @return	:@obj
        */
        each: function (obj, fn, scope) {
            var a = $.likeArray(obj)
            if (a) {
                for (var i = 0; i < obj.length; i++)
                    if (fn.call(scope || obj[i], obj[i], i, obj) == $.BREAK)
                        break;
            }

            if (!a) {
                for (var i in obj)
                    if (fn.call(scope || obj[i], obj[i], i, obj) == $.BREAK)
                        break;
            }
            return this
        },


        /*	检测对象是否在一组数据中,
        例	:fly.inArray(3,1,2,3,4,...,n),fly.inArray(3,[1,2,3,4])
        @value	:要检测的一个值
        @args	:Object(可选) 可变参数，一组数据
        @return	:Number 返回在数组中的索引，如不在数组中则返回 null
        */
        inArray: function (value, args) {
            var arr = arguments, i = 1;
            if (arguments.length == 2) {
                if ($.likeArray(args))
                    arr = args, i = 0
                else if ($.isObject(args)) {
                    for (var k in args) {
                        if (args[k] === value)
                            return k
                    }
                }
            }
            for (; i < arr.length; i++) {
                if (arr[i] === value)
                    return new Number(i)
            }
            return null
        },

        /*	空函数
        @return	:this
        */
        emptyFun: function () { return this },


        /*	返回 false 的函数
        @return	:false
        */
        falseFun: function () {
            return false
        },


        /*	对传入的对象进行函数封装,封装后的函数返回 @obj
        @obj	:如果obj是函数，则返回obj，否则放一个新的函数，该函数返回值始终是obj
        @return	:Function
        */
        lambda: function (obj) {
            return $.isFun(obj) ? obj : function () {
                return obj
            }
        },


        /*	如果不是函数转换为函数
        @fun	:Object/String/Functon或字符串
        @onlyStr:Boolean 只有fun为字符串时转换
        @format	:String 函数格式化字符串
        @return	:Function
        */
        toFun: toFun = function () {
            var reg = /(\b(if|for|with|while|do|switch|throw|return|var)\b)|(;.*\S+)|\n/
            var cache = {}
            function attachReturn(expression, format) {
                if (reg.test(expression) == false && (format == null || reg.test(format) == false))
                    expression = "return " + expression
                return expression
            }

            return function (expression, onlyStr, format) {
                if (expression == null) return expression;

                var isStr = $.isStr(expression)
                if ((onlyStr == true && isStr == false) || $.isFun(expression))
                    return expression
                if (isStr == false && format == null)
                    return function () {
                        return expression
                    }

                var key = arguments.length < 4 ? expression + (onlyStr || '') + (format || '') : ""
                var fn;
                if (key != "" && (fn = cache[key]))
                    return fn
                var params, ms
                if ($.isStr(expression) && (ms = expression.match(/^([\s,\w$_]*)=>/))) {
                    params = ms[1]
                    expression = expression.replace(/^([\s,\w$]*)=>/, "")
                    expression = attachReturn(expression, format)
                    if (format) {
                        var r = /\bfunction\s*\(([\s,\w$_]*)\)/;
                        ms = r.exec(format)
                        if (/^\s*$/.test(ms[1]))
                            format = format.replace(r, " function(" + params + ")")
                        else {
                            var pStrs = params.split(',');
                            for (var i = 0; i < pStrs.length; i++)
                                expression = "var " + pStrs[i] + "=arguments[" + i + "];" + expression
                        }
                    }
                    else
                        format = "function(" + params + "){{0}}"
                }
                else
                    expression = attachReturn(expression, format)
                if (/\bas\b/.test(expression))
                    expression = "var as=arguments; " + expression
                var args = arguments
                if (format)
                    fn = eval("____=" + format.$format(expression))
                else
                    fn = eval("____=function(x,y,z){" + expression + "}")
                if (key != "")
                    cache[key] = fn
                return fn
            }
        } (),


        /*	ifFun 假如是函数 则返回函数的执行结果
        @obj	:Function/Object 函数或其它值
        @args	:Object(可选) 可变参数，要传递的任意多个参数
        @return	:Boolean
        */
        ifFun: function (obj, args) {
            if (obj && $.isFun(obj))
                return arguments.length > 1 ? obj.apply(this, slice.call(arguments, 1)) : obj.call(this)
            return obj
        },

        /*  通过调用对象本身的 $format 方法格式化对象
        @obj    :String/Date/Function 要格式化的对象
        @args :Object(可选) 可变参数，要传递的任意多个参数
        @return :String/Function  格式化后的对象
        */
        format: function (obj, args) {
            return (obj.$format || obj.format).apply(obj, slice.call(arguments, 1))
        },
        globalEval: function (script) {
            if (script == null || /^\s*$/.test(script))
                return
            var head = doc.getElementsByTagName("head")[0] || docE
            var e = doc.createElement("script")
            e.type = "text/javascript"
            e.text = script
            head.appendChild(e, head.firstChild)
            head.removeChild(e)
        }
    })

    /*	检测对象是否在一组数据中,功能等同于fly.inArray,
    例	:fly.In(3,1,2,3,4,...,n),fly.In(3,[1,2,3,4])
    @value	:要检测的一个值
    @args	:Object(可选) 可变参数，一组数据
    @return	:Number 返回在数组中的索引，如不在数组中则返回 null
    */
    $.In = $.inArray


    /* #C 函数扩展*/
    fly.Function = $.extend({
        /*	根据条件判断是否执行
        @predicate:Function/String/Object 用来判断是否执行的表达式、函数或其它对象 
        @args	:Array(可选) 参数，要传递的任意多个参数
        @return	:Function
        */
        where: function (predicate, args) {
            predicate = $.toFun(predicate, true)
            var isFun = $.isFun(predicate)
            var old = this
            var as = arguments.length > 1 ? slice.call(arguments, 1) : null;
            return function () {
                if (isFun ? predicate.apply(this, arguments) : predicate)
                    return old.apply(this, as || arguments)
            }
        },


        /*	绑定域
        @scope	:Object(可选) 域
        @return	:Function
        */
        bind: function (scope) {
            var o = this;
            return function () { return o.apply(scope, arguments) }
        },


        //        /*	格式化参数
        //        如：fn.$format('@{2}','@{*}',12,"@{1,5}","@{2-6}")
        //        @args:String/Object 可变参数，任意多个格式或参数
        //        可以是定位参数的字符串"{1}"、"{*}"、"{2-6}"、或者任意对象
        //        @return	:Function
        //        */
        //        format: function (args) {
        //            var old = this;
        //            var sendArgs = slice.call(arguments, 0)
        //            var needFormat = false
        //            for (var i = 0; i < arguments.length; i++)
        //                if ($.isStr(arguments[i]) && /^@\{([\d\*\-\,]+)\}$/.test(arguments[i])) {
        //                    needFormat = true;
        //                    break
        //                }


        //            if (!needFormat) {
        //                return function () {
        //                    return old.apply(this, sendArgs)
        //                }
        //            }


        //            return function () {
        //                var sArgs = [].concat(sendArgs)
        //                for (var i = 0; i < sArgs.length; i++) {
        //                    var arg = sArgs[i], ms;
        //                    if ($.isStr(arg) && (ms = arg.match(/^@\{([\d\*\-\,]+)\}$/))) {
        //                        var str = ms[1]
        //                        if (/^\d+$/.test(str)) {
        //                            sArgs[i] = arguments[str]
        //                        }
        //                        else {
        //                            var as;
        //                            if (str.indexOf(',') > -1) {
        //                                as = eval("[arguments[" + str.replace(/^,|,$/g, '').replace(/,+/g, "],arguments[") + "]]")
        //                            }
        //                            else {
        //                                var start = 0, end;
        //                                if (str.indexOf('-') > -1) {
        //                                    var parts = str.split('-')
        //                                    start = parts[0]
        //                                    end = parts[1]
        //                                }
        //                                as = slice.call(arguments, start, (parseInt(end) + 1) || 1000)
        //                            }
        //                            sArgs.splice.apply(sArgs, [i, 1].concat(as))
        //                            i += as.length - 1
        //                        }
        //                    }
        //                }
        //                return old.apply(this, sArgs)
        //            }
        //        },

        /*	继承
        @base	:基类
        @overrides:包含扩展成员的任意多个参数
        @return	:this
        */
        inherit: function (base, overrides) {
            var o = overrides || {}
            o.constructor = this
            o.base = base;
            return $.Class(o);
        },

        /*	扩展
        @overrides:包含扩展成员的任意多个参数
        @return	:this
        */
        extend: function (overrides) {
            $.extend.apply(this, [this.prototype].concat(slice.call(arguments, 0)))
            return this
        },
        parse: function (obj) {
            if (obj instanceof this) return obj;
            return new this(obj);
        }
    }, $.Function)
    $.safeExtend("$", Function.prototype, $.Function)


    /*#C Data 扩展*/
    fly.Date = $.extend({
        /*	格式化日期
        @format	:String 时间格式，默认 yyyy-MM-dd hh:mm:ss
        @return	:String 
        */
        format: function (format) {
            format = format || "yyyy-MM-dd HH:mm:ss";
            var o =
			{
			    //年
			    "y+": this.getFullYear(),
			    //月
			    "M+": this.getMonth() + 1,
			    //日
			    "d+": this.getDate(),
			    //小时24
			    "H+": this.getHours(),
			    //小时12
			    "h+": this.getHours() % 12,
			    //分
			    "m+": this.getMinutes(),
			    //秒
			    "s+": this.getSeconds(),
			    //毫秒
			    "S+": this.getMilliseconds(),
			    //星期大写
			    "W+": fly.Date.W[this.getDay()],
			    //星期小写
			    "w": fly.Date.w[this.getDay()]
			}

            for (var k in o) {
                format = format.replace(new RegExp(k, 'g'), function ($0) {
                    return o[k].toString().padLeft($0.length, '0')
                })
            }
            return format;
        }
    }, $.Date)
    fly.Date.w = " 123456"
    fly.Date.W = "Sun,Mon,Tues,Wed,Thurs,Fri,Sat".split(',')
    $.safeExtend("$", Date.prototype, $.Date)


    /*#C String 扩展*/
    fly.String = $.extend({
        formatReg: /\{([^{}]+)\}/g,
        /*	格式化字符串，可以调用用参数的属性或者方法进行格式化
        例如
        "a{0}b{1}".format("-",5) 结果等于 "a-b5"
			
        var option={id:123,name:"fly"};
        "a{0}b {name}".format("-",5,option) 结果等于 "a-b fly"
			
        var option={
        getId:function(){
        return 123
        }
        };
        "a{0}b {getId()}".format("-",option) 结果等于 "a-b 123"
			
        @args	:Object 可变参数，用来格式化的任意多个参数
        @return	:String
        */
        format: function (args) {
            var as = arguments
            return this.replace(this.formatReg, function ($0, $1) {
                var v;
                if ($1.match(/^\d+$/))
                    v = as[$1]
                else {
                    for (var i = as.length - 1; i > -1; i--) {
                        if (as[i] == null) continue;
                        if (/[^\w$]/.test($1))
                            eval('v=as[i].' + $1)
                        else
                            v = as[i][$1]
                        if (v !== undefined) {
                            while ($.isFun(v))
                                v = v.call(as[i])
                            break;
                        }
                    }
                }
                return v == null ? "" : v;
            })
        },

        /*	字符串是否包含另一个字符串
        @subStr	:要检查的子串
        @ignoreCase:Boolean(可选) 忽略大小写,默认区分大小写
        @separator:String(可选) 分隔符
        @return	:Boolean
        */
        contains: function (subStr, ignoreCase, separator) {
            return this.IndexOf(subStr, ignoreCase, separator) > -1;
        },

        /*	子串出现的位置
        @subStr	:要检查的子串
        @ignoreCase:Boolean(可选) 忽略大小写,默认区分大小写
        @separator:String(可选) 分隔符
        @return	:Int
        */
        IndexOf: function (subStr, ignoreCase, separator) {
            if (subStr == null)
                return -1;
            var ss = separator || ''
            var s = ss ? ss + this + ss : this, sub = ss ? ss + subStr + ss : subStr;

            return ignoreCase ? s.toUpperCase().indexOf(sub.toUpperCase()) : s.indexOf(sub);
        },

        /*	字符串是否以指定字符串开头
        @subStr	:要检查的子串
        @ignoreCase:Boolean(可选) 忽略大小写,默认区分大小写
        @return	:Boolean
        */
        startWith: function (subStr, ignoreCase) {
            if (subStr == null) return false;
            var s = this.substr(0, subStr.length)
            return ignoreCase ? (s.toUpperCase() == subStr.toUpperCase()) : (s == subStr)
        },

        /*	字符串是否以指定字符串结尾
        @subStr	:要检查的子串
        @ignoreCase:Boolean(可选) 忽略大小写,默认区分大小写
        @return	:Boolean
        */
        endWith: function (subStr, ignoreCase) {
            if (subStr == null) return false;
            var s = this.substr(this.length - subStr.length)
            return ignoreCase ? (s.toUpperCase() == subStr.toUpperCase()) : (s == subStr)
        },


        /*	去掉左右空白 
        @return	:String
        */
        trim: function () {
            return this.replace(/(^\s+)|(\s+$)/g, "");
        },
        /*	去掉左空白 
        @return	:String
        */
        trimLeft: function () {
            return this.replace(/^\s+/g, "");
        },

        /*	去掉左空白 
        @return	:String
        */
        trimRight: function () {
            return this.replace(/\s+$/g, "");
        },

        /*	将第一个字母转换为大写
        @return	:String
        */
        firstUpper: function () {
            return this.charAt(0).toUpperCase() + this.substr(1)
        },


        /*	重复指定次数
        @count	:Int 重复次数
        @return	:String
        */
        repeat: function (count) {
            var r = '';
            while (count-- > 0)
                r += this
            return r
        },


        /*	填充左边到指定长度
        @minLength:Int 最小长度
        @_char	:String 用来填充不足的字符
        @return	:String
        */
        padLeft: function (minLength, _char) {
            return (_char == null ? ' ' : _char.toString()).$repeat(minLength - this.length) + this
        },


        /*	填充右边到指定长度
        @minLength:最小长度
        @_char	:String 用来填充不足的字符
        @return	:String
        */
        padRight: function (minLength, _char) {
            return this + (_char == null ? ' ' : _char.toString()).$repeat(minLength - this.length)
        },
        /*  将字符串转换为骆驼命名规则
        @wordSplitChar  :String 字符串中的分隔符
        @return :String
        */
        camelCase: function (wordSplitChar) {
            var str = this;
            if (wordSplitChar && $.isStr(wordSplitChar)) {
                str = str.replace(new RegExp("\\" + wordSplitChar + "\\w", "g"), function ($1) {
                    return $1.charAt(1).toUpperCase()
                })
            }
            return str.charAt(0).toLowerCase() + str.substr(1)
        }
    }, $.String)
    $.safeExtend("$", String.prototype, $.String)

    /* #C path:fly.Event
    事件处理器
    */
    fly.EventManager = function () {
        var me = this, fromDom = {}
        this.event = null
        this.eventHash = {}
        this.stopPropagationReturnValue = false;

        this.btnMap = browser.isIE ?
		{
		    1: 0,
		    4: 1,
		    2: 2
		} : (browser.isWebKit ?
		{
		    1: 0,
		    2: 1,
		    3: 2
		} :
		{
		    0: 0,
		    1: 1,
		    2: 2
		});
        var spliceTypeName = function (eName) {
            var typeStart = eName.indexOf('.')
            var type = "";
            if (typeStart > -1) {
                type = eName.substr(typeStart + 1)
                eName = eName.substr(0, typeStart)
            }
            return { type: type, eName: eName }
        }

        var ps = "type altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" ")
        var ec = this.eventCls = function (e) {
            this.browserEvent = e
            for (var i = 0; i < ps.length; i++)
                this[ps[i]] = e[ps[i]]
        }

        ec.prototype.pageXY = function () {
            return { x: this.clientX + docE.scrollLeft + doc.body.scrollLeft,
                y: this.clientY + docE.scrollTop + doc.body.scrollTop
            }
        }

        //设置事件
        this.setEvent = function (e) {
            if (e == me.event || (e && e.browserEvent) || e == me.browserEvent) {
                return e;
            }
            win.$$event = $.$$event = me.browserEvent = e;
            var previous = $.$event
            var evt = $.$event = win.$event = me.$event = new this.eventCls(e)
            if (previous && previous != evt)
                evt.previous = previous

            if (e) {
                // 鼠标键
                evt.button = e.button ? this.btnMap[e.button] : (e.which ? e.which - 1 : -1);
                if (e.type == 'click' && evt.button == -1)
                    evt.button = 0;
                // 是否按下Ctrl键
                evt.ctrlKey = e.ctrlKey || e.metaKey || false;
                //键盘按键
                evt.keyCode = e.keyCode == undefined ? e.which : e.keyCode
                // 事件源
                evt.target = e.srcElement || e.target
            }
            else {
                evt.button = -1;
                evt.shiftKey = false;
                evt.ctrlKey = false;
                evt.altKey = false;
                evt.keyCode = 0;
                evt.charCode = 0;
                evt.target = null;
            }
            return evt;
        }


        this.restoreEvent = function (evt) {
            $.$event = win.$event = me.event = evt
            win.$$event = $.$$event = me.browserEvent = evt ? evt.browserEvent : null;
        }

        var on = function (el, eName, fn, scope, args) {
            var id = UID(el)
            var eHash = me.eventHash[id]
            eHash || (me.eventHash[id] = eHash = { el: el })

            var parts = spliceTypeName(eName)
            eName = parts.eName

            var hs = eHash[eName]

            if (hs == null) {
                eHash[eName] = hs = []
                function h(e) {
                    e = e || win.event
                    var evt = me.setEvent(e)
                    var ret = me.fire(el, eName, fromDom)
                    try {
                        me.restoreEvent(evt.previous)
                    } catch (ex) { }
                    return ret
                }

                hs.root = h;

                if (eName == "sizechange" && !browser.isIE) {
                    var ow = el.offsetWidth, oh = el.offsetHeight;
                    setInterval(function () {
                        if (ow != el.offsetWidth || oh != el.offsetHeight) {
                            ow = el.offsetWidth
                            oh = el.offsetHeight
                            h({ type: eName });
                        }
                    }, 300);
                }
                else if (el.attachEvent)
                    el.attachEvent("on" + (eName == "sizechange" ? "resize" : eName), h)

                else if (el.addEventListener)
                    el.addEventListener(eName, h, false)

                else if (!(("on" + eName) in el))
                    el["on" + eName] = h

            }
            hs.push(
			        {
			            fn: $.toFun(fn),
			            scope: scope,
			            args: args,
			            type: parts.type
			        })
        }

        /*	绑定事件
        @el	:Object/Array<Object> 一个或多个DOM对象
        @eName	:String/Array<String> 一个或多个事件名
        @fn		:Function/Array<Function> 一个或多个处理函数
        @scope  :域
        @args	:Object(可选) 要传递的任意多个参数
        @return	:el
        */
        this.on = function (el, eName, fn, scope, args) {
            var nIsStr = $.isStr(eName), nIsObj = !nIsStr && $.isObject(eName);
            if (arguments.length == 2 && !nIsObj)
                return this.fire(el, eName);
            var eIsArr = $.likeArray(el), fIsArr = $.likeArray(fn)
            nIsObj && (scope = fn)
            var dIndex = nIsObj ? 3 : 4
            data = arguments.length > dIndex ? slice.call(arguments, dIndex) : undefined
            if (!eIsArr && !nIsObj && nIsStr && !fIsArr) {
                on(el, eName, fn, scope, data)
                return this
            }

            function bn(e, n, f) {
                f && (fIsArr = $.likeArray(f))
                fIsArr ? $.each(f, function (_f) {
                    on(e, n, _f, scope, data)
                }) : on(e, n, f, scope, data);
            }

            function be(e) {
                nIsStr ? bn(e, eName, fn) : nIsObj ? $.each(eName, function (f, n) {
                    bn(e, n, f)
                }) : $.each(eName, function (n) { bn(e, n, fn) });
            }
            eIsArr ? $.each(el, be) : be(el);
            return this
        }

        this.bind = this.on

        /*	注销事件
        @el	:Object/Array<Object> 一个或多个DOM对象
        @eName	:String/Array<String> 一个或多个事件名
        @fn		:Function/Array<Function> 一个或多个处理函数
        @return	:el
        */
        this.un = function (el, eName, fn) {
            if ($.likeArray(el)) {
                for (var i = 0; i < el.length; i++)
                    me.un(el[i], eName, fn)
                return el
            }


            if ($.likeArray(eName)) {
                for (var i = 0; i < eName.length; i++)
                    me.un(el, eName[i], fn)
                return el
            }
            var uid = UID(el)
            var eHash = me.eventHash[uid]
            if (!eHash)
                return el


            function un(hs, fn, name, type) {
                if ($.likeArray(fn)) {
                    for (var i = 0; i < fn.length; i++)
                        un(hs, fn[i], name, type)
                    return
                }

                fn != null && (fn = $.toFun(fn))

                for (var i = hs.length - 1; i > -1; i--) {
                    if ((fn == null || hs[i].fn == fn) && (type === "" || type == hs[i].type))
                        hs.splice(i, 1)
                }

                if (hs.length == 0 && eHash[name]) {
                    var el = eHash.el, root = eHash[name].root
                    if (root) {
                        el.detachEvent && el.detachEvent("on" + name, root)
                        if (el.removeEventListener)
                            try {
                                el.removeEventListener(name, root)
                            } catch (e) { }

                        if (el["on" + name] == root)
                            el["on" + name] = null;
                    }
                    eHash[name] = null;
                    delete eHash[name]
                }
            }

            if (eName == null) {
                for (var en in eHash) {
                    if (en != "el")
                        un(eHash[en], fn, en, '', true)
                }
                eHash.el = null;
                me.eventHash[uid] = null
                delete me.eventHash[uid]
            }
            else {
                var parts = spliceTypeName(eName)
                var hs = eHash[parts.eName]
                if (!hs)
                    return el
                else
                    un(hs, fn, parts.eName, parts.type)
            }

            var i = 0;
            for (var k in eHash)
                i++
            if (i < 2) {
                delete eHash.el
                delete me.eventHash[uid]
            }

            return this
        }
        this.unbind = this.un;


        /*	触发事件
        @el	:Object/Array<Object> 一个或多个DOM对象
        @eName	:String/Array<String> 一个或多个事件名
        @scope  :域
        @args	:Array(可选) 可变参数，要传递的任意多个参数
        @return :el
        */
        this.fire = function (el, eName, scope, args) {
            me.stoped = false
            if (scope == fromDom)
                scope = null;
            else {
                if ($.likeArray(el)) {
                    for (var i = 0; i < el.length; i++)
                        me.fire.apply(me, [el[i]].concat(slice.call(arguments, 1)))
                    return el
                }


                if ($.likeArray(eName)) {
                    for (var i = 0; i < eName.length; i++)
                        me.fire.apply(me, [el, eName[i]].concat(slice.call(arguments, 2)))
                    return el
                }
            }

            var eHash = me.eventHash[UID(el)]
            if (!eHash)
                return el

            var parts = spliceTypeName(eName)
            eName = parts.eName

            var hs = eHash[eName]
            if (!hs)
                return el
            var ret
            var args = arguments.length > 3 ? slice.call(arguments, 3) : null;
            for (var i = hs.length - 1; i >= 0; i--) {
                var h = hs[i]
                if (h && parts.type === "" || parts.type == h.type) {
                    var c = h.scope == null ? (scope == null ? el : scope) : h.scope
                    ret = h.fn.apply(c, args || h.args || [el, me.$event])
                    try {
                        if (el.nodeType) {
                            if (ret == me.stopPropagationReturnValue) {
                                $.Event.stop()
                                break;
                            }
                            else if (me.stoped || (me.browserEvent && me.browserEvent.cancelBubble))
                                break
                        }
                        else if (ret == me.stopPropagationReturnValue)
                            break
                    } catch (e) { }
                }
            }
            return ret
        }

        /*	停止事件
        @return:Boolean false
        */
        this.stop = function (cancel) {
            var e = me.$event, be = me.browserEvent;
            me.stoped = true
            if (e) {
                e.cancelBubble = be.cancelBubble = true
                if (cancel)
                    e.returnValue = be.returnValue = false
                if (be.stopPropagation)
                    be.stopPropagation()
                if (be.preventDefault)
                    be.preventDefault()
            }
            return this == me ? this : false
        }

        /*  创建事件函数
        @eName  :String 事件名称
        @fire   :Function(可选) 事件的响应函数
        @return :Function 附加或响应事件的函数
        */
        this.createEventFn = function (eName, fire) {
            var eName = eName.replace(/^on/i, '')
            eName = eName.charAt(0).toLowerCase() + eName.substr(1)
            return function () {
                if (arguments.length > 0)
                    return this.on.apply(this, [eName].concat(slice.call(arguments, 0)))
                else if (fire)
                    return fire.call(this)
                else
                    this.fire(eName);
            }
        }

        /*	为对象注册事件
        @obj :要注册事件的对象
        @eventNames	:Array 要注册的任意多个事件名称
        @return	:fly.Event
        */
        this.registEvent = function (obj, eventNames) {
            var target = $.isFun(obj) ? obj.prototype : obj
            this.eventAble(target)
            eventNames = $.isStr(eventNames) ? [eventNames] : eventNames
            for (var i = 0; i < eventNames.length; i++) {
                var e = eventNames[i];
                if (target[e] == null)
                    target[e] = this.createEventFn(e);
            }
            return this
        }

        /*  使对象具有事件管理机制
        @obj    :Object 除值类型的任何对象
        @return :fly.Event
        */
        this.eventAble = function (obj) {
            var target = $.isFun(obj) ? obj.prototype : obj
            if (target.eventAble) return this
            if (!target.fire)
                target.fire = function () {
                    return me.fire.apply(this, [this].$addRange(arguments))
                }
            if (!target.on)
                target.on = function () {
                    return me.on.apply(this, [this].$addRange(arguments))
                }
            if (!target.un)
                target.un = function () {
                    me.un.apply(this, [this].$addRange(arguments))
                    return this
                }
            return this
        }

        this.destroy = function () {
            me.destroy = null;
            for (var k in me.eventHash)
                me.un(me.eventHash[k].el)
            destroy(me)
            me = null;
        }
    } .$inherit($.EventManager);

    //事件处理对象
    fly.Event = new $.EventManager()

    var docComp = function () {
        return (/loaded|complete/).test(document.readyState)
    }

    /*	绑定多个函数到 window.onload
    @fu	:Function 可变参数，要绑定的任意多个函数
    @return	:fly
    */
    $.onLoad = function (fn, scope, data) {
        docComp() ? fireArr([arguments]) : $.Event.on.apply($.Event, [win, "load"].concat(slice.call(arguments)))
        return this
    }

    var readys = [], readyState = 0

    var fireArr = function (arr) {
        var arg
        while (arg = arr.shift()) {
            var fns = $.toArray(arg[0]), scope = arg[1], args = slice.call(arg, 2)
            args[0] == null && (args[0] = $)
            $.each(fns, function (f) {
                setTimeout(function () {
                    f.apply(scope == null ? $ : scope, args)
                });
            })
        }
    }

    var readyFire = function () {
        readyState = 2
        fireArr(readys)
    }

    /*	绑定多个函数到 window.onload
    @fu	:Function 可变参数，要绑定的任意多个函数
    @return	:fly
    */
    $.ready = function (fn, scope, data) {
        readys.push(arguments)
        $.checkReady()
        return this
    }


    $.checkReady = function () {
        if (readyState == 1)
            return;
        else if (readyState == 2)
            return readyFire()

        $.onLoad(readyFire);
        var eName = browser.isIE ? "readystatechange" : "DOMContentLoaded"

        function read() {
            if (docComp()) {
                fly.Event.un(document, eName, read)
                readyFire()
            }
        }

        fly.Event.on(document, eName, read)

        if (browser.isIE) {
            var ih = setInterval(function () {
                if (docComp()) {
                    clearInterval(ih)
                    readyFire()
                }
            }, 10);
        }
    }


    /*	绑定多个函数到	window.onunload
    @args	:Function(可选) 可变参数，要绑定的任意多个函数
    @return	:fly
    */
    $.onUnload = function (args) {
        $.Event.on(win, "unload", arguments)
        return $
    }

    /*	绑定多个函数到	window.onBeforeUnload
    @args	:Function 可变参数，要绑定的任意多个函数
    @return	:fly
    */
    $.onBeforeUnload = function (args) {
        $.Event.on(win, "beforeunload", arguments)
        return $
    }


    /*#C path:fly.JSON
    JSON工具
    */
    fly.JsonUtils = function () {
        var me = this, useHasOwn = !!{}.hasOwnProperty, noUrl = function (s) { return s }, encodeUrl = noUrl;
        var m =
		{
		    "\b": '\\b',
		    "\t": '\\t',
		    "\n": '\\n',
		    "\f": '\\f',
		    "\r": '\\r',
		    '"': '\\"',
		    "\\": '\\\\'
		};
        var needJsonEncode = function (jsonEncode) {
            return jsonEncode === 0 || jsonEncode == null || jsonEncode > 0
        }
        function setUrlEncode(en) {
            encodeUrl = en == true ? encodeURI : noUrl
        }

        var encodeString = function (s, jsonEncode) {
            s = encodeUrl(s)
            if (/["\\\x00-\x1f]/.test(s)) {
                return '"' + s.replace(/([\x00-\x1f\\"])/g, function (a, b) {
                    var c = m[b];
                    if (c) {
                        return c;
                    }
                    c = b.charCodeAt();
                    return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                }) + '"';
            }
            if (needJsonEncode(jsonEncode))
                return '"' + s + '"';
            else return s
        };

        var encodeArray =
        /*	对集合进行编码
        @o   :Array 要编码的集合
        @jsonEncode  :Boolean 是否JSON格式
        @return	:String
        */
 		this.encodeArray = function (o, jsonEncode) {
 		    var a = ["["], b,
			i,
			l = o.length, v;
 		    for (i = 0; i < l; i += 1) {
 		        v = o[i];
 		        switch (typeof v) {
 		            case "undefined":
 		            case "function":
 		            case "unknown":
 		                break;
 		            default:
 		                if (b) {
 		                    a.push(',');
 		                }
 		                a.push(v === null ? "null" : _encode(v, jsonEncode));
 		                b = true;
 		        }
 		    }
 		    a.push("]");
 		    return a.join("");
 		};


        /*  对时间进行编码
        @o   :Date 要编码的时间对象
        @jsonEncode  :Boolean 是否JSON格式,
        @return	:String
        */
        this.encodeDate = function (o, jsonEncode) {
            var t = o.$format("yyyy-MM-dd hh:mm:ss");
            return needJsonEncode(jsonEncode) ? '"' + t + '"' : t
        };


        /*  将对象编码
        @o   :要编码的对象
        @jsonEncode  :Boolean 是否JSON格式,
        @return	:String
        */
        this.encode = function (o, urlEncode, jsonEncode) {
            setUrlEncode(urlEncode)
            return _encode(o, jsonEncode)
        }

        var _encode = function (o, jsonEncode) {
            var nje = $.isNumber(jsonEncode) ? jsonEncode + 1 : jsonEncode
            if (o == null)
                return "null";
            var s = $.likeArray(o) ? encodeArray(o, nje) :
                $.isDate(o) ? $.JSON.encodeDate(o, jsonEncode) :
                    $.isStr(o) ? encodeString(o, jsonEncode) :
                        $.isNumber(o) || $.isBoolean(o) ? String(o) : $.BREAK;
            if (s != $.BREAK)
                return s;
            else {
                var a = ["{"], b,
				i,
				v;
                for (i in o) {
                    if (!useHasOwn || (o.hasOwnProperty && o.hasOwnProperty(i))) {
                        v = o[i];
                        switch (typeof v) {
                            case "undefined":
                            case "function":
                            case "unknown":
                                break;
                            default:
                                if (b)
                                    a.push(',');
                                a.push(_encode(i), ":", v === null ? "null" : _encode(v, nje));
                                b = true;
                        }
                    }
                }
                a.push("}");
                return a.join("");
            }
        };


        /*  对JSON字符串解码
        @json   :要解码的JSON对象	    
        @return	:String
        */
        this.decode = function (json) {
            var o = json;
            try {
                if ($.isStr(json))
                    return win.eval("(" + json + ")")
                return json;
            }
            catch (e) {
                if (o == "")
                    return ""
                win.eval(o)
            }
        },
        /*  将JSON对象进行Url编码
        @json   :Object 要编码的对象
        @memberToParam :Boolean 是否将成员编码为参数
        @prefix :String 前缀
        @return :String 编码后的字符串
        */
        this.urlEncode = function (json, memberToParam, prefix, buf) {
            var fromSelf = !!buf
            buf = buf || []
            var isArr = $.likeArray(json)
            var prefix = prefix == null || prefix === '' ? '' : prefix
            if (!$.likeArray(json) && !$.isObject(json)) {
                var r = me.encode(json, true, -1)
                if (fromSelf)
                    buf.push("&", prefix, "=", r)
                return r
            }

            $.each(json, function (val, key) {
                var v = isArr && !fromSelf ? val.value : val
                var k = (prefix === '' ? '' : prefix + '.') + encodeUrl(isArr ? (!fromSelf ? val.name || val.id : "") : key)

                if (memberToParam != false) {
                    if ($.likeArray(v))
                        return $.each(v, function () {
                            me.urlEncode(this, memberToParam, k, buf)
                        })
                    else if ($.isObject(v))
                        return $.each(v, function (o, key) {
                            me.urlEncode(o, memberToParam, k + "." + encodeUrl(key), buf)
                        })
                }
                buf.push("&", k, "=", me.encode(v, true, -1))
            })
            if (fromSelf) return
            if (buf.length) {
                buf.shift();
            }
            return buf.join('');
        },

        /*  将字符串进行Url解码*/
        this.urlDecode = function (str, override) {
            if (!str)
                return {};

            var json = {}, kv, k, v, ov, j, ks
            $.each(str.split('&'), function () {
                kv = this.split('=')
                k = decodeURIComponent(kv[0]);
                j = json
                ks = k.split(".");
                while (ks.length > 1) {
                    k = ks.shift()
                    j = j[k] = j[k] == null ? {} : j[k];
                }
                k = ks[0]
                v = kv[1];
                if (override || !j[k])
                    j[k] = v
                else if ($.isArray(ov = j[k]))
                    ov[ov.length] = v
                else
                    j[k] = [ov, v]
            });
            return json;
        }

        var gAs = {}, sAs = {}, propExpr = /^[\w\$]+$/
        this.getAccessor = function (e) {
            if ($.isFun(e)) return e
            if (gAs[e]) return gAs[e]

            if ($.isStr(e))
                return gAs[e] = propExpr.test(e) ? function (o) { return o[e] } : new Function("__o", "with(__o){return " + e + "}")
            else if ($.isNumber(e))
                return function (o) { return o[e] }
            else return function () { return e }
        }

        this.setAccessor = function (e) {
            if ($.isFun(e)) return e
            if (sAs[e]) return sAs[e]

            if ($.isStr(e))
                return sAs[e] = propExpr.test(e) ? function (o, v) { o[e] = v; } : new Function("__o", "with(__o,__v){" + e + "=__v}")
            else
                return sAs[e] = function (o, v) { o[e] = v }
        }
        this.destroy = destroy;
    } .$inherit($.JsonUtils);
    fly.JSON = new $.JsonUtils()


    /* #C path:fly.ajax
    拥有 go:/fly.ajax.Helper/ 实例大部分方法，
    也可以直接通过 fly.ajax 实例化一个 go:/fly.ajax.Helper/ 对象，以达到简化ajax请求的目的。
    详细API，请参照 go:/fly.ajax.Helper/ 对象

    如：
    var helper=new fly.ajax({url:"index.htm"});     //得到一个 go:/fly.ajax.Helper/ 实例
        
    fly.ajax({url:"index.htm"});     //用指定的选项直接发起Ajax请求


    以下3段代码实现同样的效果：
    1. new fly.ajax.Helper({url:"index.htm"}).go()
    2. new fly.ajax({url:"index.htm"}).go()
    3. fly.ajax({url:"index.htm"})



    也可以通过如下形式实现Ajax请求：
    function success(data){
    alert(data)
    }
    function error(sender){
    alert(sender.responseText)
    }
    fly.ajax.url("index.htm").method("get").async(true).onSuccess(success).onError(error).go();

    */

    /* #C path:fly.ajax.Helper
    通过 HTTP 请求加载远程数据。
    配置:
    {
    url     :String 请求的地址
    method  :String 请求方式,get或post,默认get
    async   :Boolean    是否异步,默认true
    dataHandler:Function    对请求返回的数据进行处理后返回
    charset :String 编码,默认GB2312
    username:String 用户名,服务端验证用
    password:String 密码,服务端验证用
    timeout :Int    超时时间(毫秒)
    data    :JSON/String   向服务器传递的数据
    }

    调用:

    var helper=new fly.ajax.Helper({
    url:'http://www.flyui.net/a.php',
    method:'get',
    success:function(){
    alert('请求成功!')
    }
    })
    helper.go();

    ------------------------------------------
    var helper=new fly.ajax.Helper()
    helper.setup({
    url:'http://www.flyui.net/a.php',
    method:'get',
    success:function(){
    alert('请求成功!')
    }
    })
    helper.go();

    ------------------------------------------
    fly.get('http://www.flyui.net/a.php',function(){
    alert('请求成功!')
    });

    ------------------------------------------
    fly.post('http://www.flyui.net/a.php',function(){
    alert('请求成功!')
    });

    ------------------------------------------
    var helper=fly.ajax.url('http://www.flyui.net/a.php').method('get').onSuccess(function(){
    alert('请求成功!')
    }).go();
            
    ------------------------------------------
    var helper=fly.ajax.url('http://www.flyui.net/a.php').onSuccess(function(){
    alert('请求成功!')
    }).get();

    */

    var ajax = fly.ajax = function (option) {
        var helper = new ajax.Helper(option)
        if (arguments.length > 0 && $.is(this, $.ajax) === false && helper.autoLoad != false)
            return helper.go();
        return helper;
    }

    /*#M path:fly.ajax.Helper.url 设置请求的地址
    @url    :String 地址
    @return :this
    */
    /*#M path:fly.ajax.Helper.method 设置请求方式
    @method    :String get或post,默认get
    @return :this
    */

    /*#M path:fly.ajax.Helper.async 设置是否采用异步请求
    @async    :Boolean 是否异步,默认true
    @return :this
    */

    /*#M path:fly.ajax.Helper.dataHandler 设置对请求返回的数据进行处理后返回的函数
    @dataHandler    :Function   处理函数
    @return :this
    */

    /*#M path:fly.ajax.Helper.contentType 设置HTTP头:contentType
    @contentType    :String   默认application/x-www-form-urlencoded
    @return :this
    */

    /*#M path:fly.ajax.Helper.charset 设置HTTP头:charset
    @charset    :String   编码,默认GB2312
    @return :this
    */

    /*#M path:fly.ajax.Helper.username 设置用户名,服务端验证用
    @username    :String   用户名
    @return :this
    */

    /*#M path:fly.ajax.Helper.password 设置密码,服务端验证用
    @password    :String   密码
    @return :this
    */

    /*#M path:fly.ajax.Helper.timeout 设置超时时间(毫秒)
    @timeout    :Int   超时时间(毫秒)
    @return :this
    */

    /*#M path:fly.ajax.Helper.data 设置向服务器传递的数据
    @data    :JSON   向服务器传递的数据
    @return :this
    */

    ajax.Option = {
        /*String 请求的地址*/
        url: null,
        /*String 请求方式,get或post,默认get*/
        method: null,
        dataType: "",
        /*Boolean    是否异步,默认true*/
        async: true,
        parameterName: "par_{0}",
        /*Function    对请求返回的数据进行处理后返回*/
        dataHandler: undefined,
        /*String    默认application/x-www-form-urlencoded*/
        contentType: "application/x-www-form-urlencoded",
        /*String 编码,默认GB2312*/
        charset: "GB2312",
        /*String 用户名,服务端验证用*/
        username: undefined,
        /*String 密码,服务端验证用*/
        password: undefined,
        /*Int    超时时间(毫秒)*/
        timeout: -1,
        /*JSON/String   向服务器传递的数据*/
        data: undefined,
        /*FormElement 要提交的Form*/
        form: null,
        /*Object 请求状态提醒*/
        loading: null
    }

    ajax.Helper = function (option) {
        this.option = $.clone(ajax.Option)
        this.setup(option)
    }

    ajax.Accepts = {
        xml: "application/xml, text/xml",
        html: "text/html",
        script: "text/javascript, application/javascript",
        json: "application/json, text/javascript",
        text: "text/plain",
        _default: "*/*"
    }
    /* #E path:fly.ajax.Helper.onStart
    在Ajax请求开始之前时执行,返回false取消请求。*/

    /* #E path:fly.ajax.Helper.onError
    在Ajax请求出错时执行。*/

    /* #E path:fly.ajax.Helper.onSuccess
    在Ajax请求成功时执行。*/

    /* #E path:fly.ajax.Helper.onComplete
    在Ajax请求完成时执行。*/

    /* #E path:fly.ajax.Helper.onSend
    在Ajax请发送数据前执行,返回false取消请求。*/

    /* #E path:fly.ajax.Helper.onStop
    在Ajax请求停止时执行。*/

    /* #E path:fly.ajax.Helper.onReadystatechange
    在Ajax请求中,服务端有响应时执行。*/


    ajax.Eevents = ["onStart", "onError", "onSuccess", "onComplete", "onSend", "onStop", "onReadystatechange"]
    $.Event.registEvent(ajax.Helper, ajax.Eevents);
    ajax.Helper.$extend(
 	{
 	    option: null,
 	    /*重新配置Ajax选项
 	    @option :JSON   包含详细配置的JSON对象
 	    @return :this
 	    */
 	    setup: function (option) {
 	        if (option) {
 	            for (var i = 0; i < ajax.Eevents.length; i++) {
 	                var e = ajax.Eevents[i]
 	                var le = e.charAt(2).toLowerCase() + e.substr(3)
 	                option[e] && this[e](option[e])
 	                option[le] && this[e](option[le])
 	            }
 	            $.extend(this.option, option)
 	        }
 	        return this;
 	    },
 	    /*  用GET方式对服务器发起请求
 	    @url    :String 请求的地址
 	    @data   :JSON(可选) 想服务器发送的数据
 	    @success:Function(可选)   当请求成功时的回调函数
 	    @error  :Function(可选)   当请求失败时的回调函数
 	    @return :Object/this    当同步请求是返回服务器输出内容,异步调用是返回当前的fly.ajax.Helper实例
 	    */
 	    get: function () {
 	        this.option.method = "GET"
 	        return this.go.apply(this, arguments)
 	    },
 	    /*  用POST方式对服务器发起请求
 	    @url    :String 请求的地址
 	    @data   :JSON(可选) 想服务器发送的数据
 	    @success:Function(可选)   当请求成功时的回调函数
 	    @error  :Function(可选)   当请求失败时的回调函数
 	    @return :Object/this    当同步请求是返回服务器输出内容,异步调用是返回当前的fly.ajax.Helper实例
 	    */
 	    post: function () {
 	        this.option.method = "POST"
 	        return this.go.apply(this, arguments)
 	    },
 	    setLoading: function (status, isEnd) {
 	        var loading = this.option.loading
 	        if (!loading || !loading.css)
 	            return
 	        var css = loading.css[status]
 	        if (css == null && !isEnd)
 	            css = loading.css
 	        css && (css = $.ifFun(css, this, status, isEnd))
 	        var box = $($.ifFun(loading.box, this, status, isEnd))
 	        box.each(function () {
 	            var c = this.ajax_status_css
 	            c && dh.removeClass(this, c)
 	            window.clearTimeout(this.ajax_status_handle)
 	        });
 	        loading._css && box.removeClass(loading._css)
 	        loading._css = css
 	        box.data('ajax_status_css', css)
 	        if (css) {
 	            box.addClass(css)
 	            if (isEnd)
 	                box.data('ajax_status_handle', setTimeout(function () {
 	                    box.removeClass(css)
 	                }, 5000))
 	        }
 	    },
 	    /*  对服务器发起请求
 	    @url    :String 请求的地址
 	    @data   :JSON(可选) 想服务器发送的数据
 	    @success:Function(可选)   当请求成功时的回调函数
 	    @error  :Function(可选)   当请求失败时的回调函数
 	    @return :Object/this    当同步请求是返回服务器输出内容,异步调用是返回当前的fly.ajax.Helper实例
 	    */
 	    go: function (url, data, success, error) {
 	        var o = this.option
 	        if (arguments.length > 0) {
 	            this.url(url)
 	            if ($.isFun(data)) {
 	                error = success
 	                success = data
 	                data = undefined
 	            }
 	            data !== undefined && (this.data(data))
 	            success && this.onSuccess(success)
 	            error && this.onError(error)
 	        }

 	        var url = o.url
 	        if (!url)
 	            url = o.form ? o.form.action : location.href
 	        url = url.replace(/#.*$/, '')

 	        if (this.fire("start") === false)
 	            return this
 	        this.setLoading("start")
 	        this.parseSendData()
 	        var isGet = (o.method || o.type || "GET").toUpperCase() == "GET"
 	        if (isGet) {
 	            if (o.dataEncode !== "")
 	                url += (url.indexOf('?') > -1 ? "&" : "?") + o.dataEncode
 	            if (o.dataType === "script")
 	                return this.loadScript(url)
 	        }

 	        this.createConnecion();

 	        var conn = this.connection
 	        var method = isGet ? "GET" : "POST"
 	        if (o.form) {
 	            var _m = o.form.method, _a = o.form.action, _t = o.form.target
 	            o.form.method = method
 	            o.form.action = url
 	            o.form.target = this.iframeID
 	        }
 	        else {
 	            o.username != undefined ? conn.open(method, url, o.async, o.username, o.password) : conn.open(method, url, o.async);
 	            conn.setRequestHeader("Content-Type", o.contentType)
 	            conn.setRequestHeader("Charset", o.charset)
 	            if (!isGet)
 	                conn.setRequestHeader("Content-Length", o.dataEncode.length);

 	            conn.setRequestHeader("X-Requested-With", "XMLHttpRequest");
 	            conn.setRequestHeader("Accept", o.dataType && ajax.Accepts[o.dataType] ?
				ajax.Accepts[o.dataType] + ", */*" :
				ajax.Accepts._default);
 	        }
 	        var c = this.createContext()
 	        conn.onreadystatechange = c.stateChange;
 	        if (this.fire("send", this, conn, o) === false) return this
 	        if (o.timeout > 0) {
 	            var startT = new Date()
 	            var h = setInterval(function () {
 	                if (c.isComplete)
 	                    clearInterval(h)
 	                else if ((new Date() - startT) >= o.timeout) {
 	                    clearInterval(h)
 	                    c.isTimeout = "timeout"
 	                    c.conn.abort()
 	                }
 	            }, 60);
 	        }

 	        if (o.form) {
 	            o.form.submit()
 	            o.form.method = _m
 	            o.form.action = _a
 	            o.form.target = _t
 	        }
 	        else
 	            conn.send(isGet ? null : o.dataEncode);

 	        if (!o.async) {
 	            c.stateChange()
 	            return this.getContent()
 	        }
 	        return this
 	    },

 	    createContext: function () {
 	        var context = { conn: this.connection, option: this.option, data: undefined, errMsg: undefined }
 	        var me = this, c = context;
 	        c.complete = function () {
 	            me.fire("complete", this, c.conn, c.data, c.option.status);
 	            me.fire("stop", this, c.conn, c.option);
 	        }

 	        c.stateChange = function () {
 	            var state = c.conn.readyState
 	            me.fire("readystatechange", this, c.conn)
 	            if (!c.conn || state === 0 || c.isTimeout === "abort") {
 	                if (!context.isComplete)
 	                    c.complete();

 	                c.isComplete = true;
 	                if (c.conn)
 	                    c.conn.onreadystatechange = $.emptyFun;
 	            }

 	            if (!c.isComplete && c.conn && (state === 4 || state === 'complete' || c.isTimeout == "timeout")) {
 	                context.isComplete = true;
 	                c.conn.onreadystatechange = $.emptyFun;
 	                c.option.status = c.isTimeout === "timeout" ?
					    "timeout" :
					    !me.isSuccess() ? "error" : "success";

 	                if (c.option.status === "success") {
 	                    try {
 	                        c.data = me.getContent();
 	                    } catch (ex) {
 	                        c.option.status = "parsererror";
 	                        errMsg = ex;
 	                    }
 	                }

 	                if (c.option.status === "success" || c.option.status === "notmodified") {
 	                    me.fire("success", me, c.data, c.option.status, c.conn)
 	                    me.setLoading("success", 1)
 	                }
 	                else {
 	                    me.fire("error", me, c.conn, c.option.status, c.errMsg)
 	                    me.setLoading(c.option.status, 1)
 	                }

 	                c.complete()
 	            }
 	        }
 	        return c;
 	    },
 	    /*  加载js脚本文件
 	    @url    :脚本文件地址
 	    @return :this
 	    */
 	    loadScript: function (url) {
 	        var head = doc.getElementsByTagName("head")[0] || docE;
 	        var e = doc.createElement("script");
 	        e.src = url;
 	        var option = this.option
 	        if (option.charset)
 	            e.charset = option.charset;
 	        var complete = false
 	        e.onload = e.onreadystatechange = function () {
 	            this.fire("readystatechange", this, e)
 	            if (!complete && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
 	                complete = true;
 	                this.fire("success", me, e)
 	                this.fire("complete", me, e, "success");
 	                e.onload = e.onreadystatechange = null;
 	                if (e.parentNode)
 	                    e.parentNode.removeChild(e);
 	            }
 	        };
 	        head.appendChild(e);
 	        return this;
 	    },
 	    /*  获取服务端输出内容
 	    @return :Object
 	    */
 	    getContent: function () {
 	        var conn = this.connection, option = this.option, data
 	        if (this.option.form) {
 	            var b = conn.contentWindow.document.body
 	            data = b.childNodes.length == 1 && b.childNodes[0].nodeName == "PRE" ? b.childNodes[0].innerHTML : b.innerHTML
 	        }
 	        else {
 	            var dType = option.dataType || conn.getResponseHeader("content-type") || ""
 	            var isXml = /xml/i.test(dType)
 	            data = isXml ? conn.responseXML : conn.responseText;

 	            if (isXml && data && data.documentElement && data.documentElement.nodeName === "parsererror")
 	                throw (option.status = "parsererror")
 	        }
 	        if (option.dataHandler)
 	            data = option.dataHandler.call(this, data, option.dataType);

 	        if (typeof data === "string") {
 	            if (/json/i.test(dType))
 	                data = $.JSON.decode(data);
 	            else if (/script/i.test(dType))
 	                $.globalEval(data);
 	        }
 	        return data;
 	    },
 	    createConnecion: function () {
 	        if (this.option.form) {
 	            this.iframeID = Math.random()
 	            this.connection = $('<iframe name="{0}" style="display:none">'.format(this.iframeID)).appendTo(document.body)[0]
 	        }
 	        else if (win.XMLHttpRequest && (win.location.protocol !== "file:" || !win.ActiveXObject))
 	            this.connection = new XMLHttpRequest()
 	        else if (win.ActiveXObject)
 	            try {
 	                this.connection = new ActiveXObject("Msxml2.XMLHTTP");
 	            }
 	            catch (e) {
 	                this.connection = new ActiveXObject("Microsoft.XMLHTTP");
 	            }
 	    },
 	    parseSendData: function () {
 	        var data = this.option.data
 	        if (data == null) return this.option.dataEncode = "";
 	        var eName = this.option.jsonEncode ? "encode" : "urlEncode" ///POST/i.test(this.option.type)
 	        var buf = [];

 	        if ($.isObject(data)) {
 	            for (var k in data)
 	                buf.push(encodeURI(k) + "=" + $.JSON[eName](data[k]))
 	        }
 	        else if ($.likeArray(data)) {
 	            for (var i = 0; i < data.length; i++)
 	                buf.push(encodeURI(this.option.parameterName.$format(i)) + "=" + $.JSON[eName](data[i]))
 	        }

 	        return this.option.dataEncode = buf.join('&')
 	    },
 	    destroy: function () {
 	        this.destroy = null
 	        destroy(this.option)
 	        destroy(this)
 	    },
 	    isSuccess: function () {
 	        try {
 	            var conn = this.connection, s = conn.status
 	            return (this.option.form && conn.contentWindow.status == '') || !s && location.protocol === "file:" ||
				    (s >= 200 && s < 300) ||
				    s === 304 || s === 1223 || s === 0;
 	        } catch (e) { }

 	        return false;
 	    }
 	})

    $.each(ajax.Option, function (o, k) {
        ajax.Helper.prototype[k] = function (value) {
            this.option[k] = value
            return this;
        }

        ajax[k] = function (value) {
            var helper = $.is(this, ajax.Helper) ? this : new ajax.Helper()
            helper[k].apply(helper, arguments)
            return helper;
        }
    })

    $.each(ajax.Eevents, function (eName) {
        ajax[eName] = function (fn) {
            var helper = $.is(this, ajax.Helper) ? this : new ajax.Helper()
            helper[eName].apply(helper, arguments)
            return helper;
        }
    })

    $.post = ajax.post = function () {
        var helper = new ajax.Helper()
        return helper.post.apply(helper, arguments)
    }

    $.get = ajax.get = function () {
        var helper = new ajax.Helper()
        return helper.get.apply(helper, arguments)
    }
    ajax.destroy = destroy


    /*#C Cookie 工具类*/
    fly.Cookie = $.extend({
        /*	设置Cookie
        @name	:String cookie名
        @value	:String cookie值
        @expires:Date/Int 过期时间,Int表示过期的分钟数
        @path	:String 路径
        @domain	:String 域
        @secure	:Boolean 
        @return	:fly.Cookie
        */
        set: function (name, value, expires, path, domain, secure) {
            var path = path == null ? '/' : path
            doc.cookie = name + "=" + escape(value)
                + ((expires == null) ? "" : ("; expires=" + ($.isNumber(expires) ? new Date() + (expires * 60000) : expires.toGMTString()))) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
            return $.Cookie
        },


        /*	获取Cookie
        @name	:String cookie名
        @path	:String 路径
        @return	:String cookie 值
        */
        get: function (name, path) {
            var cookie = doc.cookie
            if (path != null) {
                var start = cookie.search(new RegExp(path + "=", "gi"));
                if (start < 0)
                    return
                cookie = doc.cookie.substr(start + path.length + 1).replace(/;.*/g, "");
            }

            var start = cookie.search(new RegExp(name + "=", "gi"));
            if (start < 0)
                return
            cookie = cookie.substr(start + name.length + 1).replace(/&.*/g, "");
            return unescape(cookie);
        },


        /*	删除 Cookie
        @name	:String cookie名
        @return	:fly.Cookie
        */
        remove: function (name) {
            if (Cookies.get(name))
                doc.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
            return $.Cookie
        }
    }, $.Cookie)


    /* #C path:fly.ui.Style
    CSS 工具类
    */
    fly.ui.StyleUtils = function () {
        var me = this
        var uName = /width|height|top|left|right|bottom|margin|padding/i
        var unitReg = /(p[xt])|(%)|em|ex/gi;

        /*  加载CSS
        @url:String CSS文件地址
        @return:Element link元素
        */
        this.loadCss = function (url) {
            var el = doc.createElement("link");
            el.rel = "stylesheet"
            el.type = "text/css"
            el.href = url;
            (doc.getElementsByTagName("head")[0] || docE).appendChild(el)
            return el
        }

        this.defaultSheet = function () {
            return me.sheet || (me.sheet = me.createSheet())
        }

        /*  创建CSS
        @cssText:String CSS内容
        @return :Element style元素
        */
        this.createSheet = function (cssText) {
            var sheet
            if (doc.createStyleSheet) {
                (sheet = doc.createStyleSheet()).cssText = cssText;
                sheet.cssRules = sheet.rules
            }
            else {
                sheet = doc.createElement('style');
                sheet.type = 'text/css';
                try {
                    sheet.innerHTML = cssText || "";
                } catch (e) { }
                ; (doc.getElementsByTagName("head")[0] || docE).appendChild(sheet)
                sheet = sheet.sheet
                sheet.rules = sheet.cssRules
            }
            return me.lastCreateSheet = sheet
        }

        /*  创建CSS类
        @sheet  :StyleSheet(可选) CSS元素
        @name   :String CSS类名
        @cssText:String CSS内容
        @return :StyleSheetRule CSS类
        */
        this.createCssRule = function (sheet, name, cssText) {
            if ($.isStr(sheet)) {
                cssText = name;
                name = sheet;
                sheet = null;
            }

            if (sheet == null)
                sheet = me.sheetForCreateRule || (me.sheetForCreateRule = this.createSheet())

            sheet.addRule ? sheet.addRule(name, cssText || " ") : sheet.insertRule("" + name + " { " + cssText + " }", sheet.cssRules.length);
            return sheet.rules[sheet.rules.length - 1];
        }

        /*	获取元素当前样式
        @el		:Element 元素
        @return	:currentStyle
        */
        this.currentStyle = function (el) {
            return doc.defaultView ? doc.defaultView.getComputedStyle(el, null) : el.currentStyle || el.runtimeStyle
        }


        /*	检测样式值
        @name	:String 样式名
        @value	:Object 样式值
        @return :Object 经处理过后的属性值
        */
        this.checkValue = function (name, value) {
            if (value != null && value != '' && uName.test(name)) {
                value = value.toString().replace(/[\d.]+([\w%]*)/g, function ($1, u) {
                    return u == "" ? $1 + 'px' : $1
                })
            }
            return value
        }


        /*	获取元素样式
        @el		:Element 要获取样式的元素
        @name	:String 要设置的样式名
        @return	:String 属性值
        */
        this.get = function (el, n) {
            var camel = camelCase(n)
            if (me.setters[camel])
                return me.getters[camel](el, n)

            var currentStyle = me.currentStyle(el);
            return currentStyle[camel] || currentStyle[n];
            //            if (!ret || ret == "auto" || /%$/.test(ret)) {
            //                ret = n == "width" ? el.offsetWidth :
            //                    n == "height" ? el.offsetHeight :
            //                        n == "left" ? el.offsetLeft :
            //                            n == "top" ? el.offsetTop : ret
            //            }
            //            return ret
        }

        /*	获取元素样式值
        @el		:Element 要获取样式的元素
        @name	:String 要设置的样式名
        @return	:Number 属性值
        */
        this.num = function (el, name) {
            return Number((me.get(el, name) + " ").replace(/[^\d-\.]/g, "")) || 0
        }

        /*	设置元素样式
        @el		:Element 被设置样式的元素
        @name	:String 要设置的样式名
        @value	:Object 样式值
        @return	:fly.ui.Style
        */
        this.set = function (el, name, value) {
            if ($.isObject(name)) {
                for (var k in name)
                    me.set(el, k, name[k])
                return me;
            }
            var camel = camelCase(name)
            if (me.setters[camel])
                me.setters[camel](el, name, value)
            else if (value == null)
                el.style[browser.diffAttrs.styleRemoveMethod](camel)
            else
                el.style[camel] = me.checkValue(camel, value)

            return me
        }

        /*	获取或设置对象的CSS属性，只传递 name 参数时则，获取该属性值。
        @el		:Element 被设置样式的元素
        @name	:String 属性名或要应用到对象CSS属性的键值对
        @value	:Object(可选) CSS属性值
        @return:this
        */
        this.css = function (el, name, value) {
            var iss = $.isStr(name)
            if (value === undefined && iss)
                return sh.get(el, name)

            if (iss)
                sh.set(el, name, value)
            else
                for (var p in name)
                    sh.set(el, p, name[p])
            return this
        },

        this.getters = {}
        this.setters = {}
        if (browser.isIE && browser.ieVersion < 9) {
            this.getters.opacity = function (el, name) {
                var style = me.currentStyle(el)
                var value = 100;
                (el.style.filter || "").replace(/alpha\([^)]*?(\d+)[^)]*\)/, function ($0, $1) {
                    value = parseFloat($1)
                })
                return isNaN(value) ? 100 : value / 100
            }

            this.setters.opacity = function (el, name, value) {
                value = parseFloat(value)
                el.style.filter = (el.style.filter || "").replace(/alpha\([^)]*\)/, "") +
					        (isNaN(value) || isNaN == 100 ? "" : "alpha(opacity=" + (100 * value) + ")");
            }
        }

        if (browser.isFirefox || browser.isOpera) {
            var bgp = "backgroundPosition"
            this.getters.backgroundPositionX = function (el, name, value) {
                return me.get(el, bgp).replace(/\s+.+$/, '')
            }
            this.getters.backgroundPositionY = function (el, name, value) {
                return me.get(el, bgp).replace(/^.+\s+/, '')
            }

            this.setters.backgroundPositionX = function (el, name, value) {
                me.set(el, bgp, value + " " + me.get(el, bgp + "Y"))
            }
            this.setters.backgroundPositionY = function (el, name, value) {
                me.set(el, bgp, me.get(el, bgp + "X") + " " + value)
            }
        }
    } .inherit(ui.StyleUtils);

    //样式处理
    fly.Style = fly.ui.Style = new ui.StyleUtils();
    var sh = fly.ui.Style
    var CUID = 1
    var UID = function (el) {
        el = el == doc ? docE : el
        return el.uniqueNumber != undefined ? el.uniqueNumber : (el instanceof Object ? el.uniqueNumber = "f_" + CUID++ : el)
    }

    /*#C path:fly.ui.DomHelper
    Dom 工具类
    */
    fly.ui.DomUtils = function () {
        var $ab = "afterbegin", $ae = "afterend", $bb = "beforebegin", $be = "beforeend", displays = {}
        var rTagName = /<([\w:]+)/
        var onlyTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/
        var sTagWraps = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };

        sTagWraps.optgroup = sTagWraps.option;
        sTagWraps.tbody = sTagWraps.tfoot = sTagWraps.colgroup = sTagWraps.caption = sTagWraps.thead;
        sTagWraps.th = sTagWraps.td;


        var me = this
        var emptyElement = doc.createElement('div')
        var getDom = this.getDom = function (obj) {
            return obj.dom || obj.single || (obj.$isElement ? obj[0] : obj);
        }


        var getOuter = this.getOuter = function (obj) {
            while (obj.getOuter)
                obj = obj.getOuter()

            while (obj.outer && obj.outer != obj)
                obj = obj.outer

            return getDom(obj);
        }


        var getInner = this.getInner = function (obj) {
            while (obj.getInner)
                obj = obj.getInner()
            while (obj.inner && obj.inner != obj)
                obj = obj.inner
            return getDom(obj);
        }

        /*	获取元素唯一ID
        @el	:Element Dom元素
        @return	:Int 元素ID
        */
        this.getUniqueId = UID

        /*	根据Html创建DOM元素
        @html	:String html字符串
        @return	:Array<Element> 创建的DOM元素
        */
        this.create = function (html) {
            if (html === "" || html == null)
                return
            if (!$.isStr(html)) {
                if (!$.isStr(html = $.ifFun(html)))
                    return html
            }
            var tag = onlyTag.exec(html);

            if (tag) {
                return new Array(doc.createElement(tag[1]));
            }
            else if (!$.isHtml(html))
                return new Array(document.createTextNode(html));

            var tw, p = emptyElement, tag = rTagName.exec(html)
            if (tag && (tw = sTagWraps[tag[1].toLowerCase()])) {
                p.innerHTML = tw[1] + html + tw[2]
                var i = 0
                while (i++ < tw[0])
                    p = p.firstChild;
            }
            else {
                p.innerHTML = html;
            }

            var ret = p.childNodes.length > 1 ? $.toArray(p.childNodes) : new Array(p.childNodes[0])
            for (var i = p.childNodes.length - 1; i > -1; i--)
                p.removeChild(p.childNodes[i])
            return ret
        }


        /*	插入对象
        @pos	:String 插入位置(beforeBegin,afterBegin,beforeEnd,afterEnd)
        @parent	:Element 父元素
        @child	:Element/Array<Element> 子元素
        @returnDom:Boolean 是否返回DOM元素
        @return	:Element/Array returnDom等于true返回DOM对象，否则返回包含该元素的集合
        */
        this.doInsert = function (pos, parent, child, returnDom) {
            var res
            if ($.likeArray(parent)) {
                for (var i = 0; i < parent.length; i++)
                    res = arguments.callee(pos, parent[i], child, returnDom)
                return res;
            }

            if ($.likeArray(child)) {
                child = $.toArray(child)
                var d = pos == $ae || pos == $ab
                for (var i = d ? child.length - 1 : 0; d ? i > -1 : i < child.length; d ? i-- : i++)
                    res = arguments.callee(pos, parent, child[i], returnDom)
                return res;
            }

            var p = getInner(parent);
            child = getOuter(child);

            var isHtml = $.isStr(child)
            if (isHtml && p.nodeName == "TABLE")
                return me.doInsert(pos, p, $(child), returnDom)

            if (p.insertAdjacentElement) {
                var inserted = false
                if (!isHtml && child.nodeName == '#text') {
                    if (pos == $be) {
                        p.appendChild(child)
                        inserted = true
                    }
                    else if (pos == $ab) {
                        p.insertBefore(child)
                        inserted = true
                    }
                    else {
                        isHtml = true;
                        child = child.nodeValue
                    }
                }
                if (inserted)
                    res = child;
                else if (isHtml) {
                    if ((p.nodeName == 'TD' && (pos == $bb || pos == $ae)) || (p.nodeName == 'TABLE' && (pos == $be || pos == $ab)) || 'TR,TD,TBODY,COL,COLGROUP'.indexOf(p.nodeName) > -1) {
                        return me.doInsert(pos, p, me.create(child), returnDom)
                    }
                    else {
                        res = p.insertAdjacentHTML(pos, child)
                    }
                }
                else {
                    if (p.nodeName == 'TABLE' && child.nodeName == "TR" && p.tBodies[0])
                        p = p.tBodies[0]
                    res = p.insertAdjacentElement(pos, child)
                }
            }
            else {
                var child = res = isHtml ? me.create(child) : child
                if ($.likeArray(child)) {
                    res = []
                    $.each(child, function (o) {
                        res.push(me.doInsert(pos, p, o))
                    })
                }
                else {
                    pos = pos.toLowerCase();
                    pos == $bb ? p.parentNode.insertBefore(child, p) :
                        pos == $ab ? p[p.firstChild ? "insertBefore" : "appendChild"](child, p.firstChild) :
                            pos == $be ? p.appendChild(child) :
                                p.nextSibling ? p.parentNode.insertBefore(child, p.nextSibling) : p.parentNode.appendChild(child);
                }
            }
            return returnDom == true ? res : $(res)
        }

        /* 在元素前插入对象
        @el	    :Element    在该元素前插入对象
        @child  :Element/Array<Element> 要插入的一个或多个Dom元素
        @returnDom:Boolean 是否返回DOM元素
        @return	:Element/Array returnDom等于true返回DOM对象，否则返回包含该元素的集合
        */
        this.before = function (el, child, returnDom) {
            return me.doInsert($bb, el, child, returnDom);
        }


        /* 在元素后插入对象
        @el	    :Element    在该元素后插入对象
        @child  :Element/Array<Element> 要插入的一个或多个Dom元素
        @returnDom:Boolean 是否返回DOM元素
        @return	:Element/Array returnDom等于true返回DOM对象，否则返回包含该元素的集合
        */
        this.after = function (el, child, returnDom) {
            return me.doInsert($ae, el, child, returnDom);
        }


        /* 在元素开始位置插入对象
        @el	    :Element    在该元素开始位置插入对象
        @child  :Element/Array<Element> 要插入的一个或多个Dom元素
        @returnDom:Boolean 是否返回DOM元素
        @return	:Element/Array returnDom等于true返回DOM对象，否则返回包含该元素的集合
        */
        this.prepend = function (el, child, returnDom) {
            return me.doInsert($ab, el, child, returnDom);
        }



        /* 将元素附加到一个对象结尾
        @el	    :Element    在该元素结束位置插入对象
        @child  :Element/Array<Element> 要插入的一个或多个Dom元素
        @returnDom:Boolean 是否返回DOM元素
        @return	:Element/Array returnDom等于true返回DOM对象，否则返回包含该元素的集合
        */
        this.append = function (el, child, returnDom) {
            return me.doInsert($be, el, child, returnDom);
        }

        /*	获取该Dom元素的子元素，不含 #text 
        @el	:要获取子元素的Dom元素
        @return	:Array 元素的所有子元素
        */
        this.children = function (el) {
            if (el.children || (el == doc ? (el = docE).children : false))
                return el.children
            return $.toArray(el.childNodes).where("o=>o.nodeType==1")
        }

        /*  将所有内容转移至另一个元素
        @from   :Element    将元素的所有内容移至另一个元素
        @to     :Element    将移至该元素
        @return :fly.ui.DomHelper   
        */
        this.moveContent = function (from, to) {
            if ($.likeArray(to))
                to = to[0]
            $.toArray(from).each(function (f) {
                if (f.childNodes)
                    this.doInsert($be, to, f.childNodes)
            }, this)
            return this;
        }

        /*  清空元素内容
        @el   :Element    将元素的所有内容移至另一个元素
        @return :fly.ui.DomHelper   
        */
        this.empty = function (el) {
            if (el) {
                var c;
                while (c = el.childNodes[0])
                    el.removeChild(c)
            }
            return this;
        }

        /* 改变CSS样式
        调用示例：
        var cls=fly.simple.changeCss(document.body,"css-blue css-red","css-yellow")
        给 document.body 移除 css-blue 和 css-red 样式后，追加 css-yellow 样式
        
        var oldCls="css-gray css-blue css-red"
        var cls=fly.simple.changeCss(oldCls,"css-blue css-red","css-yellow")
        给 oldCls 移除 css-blue 和 css-red 样式后，追加 css-yellow 样式
        调用结果 cls 等于“css-gray css-yellow”

        注意：
        该方法执行是先移除后追加，如果同一个样式同时出现在 removeCss 和 addCss 参数中时，该样式最终被追加，如：
        var oldCls="css-gray a b"
        var cls=fly.simple.changeCss(oldCls,"a b","b")
        给 oldCls 移除 a 和 b 样式后，追加 b 样式
        调用结果 cls 等于 “css-gray b”

        @el    :Element/String 要改变样式的DOM对象或字符串
        @removeCss  :String 要移除的样式,多个样式用空格隔开
        @addCss :String 要追加的样式,多个样式用空格隔开
        @return :String 改变后的样式
        */
        this.changeClass = function (el, removeCss, addCss) {
            if (el.isIList) {
                $.each(el, function (o) {
                    dh.changeClass(o, removeCss, addCss)
                })
                return;
            }

            var isStr = typeof (el) == "string"
            var old = isStr ? el : el.className;
            var c = removeCss ? this.removeClass(old, removeCss) : old;
            c = addCss ? this.addClass(c, addCss) : c;
            !isStr && c != old && (el.className = c)
            return c;
        }

        /*	添加CSS样式
        @el    :Element DOM 元素
        @css	:String 要添加的CSS名称
        @return	:String 改变后的样式
        */
        this.addClass = function (el, css) {
            if (el.isIList) {
                $.each(el, function (o) {
                    dh.addClass(o, css)
                })
                return;
            }

            var isStr = typeof (el) == "string"
            if (!isStr && el.className == undefined)
                return css

            var old = (isStr ? el : el.className).replace(/^ +| +$/g, "");
            if (old == "") {
                isStr || (el.className = css)
                return css
            }

            var c = " " + old + " ";
            css.replace(/\S+/g, function (o) {
                if (c.indexOf(' ' + o + ' ') < 0)
                    c += " " + o;
            });
            c = c.replace(/ +/g, " ").replace(/^ +| +$/g, "");
            !isStr && c != old && (el.className = c)
            return c;
        }

        /*	移除CSS样式
        @el    :Element DOM 元素
        @css	:String 要移除的CSS名称
        @return	:String 改变后的样式
        */
        this.removeClass = function (el, css) {
            if (el.isIList) {
                $.each(el, function (o) {
                    dh.removeClass(o, css)
                })
                return this;
            }

            var isStr = typeof (el) == "string"
            if (!isStr && el.className == undefined)
                return css
            var old = (isStr ? el : el.className).replace(/^ +| +$/g, "");
            if (old == "") return "";

            var c = " " + old.replace(/\s/g, '  ') + " ";
            css.replace(/\S+/g, function (o) {
                c = c.replace(new RegExp("\\s" + o + "\\s", "g"), " ");
            });
            c = c.replace(/ +/g, " ").replace(/^ +| +$/g, "");
            !isStr && c != old && (el.className = c)
            return c;
        }

        /*	是否包含某一CSS名称
        @el    :Element DOM 元素
        @css	:String 要检测的CSS名称
        @return	:Boolean
        */
        this.hasClass = function (el, css) {
            if (arguments.length == 1)
                css = el, el = this;
            el.isIList && (el = el.item(0))
            return el && el.className.contains(css, false, ' ')
        }

        /*  克隆元素
        @el     :Element    要克隆的元素
        @includeAll:Boolean 包含所有子节点,默认包含
        @return :Element    克隆产生的新元素
        */
        this.clone = function (el, includeAll) {
            return el.cloneNode(includeAll == null ? true : !!includeAll);
        }

        /*  转换为HTML
        @el :Element    Html元素
        @return :String 元素的HTML
        */
        this.toHtml = function (el) {
            if (el.isIList)
                return el.select(me.toHtml).join("");

            return el.outerHTML;
        }

        if (doc.compareDocumentPosition)
        /*  检测元素是否包含另一个元素
        @parent :Element   上级元素
        @child  :Element   子元素
        @return :Boolean    当parent包含child时返回true,否则返回false
        */
            this.contains = function (parent, child) {
                return !!(parent.compareDocumentPosition(child) & 16);
            }
        else
            this.contains = function (parent, child) {
                return parent !== child && (parent.contains ? parent.contains(child) : true);
            }

        /*  检测某元素是否可以获取焦点
        @el :Element    要检测的元素
        @return :Boolean    可以获取焦点返回 true,否则返回 false
        */
        this.focusable = function (el) {
            var el2 = el
            if (el2.disabled)
                return false
            var nodeName = el2.nodeName
            var tabIndex = me.tabIndex(el2);
            if (!isNaN(tabIndex) || $.foucsableTypeRegs.test(nodeName) || ($.clickableTypeRegs.test(nodeName) && el2.href)) {
                if ([el]['AREA' == nodeName ? 'parents' : 'closest'](':hidden').length == 0)
                    return true
            }
            return false
        }

        /*  检测元素是否接受Tab键
        @el     :Element    要检测的元素
        @return :Boolean    可以接受Tab键则返回 true,否则返回 false
        */
        this.tabbable = function (el) {
            var tabIndex = me.tabIndex(el);
            return (isNaN(tabIndex) || tabIndex >= 0) && me.focusable(el)
        }

        /*  元素是否可见（visibility）
        @el     :Element    DOM元素
        @return :Boolean
        */
        this.isVisible = function (el) {
            return sh.get(el, 'visibility') !== "hidden"
        }

        /*  元素是否显示（display）
        @el     :Element    DOM元素
        @return :Boolean
        */
        this.isDisplay = function (el) {
            return sh.get(el, 'display') !== 'none'
        }

        /*  元素是否显示（visibility、display）
        @el     :Element    DOM元素
        @return :Boolean
        */
        this.isShow = function (el) {
            return !this.isHidden(el)
        }

        /*  元素是否被隐藏（visibility、display）
        @el     :Element    DOM元素
        @return :Boolean
        */
        this.isHidden = function (el) {
            return (el.nodeName === 'INPUT' && el.type === 'hidden') || !me.isDisplay(el) || !me.isVisible(el)
        }


        /*  获取元素的   tabindex
        @el     :Element    DOM元素
        @return :Int
        */
        this.tabIndex = $.attrGeters.tabindex = function (el) {
            var node = el.getAttributeNode("tabindex");
            if (node != null && node.specified)
                return node.value;
            return $.foucsableTypeRegs.test(el.nodeName) || ($.clickableTypeRegs.test(el.nodeName) && el.href) ? 0 : undefined;
        }

        /*  取消页面的选择
        @return :this
        */
        this.unSelection = function () {
            try {
                if (document.selection)
                    document.selection.empty()
                else
                    win.getSelection().removeAllRanges();
            } catch (e) { }
            return this
        }
        /*  获取元素在页面中的位置和大小
        @el     :Element    DOM元素
        @return :JSON   包含元素在页面中的位置和大小信息的JSON对象
        */
        this.rect = function (el) {
            var pos = { top: el.offsetTop, left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight }
            var rect = el.getBoundingClientRect ? el.getBoundingClientRect() : (el.getClientRects ? el.getClientRects() : null)
            if (rect) {
                pos.top = rect.top;
                pos.left = rect.left;
                return pos;
            }

            while (el = el.offsetParent) {
                pos.top += el.offsetTop;
                pos.left += el.offsetLeft;
            }
            return pos
        };

        (function (prop) {
            var which = prop == "width" ? ["Left", "Right"] : ["Top", "Bottom"];
            (function (type) {
                var up = prop.firstUpper()
                me[type + up] = function (el) {
                    var v = el["offset" + up]
                    if (type != "outer")
                        which.each(function (w) {
                            if (type == "inner" || type == "content")
                                v -= sh.num(el, "border" + w + "Width")
                            if (type == "content")
                                v -= sh.num(el, "padding" + w)
                        })
                    return v
                }
                return arguments.callee
            })("outer")("inner")("content");
            return arguments.callee
        })("height")("width");

        /*	显示元素
        @el:DomElement 要显示的元素
        @return	:this
        */
        this.show = function (el) {
            var d = sh.get(el, "display")
            if (d == "none") {
                var od = el.oldDisplay
                if ((!od || od == 'none') && !(od = displays[el.nodeName])) {
                    var e = $(document.createElement(el.nodeName)).appendTo(document.body)
                    od = displays[el.nodeName] = e.css("display")
                    e.remove();
                }
                sh.set(el, "display", od)
            }
            var d = sh.get(el, "visibility")
            d == "hidden" && sh.set(el, "visibility", "visible")
            return this
        }

        /*	隐藏元素
        @el:DomElement 要隐藏的元素
        @placeholder:Boolean 是否保持元素占位
        @return	:this
        */
        this.hide = function (el, placeholder) {
            if (placeholder) {
                el.style.visibility = "hidden"
            }
            else {
                el.oldDisplay = sh.get(el, "display")
                el.style.display = "none"
            }
        }

    } .inherit(ui.DomUtils)
    fly.DomHelper = fly.ui.DomHelper = new ui.DomUtils()
    dh = fly.ui.DomHelper

    /*#C path:fly.collection.IList
    用来扩展 collection 对象
    */
    fly.collection.IList = fly.fn = lp = {
        $: $,
        find: $,
        allTypes: [],
        /* 扩展 fly.collection.IList 成员
        @name   :String/JSON 成员名称或包含多个成员的键值对
        @v     :Function/Object 成员
        */
        extend: function (name, v) {
            var i = $.isStr(name)
            i ? this[name] = v : $.extend(this, name)
            if (this == lp)
                $.each(lp.allTypes, function (t) {
                    i ? (t.prototype || t)[name] = v : $.extend(t.prototype || t, name)
                });
            return this
        },

        applyTo: function ($class, overrides) {
            if (this == lp)
                lp.allTypes.push($class)
            var to = $class.prototype || $class
            $.safeExtend("$", to, this)
            for (var i = 1; i < arguments.length; i++) {
                for (var k in arguments[i])
                    to[k] = arguments[i][k]
            }
            to.$ = this.$
            to.$type = $class
            return this
        },

        /*	Class 原始类型*/
        $type: null,

        /*	创建新的实例
        @arr	:Array 初始元素
        @return	:IList IList新对象
        */
        $create: function (arr) {
            return new (this.$type || Array)(arr)
        },

        /*	Boolean fly.collection.IList标识*/
        isIList: true,

        /*	获取可遍历的对象
        @obj:如果传递该参数，这获取该对象的可遍历对象，否则返回当前对象的可遍历对象
        @return:Array
        */
        getItems: function (obj) {
            if (arguments.length == 1) {
                obj.getItems && (obj = obj.getItems())
                return $.toArray(obj)
            }
            return this.items || this
        },

        /*	更新长度
        @return	:this
        */
        updateLength: function () {
            this.items && (this.length = this.items.length)
            return this
        },

        /*	获取指定位置的项
        @index	:Int 从0开始的索引
        @return :Object
        */
        item: function (index) {
            return this.getItems()[index]
        },

        /*	生成一个新IList对象,将每一项中的项合并
        @evaluator:计算值的函数
        @scope  :域
        @return	:IList
        */
        selectMany: function (evaluator, scope) {
            this._select.__collect = function (r, o) {
                o && r.merge(o);
            }
            return this._select.apply(this, arguments)
        },

        /*	生成一个新IList对象,忽略空值
        @evaluator:计算值的函数
        @scope  :域
        @return	:IList
        */
        selectNotNull: function (evaluator, scope) {
            this._select.__collect = function (r, o) {
                o && r.push(o);
            }
            return this._select.apply(this, arguments)
        },

        /*	生成一个新IList对象
        @evaluator:计算值的函数
        @scope  :域
        @return	:IList
        */
        select: function (evaluator, scope) {
            var m = GLM(this, '_select')
            m.__collect = function (r, o) {
                r[r.length] = o
            }
            return m.apply(this, arguments)
        },
        _select: function (evaluator, scope) {
            var col = arguments.callee.__collect, r = [], fn = $.toFun(evaluator, true), isFun = $.isFun(fn)
            GLM(this, 'each').call(this, function (o, i, a) {
                var x = isFun ? fn.call(scope == null ? o : scope, o, i, a) : fn
                if (x !== $.BREAK)
                    col(r, x)
                return x;
            })
            return CL(r, this);
        },



        /*	从序列的开头返回指定数量的连续元素
        @count:int 要获取的数量，可以是负整数。
        isAssending	: Boolean 是否升序
        @predicate	:Function/String/Object 用于测试每个元素是否满足条件的函数。
        @scope  :域
        @return	:IList
        */
        take: function (count, isAscending, predicate, scope) {
            this.___count = count
            this.___isAsc = isAscending
            return (this.___take || lp.___take).apply(this, arrP.slice.call(arguments, 2))
        },
        ___take: function (predicate, scope) {
            var r = [], all = this.getItems ? this.getItems() : this

            if (all.length > 0) {
                var c = this.___count;
                c = c < 0 ? this.length + c : c
                var isAsc = this.___isAsc;
                var isNot = this.___isNot == true
                var fn = $.toFun(predicate, true)
                if (fn === undefined)
                    fn = true
                var isFun = $.isFun(fn)

                var step = isAsc != false ? 1 : -1
                for (var i = (isAsc != false ? 0 : all.length - 1), end = (isAsc != false ? all.length : -1); i != end && (c == null || r.length < c); i += step) {
                    var o = all[i], x = isFun ? fn.call(scope == null ? o : scope, o, i, all) : fn
                    if (x === $.BREAK)
                        break;
                    if (isNot ^ !!x)
                        r.push(o);
                }
            }
            delete this.___count
            delete this.___isAsc
            delete this.___isNot
            return CL(r, this)
        },

        /*	遍历所有项
        @action	:Function/String/Object 处理每一项的回调函数
        @return	:this
        */
        each: function (action, scope) {
            var fn = $.toFun(action, true)
            if (!$.isFun(fn))
                return this
            var all = this.getItems ? this.getItems() : this, a = $.likeArray(all)
            function e(o, i) {
                return fn.call(scope == null ? o : scope, o, i, all)
            }

            if (a) {
                for (var i = 0; i < all.length; i++)
                    if (e(all[i], i) === $.BREAK) break;
            }

            if (!a) {
                for (var i in all)
                    if (e(all[i], i) === $.BREAK) break;
            }
            return this;
        },



        /*	得到一个不重复的集合
        comparer:Function 一个对值进行比较的相等比较器
        @return	:IList
        */
        uniquelize: function (comparer) {
            var r = [];
            this.$each(function (o) {
                r.contains(o, comparer) || r.push(o)
            })
            return CL(r, this)
        },

        /*	返回不在指定集合中的元素
        @list :用来比较的另一个集合
        @comparer:Function 一个对值进行比较的相等比较器
        @return	:IList 
        */
        notIn: function (list, comparer) {
            return this.where(function (o) {
                return list.indexOf(o, 0, comparer) < 0
            })
        },


        /*	返回两个集合的交集
        @list :用来求交集的另一个集合
        @comparer:Function 一个对值进行比较的相等比较器
        @return	:IList 连个集合的交集
        */
        intersect: function (list, comparer) {
            return this.where(function (o) {
                return list.indexOf(o, 0, comparer) > -1
            })
        },

        /*	转换为JSON
        @keySelector	:Function 用于从每个元素中提取键的函数。
        @valueSelector	:Function 用于从每个元素产生结果元素值的转换函数。
        return :JSON
        */
        toJSON: function (keySelector, valueSelector) {
            var j = {};
            keySelector = $.toFun(keySelector, true)
            valueSelector = $.toFun(valueSelector, true)
            if (keySelector == null && valueSelector == null) {
                var all = this.getItems()
                arrP.push.apply({}, all)
                return j
            }
            this.$each(function (o, i, all) {
                var v, k = keySelector == null ? i : keySelector.call(o, o, i, all);
                if (k == $.BREAK || (v = valueSelector == null ? o : valueSelector.call(o, o, i, all)) == $.BREAK)
                    return $.BREAK;
                j[k] = v;
            })
            return j
        },

        /*	为每一项添加事件
        @eNames	:Object/Array<Object> 一个或多个事件类型
        @fn	:Function/Array<Function> 一个或多个回调函数
        @scope  :域
        @args	:Object(可选) 要传递的任意多个参数
        @return:this
        */
        on: function (eNames, fn, args) {
            $.Event.on.apply($.Event, [this.getItems()].merge(arguments));
            return this;
        },


        /*	为每一项卸载事件
        eNames	:Object/Array<Object> 一个或多个事件类型
        @fn	:Function/Array<Function> 一个或多个回调函数
        @return:this
        */
        un: function (eNames, fn) {
            $.Event.un.apply($.Event, [this.getItems()].merge(arguments));
            return this;
        },

        /*	为每一项卸载事件
        eNames	:Object/Array<Object> 一个或多个事件类型
        @scope  :域
        @args	:Array(可选) 可变参数，要传递的任意多个参数
        @return:this
        */
        fire: function (eNames, scope, args) {
            $.Event.fire.apply($.Event, [this.getItems()].merge(arguments));
            return this;
        },
        /*  排序
        @dir    :Boolean/String 排序方向,false,"DESC" 表示降序,其它标识升序
        @compare:Object/Function 排序比较规则,可以是一个字段名字,可以是一个函数
        */
        order: function (dir, compare) {
            if (arguments.length == 1 && /(desc)|(asc)|(true)|(false)/i.test(dir) == false)
                compare = dir
            var cIsF = $.isFun(compare)
            if (compare != null && (!cIsF || compare.length < 2)) {
                var by = compare;
                if (cIsF || /=>/.test(by)) {
                    if (!cIsF)
                        by = $.toFun(by)
                    compare = function (a, b) {
                        var va = by.call(a, a), vb = by.call(b, b)
                        return va == vb ? 0 : va > vb ? 1 : -1;
                    }
                } else {
                    compare = function (a, b) {
                        var va = a[by], vb = b[by]
                        return va == vb ? 0 : va > vb ? 1 : -1;
                    }
                }
            }
            arrP.sort.call(this, $.isFun(compare) ? compare : null);
            (dir == false || /desc/i.test(dir)) && arrP.reverse.call(this)
            return this
        },

        /*	添加到集合后面
        @item	:Object 要添加的新项
        @return:this
        */
        add: function (item) {
            arrP.push.call(this.getItems(), item)
            this.updateLength()
            return this
        },

        /*	批量添加到集合后
        @items	:Array 要添加的新项
        @return:this
        */
        addRange: function (items) {
            var all = this.getItems()
            arrP.push.apply(all, $.likeArray(items) ? $.toArray(items) : arguments)
            this.updateLength()
            return this;
        },


        /*	插入
        @index	:Int 插入的目标位置(从0开始)
        @items	:Array(可选) 要插入的任意多个项
        @return:this
        */
        insert: function (index, items) {
            if (arguments.length > 1) {
                var all = this.getItems()
                arrP.splice.apply(all, [index < 0 ? all.length + index : index, 0].concat($.likeArray(items) ? $.toArray(items) : arrP.slice.call(arguments, 1)))
                this.updateLength()
            }
            return this;
        },


        /*	删除
        @index	:Int 要删除的目标位置(从0开始)
        @items	:Array(可选) 在该位置插入的任意多个项
        @return:this
        */
        remove: function (index, items) {
            if (arguments.length > 0) {
                if ($.likeArray(index)) {
                    var indexs = $.toArray(index).uniquelize()
                    indexs.sort()
                    for (var i = indexs.length - 1; i > -1; i--)
                        this.remove(indexs[i])
                }
                else {
                    var all = this.getItems()
                    index = index < 0 ? all.length + index : index
                    all[index] = null;
                    arguments.length > 1 ? arrP.splice.apply(all, [index, 1].concat(items)) : arrP.splice.call(all, index, 1)
                }
                this.updateLength()
                return this;
            }
            else {
                this.$each(function (o) {
                    if (o && o.parentNode)
                        o.parentNode.removeChild(o);
                })
            }
            return this;
        },


        /* 搜索第一个匹配项在集合中的索引
        @value	:搜索的值
        @startIndex:Int 开始位置
        @endIndex   :Int 结束位置
        @comparer:Function/String/Object 一个对值进行比较的相等比较器
        @return	:Int 如果找到 item 的第一个匹配项，则为该项的从零开始的索引；否则为 -1。
        */
        indexOf: function (item, startIndex, endIndex, comparer) {
            var all = this.getItems ? this.getItems() : this
            var c = comparer ? $.toFun(comparer) : null
            startIndex = endIndex || 0
            endIndex = endIndex || all.length - 1
            for (var i = startIndex; i <= endIndex; i++)
                if (c == null ? all[i] == item : c.call(all[i], all[i], item, all))
                    return i;
            return -1
        },

        /* 搜索最后一个匹配项在集合中的索引
        @value	:搜索的值
        @startIndex:Int 开始位置
        @comparer:Function/String/Object 一个对值进行比较的相等比较器
        @return	:Int 如果找到 item 的最后一个匹配项，则为该项的从零开始的索引；否则为 -1。
        */
        lastIndexOf: function (item, startIndex, endIndex, comparer) {
            var all = this.getItems ? this.getItems() : this
            var c = comparer ? $.toFun(comparer) : null
            startIndex = endIndex || 0
            endIndex = endIndex || all.length - 1
            for (var i = endIndex; i >= startIndex; i--)
                if (c == null ? all[i] == item : c.call(all[i], all[i], item, all))
                    return i;
            return -1
        },
        /*
        //	    @predicate	:Function/String/Object 用于测试每个元素是否满足条件的函数。
        //	    */
        //	    findIndex: function (predicate, startIndex, endIndex, comparer) {
        //	        var fn = $.toFun(predicate)
        //	        return this.indexOf(null, startIndex, endIndex, function (o1, o2, a) {
        //	            var o = fn.call(o1, o1)
        //	            return comparer ? comparer.call(o1, o1, o, a) : o
        //	        })
        //	    },

        //	    /*
        //	    @predicate	:Function/String/Object 用于测试每个元素是否满足条件的函数。
        //	    */
        //	    findLastIndex: function (predicate, startIndex, endIndex, comparer) {
        //	        var fn = $.toFun(predicate)
        //	        return this.lastIndexOf(null, startIndex, endIndex, function (o1, o2, a) {
        //	            var o = fn.call(o1, o1)
        //	            return comparer ? comparer.call(o1, o1, o, a) : o
        //	        })
        //	    },


        /* 判断值在集合中是否存在
        @value	:搜索的值
        @startIndex:Int 开始位置
        @comparer:Function/String/Object 一个对值进行比较的相等比较器
        @return	:Boolean
        */
        contains: function (value, startIndex, comparer) {
            return this.indexOf(value, startIndex, comparer) > -1
        },


        /*	复制到新的数组
        @index	:Int 插入目标位置(0开始)
        @arr	:Array 复制到该数组,为空将生成新的数组
        @return	:arr
        */
        copyTo: function (index, arr) {
            arrP.splice.apply(arr || (arr = []), [index, 0].concat(this.getItems()))
            return arr;
        },

        /*	复制
        @index	:Int 插入目标位置(0开始)
        @arr	:Array 复制到该数组,为空将生成新的数组
        @return	:arr
        */
        copy: function (start, end) {
            return CL(arrP.slice.apply(this.getItems(), [start || 0, end == null ? this.length : end]), this)
        },


        /*  合并多个对象
        @args  :Object(可选) 可变参数，任意多个对象
        @return:this
        */
        merge: function (args) {
            var all = this.getItems()
            for (var i = 0; i < arguments.length; i++)
                arrP.push.apply(all, lp.getItems(arguments[i]))
            return this
        },


        /*  设置对象属性
        @properties  :Object 包含多个属性和属性值的键值对
        @return:this
        */
        //	    setAttr: function (properties) {
        //	        this.$each(function (o) {
        //	            $.set(o, properties)
        //	        })
        //	        return this
        //	    },



        /*	获取或设置对象的CSS属性，只传递 name 参数时则，获取该属性值。
        @name	:String 属性名或要应用到对象CSS属性的键值对
        @value	:Object(可选) CSS属性值
        @return:this
        */
        css: function (name, value) {
            if (value === undefined && $.isStr(name))
                return this.length ? sh.get(this.item(0), name) : null
            this.$each(function (o) {
                sh.set(o, name, value)
            })
            return this
        },
        cssBy: function (from, properys) {
            if (properys == null)
                this.css(from)
            else {
                var ps = properys.split(',')
                for (var i = 0; i < ps.length; i++) {
                    if (from[ps[i]])
                        this.css(ps[i], from[ps[i]]);
                }
            }
            return this
        },
        num: function (name) {
            return this.length ? sh.num(this.item(0), name) : null
        },

        /*	获取或设置对象的属性，只传递 name 参数时则，获取该属性值。
        @name	:String 属性名或要应用到对象属性的键值对
        @value	:Object(可选) 属性值
        @return	:this
        */
        data: function (name, value) {
            if (arguments.length == 1 && $.isStr(name))
                return this.length ? this.item(0)[name] : null;


            if (arguments.length > 1)
                this.$each(function (o) {
                    this[name] = value
                })
            else
                this.$each(function (o) {
                    for (var p in name)
                        o[p] = name[p]
                })
            return this
        },

        /*	获取或设置对象的属性，只传递 name 参数时则，获取该属性值。
        @name	:String 属性名或要应用到对象属性的键值对
        @value	:Object(可选) 属性值
        @return	:this
        */
        attr: function (name, value) {
            if (arguments.length == 1 && $.isStr(name))
                return this.length == 0 ? null : $.attr(this.item(0), name);
            this.$each(function (o) {
                $.attr(o, name, value)
            })
            return this
        },


        /*	移除对象属性
        @name	:String 要移除的属性名
        @return	:this
        */
        removeAttr: function (name) {
            this.each(function () {
                if (this.removeAttribute) {
                    try {
                        this.removeAttribute(name)
                    } catch (e) { }
                }
                try {
                    delete this[name]
                } catch (e) { }
            })
            return this
        },

        /*  获取或设置多个表单元素值
        @values :KeyValue(可选) 设置到多个表单元素的值,为空则是获取表单元素值
        @ignoreDisabled:是否忽略已禁用元素
        */
        values: function (values, ignoreDisabled) {
            var boxs = this.filter(":input").merge(this.find(":input"));
            if (values && !$.isBoolean(values)) {
                boxs.each(function (o) {
                    var k = this.name || this.id
                    if (k in values)
                        $.value(o, values[k]);
                })
                return this;
            }
            else {
                var vs = {}, hasSubmit
                $.isBoolean(values) && (ignoreDisabled = values)
                boxs.each(function () {
                    var k = this.name || this.id
                    var t = this.type
                    if (!k || (ignoreDisabled != false && this.disabled) || /file|undefined|reset|button/i.test(t)) return;
                    if ((/radio|checkbox/i.test(t) && !this.checked) || (t == 'submit' && hasSubmit)) return;
                    hasSubmit = hasSubmit || t == 'submit'
                    var v = $.value(this)
                    //	                if (values === true)
                    //	                    vs[k] = $.likeArray(v) ? v[v.length - 1] : v;
                    //	                else
                    k in vs ? ($.isArray(vs[k]) ? vs[k].push(v) : vs[k] = [vs[k], v]) : vs[k] = v
                })
                return vs;
            }
        },
        /*  获取或设置value，不指定value参数时则获取
        @value  :Object 设置的值
        @return :Object/this    当不指定value参数时返回第一个元素的值，指定value参数时则返回当前对象
        */
        value: function (value) {
            if (arguments.length == 0) {
                var first = this.getItems()[0]
                return first ? $.value(first) : null
            }

            this.each(function () {
                $.value(this, value)
            })
            return this;
        },

        /*  将所以元素值进行url编码
        @return :String
        */
        serialize: function () {
            return $.JSON.urlEncode(this.values())
        },

        /*  指定元素是否当前元素的子元素
        @child  :Selector/Element   子元素
        @return :Boolean 
        */
        hasChild: function (child) {
            child = $(child)
            return this.all(function (p) {
                return child.all(function (c) {
                    return ui.DomHelper.contains(p, c);
                });
            })
        },

        /*  指定元素是否当前元素的父元素
        @parent  :Selector/Element   父元素
        @return :Boolean 
        */
        hasParent: function (parent) {
            return $(parent).isChild(this);
        },

        /*  改变每一项的样式
        @removeCss  :String 要移除的样式,多个样式用空格隔开
        @addCss :String 要追加的样式,多个样式用空格隔开
        @return :String 改变后的样式
        */
        changeClass: function (removeCss, addCss) {
            dh.changeClass(this, removeCss, addCss);
            return this
        },


        /*	为每一项添加CSS样式
        @css	:String 要添加的CSS名称
        @return	:this
        */
        addClass: function (css) {
            dh.addClass(this, css);
            return this
        },

        /*	为每一项移除CSS样式
        @css	:String 要移除的CSS名称
        @return	:this
        */
        removeClass: function (css) {
            dh.removeClass(this, css)
            return this
        },

        /*	第一项是否包含某一CSS名称
        @css	:String 要检测的CSS名称
        @return	:this
        */
        hasClass: function (css) {
            var first = this.item(0)
            if (first)
                return dh.hasClass(first, css)
            return false
        },

        /*  转换为HTML
        @return :String 
        */
        toHtml: function () {
            return dh.toHtml(this)
        },

        /*  克隆元素
        @includeAll:Boolean 包含所有子节点,默认包含
        @return :List<Element>
        */
        clone: function (includeAll) {
            return CL(this.select(function (o) {
                return dh.clone(o, includeAll)
            }), this)
        },

        /*  获取第一个元素在页面中的位置和大小
        @return :JSON   包含元素在页面中的位置和大小信息的JSON对象
        */
        rect: function () {
            return dh.rect(this.item(0))
        },

        /*	获取第一项的偏移量
        @return	:JSON   形如{left:123,top:456}
        */
        pos: function () {
            var el = this.item(0), s = ui.Style
            return {
                left: s.num(el, "left") || 0,
                top: s.num(el, "top") || 0,
                bottom: s.num(el, "bottom") || 0,
                right: s.num(el, "right") || 0
            }
        },

        /*	获取第一项的偏移量
        @return	:JSON   形如{left:123,top:456}
        */
        offset: function () {
            var i = this.item(0)
            return {
                height: i.offsetHeight,
                width: i.offsetWidth,
                left: i.offsetLeft,
                top: i.offsetTop
            }
        },

        /*	获取第一项的大小
        @return	:JSON   形如{width:123,height:456}
        */
        size: function () {
            return {
                width: parseInt(this.width()) || this.item(0).offsetWidth,
                height: parseInt(this.height()) || this.item(0).offsetHeight
            }
        },

        /*	移除焦点
        @return	:this
        */
        blur: function (delay, fn) {
            if ($.isNumber(delay) || arguments.length == 0) {
                return this.$each(function () {
                    var o = this
                    if (delay != null) {
                        setTimeout(function () {
                            o.blur && o.blur();
                            fn && fn.call(o, o);
                        }, delay)
                    }
                    else {
                        o.blur && o.blur();
                        fn && fn.call(o, o);
                    }
                })
            }
            else
                return this.on.apply(this, ["blur"].merge(arguments))
        },

        /*	设置焦点
        @return	:this
        */
        focus: function (delay, fn) {
            if ($.isNumber(delay) || arguments.length == 0) {
                return this.$each(function () {
                    var o = this
                    if (delay != null) {
                        setTimeout(function () {
                            o.focus && o.focus();
                            fn && fn.call(o);
                        }, delay)
                    }
                    else {
                        o.focus && o.focus();
                        fn && fn.call(o);
                    }
                })
            }
            else
                return this.on.apply(this, ["focus"].merge(arguments))
        },

        //        zIndex: function (zIndex) {
        //            if (arguments.length > 0)
        //                return this.css('zIndex', zIndex);

        //            var el = this.first(),pos,v = 0;
        //            while (el.length && el[0] !== doc) {
        //                pos = el.css('position');
        //                if (pos == 'absolute' || pos == 'relative' || pos == 'fixed') {
        //                    v = parseInt(el.css('zIndex'));
        //                    if (!isNaN(v) && v != 0)
        //                        return v;
        //                }
        //                el = el.parent();
        //            }
        //            return 0;
        //        },
        /*	检测第一个元素是否可以获取焦点
        @return	:Boolean
        */
        focusable: function () {
            return this.length && dh.focusable(this.item(0))
        },

        /*	检测第一个元素是否可以接受Tab键
        @return	:Boolean
        */
        tabbable: function () {
            return this.length && dh.tabbable(this.item(0))
        },
        /*	为每一个元素追加内容
        @el     :Html/Element   附加的内容
        @return	:this
        */
        append: function (el, returnDom) {
            dh.append(this, el)
            return this
        },
        /*	将所有元素追加到指定元素
        @to     :Element   将附加到该元素下
        @return	:this
        */
        appendTo: function (to, returnDom) {
            dh.append(to, this)
            return this
        },
        /*	将元素开始位置追加内容
        @content     :Element/String   追加的内容
        @return	:this
        */
        prepend: function (content) {
            dh.prepend(this, content)
            return this
        },
        /*	将所有元素追加到指定元素开始位置
        @to     :Element   将追加到该元素下
        @return	:this
        */
        prependTo: function (to) {
            dh.prepend(to, this)
            return this
        },
        /*	删除每个元素的所有子节点。 
        @return	:this
        */
        empty: function () {
            return this.$each(function (o) {
                dh.empty(o);
            })
        },
        /*  在每个元素之前插入内容。 */
        before: function (el) {
            dh.before(this, el)
            return this
        },
        /*  在每个元素之后插入内容。 */
        after: function (el) {
            dh.after(this, el)
            return this
        },
        /*把所有匹配的元素插入到另一个、指定的元素集合的前面。*/
        insertBefore: function (el) {
            dh.before(el, this)
            return this
        },

        /*把所有匹配的元素插入到另一个、指定的元素集合的后面。*/
        insertAfter: function (el) {
            dh.after(el, this)
            return this;
        },
        /*结束最近的“破坏性”操作，把匹配的元素列表回复到前一个状态。*/
        end: function () {
            return this.context || []
        },
        /*调用每一个元素指定方法。
        @method :   方法名
        @args   :   要传递的任意多个
        @return :   this
        */
        call: function (method, args) {
            var as = slice.call(arguments, 1)
            this.each(function (o) {
                o[method].apply(o, as)
            });
            return this
        },
        destroy: function () {
            this.un();
            var all = this.getItems()
            arrP.splice.call(all, 0, all.length)
            this.items = this.all = all = undefined;
            //            for (var i = all.length - 1; i > -1; i--) {
            //                all[i] = null;
            //                arrP.pop.call(all)
            //            }
            //            this.items = this.all = null;
        }
    }

    ; (function () {
        var style = docE.style;
        var getCssMethod = function (name) {
            return function (v) {
                return arguments.length > 0 ? this.css(name, v) : this.css(name)
            }
        }

        var style = "border,borderWidth,borderColor,borderStyle,margin,padding,font,fontSize,color,left,top,right,bottom".split(',')
        for (var i = 0; i < style.length; i++) {
            var n = style[i]
            lp[n] = getCssMethod(n)
        }
        //        if (browser.isSafari || browser.isChrome) {
        //            style = doc.defaultView.getComputedStyle(docE)
        //            for (var i = 0; i < style.length; i++) {
        //                var name = camelCase(style[i])
        //                if (name.charAt(0) != '-' && !lp[name])
        //                    lp[name] = getCssMethod(name)
        //            }

        //            var style = "border,borderWidth,borderColor,borderStyle,margin,padding,font".split(',')
        //            for (var i = 0; i < style.length; i++)
        //                lp[name] = getCssMethod(name)
        //        }
        //        else {
        //            for (var name in style)
        //                if (!lp[name])
        //                    lp[name] = getCssMethod(name)
        //        }



        var num = ui.Style.num
        $.each(["Height", "Width"], function (name) {
            $.each(["outer", "inner", "content"], function (t) {
                lp[t + name] = function () {
                    return this.length ? dh[t + name](this.item(0)) : null
                }
            })

            var type = name.toLowerCase();
            lp[type] = function (size) {
                var first = this.item(0);
                if (first == win)
                    return browser.isStrict && docE["client" + name] || doc.body["client" + name]

                if (first == doc)
                    return Math.max(docE["client" + name], doc.body["scroll" + name], docE["scroll" + name], doc.body["offset" + name], docE["offset" + name])

                if (size === undefined)
                    return first ? ui.Style.get(first, type) : null
                else
                    return this.css(type, $.isStr(size) ? size : size + "px");
            };
        });
    })();


    $.extend(lp,
	{
	    ready: $.ready,
	    val: lp.value,
	    /*	禁用每一项
	    @disabled:Boolean(可选) 是否禁用
	    @return	:this
	    */
	    disable: function (disabled) {
	        return this.attr("disabled", disabled != false)
	    },
	    /*	启用每一项
	    @enable:Boolean(可选) 是否启用
	    @return	:this
	    */
	    enable: function (enable) {
	        return this.attr("disabled", enable == false)
	    },

	    /*	隐藏每一项
	    @placeholder:Boolean 是否保持元素占位
	    @return	:this
	    */
	    hide: function (placeholder) {
	        this.each(function () {
	            dh.hide(this, placeholder)
	        })
	        return this;
	    },

	    /*	显示每一项
	    @return	:this
	    */
	    show: function () {
	        this.each(dh.show)
	        return this;
	    },

	    /*	生成一个新IList对象
	    @evaluator:Function/String/Object 计算值的函数
	    @scope  :域
	    @return	:IList
	    */
	    map: lp.select,

	    /*	确定是否有满足条件的元素,如果不指定条件,将返回集合长度。
	    @predicate	:Function/String/Object 用于测试每个元素是否满足条件的函数。
	    @scope  :域
	    @return	:Boolean
	    */
	    any: function (predicate, scope) {
	        if (arguments.length == 0)
	            return this.length
	        this.___count = 1
	        return (this.___take || lp.___take).apply(this, arguments).length > 0
	    },

	    /*	确定序列中的所有元素是否都满足条件,如果不指定条件,将返回所有元素。
	    @predicate	:Function/String/Object 用于测试每个元素是否满足条件的函数。
	    @scope  :域
	    @return	:Boolean
	    */
	    all: function (predicate, scope) {
	        if (arguments.length == 0)
	            return (this.getItems || lp.getItems).call(this)
	        this.___count = 1
	        this.___isNot = true
	        return (this.___take || lp.___take).apply(this, arguments).length == 0
	    },


	    /*	查询
	    @predicate	:Function/String/Object 查询条件
	    @scope  :域
	    @return	:IList
	    */
	    where: function (predicate, scope) {
	        return (this.___take || lp.___take).apply(this, arguments)
	    },


	    aggregate: function (seed, func) {
	        if (arguments.length == 1)
	            func = seed, seed = null
	        func = $.toFun(func || seed);
	        this.each(function (o, i, a) {
	            seed = func.call(this, seed, o, i, a)
	        })
	        return seed;
	    },
	    /*求和
	    @selector   :Function(可选)   获取元素用于计算的值的函数
	    @filter     :Function(可选)   过滤出参与计算元素的函数
	    @return     :Number/String
	    */
	    sum: function (selector, filter) {
	        var s = 0
	        if (selector != null) selector = $.toFun(selector)
	        var a = filter == null ? this : this.where(filter);
	        a.each(function (o, i, a) {
	            s += selector == null ? o : selector.apply(this, arguments)
	        })
	        return s;
	    },

	    compareOne: function (selector, resultSelector, greaterLessThanOrComparer) {
	        var c, cItem, than = greaterLessThanOrComparer
	        if (selector != null) selector = $.toFun(selector)
	        if (resultSelector != null) resultSelector = $.toFun(resultSelector, true)
	        if (resultSelector != null && !$.isFun(resultSelector))
	            return resultSelector
	        var isFun = $.isFun(than), isBool = $.isBoolean(than), isMax = than === true, isMin = than === false
	        this.each(function (o, i, a) {
	            var v = selector == null ? o : selector.apply(this, arguments)
	            if (isBool) {
	                if (!(c === undefined || (isMax ? v > c : v < c))) return
	            }
	            else {
	                if (!(isFun ? than.apply(this, v, c, cItem) : v == than))
	                    return
	            }
	            c = v, cItem = o
	        })
	        if (c === undefined) return
	        return resultSelector == null ? cItem : resultSelector.apply(cItem, cItem, c, this);
	    },
	    /*最大值
	    @selector   :Function(可选) 获取元素用于计算的值的函数
	    @return :Number
	    */
	    max: function (selector, resultSelector) {
	        return this.compareOne(selector, resultSelector, true)
	    },
	    /*最小值
	    @selector   :Function(可选) 获取元素用于计算的值的函数
	    @return :Number
	    */
	    min: function (selector, resultSelector) {
	        return this.compareOne(selector, resultSelector, false)
	    },
	    /*求平均
	    @selector   :Function(可选) 获取元素用于计算的值的函数
	    @return :Number    
	    */
	    average: function (selector) {
	        return this.sum.apply(this, arguments) / this.length
	    },
	    /*计数
	    @selector   :Function(可选) 获取元素用于计算的值的函数
	    @return     :Int    满足条件的元素数量
	    */
	    count: function (predicate, scope) {
	        return this.where.apply(this, arguments).length
	    },
	    /*去掉重复元素
	    @comparer   :Function(可选) 比较元素的函数
	    @return :this
	    */
	    distinct: lp.uniquelize,

	    /*对元素进行分组
	    @keySelector   :Function(可选) 获取元素用于分组的键
	    @itemSelector  :Function(可选) 获取分组内容
	    @scope  :域
	    @return :Array<Group>   包含分组的JSON对象
	    */
	    group: function (keySelector, itemSelector, scope) {
	        var gs = [], buf = {}
	        keySelector = $.toFun(keySelector)
	        itemSelector = $.toFun(itemSelector)
	        this.each(function (o, i, a) {
	            var k = keySelector == null ? i : keySelector.apply(this, arguments);
	            var kid = UID(k)
	            if (!(kid in buf))
	                gs.push(buf[kid] = { key: k, value: [] })
	            buf[kid].value.push(itemSelector == null ? o : itemSelector.apply(this, arguments))
	        }, scope)
	        return gs
	    },
	    /*清除所以元素
	    @return :this
	    */
	    clear: function () {
	        var all = this.getItems()
	        arrP.splice.call(all, 0, this.length)
	        this.updateLength();
	        return this
	    },

	    /*	获取第一项
	    @predicate	:Function/String/Object 查询条件
	    @scope  :域
	    @return	:Object
	    */
	    first: function (predicate, scope) {
	        if (arguments.length == 0)
	            return this.length ? GLM(this, 'item').call(this, 0) : null

	        this.___count = 1
	        return CLM(this, '___take', arguments)[0]
	    },
	    first$: function () {
	        return $(this.first.apply(this, arguments))
	    },

	    /*	获取最后一项
	    @predicate	:Function/String/Object 查询条件
	    @scope  :域
	    @return	:Object
	    */
	    last: function (predicate, scope) {
	        if (arguments.length == 0) {
	            return this.length ? GLM(this, 'item').call(this, this.length - 1) : null
	        }

	        this.___count = 1
	        this.___isAsc = false
	        return CLM(this, '___take', arguments)[0]
	    },
	    last$: function () {
	        return $(this.last.apply(this, arguments))
	    },

	    /*获取指定项
	    @index:Int 索引
	    @return:Array*/
	    eq: function (i) {
	        return $(this.item(i))
	    },

	    index: lp.indexOf,
	    lastIndex: lp.lastIndexOf,


	    /*	匹配所有元素的上级元素，对应选择器 “<”			
	    @layersOrSelector	:Int/Selector(可选) 往上的级数,或者特定的选择器，默认 1
	    @return :Array<Element>
	    */
	    parent: function (ls) {
	        if (ls == null || $.isNumber(ls))
	            return this.$("<" + (ls || 1))
	        var q = new ui.selector.DomQuery(this.context, arguments, true)
	        return q.parent(this);
	    },

	    /*	匹配所有元素的子级元素，对应选择器 “>”			
	    @layers	:Int(可选) 往下的级数，默认 1
	    @return :Array<Element>
	    */
	    children: function (layers) {
	        return this.$(">" + (layers || 1))
	    },

	    /*	匹配所有元素的之后的元素，对应选择器 “+”
	    @offset	:Int(可选) 往后的偏移量，默认 1
	    @return :Array<Element>
	    */
	    next: function (offset) {
	        return this.$("+" + (layers || 1))
	    },

	    /*	匹配所有元素的之前的元素，对应选择器 “-”
	    @offset	:Int(可选) 往前的偏移量，默认 1
	    @return :Array<Element>
	    */
	    previous: function (offset) {
	        return this.$("-" + (layers || 1))
	    },

	    /*	匹配所有元素的兄弟元素，对应选择器 “~”
	    @return :Array<Element>
	    */
	    sibling: function () {
	        return this.$("~" + (layers || 1))
	    },
	    /*为元素添加鼠标事件
	    @over   :Function  鼠标进入时执行
	    @out    :Function  鼠标移开时执行
	    @return :this
	    */
	    hover: function (over, out, data) {
	        if (over)
	            this.mouseenter.apply(this, [over].concat(slice.call(arguments, 1)))
	        if (out)
	            this.mouseout.apply(this, slice.call(arguments, 1))
	        return this
	    }
	});
    ; (function () {
        lp.avg = lp.average

        lp.slideUp = lp.hide
        lp.sildeDown = lp.show

        var m2m = {
            minWidth: 'width',
            minHeight: 'height'
        };
        for (var m in m2m) {
            if (!lp[m])
                lp[m] = lp[m2m[m]]
        }
        /* #M path:fly.collection.IList.disabled 获取或设置元素disabled属性*/
        /* #M path:fly.collection.IList.id 获取或设置元素id属性*/
        /* #M path:fly.collection.IList.name 获取或设置元素name属性*/
        /* #M path:fly.collection.IList.title 获取或设置元素title属性*/
        /* #M path:fly.collection.IList.className 获取或设置元素className属性*/
        /* #M path:fly.collection.IList.text 获取或设置元素innerText属性*/
        /* #M path:fly.collection.IList.html 获取或设置元素innerHTML属性*/
        var props = ["disabled", "id", "name", "title", "className", "text:innerText", "html:innerHTML"]
        for (var i = 0; i < props.length; i++) {
            var att = props[i].replace(/.*:/g, '')
            lp[props[i].replace(/:.*/g, '')] = function (att) {
                return function (v) {
                    return arguments.length > 0 ? this.attr(att, v) : this.attr(att)
                }
            } (att)
        }

        /* #M path:fly.collection.IList.onBlur 为元素绑定 onblur 事件*/
        /* #M path:fly.collection.IList.onFocus 为元素绑定 onfocus 事件*/
        /* #M path:fly.collection.IList.onLoad 为元素绑定 onload 事件*/
        /* #M path:fly.collection.IList.onResize 为元素绑定 onresize 事件*/
        /* #M path:fly.collection.IList.onScroll 为元素绑定 onscroll 事件*/
        /* #M path:fly.collection.IList.onUnload 为元素绑定 onunload 事件*/
        /* #M path:fly.collection.IList.onDblClick 为元素绑定 ondblclick 事件*/
        /* #M path:fly.collection.IList.onContextMenu 为元素绑定 oncontextmenu 事件*/
        /* #M path:fly.collection.IList.onMouseDown 为元素绑定 onmouseDown 事件*/
        /* #M path:fly.collection.IList.onMouseUp 为元素绑定 onmouseup 事件*/
        /* #M path:fly.collection.IList.onMouseMove 为元素绑定 onmousemove 事件*/
        /* #M path:fly.collection.IList.onMouseOver 为元素绑定 onmouseover 事件*/
        /* #M path:fly.collection.IList.onMouseOut 为元素绑定 onmouseout 事件*/
        /* #M path:fly.collection.IList.onMouseEnter 为元素绑定 onmouseenter 事件*/
        /* #M path:fly.collection.IList.onMouseLeave 为元素绑定 onmouseleave 事件*/
        /* #M path:fly.collection.IList.onChange 为元素绑定 onchange 事件*/
        /* #M path:fly.collection.IList.onSelect 为元素绑定 onselect 事件*/
        /* #M path:fly.collection.IList.onSelectStart 为元素绑定 onselectstart 事件*/
        /* #M path:fly.collection.IList.onSubmit 为元素绑定 onsubmit 事件*/
        /* #M path:fly.collection.IList.onKeyDown 为元素绑定 onkeydown 事件*/
        /* #M path:fly.collection.IList.onKeyPress 为元素绑定 onkeypress 事件*/
        /* #M path:fly.collection.IList.onKeyUp 为元素绑定 onkeyup 事件*/
        /* #M path:fly.collection.IList.onError 为元素绑定 onerror 事件*/

        lp.bind = lp.on
        lp.unbind = lp.un
        $.Event.events = ("Blur,Focus,Load,Resize,Scroll,Unload,Click,DblClick,ContextMenu," +
		"MouseDown,MouseUp,MouseMove,MouseOver,MouseOut,MouseEnter,MouseLeave," +
		"Change,Select,SelectStart,Submit,KeyDown,KeyPress,KeyUp,Error").split(',')
        for (var i = 0; i < $.Event.events.length; i++) {
            var e = $.Event.events[i]
            var le = e.toLowerCase()
            var h = lp["on" + e] = function (e) {
                return function () {
                    return this.on.apply(this, [e].merge(arguments))
                }
            } (le)
            if (!lp[le])
                lp[le] = h;
        }
    })();


    lp.applyTo(Array, {
        item: function (index) {
            return this[index]
        },
        $type: Array,
        $create: $.toArray,
        getItems: $.emptyFun,
        updateLength: $.emptyFun
    })

    $.safeExtend("$", lp, lp);

    $.each('concat,join,pop,push,reverse,shift,slice,sort,splice,unshift'.split(','), function (m) {
        lp[m] = function () {
            return arrP[m].apply(this, arguments);
        }
    })

    /*#C path:fly.ui.Animate
    动画
    @config:JSON 初始化配置
    */
    var now = function () { return new Date().getTime() }
    var fx = fly.ui.Animate = (function () {
        var fx = $.Class({
            /*path:el 
            HtmlElement 动画操作的dom对象*/
            /*path:props
            JSON 动画改变的属性值,如,
            { height: {from:0, to: 100, reset: true,achieve:fly.ui.Style.css }, before: 'show', after: 'hide' }
            高度从0到100，高度的改变用fly.ui.Style.css方法实现，动画结束恢复原始高度，在动画开始前显示，动画停止后隐藏
            */
            /*path:duration 
            Int/String 动画持续的时间（毫秒）,也可以是："slow"、"normal"或"fast",默认"normal"
            */
            /*path:callback
            Function 动画结束执行的回调函数
            */
            /*path:easing
            String/Function 效果，如  swing，linear，ease，easeIn，easeOut，easeInOut，backIn，backOut，elasticIn，elasticOut，bounceIn，bounceOut
            */
            /*path:before
            String/JSON/Array 在动画开始前执行的动作，如："show"显示，"hide"隐藏，{top:100} top设置为100，["show",{top:100}]显示并设置top为100
            */
            /*path:after
            String/JSON/Array 在动画结束后执行的动作，如："show"显示，"hide"隐藏，{top:100} top设置为100，["show",{top:100}]显示并设置top为100
            */
            constructor: function (config) {
                var me = this
                $.extend(this, config);
                ["before", "after", "duration", "easing", "callback"].each(function (p) {
                    if (me.props[p] != null) {
                        me[p] = me.props[p]
                        delete me.props[p]
                    }
                })

                this.fTarget = $(this.el)
                this.el = this.fTarget[0]

                this.step = this.step.bind(this);
                fx.Manager.reg(this);
            },
            /*Number 当前位置*/
            current: 0,
            /*Int 质量*/
            quality: 10,
            stopOther: function () {
                for (var p in this.props) {
                    var ans = fx.Manager.get(this.el, p)
                    if (ans)
                        ans.each(function (an) {
                            an != this && an.playing && an.stop()
                        }, this)
                }
            },
            parseProp: function (p, pc, v, now, refer) {
                if ($.isArray(v))
                    v = Math.abs(refer - now) < v[0] ? v[1] : null

                var isE = /=/.test(v)
                var f = v == null || isE ? now : v
                return Number(isE ? eval(f + v.replace('=', '')) : f)
            },
            initProp: function () {
                var ps = this.props
                for (var p in ps) {
                    var pc = ps[p]
                    if (pc == 'show' || pc == 'hide') {
                        (this.after = $.toArray(this.after)).push(pc)
                        pc = { reset: '', to: pc == 'hide' ? 0 : 1 }

                    }
                    pc = ps[p] = $.isObject(pc) ? $.clone(pc) : { to: pc }
                    pc.easing = pc.easing || (easing = this.easing)
                    pc.easing = fx.easings[pc.easing] || pc.easing
                    pc.achieve = pc.achieve || fx.achieves.def
                    pc.old = parseFloat(pc.achieve(this.el, p)) || 0
                    if (!$.isArray(pc.from))
                        pc._from = this.parseProp(p, pc, pc.from, pc.old)
                    pc._to = this.parseProp(p, pc, pc.to, pc.old, pc._from)
                    if ($.isArray(pc.from))
                        pc._from = this.parseProp(p, pc, pc.from, pc.old, pc._to)
                    if (pc.reset !== undefined)
                        pc._reset = pc.reset === true ? pc.old : pc.reset == '' || pc.reset == null ? '' : this.parseProp(p, pc, pc.reset, pc.old)
                    //                    if (p == "opacity") {
                    //                        var zoom = ui.Style.get(this.el, "zoom")
                    //                        if (zoom == null || zoom == "normal")
                    //                            ui.Style.set(this.el, "zoom", 1);
                    //                    } 
                }
            },
            corrector: function (hs) {
                if (hs == null) return
                if ($.isStr(hs))
                    hs in this.fTarget ? this.fTarget[hs]() : hs in this.el ? this.el[hs] : eval(hs + '(this.el)')
                else if ($.isObject(hs)) {
                    for (var i in hs)
                        (this.achieve || fx.achieves.def)(this.el, i, hs[i])
                }
                else if ($.isArray(hs)) {
                    for (var i = 0; i < hs.length; i++)
                        this.corrector(hs[i])
                }
            },
            /*开始动画
            @return :this */
            play: function () {
                if (this.playing)
                    return this;
                if ($.Event.fire(this, "play") == false)
                    return this

                this.inQueue || this.stopOther();
                this.start = now()
                this.duration = parseInt(ui.Animate.Speed[this.duration] || this.duration || ui.Animate.Speed.normal)
                this.initProp()
                this.corrector(this.before)
                this.playing = true
                this.step()
                return this
            },
            step: function () {
                if (!this.playing)
                    return;

                this.pass = now() - this.start
                this.scale = this.pass / this.duration

                if (this.scale >= 0.99)
                    return this.stop()

                for (var p in this.props) {
                    var c = this.props[p];
                    c.current = c._from + (c._to - c._from) * this.scale
                    if (c.easing) {
                        var s = c.easing(this.scale, this, c);
                        if (s != null)
                            c.current = c._from + (c._to - c._from) * s
                    }
                    c.achieve(this.el, p, c.current)
                }
                setTimeout(this.step, Math.min(this.quality, this.duration - this.pass));
            },
            /*动画停止
            @return :this */
            stop: function () {
                if (!this.playing)
                    return this
                this.corrector(this.after)
                for (var p in this.props) {
                    var c = this.props[p];
                    c.achieve(this.el, p, c.reset !== undefined ? c._reset : c._to);
                }
                this.playing = false
                $.Event.fire(this, "stop")
                if (this.callback)
                    this.callback.call(this)
                return this
            }
        })

        fx.Speed = {
            slow: 3000,
            normal: 1400,
            fast: 800
        }

        /*#C path:fly.ui.Animate.Manager
        动画管理程序
        */
        fx.Manager = {
            all: {},
            queue: {},
            /*注册动画
            @animate:fly.ui.Animate 要纳入管理程序管理的动画
            */
            reg: function (an) {
                var id = UID(an.el)
                if (an.inQueue) {
                    var q = this.queue[id] || (this.queue[id] = [])
                    q.push(an)
                    function check(fromStop) {
                        if (this instanceof fx)
                            q.splice($.In(this, q), 1)
                        if (q.length)
                            q[0].playing || q[0].play()
                    }
                    an.on("stop", check)
                    check()
                }
                else {
                    this.all[id] || (this.all[id] = {});
                    for (var p in an.props)
                        (this.all[id][p] || (this.all[id][p] = [])).push(an);
                }
            },
            /*获取对象的动画
            @el:HtmlElement 被动画操作的Dom对象
            @prop:String(可选) 动画操作的属性
            @return :Array<fly.ui.Animate>/JSON 和Dom对象相关的所有动画
            */
            get: function (el, prop) {
                var ans = this.all[UID(el)]
                return prop ? ans[prop] : ans;
            },
            /*从管理程序中移除动画
            @animate:fly.ui.Animate 要移除的动画 */
            remove: function (an) {
                for (var a in this.all)
                    for (var p in this.all[a])
                        for (var i = this.all[a][p].length - 1; i >= 0; i--)
                            if (this.all[a][p][i] == an)
                                all[a][p][i].splice(i, 1)
            }
        }

        fx.achieves = {
            def: sh.css
        }

        //Copyright notice:fx.easings refer to Ext
        var math = Math,
        pi = math.PI,
        pow = math.pow,
        sin = math.sin,
        sqrt = math.sqrt,
        abs = math.abs,
        backInSeed = 1.70158;
        /*path:fly.ui.Animate.easings
        JSON 典型的动画效果
        */
        fx.easings = {
            swing: function (n, an, pc) {
                return ((-Math.cos(n * Math.PI) / 2) + 0.5) * 1 + 0;
            },

            linear: function (n) {
                return n;
            },
            ease: function (n) {
                var q = 0.07813 - n / 2,
                alpha = -0.25,
                Q = sqrt(0.0066 + q * q),
                x = Q - q,
                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                t = X + Y + 0.25;
                return pow(1 - t, 2) * 3 * t * 0.1 + (1 - t) * 3 * t * t + t * t * t;
            },
            easeIn: function (n) {
                return pow(n, 1.7);
            },
            easeOut: function (n) {
                return pow(n, 0.48);
            },
            easeInOut: function (n) {
                var q = 0.48 - n / 1.04,
                Q = sqrt(0.1734 + q * q),
                x = Q - q,
                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                t = X + Y + 0.5;
                return (1 - t) * 3 * t * t + t * t * t;
            },
            backIn: function (n) {
                return n * n * ((backInSeed + 1) * n - backInSeed);
            },
            backOut: function (n) {
                n = n - 1;
                return n * n * ((backInSeed + 1) * n + backInSeed) + 1;
            },
            elasticIn: function (n) {
                if (n === 0 || n === 1) {
                    return n;
                }
                var p = 0.3,
                s = p / 4;
                return pow(2, -10 * n) * sin((n - s) * (2 * pi) / p) + 1;
            },
            elasticOut: function (n) {
                return 1 - fx.easings.elasticIn(1 - n);
            },
            bounceIn: function (n) {
                return 1 - fx.easings.bounceOut(1 - n);
            },
            bounceOut: function (n) {
                var s = 7.5625,
                p = 2.75,
                l;
                if (n < (1 / p)) {
                    l = s * n * n;
                } else {
                    if (n < (2 / p)) {
                        n -= (1.5 / p);
                        l = s * n * n + 0.75;
                    } else {
                        if (n < (2.5 / p)) {
                            n -= (2.25 / p);
                            l = s * n * n + 0.9375;
                        } else {
                            n -= (2.625 / p);
                            l = s * n * n + 0.984375;
                        }
                    }
                }
                return l;
            }
        }

        /*#M path:fly.ui.Animate.config
        生成配置信息
        @el:HtmlElement 动画操作的Dom对象
        @props: JSON 动画改变的属性
        @duration: Int/String 动画持续的时间,默认"normal"
        @easing:String/Function 效果
        @callback:Function 动画播放完毕执行的对调函数
        @return:JSON 初始化配置信息
        */
        fx.config = function (el, props, duration, easing, callback) {
            if (callback == null) {
                var dIs = $.isFun(duration), eIs = $.isFun(easing)
                if (dIs && eIs)
                    callback = easing, easing = duration, duration = null;
                else if (dIs && $.In(duration, fx.easings))
                    callback = duration, duration = easing = null
                else if (eIs && !$.In(easing, fx.easings))
                    callback = easing, easing = null
            }
            return {
                el: el,
                props: props,
                duration: duration,
                easing: easing,
                callback: callback
            }
        }


        lp.extend({
            /*#M path:fly.IList.animate
            为每一个元素播放动画
            @props:JSON 动画改变的属性
            @duration:Int/String 动画持续的时间,默认"normal"
            @easing:String 效果
            @callback:Function 动画播放完毕执行的回调函数
            @return :this
            */
            animate: function (props, duration, easing, callback) {
                lp.each.call(this, function (o) {
                    var c;
                    if (props.props) {
                        c = $.clone(props);
                        c.props = $.clone(c.props)
                        c.el = o
                    }
                    else {
                        c = fx.config(o, props, duration, easing, callback)
                        c.props = $.clone(props)
                    }
                    c.inQueue = true
                    var animate = new fx(c)
                })
                return this
            },
            /*#M path:fly.IList.fadeTo
            将每一个元素的透明度设置为指定值
            @to:Float 透明度
            @return :this
            */
            fadeTo: function (to) {
                to = { opacity: to, before: 'show' }
                return this.animate.apply(this, arguments);
            }
        });

        $.each({
            /*#M path:fly.IList.slideDown
            向下展开元素
            @return :this
            */
            slideDown: { height: { from: 0 }, before: 'show' },
            /*#M path:fly.IList.slideDown
            向上折叠元素
            @return :this
            */
            slideUp: { height: { to: 0, reset: true }, before: 'show', after: 'hide' },
            /*#M path:fly.IList.slideRight
            向右展开元素
            @return :this
            */
            slideRight: { width: { from: 0 }, before: 'show' },
            /*#M path:fly.IList.slideLeft
            向左折叠元素
            @return :this
            */
            slideLeft: { width: { to: 0, reset: true }, before: 'show', after: 'hide' },
            slideToggle: { height: {} },
            /*#M path:fly.IList.fadeIn
            淡入
            @return :this
            */
            fadeIn: { opacity: { to: 1, from: [0.1, 0] }, before: 'show' },
            /*#M path:fly.IList.fadeOut
            淡出
            @return :this
            */
            fadeOut: { opacity: { to: 0, from: [0.1, 1], reset: '' }, before: 'show', after: 'hide' }
        }, function (props, name) {
            lp.extend(name, function (duration, easing, callback) {
                return this.animate(props, duration, easing, callback);
            });
        })
        return fx;
    })()

    // fly.ui.selector
    ; (function () {
        var eFunsCache = {}
        var nsSelector = $.ns("fly.ui.selector")
        var hasQueryMethod = !!doc.querySelector
        var checkDiv = doc.createElement('div')
        var engine, rSelectors, getStr = 'o==null?$.BREAK:(o[l]==null?(o.getAttribute && o.getAttribute(l)):o[l])';
        var utils =
		{
		    propMap: { "class": "className" },
		    trimCommaReg: /^[\s\,]*\,+|\,+[\s\,]*$/g,
		    expressionInnerReg: /^\s*([\w$]+|('[^']+?')|("[^"]+?"))\s*([=><*!\^\$]+)([\s\S]+)*/,
		    expressionOuterReg: /\s*(\[[^\[\]]+\])/g,
		    trimQuotationReg: /^\s*['"]?|['"]?\s*$/g,
		    trimMiddleBrackets: /^\s*\[|\]\s*$/g,
		    verySimpleReg: /[\[\]\(\)\s><+]/,
		    containsReg: /:contains\(\s*(\'[^\']*\'|\"[^\"]*\")\s*\)/g,
		    headerTags: ["h1", "h2", "h3", "h4", "h5", "h6"],
		    inputTags: ["input", "textarea", "select", "button"],
		    inputTypes: ["text", "checkbox", "radio", "image", "file", "submit", "reset", "password", "button", "hidden"],
		    relationSelectorReg: /[+\-<>~]/,
		    relationSelectorRegReplace: /([+\&<>~]+)(\d*)/g,
		    getByTagPropFilter: function (tagName, prop, value) {
		        return function (context, collector, selector) {
		            var s =
					{
					    selector: tagName, onlyFilterContext: selector.onlyFilterContext
					}
		            if (prop == null)
		                return executors.byTagName(context, collector, s)
		            var c = new nsSelector.Collector()
		            executors.byTagName(context, c, s)
		            $.each(c.result, function (o) {
		                if (o[prop] == value)
		                    collector.result.push(o)
		            })
		        }
		    },
		    getCommonFilter: function (each) {
		        each = $.toFun(each)
		        return function (context, collector, selector, isDesc) {
		            if (!selector.onlyFilterContext) {
		                var newCollector = new nsSelector.Collector()
		                executors.all(context, newCollector,
						{
						    onlyFilterContext: false
						})
		                context = newCollector.result
		            }
		            each(context, collector, selector)
		        }
		    },
		    getSimpleOperator: function (operator) {
		        return $.toFun("o,l, r=>o==null?false:(o[l]==null?(o.getAttribute && o.getAttribute(l)):o[l])" + operator + "r")
		    },
		    simpleAttr: {
		        'class': 'className'
		    },
		    attrToSimple: function (attr) {
		        return this.simpleAttr[attr] || attr
		    }
		}

        nsSelector.Collector = function (r, unique) {
            this.result = r || []
            this.unique = unique;
            if (unique)
                this.uniquelize();
        } .extend(
		{
		    uniquelize: function (start, end) {
		        var len = this.result.length
		        if (!len) {
		            this.result.dataMap = {}
		            return
		        }
		        if (len < 2 || this.result.dataMap)
		            return;

		        this.result.dataMap = {}
		        var all = this.result
		        var i = -1, len = all.length
		        start = start || 0
		        end = end == null ? len : end;
		        while (++i < len) {
		            var id = UID(all[i])
		            if (i >= start && i < end && id in this.result.dataMap) {
		                all.splice(i, 1);
		                i--, len--;
		                continue
		            }
		            this.result.dataMap[id] = all[i]
		        }
		    },
		    merge: function (arr) {
		        if (arr.length == 0)
		            return
		        this.result.length == 0 ? this.result = $.toArray(arr) : this.result.merge(arr)
		        if (this.unique)
		            this.uniquelize();
		    },
		    push: function (el) {
		        if (this.unique) {
		            var id = UID(el)
		            if (this.result.dataMap[id])
		                return false;
		            this.result.dataMap[id] = el
		        }
		        this.result.push(el)
		        return true
		    },
		    contains: function (el) {
		        if (this.unique)
		            return UID(el) in this.result.dataMap
		        return this.result.contains(el)
		    },
		    clear: function () {
		        this.result = []
		    }
		}).extend(nsSelector.Collector)


        var executors =
		{
		    _all: function (el) {
		        if (el.all)
		            return el.all
		        else if (el.getElementsByTagName)
		            return el.getElementsByTagName('*')
		        else {
		            var r = [];
		            (function (o, allChild) {
		                var cs = ui.DomHelper.children(o)
		                if (cs != null)
		                    for (var i = 0; i < cs.length; i++)
		                        arguments.callee(allChild.push(cs[i]), allChild)
		            })(el, r)
		            return r
		        }
		    },
		    all: function (context, collector, selector) {
		        if (selector.onlyFilterContext)
		            return collector.merge(context)
		        for (var i = 0; i < context.length; i++)
		            collector.merge(executors._all(context[i]))
		    },
		    byId: function (context, collector, selector) {
		        var s = selector.selector
		        for (var i = 0; i < context.length; i++) {
		            var c = context[i]
		            if (selector.onlyFilterContext) {
		                if (c.id == s)
		                    collector.result.push(c)
		            }
		            else if (c.getElementById) {
		                var node = c.getElementById(s)
		                if (node)
		                    collector.result.push(node)
		            }
		            else {
		                var childs = executors._all(c)
		                var ci = -1
		                while (++ci < childs.length)
		                    if (childs[ci].id == s)
		                        return collector.result.push(childs[ci])
		            }
		        }
		    },
		    byFun: function (context, collector, selector) {
		        var s = selector.selector
		        function col(c) {
		            (eFunsCache[s] ? eFunsCache[s](c) : window[s] ? window[s](c) : eval(s + "(c)")) && collector.result.push(c)
		        }
		        for (var i = 0; i < context.length; i++) {
		            var c = context[i]
		            if (selector.onlyFilterContext)
		                col(c)
		            else {
		                var childs = executors._all(c)
		                var ci = -1
		                while (++ci < childs.length)
		                    col(childs[ci])
		            }
		        }
		    },
		    byCss: function (context, collector, selector) {
		        var s = new RegExp("\\s" + selector.selector + "\\s")
		        for (var i = 0; i < context.length; i++) {
		            var c = context[i]
		            if (selector.onlyFilterContext) {
		                if (s.test(' ' + c.className + ' '))
		                    collector.result.push(c)
		            }
		            else {
		                var childs = executors._all(c)
		                var ci = -1
		                while (++ci < childs.length)
		                    if (s.test(' ' + childs[ci].className + ' '))
		                        collector.result.push(childs[ci])
		            }
		        }
		    },
		    byName: function (context, collector, selector) {
		        var s = selector.selector
		        for (var i = 0; i < context.length; i++) {
		            var c = context[i]

		            if (selector.onlyFilterContext) {
		                if (c.name == s)
		                    collector.result.push(c)
		            }
		            else if (c.getElementsByName)
		                collector.merge(c.getElementsByName(s))
		            else {
		                var childs = executors._all(c)
		                var ci = -1
		                while (++ci < childs.length)
		                    if (childs[ci].name == s)
		                        collector.result.push(childs[ci])
		            }
		        }
		    },
		    byTagName: function (context, collector, selector) {
		        var s = selector.selector
		        if ($.isArray(s)) {
		            for (var i = 0; i < s.length; i++)
		                arguments.callee(context, collector,
						{
						    selector: s[i], onlyFilterContext: selector.onlyFilterContext
						})
		            return
		        }

		        var s = s.toUpperCase()
		        for (var i = 0; i < context.length; i++) {
		            var c = context[i]
		            if (selector.onlyFilterContext) {
		                if (c.nodeName == s)
		                    collector.result.push(c)
		            }
		            else if (c.getElementsByTagName)
		                collector.merge(c.getElementsByTagName(s))
		            else {
		                s = s.toUpperCase()
		                var childs = executors._all(c)
		                var ci = -1
		                while (++ci < childs.length)
		                    if (childs[ci].nodeName == s)
		                        collector.result.push(childs[ci])
		            }
		        }
		    },
		    clear: function (context, collector, selector) {
		        collector.clear()
		    },
		    expression: function (context, collector, selector) {
		        var all
		        if (selector.onlyFilterContext)
		            all = context
		        else {
		            var ac = new nsSelector.Collector()
		            executors.all(context, ac, { onlyFilterContext: false })
		            all = ac.result
		        }

		        var exp = selector.selector.replace(utils.trimMiddleBrackets, '').trim();
		        //索引
		        if (/^\d+$/.test(exp)) {
		            var node = all[exp]
		            if (node)
		                collector.result.push(node)
		            return
		        }
		        //属性
		        else if (/^[\w$][\w\d$]*$/.test(exp))
		            exp = "o['{0}']!=null || o.getAttribute('{0}')!=undefined".format(utils.attrToSimple(exp))
		        else if (/(^'[^']+'$)|(^"[^"]+"$)/.test(exp))
		            exp = "o['{0}']!=null || o.getAttribute('{0}')!=undefined".format(utils.attrToSimple(exp.substring(1, exp.length - 1)).replace("'", '"'))

		        var option = eFunsCache[exp];
		        if (option == null) {
		            var fun
		            var match = exp.match(utils.expressionInnerReg)
		            if (match != null) {
		                var operator = match[4]
		                if (operator && (fun = nsSelector.Selectors.operators[operator])) {
		                    var left = utils.attrToSimple(match[1].replace(utils.trimQuotationReg, ''))
		                    utils.propMap[left] && (left = utils.propMap[left])
		                    var right = match[5]
		                    try {
		                        right = eval(right)
		                    } catch (e) { }
		                }
		            }
		            if (!$.isFun(fun))
		                fun = $.toFun(fun || (exp.indexOf('=>') > -1 ? exp : "o=>with(o){ return " + exp + "}"))
		            eFunsCache[exp] = option = {
		                fun: fun, left: left,
		                right: right
		            }
		        }

		        var i = -1, len = all.length;
		        while (++i < len)
		            if (option.fun(all[i], option.left, option.right, i, all))
		                collector.result.push(all[i])
		    },
		    filter: function (context, collector, selector) {
		        var fType = selector.selector.replace(/\(.*/, ''), typeFilter
		        if (fType && (typeFilter = nsSelector.Selectors.filters[fType]) != null)
		            typeFilter(context, collector, selector)
		        else throw new Error('Don\'t support filter: "' + selector.selectorStr + '"')
		    },
		    children: function (context, collector, selector) {
		        var s = selector.selectorStr;
		        var deep = parseInt(selector.selector)
		        function find(el, d) {
		            var childs = ui.DomHelper.children(el)
		            if (d == deep)
		                collector.merge(childs)
		            else
		                for (var i = 0; i < childs.length; i++)
		                    find(childs[i], d + 1)
		        }

		        for (var i = 0; i < context.length; i++)
		            find(context[i], 1)
		    },
		    sibling: function (context, collector, selector) {
		        var s = selector.selectorStr;
		        for (var i = 0; i < context.length; i++)
		            collector.merge(ui.DomHelper.children(context[i].parentNode))
		    },
		    getCommonRelationFun: function (relation) {
		        return function (context, collector, selector) {
		            var s = selector.selectorStr;
		            var deep = parseInt(selector.selector)
		            function find(el, d) {
		                var o = el[relation]
		                if (o == null)
		                    return
		                if (o.nodeType != 1)
		                    find(o, d)
		                else if (d == deep)
		                    collector.result.push(o)
		                else
		                    find(o, d + 1)
		            }

		            for (var i = 0; i < context.length; i++)
		                find(context[i], 1)
		        }
		    }
		}

        /*#C path:fly.ui.selector
        选择器
        */
        nsSelector.Selectors =
		{
		    executors: executors,
		    sTypes: new Array,
		    splitRegFormat: "\\s*([{0}]+| |[α]|[><+\\&~]+)\\s*",
		    splitReg: /\s*( )\s*/g,
		    needFollows: {},

		    //Operators
		    //return $.toFun("o,l, r=>o==null?$.BREAK:(o[l]==null?(o.getAttribute && o.getAttribute(l)):o[l])" + operator + "r")

		    operators:
			{
			    '!=': utils.getSimpleOperator("!="),
			    '^=': $.toFun("o,l,r=>var v =" + getStr + ";return v && v.substr(0, r.length) == r"),
			    '$=': $.toFun("o,l,r=>var v =" + getStr + ";return v && v.substr(v.length - (r.length)) == r"),
			    '*=': $.toFun("o,l,r=>var v =" + getStr + " ;return v && v.indexOf(r) > -1"),
			    '=': utils.getSimpleOperator("=="),
			    '==': utils.getSimpleOperator("=="),
			    '>': utils.getSimpleOperator(">"),
			    '<': utils.getSimpleOperator("<"),
			    '>=': utils.getSimpleOperator(">="),
			    '<=': utils.getSimpleOperator("<=")
			},


		    //filters
		    filters:
			{
			    empty: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(c[i].firstChild==null)cr.result.push(c[i])"),
			    parent: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(c[i].firstChild!=null)cr.result.push(c[i])"),
			    enabled: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(c[i].disabled!=true)cr.result.push(c[i])"),
			    disabled: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(c[i].disabled==true)cr.result.push(c[i])"),
			    undisplay: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(!dh.isIsDisplay(c[i]))cr.result.push(c[i])"),
			    display: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(dh.isIsDisplay(c[i]))cr.result.push(c[i])"),
			    unvisible: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(!dh.isVisible(c[i]))cr.result.push(c[i])"),
			    visible: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(dh.isVisible(c[i]))cr.result.push(c[i])"),
			    hidden: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(dh.isHidden(c[i]))cr.result.push(c[i])"),
			    first: utils.getCommonFilter("c,cr,s=>if(c[0]!=null){cr.result.push(c[0]) ;return true}"),
			    last: utils.getCommonFilter("c,cr,s=>if(c[c.length-1]!=null){cr.result.push(c[c.length-1]);return true}", true),
			    even: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(i%2===0)cr.result.push(c[i])"),
			    odd: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(i%2!==0)cr.result.push(c[i])"),
			    "eq()": utils.getCommonFilter("c,cr,s=>var o=c[s.follow.selector]; if(o)cr.result.push(o)"),
			    "gt()": utils.getCommonFilter("c,cr,s=>for(var i = parseInt(s.follow.selector)+1; i < c.length; i ++ )cr.result.push(c[i])"),
			    "lt()": utils.getCommonFilter("c,cr,s=>for(var i = 0,end=Math.min(parseInt(s.follow.selector),c.length); i < end; i ++ )cr.result.push(c[i])"),
			    "not()": function (context, collector, selector) {
			        selector.follow.onlyFilterContext = selector.onlyFilterContext
			        var followCollector = new nsSelector.Collector()
			        selector.follow.find(context, followCollector)
			        var uids = ","
			        $.each(followCollector.result, function (o) { uids += UID(o) + "," })
			        utils.getCommonFilter(function (c, cr, s) {
			            for (var i = 0; i < c.length; i++)
			                if (uids.indexOf("," + UID(c[i]) + ",") < 0) cr.result.push(c[i])
			        })(context, collector, selector)
			    },
			    "has()": function (context, collector, selector) {
			        var childC = new nsSelector.Collector()
			        executors.children(context, childC, { selector: 1 })

			        selector.follow.onlyFilterContext = selector.onlyFilterContext
			        var followCollector = new nsSelector.Collector()
			        selector.follow.find(childC.result, followCollector)

			        executors.parentNode(followCollector.result, collector, { selector: 1 })
			    },
			    "data()": utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(fly.data(c[i],s.follow.selector)) cr.result.push(c[i])"),
			    header: utils.getByTagPropFilter(utils.headerTags),
			    input: utils.getByTagPropFilter(utils.inputTags),
			    checked: utils.getByTagPropFilter("input", "checked", true),
			    unchecked: utils.getByTagPropFilter("input", "checked", false),
			    selected: utils.getByTagPropFilter("option", "selected", true),
			    unselected: utils.getByTagPropFilter("option", "selected", false),
			    focusable: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(dh.focusable(c[i]))cr.result.push(c[i])"),
			    tabbable: utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(dh.tabbable(c[i]))cr.result.push(c[i])")
			},


		    /*	扩展选择器
		    @selectors	:多个选择器
		    @return	:无
		    */
		    extendSelector: function (selectors) {
		        for (var s in selectors)
		            this.executors[s] = selectors[s], this.sTypes.push(s)
		        var reg = this.sTypes.join("").replace(/\s/g, "").replace(utils.relationSelectorRegReplace, '').replace('α', '')
		        this.splitReg = new RegExp(this.splitRegFormat.format(reg), 'g')
		    },

		    /*	扩展过滤选择器
		    @filters	:多个选择器
		    @return	:无
		    */
		    extendFilter: function (filters) {
		        $.extendIf(this.filters, filters)
		        for (var k in this.filters)
		            if (k.substr(k.length - 2) == "()") {
		                var n = k.substr(0, k.length - 2)
		                this.filters[n] = this.filters[k]
		                delete this.filters[k]
		                this.needFollows[":" + n] = this.needFollows[" :" + n] = true
		            }
		    },

		    /*	扩展表达式运算符
		    @operators:{String} 多个运算符
		    @return	:无
		    */
		    extendOperator: function (operators) {
		        $.extend(this.operators, operators)
		    }
		}


        with (executors) {
            nsSelector.Selectors.extendSelector(
			{
			    '*': all,
			    '#': byId,
			    '.': byCss,
			    '$': byName,
			    'α': expression,
			    " ": byTagName,
			    ">": children,
			    "<": getCommonRelationFun("parentNode"),
			    "+": getCommonRelationFun("nextSibling"),
			    "&": getCommonRelationFun("previousSibling"),
			    "~": sibling,
			    ":": filter,
			    "θ": $.emptyFun,
			    "@": byFun
			})
        }
        var inputFilters = {}, ti = -1, iType;
        while (iType = utils.inputTypes[++ti]) {
            inputFilters[iType] = utils.getCommonFilter("c,cr,s=>for(var i = 0; i < c.length; i ++ )if(c[i].type==='" + iType + "')cr.result.push(c[i])")
        }
        nsSelector.Selectors.extendFilter(inputFilters)



        //Engine
        nsSelector.Engine = engine = function (selector, parent) {
            this.parent = parent
            if (parent)
                this.root = parent.root, this.onlyFilterContext = parent.onlyFilterContext
            else
                this.root = this
            this.init(selector)
        } .extend(
		{
		    isSimple: true,
		    onlyFilterContext: false,
		    init: function (selector) {
		        if ($.isStr(selector)) {
		            this.selectorStr = this.selector = selector
		            this.setIsSimple(this.onlyFilterContext == false && engine.isSimple(this.selectorStr))
		            if (!this.isSimple) {
		                if (this.selector.indexOf(":") > -1) {
		                    if (this.selector.indexOf(":contains(") > -1)
		                        this.selector = this.selector.replace(utils.containsReg, function ($0, $1) {
		                            return '[innerText*="' + $1 + '"]'
		                        })
		                }
		                if (!this.parent)
		                    this.extractExpression().extractGroups()
		                this.parse()
		            }
		        }
		        else {
		            for (var k in selector)
		                this[k] = selector[k]
		            if (this.type == 'α')
		                this.selector = this.selectorStr = this.root.expressions[this.selector]
		            else if (this.type == "θ")
		                return this.init(this.root.groups[this.selector])

		            if (this.follow)
		                this.follow = new nsSelector.Engine(this.follow, this)

		            this.setIsSimple(this.onlyFilterContext == false && engine.isSimple(this.selectorStr))
		            if (!this.isSimple)
		                this.achieve = executors[this.type]
		        }
		    },
		    setIsSimple: function (isSimple) {
		        this.isSimple = isSimple
		    },
		    isVerySimple: function () {
		        if (this.verySimple != undefined)
		            return this.verySimple

		        if ((this.sequence && this.sequence.length > 0) || (this.childs && this.childs.length > 0))
		            return this.verySimple = false;
		        if (this.verySimple = !utils.verySimpleReg.test(this.selector)) {
		            this.parse()
		            this.achieve = executors[this.type]
		        }
		        return this.verySimple
		    },
		    extractExpression: function (selector) {
		        var es = this.expressions = new Array
		        this.selector = this.selector.replace(utils.expressionOuterReg, function ($0, $1) {
		            es.push($1)
		            return ($0.indexOf('[') > 0 ? ' α' : 'α') + (es.length - 1)
		        })
		        return this
		    },
		    extractGroups: function () {
		        var gs = this.groups = new Array
		        this.selector = this.selector.replace(/\(([^\)]+)\)/g, function ($0, $1) {
		            gs.push($1.trim())
		            return 'θ' + (gs.length - 1)
		        })
		        return this
		    },
		    makeChilds: function () {
		        this.childs = new Array;
		        var ss = this.selector.split(',')
		        for (var i = 0; i < ss.length; i++)
		            if (ss[i] != "")
		                this.childs.push(new engine(ss[i], this))
		    },
		    makePath: function () {
		        var ss = new Array
		        var hasRelation;
		        if (hasRelation = utils.relationSelectorReg.test(this.selector)) {
		            this.selector = this.selector.replace(utils.relationSelectorRegReplace, function ($0, $1, $2) {
		                return $1.charAt(0) + ($2 == "" ? $1.length : parseInt($2) + $1.length - 1) + " "
		            })
		        }
		        this.selector = this.selector.trim()
		        var contentStr = (" " + this.selector).replace(nsSelector.Selectors.splitReg, function ($0, $1) {
		            ss.push(
				    {
				        selectorStr: $0,
				        onlyFilterContext: !/^\s/.test($0),
				        type: $1
				    })
		            return "ξ"
		        })
		        ss[0].onlyFilterContext = this.onlyFilterContext
		        var contents = contentStr.substr(1).split("ξ")
		        for (var i = 0; i < contents.length; i++) {
		            var s = ss[i]
		            s.selectorStr += (s.selector = contents[i])
		            if (hasRelation && ss.length > i + 1 && utils.relationSelectorReg.test(s.type))	//w3c css规则
		                ss[i + 1].onlyFilterContext = true
		            else if (s.type == "θ" && i > 0 && s.onlyFilterContext) {
		                var prev = ss[i - 1]
		                if (nsSelector.Selectors.needFollows[prev.selectorStr] == true && prev.follow == null) {
		                    prev.follow = s
		                    ss.splice(i, 1)
		                    contents.splice(i, 1)
		                    i--
		                }
		            }
		        }

		        if (ss.length == 1)
		            this.init(ss[0]), ss = null
		        else
		            for (var i = 0; i < ss.length; i++)
		                ss[i] = new engine(ss[i], this)
		        this.sequence = ss;
		        return this
		    },
		    parse: function (selector) {
		        return this.selector.indexOf(',') > -1 ? this.makeChilds() : this.makePath()
		    },
		    findChilds: function () {
		        var sStr = ""
		        for (var i = 0; i < this.childs.length; i++) {
		            var s = this.childs[i]
		            if (hasQueryMethod && s.isSimple && this.context.isDom != false)
		                sStr += "," + s.selectorStr

		            else {
		                var subResult = new nsSelector.Collector()
		                s.find(this.context, subResult)
		                this.collector.merge(subResult.result)
		            }
		        }
		        if (sStr != "") {
		            var subResult = new nsSelector.Collector()
		            engine.queryByProtogenic(this.context, subResult, sStr.substr(1))
		            this.collector.merge(subResult.result)
		        }
		    },
		    isChilds: function (el) {
		        for (var i = 0; i < this.childs.length; i++)
		            if (this.childs[i].is(el, this.context))
		                return true;
		        return false
		    },
		    findPath: function () {
		        var sStr = ""
		        var subResult = new nsSelector.Collector()
		        var newContext = this.context
		        function flush() {
		            if (sStr != "") {
		                engine.queryByProtogenic(newContext, subResult, sStr.substr(1))
		                newContext = subResult.result
		                subResult.clear()
		                sStr = ""
		            }
		        }
		        for (var i = 0; i < this.sequence.length; i++) {
		            var s = this.sequence[i]
		            if (hasQueryMethod && s.isSimple && this.context.isDom != false)
		                sStr += (this.onlyFilterContext ? "" : ' ') + s.selectorStr
		            else {
		                flush()
		                s.find(newContext, subResult)
		                newContext = subResult.result
		                subResult.clear()
		            }
		        }
		        flush()
		        this.collector.merge(newContext)
		    },
		    isPath: function (el) {
		        var e = el;
		        for (var i = this.sequence.length - 1; i > -1; i--) {
		            var s = this.sequence[i]
		            while (true) {
		                if (e == null || e.nodeType !== 1)
		                    return false
		                var is = s.is(e, this.context)
		                if (!is) {
		                    if (e == el)
		                        return false
		                    else
		                        e = e.parentNode;
		                }
		                else {
		                    e = e.parentNode;
		                    break;
		                }
		            }
		        }
		        return true
		    },
		    find: function (context, collector) {
		        if (this.selectorStr == "")
		            return
		        this.context = context
		        this.collector = collector
		        if (this.isSimple && context.isDom != false)
		            engine.queryByProtogenic(context, collector, this.selectorStr)
		        else if (this.childs != null && this.childs.length > 0)
		            this.findChilds()
		        else if (this.sequence != null && this.sequence.length > 0)
		            this.findPath()
		        else
		            this.achieve(context, collector, this)
		    },
		    filter: function (all, context, collector) {
		        for (var i = 0; i < all.length; i++) {
		            var e = all[i]
		            if (this.is(e, context))
		                collector.push(e)
		        }
		    },
		    is: function (el, context) {
		        this.context = context
		        if (this.childs != null && this.childs.length > 0)
		            return this.isChilds(el)
		        else if (this.sequence != null && this.sequence.length > 0)
		            return this.isPath(el);
		        else if (this.isSimple && this.isVerySimple() == false) {
		            var id = el.id;
		            var newId = el.id = "fly_" + Math.random();
		            var newSelector = this.selectorStr + "[id='" + newId + "']"
		            context = context || [doc]
		            var is = false;
		            for (var i = 0; i < context.length; i++) {
		                if (is = !!context[i].querySelector(newSelector))
		                    break;
		            }
		            el.id = id;
		            return is;
		        }
		        else {
		            var _context = [{ all: [el]}]
		            _context.isDom = false;
		            var collector = new nsSelector.Collector();
		            this.achieve(_context, collector, this)
		            return collector.result.length > 0
		        }
		    },
		    not: function (el, context) {
		        return !this.is(el, context)
		    }

		}).extend(nsSelector.Engine)
        engine.utils = utils
        engine.isSimple = function (selector) {
            try {
                return hasQueryMethod && checkDiv.querySelector(selector) != false
            }
            catch (e) {
                return false
            }
        }

        engine.queryByProtogenic = function (context, collector, selector) {
            for (var i = 0; i < context.length; i++)
                collector.merge(context[i].querySelectorAll(selector))
            return collector.result
        }

        engine.cache = {}
        engine.create = function (selector) {
            return engine.cache[selector] || (engine.cache[selector] = new engine(selector))
        }


        /*#C path:fly.ui.selector.DomQuery
        Dom对象查询类
        */
        nsSelector.DomQuery = function (context, selectors, fromIList) {
            this.context = context
            this.selectors = selectors
            this.fromIList = fromIList
        } .extend(
		{
		    createResult: function (arr, context) {
		        arr.context = context;
		        arr.isDomArray = true
		        return arr
		    },
		    extractSelectorStr: function (filterOnly) {
		        var s = this.selectorStr = ""
		        for (var i = 0; i < this.selectors.length; i++) {
		            if ($.isFun(s = this.selectors[i])) {
		                if (filterOnly) {
		                    (this.funSelectors || (this.funSelectors = [])).push(s)
		                    continue
		                }
		                else {
		                    eFunsCache[UID(s)] = s, s = "@" + UID(s)
		                }
		            }

		            if (s == null)
		                continue
		            if (!$.isStr(s))
		                this.collector.push(s)
		            else {
		                if ($.isHtml(s))
		                    this.collector.merge(dh.create(s))
		                else
		                    this.selectorStr += (this.selectorStr == "" ? '' : ',') + s.replace(utils.trimCommaReg, '')
		            }
		        }
		        return this
		    },
		    isByFuns: function (el) {
		        if (!this.funSelectors) return
		        for (var i = 0; i < this.funSelectors.length; i++)
		            if (this.funSelectors[i](el))
		                return true;
		    },
		    /*	查找Dom对象
		    @return	:Array 查找到的Dom对象
		    */
		    find: function () {
		        if (this.selectors.length == 1 && this.selectors[0] && this.selectors[0].isIList == true)
		            return this.selectors[0]
		        this.collector = new nsSelector.Collector()
		        this.extractSelectorStr()
		        if (/^\s*$/g.test(this.selectorStr) == false) {
		            this.selector = engine.create(this.selectorStr)
		            this.selector.find(this.context || [doc], this.collector)
		        }

		        this.collector.uniquelize()
		        return this.createResult(this.collector.result, this.context)
		    },
		    filter: function (all) {
		        return this.filterSome(all, all.context, function (no, e, col, uCol) {
		            if (e && e.nodeType === 1 && uCol.push(e) && (no || this.isByFuns(e) || (this.selector && this.selector.is(e, all.context))))
		                col.push(e)
		        });

		        //		        this.extractSelectorStr(true)
		        //		        this.selector = this.selectorStr ? engine.create(this.selectorStr) : null
		        //		        var col = new nsSelector.Collector()
		        //		        if (this.funSelectors) {
		        //                    var nAll=[]
		        //		            for (var i = 0; i < all.length; i++) {
		        //		                var e = all[i]
		        //		                this.isByFuns(e) ? col.push(e) : nAll.push(e)
		        //		            }
		        //                    all=nAll
		        //		        }
		        //                this.selector && this.selector.filter(all, all.context, col);
		        //		        return this.createResult(col.result, this.context)
		    },
		    is: function (all) {
		        this.extractSelectorStr(true)
		        this.selector = this.selectorStr ? engine.create(this.selectorStr) : null
		        var no = !this.selector && !this.funSelectors
		        for (var i = 0; i < all.length; i++) {
		            var e = all[i]
		            if (no || this.isByFuns(e) || (this.selector && this.selector.is(e, all.context)))
		                return true
		        }
		        return false;
		    },
		    not: function (all) {
		        return this.filterSome(all, all.context, function (no, e, col, uCol) {
		            if (no || (!this.isByFuns(e) && (!this.selector || !this.selector.is(e, all.context))))
		                col.push(e)
		        });
		    },
		    filterSome: function (all, context, fn, col) {
		        this.extractSelectorStr(true)
		        if (!col)
		            col = new nsSelector.Collector()
		        this.selector = this.selectorStr ? engine.create(this.selectorStr) : null
		        var uCol = new nsSelector.Collector(null, true), no = !this.selector && !this.funSelectors
		        for (var i = 0; i < all.length; i++)
		            fn.call(this, no, all[i], col, uCol, context)

		        uCol = null;
		        return this.createResult(col.result, context);
		    },

		    /*	匹配所有元素的第一个与表达式匹配的上级元素，
		    @selectors	:String(可选) 选择器
		    @return :Array<Element>
		    */
		    closest: function (all) {
		        return this.filterSome(all, all.context, function (no, e, col, uCol) {
		            while (e && e.nodeType === 1 && uCol.push(e)) {
		                if (no || this.isByFuns(e) || (this.selector && this.selector.is(e, all.context))) {
		                    col.push(e)
		                    break;
		                }
		                else
		                    e = e.parentNode;
		            }
		        });
		        //		        var context = all.context, col = new nsSelector.Collector()
		        //		        this.extractSelectorStr(true)
		        //		        if (this.selectors.length == 0)
		        //		            return all;
		        //		        var uCol = new nsSelector.Collector(null, true)
		        //		        this.selector = this.selectorStr ? engine.create(this.selectorStr) : null
		        //		        var no = !this.selector && !this.funSelectors
		        //		        for (var i = 0; i < all.length; i++) {
		        //		            var e = all[i]
		        //		            while (e && e.nodeType === 1 && uCol.push(e))
		        //		                if (no || this.isByFuns(e) || (this.selector && this.selector.is(e, context))) {
		        //		                    col.push(e)
		        //		                    break;
		        //		                }
		        //		                else {
		        //		                    e = e.parentNode;
		        //		                }
		        //		        }
		        //		        uCol = null;
		        //		        return this.createResult(col.result, context);
		    },

		    /*	匹配所有元素的第一个与表达式匹配的上级元素，
		    @selectors	:String(可选) 选择器
		    @return :Array<Element>
		    */
		    parent: function (all) {
		        return this.filterSome(all, all.context, function (no, e, col, uCol) {
		            e = e.parentNode;
		            if (e && e.nodeType === 1 && uCol.push(e) && (no || this.isByFuns(e) || (this.selector && this.selector.is(e, all.context))))
		                col.push(e)
		        });
		        //		        var context = all.context, col = new nsSelector.Collector()
		        //		        this.extractSelectorStr(true)
		        //		        var uCol = new nsSelector.Collector(null, true)
		        //		        this.selector = this.selectorStr ? engine.create(this.selectorStr) : null
		        //		        var no = !this.selector && !this.funSelectors
		        //		        for (var i = 0; i < all.length; i++) {
		        //		            var e = all[i].parentNode;
		        //		            if (e && e.nodeType === 1 && uCol.push(e) && (no || this.isByFuns(e) || (this.selector && this.selector.is(e, context))))
		        //		                col.push(e)
		        //		        }
		        //		        uCol = null
		        //		        return this.createResult(col.result, context);
		    },


		    /*	匹配所有元素的第一个与表达式匹配的上级元素，
		    @selectors	:String(可选) 选择器
		    @return :Array<Element>
		    */
		    parents: function (all) {
		        return this.filterSome(all, all.context, function (no, e, col, uCol) {
		            while ((e = e.parentNode) && e.nodeType === 1 && uCol.push(e))
		                if (no || this.isByFuns(e) || (this.selector && this.selector.is(e, all.context)))
		                    col.push(e)
		        });
		        //		        var context = all.context, col = new nsSelector.Collector()
		        //		        this.extractSelectorStr(true)
		        //		        var uCol = new nsSelector.Collector(null, true)
		        //		        this.selector = this.selectorStr ? engine.create(this.selectorStr) : null
		        //		        var no = !this.selector && !this.funSelectors
		        //		        for (var i = 0; i < all.length; i++) {
		        //		            var e = all[i]
		        //		            while ((e = e.parentNode) && e.nodeType === 1 && uCol.push(e))
		        //		                if (no || this.isByFuns(e) || (this.selector && this.selector.is(e, context)))
		        //		                    col.push(e)
		        //		        }
		        //		        uCol = null;
		        //		        return this.createResult(col.result, context);
		    }

		}).extend(nsSelector.DomQuery)

        /*	根据条件判断是否执行
        @predicateOrSelectors:Function/String/Object 用来判断是否执行的表达式、函数或其它对象 
        @args	:Array(可选) 参数，要传递的任意多个参数
        @return	:Function
        */
        lp.extend('filter', function (selectors) {
            if (!$.isString(selectors))
                return this.where.apply(this, arguments);
            var q = new ui.selector.DomQuery(this.context, arguments)
            return q.filter(this);
        })


        function extendSelectorMethod(method) {
            method = $.isStr(this) ? this : method;
            lp.extend(method, function (selectors) {
                var q = new ui.selector.DomQuery(this.context, arguments)
                return q[method](this);
            })
        }
        $.each(["is", "not", "closest", "parents"], extendSelectorMethod)

    })();


    if (config.onLoad)
        $.onLoad(config.onLoad, $, $)

    /*	document 对象*/
    $.doc = $(docE);
    $.win = $(window);
    $.getBody = function () {
        /*	document.body 对象*/
        if ($.body)
            return $.body
        if (!doc.body)
            return null
        return $.body = $(doc.body)
    }
})(this);


// alert(new Date()-sTime)
