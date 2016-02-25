/// <reference path="../fly/fly.js" />
/// <reference path="../../fly.mini-all.js" />
/// <reference path="../language/en/index.js" />
var lang = (window.location.search.match(/lang=([^&]+)/) || {})[1]
if (lang == null) {
    lang = $.Cookie.get("fly-lang") || 'en'
}

$.Cookie.set("fly-lang", lang, 100000)
$.ajax.async(false).get("language/{0}/index.js".format(lang), function (js) {
    eval(js);
})
function toggleDisplay(el, always) {
    el = el && el.style == null ? el.nextSibling : el
    if (el && el.style) {
        if ($.DomHelper.isHidden(el))
            $.DomHelper.show(el)
        else if (always != true)
            el.style.display = 'none'
    }
}

function encodeHtml(str) {
    if (!str)
        return str;
    return str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/ /g, '&nbsp;').replace(/(\n|\r)+/g, '<br/>').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showType() { }

function API() {
    var me = this;
    this.rightRoot = $('#rightRoot');
    function merge(data) {

        data.classes.each(function (c) {
            var cls = me.apiData.classes.first('o=>o.path=="' + c.path + '"')
            if (cls) {
                cls.properties = cls.properties.concat(c.properties)
                cls.methods = cls.methods.concat(c.methods)
                cls.events = cls.events.concat(c.events)
            }
            else {
                me.apiData.classes.push(c)
            }
        })
    }

    $.ajax.get("language/{0}/fly.mini.js".format(lang), function (ms) {
        me.apiData = $.JSON.decode(ms);
        me.apply();
    })
}

API.extend({
    goReg: /go:\/([^\/]+)\//g,

    toGo: function (str) {
        return str.replace(this.goReg, function ($0, $1) {
            return '<a href=# onclick="API.current.go(\'{0}\');return false;">{0}</a>'.format($1);
        });
    },
    go: function (path) {
        var node = this.tree.itemMap[path.trim()];
        node && node.select();
    },
    apply: function () {
//        var title = this.apiData.name + ' ' + this.apiData.version
//        document.title = title
//        window.topDiv.html('{name}<a href="{site}" target="_blank">{title}</a>'.format(this.apiData));
//        window.rightWelcomeTitle.text(title);
//        var info = '<a target="_blank" href="{site}">{site}</a><br />' + '<a target="_blank" href="{source}">{source}</a><br />' + '{copy}';
//        window.rightWelcomeInfoInner.html(info.format(this.apiData));

        this.createTree();
        setTimeout(resize, 100);
    },
    createTree: function () {
        var me = this, type
        function ms(m, i, all) {
            return {
                text: m.name,
                path: this.path + m.name,
                tag: m,
                type: type
            }
        }

        function s(cls) {
            var node =
            {
                text: cls.path,
                path: cls.path,
                tag: cls,
                type: 'class',
                iconCss: 'item-library'
            }

            var baseName = cls.base
            while (baseName) {
                var baseCls = me.apiData.classes.where("o=>o.path=='" + baseName + "'")[0]
                if (baseCls) {
                    function copy(p) {
                        p = fly.extend({}, p)
                        p.name += "<span class=base-name >(" + flyLan.inherit_ + ":" + baseCls.path + ")</span>"
                        cls[this].push(p)
                    }
                    baseCls.properties.each(copy, "properties")
                    baseCls.methods.each(copy, "methods")
                    baseCls.events.each(copy, "events")
                    baseName = baseCls.base
                }
                else {
                    break
                }
            }

            node.children = []
            if (cls.properties.length) {
                var propsNode =
                {
                    text: flyLan.prop_,
                    path: cls.path + '.properties',
                    type: 'properties',
                    tag: cls.properties
                }
                node.children.push(propsNode);
                type = "property"
                propsNode.children = cls.properties.select(ms, cls)
            }

            if (cls.methods.length) {
                var methodsNode =
                {
                    text: flyLan.method_,
                    path: cls.path + '.methods',
                    type: 'methods',
                    tag: cls.methods
                }
                node.children.push(methodsNode);

                cls.methods.each(function (m) {
                    if (m.ret)
                        m.type = m.ret.type;
                });
                type = "method"
                methodsNode.children = cls.methods.select(ms, cls, "method")
            }

            if (cls.events.length) {
                var eventsNode =
                {
                    text: flyLan.evt_,
                    path: cls.path + '.events',
                    type: 'events',
                    tag: cls.events
                }
                node.children.push(eventsNode);
                type = "event"
                eventsNode.children = cls.events.select(ms, cls, "event")
            }

            return node;
        }
        var pRoot = [];
        var nodes = this.apiData.classes.select(s)
        nodes.each(function (o) {
            if (o.tag.path)
                o.tag.pPath = o.tag.path.replace(/\.?[^\.]+$/, '');
            if (o.tag.pPath) {
                var p = nodes.first(function (n) {
                    return n.tag.path == o.tag.pPath
                });
                if (p)
                    p.children.push(o)
                else
                    pRoot.push(o);
            }
            else {
                pRoot.push(o);
            }
        });
        pRoot[0].expanded = true;
        me.tree = new fly.mini.Tree({
            items: pRoot,
            useEffect: false,
            checkMode: fly.mini.checkMode.none,
            leastSelectionOne: true,
            itemKey: 'path',
            onSelect: function (node, selected) {
                if (!node.selected)
                    return
                me["show" + node.type.firstUpper()](node, node.tag);
                if (me.queryKey) {
                    searchTool(".")
                    setTimeout(function () {
                        searchTool(me.queryKey)
                    }, 300);
                }
            }
        });
        me.tree.render($("#left-nav")[0]);
        if ($.browser.isChrome)
            setTimeout(function () {
                rootTable.hide()
                rootTable.show()
            }, 30);
    },
    queryKey: "",
    query: function (key) {
        if (this.queryKey == key)
            return;
        this.queryKey = key;
        var nodes = []
        var reg = new RegExp(key, "i")
        this.tree.eachAll(function (node) {
            var tag = node.tag
            if (reg.test(tag.name) || reg.test(tag.remark))
                nodes.push(node)
        })
        this.tree.collapseAll()
        this.tree.hideAll()
        nodes.each("o=>o.expand(true);o.show(true)")
    },
    showInRight: function (el) {
        this.rightRoot.empty().append(el);
    },
    processRemark: function (obj) {
        if (obj.remark && !obj._remark) {
            obj._remark = this.toGo(encodeHtml(obj.remark));
            var m = obj._remark.match(/(.*?)<br\/>/)
            obj.shortRemark = m ? m[1] : obj._remark
            obj.detailRemark = obj._remark == obj.shortRemark ? '' : obj._remark
        }
    },
    createMemberDom: function (member, showName, showType, showShortRemark, showDetailRemark) {
        this.processRemark(member);
        var html = '';
        if (showName)
            html += '<a class="m-name">{name}</a> :&nbsp; &nbsp;';
        if (showType)
            html += '<a class=m-type onclick="showType(this.innerText)">{0}</a>'
        if (showShortRemark)
            html += '&nbsp; <span class=m-shortRemark >{shortRemark}</span>'
        if (showDetailRemark)
            html += '&nbsp; <span class=m-detailRemark >' + member.detailRemark + '</span>'
        return html.format(encodeHtml(member.type), member);
    },
    createPropertyDom: function (prop, getHtmlOnly) {
        var html = '<div class="m-property m-member">' + '<div onclick="toggleDisplay(this.nextSibling)" class="m-toggle" >' + '{0}' + '<div class="remark">{1}</div>' + '</div>';
        this.processRemark(prop);
        html = html.format(this.createMemberDom(prop, true, true, true), prop.detailRemark, prop);
        if (getHtmlOnly)
            return html;
        return prop.dom = $(html);
    },

    showProperty: function (node, prop) {
        if (!prop.dom)
            this.createPropertyDom(prop)
        this.showInRight(prop.dom);
    },
    createMethodDom: function (method, getHtmlOnly) {
        var me = this
        var html = '<div class="m-method m-member">' + '<div onclick="toggleDisplay(this.nextSibling)" class="m-toggle">' + '<a class="m-name">{name}</a>( <a class=gray >{0}</a> )&nbsp;: <a class=type onclick="showType(this.innerText)">{type}</a>' + '&nbsp; <span>{shortRemark}</span></div>' + '<div class="m-detail">' + '<div class="m-title">{arg_} : </div>' + '<ul class="m-parameters">' + '{1}</ul>' + '<div class="m-return"><a class="m-title">{ret_} :</a> {2}</div>' + '{4}<div class="m-detailRemark">{3}</div>' + '</div>' + '</div>';

        this.processRemark(method);
        var args = method.args.select("o=>encodeHtml(o.type) +' '+ o.name").join(', ')
        var argList = method.args.select(function (o) {
            return '<li>' + me.createMemberDom(o, true, true, true, false) + '</li>';
        });
        var ret = me.createMemberDom(method.ret, false, true, false, true);
        html = html.format(args, argList, ret, method.detailRemark, method.detailRemark ? "<br/>" : "", flyLan, method)
        if (getHtmlOnly)
            return html;
        return method.dom = $(html);

    },

    showMethod: function (node, method) {
        if (!method.dom)
            this.createMethodDom(method)
        this.showInRight(method.dom);
    },
    showEvent: function (node, evt) {
        this.showMethod(node, evt);
    },
    createMethodsDom: function (methods, getHtmlOnly) {
        var mHtml = methods.select(function (o) {
            return '<li >' + this.createMethodDom(o, true) + '</li>';
        }, this);

        var html = '<ul class="m-methods m-members">' + mHtml.join('') + '</ul>'
        if (getHtmlOnly)
            return html;
        return methods.dom = $(html);
    },
    showMethods: function (node, methods) {
        if (!methods.dom)
            this.createMethodsDom(methods);

        this.showInRight(methods.dom);
    },
    createPropertiesDom: function (properties, getHtmlOnly) {
        var mHtml = properties.select(function (o) {
            return '<li >' + this.createPropertyDom(o, true) + '</li>';
        }, this);

        var html = '<ul class="m-properties m-members" >' + mHtml.join('') + '</ul>'
        if (getHtmlOnly)
            return html;
        return properties.dom = $(html);
    },
    showProperties: function (node, properties) {
        if (!properties.dom)
            this.createPropertiesDom(properties);

        this.showInRight(properties.dom);
    },
    showEvents: function (node, events) {
        this.showMethods(node, events);
    },
    createClassDom: function (cls) {
        var html = '<div class="m-class">' + '<div class=m-name >{name}</div><br/>' + '<div class=m-detailRemark >{0}</div><br/>' + '<div class=m-class-members >' + '<div class=m-class-properties ><div class="m-title m-toggle" onclick="toggleDisplay(this.nextSibling)" >{prop_} <span class="gray font-light" >({1})</span>：</div></div><br/>' + '<div class=m-class-methods ><div class="m-title m-toggle" onclick="toggleDisplay(this.nextSibling)" >{method_} <span class="gray font-light" >({2})</span>：</div></div><br/>' + '<div class=m-class-events><div class="m-title m-toggle" onclick="toggleDisplay(this.nextSibling)" >{evt_} <span class="gray font-light" >({3})</span>：</div></div></div><br/>' + '</div>';
        //this.processRemark(cls);
        return cls.dom = $(html.format(cls.remark, cls.properties.length, cls.methods.length, cls.events.length, flyLan, cls));
    },
    appendClassMembers: function (cls) {
        if (!cls.properties.dom)
            this.createPropertiesDom(cls.properties)
        if (!cls.methods.dom)
            this.createMethodsDom(cls.methods)
        if (!cls.events.dom)
            this.createMethodsDom(cls.events)
        cls.dom.find(".m-class-properties").append(cls.properties.dom);
        cls.dom.find(".m-class-methods").append(cls.methods.dom);
        cls.dom.find(".m-class-events").append(cls.events.dom);
    },
    showClass: function (node, cls) {
        if (!cls.dom)
            this.createClassDom(cls);
        else if (cls.dom[0].parentElement)
            return;
        this.appendClassMembers(cls);

        this.showInRight(cls.dom);
    }
});
$(function () {
    window.queryBox = $('#query')
    window.rootTable = $("#rootTable");
    window.topDiv = $('#top-div');
    window.rightWelcomeTitle = $('#right-welcome-title');
    window.rightWelcomeInfoInner = $('#right-welcome-info-inner');
    var right = $("#right-cell");

    window.resize = function () {
        var height = $.doc.outerHeight();
        rootTable.height(parseInt(height) - parseInt(topDiv.outerHeight()));
    }

    $(window).onResize(resize);


    API.current = new API();
    window.queryBox.blur(function () {
        if (API.current.queryKey) {
            setTimeout(function () {
                searchTool(API.current.queryKey);
            }, 500)
        }
    });
    window.queryBox.keydown(function () {
        window.clearTimeout(this.queryHandle)
        this.queryHandle = setTimeout(function () {
            API.current.query(queryBox.val().trim())
        }, 600);
    });

    $('select').val(lang).change(function () {
        window.location.href = "?lang=" + $(this).val()
    });
})
function searchTool(text) {
    try {
        window.clipboardData.setData("Text", text);
        var shell = new ActiveXObject("Wscript.Shell");
        shell.SendKeys("^f");
        shell.SendKeys("^a");
        shell.SendKeys("^v");
        shell.Quit;
    }
    catch (e) { }

}