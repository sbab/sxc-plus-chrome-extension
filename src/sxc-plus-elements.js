function getElementFromString(s) {
    let div = document.createElement("div");
    div.innerHTML = s.trim();
    return div.firstChild;
}

function getNewTooltip (title, text) {
    let tooltipString = `
        <div class="sxc-plus-tooltip">Data attivazione
            <span class="sxc-plus-tooltipText">${text}</span>
        </div>
    `;

    return getElementFromString(tooltipString);
}

function getNewMenu(id) {
    let menuString = `
    <div class="sxc-plus-menu" id="${id}">
        <div class="sxc-plus-logo">
            <img src="${chrome.runtime.getURL("/img/sxc-plus-logo.svg")}" height="32px", width="32px"/>
        </div>
    </div>
    `

    return getElementFromString(menuString);
}

function getNewButton(id, label, onClick) {
    let buttonString = `<button id="${id}" class="sxc-plus-button">${label}</button>`

    let buttonElement = getElementFromString(buttonString);
    
    if (onClick) {
        buttonElement.addEventListener("click", onClick);
    }

    return buttonElement;
}

function getNewCheckbox(id, checked, onChange) {
    // let newLabel = getElementFromString(`<label class="sxc-plus-checkbox"></label>`);
    let newInput = getElementFromString(`<input class="sxc-plus-checkbox" type="checkbox" id="${id}" ${(checked ? `checked="checked"`: "")}/>`);

    if (onChange) {
        newInput.addEventListener("change", onChange);
    }

    // newLabel.appendChild(newInput);
    // newLabel.appendChild(document.createTextNode(text));

    return newInput;
}

function getNewCheckboxLabel(id, text) {
    return getElementFromString(
        `<label class="sxc-plus-checkboxlabel"${(id ? ` id="${id}"` : ``)}>${text}</label>`
    )

}
