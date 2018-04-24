import template from "./template";

export default function(require) {
  return function() {
    return require("marked@0.3.12/marked.min.js").then(function(marked) {
      return template(function(string) {
        var root = document.createElement("div");
        root.innerHTML = marked(string, {langPrefix: ""}).trim();
        var code = root.querySelectorAll("pre code[class]");
        if (code.length > 0) require("@observablehq/highlight.js@1.0.0/highlight.min.js").then(function(hl) { code.forEach(hl.highlightBlock); });
        return root;
      }, function() {
        return document.createElement("div");
      });
    });
  };
}
