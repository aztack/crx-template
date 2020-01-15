# A Chrome extension project template

Write your chrome extension with:
- Vue.js
- Pug
- Stylus
- Vue i18n
- ElementUI

# Install

```bash
#init project
vue init aztack/crx-template <project-name>
cd <project-name>
#start dev server
npm start
#build for production
npm run release
```

# Preview

- Open `chrome://extensions/`
- Load unpacked extension from `./build/dev`

# Release

- `npm run release`
- Compress `build/prod/*.*` into `prod.zip`
- Upload prod.zip to Chrome Web Store (You need a developer account)
- Upload screenshot for you extension
- Fill up extension form
- Save and publish

# Usecases

- [Cocos Creator Devtool](https://chrome.google.com/webstore/detail/cocos-creator-devtool/cnmkiolbnmjlhdkabcgobbgdomhhdnho)
- [Mermaid Markdown](https://chrome.google.com/webstore/detail/mermaid-markdown/mboeoikjijmjcjgpccghbcoegikliijg)

# Licence

MIT
