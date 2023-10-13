const cache = {};
export const render = (root, html) => {
    let template = cache[html];
    if (!template) {
        template = document.createElement('template');
        template.innerHTML = html;
        cache[html] = template;
    }
    root.appendChild(template.content.cloneNode(true));
};
export const fire = (target, type, detail) => {
    target.dispatchEvent(new CustomEvent(type, {
        bubbles: true,
        detail
    }));
};
//# sourceMappingURL=dom.js.map