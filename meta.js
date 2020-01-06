module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "label": "Project name, single word, no space or punctuations"
    },
    "description": {
      "type": "string",
      "required": true,
      "label": "Project description",
      "default": "A Chrome Extension"
    },
    "author": {
      "type": "string",
      "label": "Author"
    },
    "license": {
      "type": "string",
      "label": "License",
      "default": "MIT"
    }
  },
  "helpers": {
    "camelize": camelize
  },
  "skipInterpolation": "src/js/lib/*.js",
  "completeMessage": "{{#inPlace}}To get started:\n\n  npm install\n  npm start{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm start{{/inPlace}}"
};

function camelize (str) {
  return str.replace(/^([a-z])|(-[a-z])/g, function (a) {
    return a.replace('-','').toUpperCase()
  })
}