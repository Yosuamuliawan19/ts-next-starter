export const EXTERNAL_LINKS = {
  LINKEDIN: 'https://www.linkedin.com/in/yosua-muliawan/',
  GITHUB: 'https://github.com/Yosuamuliawan19',
  MEDIUM: 'https://yosuamuliawan.medium.com/',
  TWITTER: 'https://twitter.com/yosuamuliawan19',
  MAILTO: 'mailto:yosuamuliawan19@gmail.com',
  DOWNLOAD_CV: 'https://www.linkedin.com/in/yosua-muliawan/',
};

export const FONT_SIZE_LIST = [
  4, 6, 8, 10, 12, 16, 18, 20, 24, 32, 36, 48, 54, 60, 72, 96,
];

export const FONT_SIZE_OPTIONS = (function () {
  return FONT_SIZE_LIST.map((data) => {
    return {
      label: data,
      value: data,
    };
  });
})();

export const FONT_FAMILY_OPTIONS = [
  { label: 'Comic Neue', value: 'Comic Neue' },
  { label: 'Eb Garamond', value: 'Eb Garamond' },
  { label: 'Open San', value: 'Open San' },
  { label: 'Bangers', value: 'Bangers' },
  { label: 'Bebas Nueue', value: 'Bebas Nueue' },
  { label: 'Lato', value: 'Lato' },
  { label: 'Nanum Pen Script', value: 'Nanum Pen Script' },
  { label: 'Pacifico', value: 'Pacifico' },
  { label: 'Playfair Display', value: 'Playfair Display' },
  { label: 'Space Mono', value: 'Space Mono' },
  { label: 'Zilla Slab Highlight', value: 'Zilla Slab Highlight' },
];

export const TEXT_ALIGNMENT_OPTIONS = ['left', 'center', 'right'];

export const GRADIENT_OPTIONS = [
  'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
  'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'rgba(0, 128, 0, 0.3)',
  'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
  'linear-gradient(to top, #5ee7df 0%, #b490ca 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)',
];

export const IMAGE_OPTIONS = [
  'url(https://images.unsplash.com/photo-1550133804-0d34e3130759?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat  center',
  'url(https://images.unsplash.com/photo-1568660357733-823cbddb0f6a?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat  center',
  'url(https://images.unsplash.com/photo-1626123654094-12fca4868e1d?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat  center',
  'url(https://images.unsplash.com/photo-1550133804-0d34e3130759?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat center',
  'url(https://images.unsplash.com/photo-1626123654094-12fca4868e1d?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat  center',
  'url(https://images.unsplash.com/photo-1550133804-0d34e3130759?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat center',
  'url(https://images.unsplash.com/photo-1626123654094-12fca4868e1d?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat  center',
  'url(https://images.unsplash.com/photo-1550133804-0d34e3130759?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60) no-repeat center',
];

export const ELEMENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'img',
  SVG: 'svg',
  BUTTON: 'btn',
  YOUTUBE: 'youtube',
  NONE: 'none',
};

export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKER,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
