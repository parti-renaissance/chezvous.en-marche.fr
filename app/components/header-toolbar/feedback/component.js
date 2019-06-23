import Component from '@ember/component';
import { classNames } from '@ember-decorators/component';
import { action } from '@ember/object';

const windowOptions = ({ width, height, top, left }) =>
  `location=no,toolbar=no,menubar=no,scrollbars=no,status=no,width=${width},height=${height},top=${top},left=${left}`;

const filter = params =>
  Object
    .keys(params)
    .filter(key => params[key])
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');


const SERVICE_MAP = {
  facebook: {
    base: 'https://www.facebook.com/sharer.php',
    getParams(u) {
      return filter({u});
    }
  },
  twitter: {
    base: 'https://twitter.com/intent/tweet',
    getParams(url, params = {}) {
      return filter({...params, url});
    }
  },
  telegram: {
    base: 'https://telegram.me/share/url',
    getParams(url, params = {}) {
      return filter({...params, url});
    }
  }
};

@classNames('header-feedback')
export default class HeaderFeedback extends Component {

  @action
  dialog(service, params) {
    if (!service) {
      return;
    } else if (!SERVICE_MAP[service]) {
      console.warn(`No options configured for service ${service}. Please add an entry to SERVICE_MAP in app/components/header-toolbar/feedback/component.js`);  // eslint-disable-line
    }

    const { left, top } = this.getPopupPosition();
    const optionString = windowOptions({width: 500, height: 400, top, left});

    const currentURL = window.location.toString();
    const serviceOptions = SERVICE_MAP[service].getParams(currentURL, params);
    const shareWindowLocation = `${SERVICE_MAP[service].base}?${serviceOptions}`;

    const openedWindow = window.open(shareWindowLocation, 'share window', optionString);

    if (typeof openedWindow !== 'undefined' && openedWindow !== null && openedWindow.focus) {
      openedWindow.focus();
    }
  }

  getPopupPosition() {
    const dualScreenLeft = screen.availLeft;
    const dualScreenTop = screen.availTop;

    const windowWidth = screen.availWidth;
    const windowheight =  screen.availHeight;

    const left = ((windowWidth / 2) - (600 / 2)) + dualScreenLeft;
    const top = ((windowheight / 2) - (600 / 2)) + dualScreenTop;

    return {left: left, top: top};
  }

}
