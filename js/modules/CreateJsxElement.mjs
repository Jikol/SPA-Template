export default (tagName, attrs = {}, ...children) => {
    let element;
    if (tagName.startsWith('svg')) {
        element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    } else {
        element = document.createElement(tagName);
    }

    Object.entries(attrs || {}).forEach(([name, value]) => {
        if (name.startsWith('className')) {
            element.setAttribute('class', value.toString());
        } else {
            element.setAttribute(name, value.toString());
        }
    })

    for (const child of children) {
        if (Array.isArray(child)) {
            element.append(...child);
        } else {
            element.append(child);
        }
    }

    return element;
}