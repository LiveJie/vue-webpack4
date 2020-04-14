export function setMeta(params) {
    if (document) {
      // 如果有设置的meta 先清除meta
      Array.from(document.querySelectorAll('[data-sass]')).map(el => el.parentNode.removeChild(el));
      document.title = params.title;
      Array.from(document.querySelectorAll('[data-sass]')).map(el => el.parentNode.removeChild(el));
      for (let key in params) {
        if (key === 'title') {
          document.title = params[key]
          continue
        }
        const metaElement = document.createElement('meta')
        metaElement.setAttribute(key, params[key]);
        metaElement.setAttribute("data-sass", "");
        document.head.appendChild(metaElement)
      }
    }
  }