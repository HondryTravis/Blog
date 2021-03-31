/*
* design by theme Simple Dark <vscode theme>. github: https://github.com/HondryTravis/simple-dark
*/

var colors = {
    // dark color
    black: "#1d1e21",
    lightBlack: "#24272a",
    gray: "#444444",
    darkGary: "#2c2f32",
    lightGray: "#737373",

    // light color
    white: "#f0f0f0",
    garyWhite: "#D2D3D9",
    mediumWhite: "#dddddd",

    tomato: "#FF6347",
    pink: "#FF69B4",
    cyan: "#8BE9FD",
    lightCyan: "#E1FFFF",
    green: "#00E673", // #78F078
    lightGreen: "#C3E88D",
    orange: "#FFB86C",
    purple: "#BD93F9",
    red: "#f4433c",
    blue: "#1e90ff",
    deepSkyBlue: "#00bfff",
    mediumBlue: "#00A1F1",
    lightYellow: "#eefa7a",
}

module.exports = {
    plain: {
        color: colors['mediumWhite'],
        backgroundColor: colors['lightBlack']
    },
    styles: [
        {
            types: ["number", "inserted", "constant", "variable", "important", "boolean"],
            style: {
                color: colors['purple']
            }
        },
        {
            types: ["function", "property-access"],
            style: {
                color: colors['green']
            }
        },
        {
            types: ["keyword", "operator", 'tag', "punctuation", "doctype", "atrule"],
            style: {
                color: colors['pink']
            }
        },
        {
            types: ["comment"],
            style: {
                color: colors['lightGray']
            }
        },
        {
            types: ["attr-name", 'class-name', 'maybe-class-name', 'class'],
            style: {
                color: colors['deepSkyBlue']
            }
        },
        {
            types: ["string", 'attr-value'],
            style: {
                color: colors['lightGreen']
            }
        },
        {
            types: ['property-access', 'builtin', "changed", "selector", "property"],
            style: {
                color: colors['cyan']
            }
        },
        {
            types: ['plain','parameter'],
            style: {
                color: colors['orange']
            }
        },
    ]
};
