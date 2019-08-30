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

function getNewCheckbox(id, text, onChange) {
    let checkboxString = `<button id="${id}" class="sxc-plus-button">${text}</button>`

    let checkboxElement = getElementFromString(checkboxString);
    
    if (onChange) {
        checkboxElement.addEventListener("change", onChange);
    }

    return checkboxElement;
}

