import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    editor: {
      bold: 'Bold',
      italic: 'Italic',
      insertImage: 'Insert image via URL',
      placeholder: 'Start typing...',
    },
  },
  es: {
    editor: {
      bold: 'Negrita',
      italic: 'Cursiva',
      insertImage: 'Insertar imagen por URL',
      invalidImage: 'URL inválida o no es una imagen',
      bullets: 'Viñetas',
      numbered: 'Numeración',
      alignLeft: 'Alinear a la izquierda',
      alignCenter: 'Centrar',
      alignRight: 'Alinear a la derecha',
      link: 'Insertar enlace',
      enterUrl: 'Ingresá la URL',
      fontSize: 'Tamaño de fuente',
    },
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: 'es', // o 'en'
  fallbackLocale: 'en',
  messages,
})
