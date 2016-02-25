function viewSource(id) {
    var script = document.getElementById(id)
    if (script) {
        var win = window.open("", "_blank");
        win.document.body.innerText=script.innerHTML
    }
}

fly.mini.attachEvent(window, "load", function () {
    fly.mini.each(document.scripts, function (script) {
        var div=script.parentNode
        if (div && div.className.indexOf("demo-code") > -1) {
            div.innerText = script.innerHTML
        }
    })
})